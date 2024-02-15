<script setup>
import { ref, onMounted, watch } from 'vue';
import HubComponent from './components/HubComponent.vue';

import { useSocketStore } from '@/stores/socket';
import ClashComponent from './components/ClashComponent.vue';

var waitingForAnotherMessage = false
const collectionPhase = ref(false)
const clashPhase = ref(false)
const messageProp = ref(null)
const socketStore = useSocketStore()

watch(
  socketStore.messageQueue,
  () => {
    if (waitingForAnotherMessage) {
      console.log('Detected a change to the queue, the wait is over...');
      waitingForAnotherMessage = false
      nextMessage()
    }
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
    case 'card_package':
      handleCardPackageMessage(message) // TODO
      break;
    case 'purchase_result': 
      handlePurchaseResultMessage(message) // TODO
      break;
    case 'clash_start':
      handleClashStartMessage(message) // TODO
      break;
    case 'opponent_move':
      handleOpponentMoveMessage(message) // TODO
      break;
    case 'clash_result':
      handleClashResultMessage(message) // TODO
      break;
    case 'clash_end':
      handleClashEndMessage(message) // TODO
      break;
    case 'game_end':
      handleGameEndMessage(message) // TODO
      break;
    case 'error':
      handleErrorMessage(message) // TODO
      break;
    default:
      break;
  }
}

function handleCardPackageMessage(message) {
  console.log(JSON.stringify(message));

  // Temporary adjustment, because we're not getting a clash started message
  if (!('task' in message)) {
    message.type = 'clash_start'
    handleMessage(message)
    return
  }

  messageProp.value = message
  collectionPhase.value = true
}

function handlePurchaseMove(choice) {

  console.log('Sending a response choice: ' + choice);

  // Send a response
  socketStore.send({
    type: 'collecting_move',
    choice: choice
  })

  collectionPhase.value = false

  nextMessage()
}

function handlePurchaseResultMessage(message) {

  nextMessage()
}

function handleClashStartMessage(message) {
  console.log('Handling clash start: ' + JSON.stringify(message));

  clashPhase.value = true

  nextMessage()
}

function handleOpponentMoveMessage(message) {
  
  nextMessage()
}

function handleClashResultMessage(message) {
  
  nextMessage()
}

function handleClashEndMessage(message) {
  
  nextMessage()
}

function handleGameEndMessage(message) {
  
  nextMessage()
}

function handleErrorMessage(message) {
  
  nextMessage()
}

</script>

<template>
  <div id="game">
    <HubComponent v-if="!collectionPhase" :message="messageProp" @choice-made="handlePurchaseMove" /> 
    <ClashComponent v-if="clashPhase" :message="messageProp" />
  </div>
</template>

<style>

#game {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>