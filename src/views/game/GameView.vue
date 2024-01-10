<script setup>
import { ref, onMounted } from 'vue';
import EventComponent from './components/EventComponent.vue';

import { useSocketStore } from '@/stores/socket';

var waitingForAnotherMessage = false
const collectActionReceived = ref(false)
const messageProp = ref(null)
const socketStore = useSocketStore()

// Not ideal, prefferably should watch a queue isEmpty parameter or something like that
socketStore.$onAction(      // Returns an unsubscribe function if later needed
  ({ name, after }) => {
    after(() => {
      console.log(name + ' function was called; ' + waitingForAnotherMessage + ' <- waitingForAnotherMessage');
      if (name == 'onMessageHandler' && waitingForAnotherMessage) {
        console.log('Detected a new message, the wait is over...');
        waitingForAnotherMessage = false
        nextMessage()
      }
    })
  }
)

/* Flow of reacting:
First message is popped on mount
After handling a message another message is popped from the queue
If there are no messages on the queue it subscribes to the onAction event on socketStore and waits for an onMessageHandler call
*/

onMounted(() => {
  // Pop the first message

  // The first message is being processed, while this component mounts, but it ends mounting before the message is processed.
  // In result, it tries to pop the queue, which is empty, so it subscribes to the onMessageHandler method,
  // which in turn is called before the mounting, so it doesn't intercept the function call.

  // !!!!! THIS IS AN AD HOC SOLUTION, CHANGE IT ASAP !!!!!

  setTimeout( () => {
    console.log('Delay is over');
    nextMessage()
   }, 1000)
})

function nextMessage() {
  if (socketStore.messageQueue.isEmpty()) {
    console.log('Queue empty, waiting...');
    waitingForAnotherMessage = true
    return
  }
  handleMessage(socketStore.messageQueue.pop())
}

// TODO: Make an enum out of message types

function handleMessage(message){
  switch (message.type) {
    case 'collect_action':
      handleCollectActionMessage(message)
      break;
    default:
      break;
  }
}

function handleCollectActionMessage(message) {
  console.log(JSON.stringify(message));

  messageProp.value = message
  collectActionReceived.value = true
}

function handleCollectAction() {

  console.log('Sending a response choice: ' + '');

  // Send a response
  socketStore.send({
    type: 'collecting_move',
    choice: ''
  })

  collectActionReceived.value = false

  nextMessage()
}

</script>

<template>
  <EventComponent v-if="collectActionReceived" :message="messageProp" @choice-made="handleCollectAction" />
</template>