<script setup>
import { onMounted } from 'vue';
import EventComponent from './components/EventComponent.vue';

import { useSocketStore } from '@/stores/socket';

var waitingForAnotherMessage = false
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
If there are no messages on the queue it should make a watch function watching the queue ???
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
      handleCollectAction(message)
      break;
    default:
      break;
  }

  // Maybe just make a loop xd
  nextMessage()
}

function handleCollectAction(message) {
  // TODO: Handle the task
  console.log(message);

  // Send a response
  socketStore.send({
    type: 'collecting_move',
    choice: ''
  })
}

</script>

<template>
  <EventComponent />
</template>