<script setup>
import { ref, onMounted, watch } from 'vue';
import { useSocketStore } from '@/stores/socket';
import { useGameStateStore } from '@/stores/gameState';
import HubComponent from './components/HubComponent.vue';
import ClashComponent from './components/ClashComponent.vue';
import GameEndComponent from "./components/GameEndComponent.vue";

var waitingForAnotherMessage = false
const hubPhase = ref(false)
const clashPhase = ref(false)
const gameEnd = ref(false)
const messageProp = ref(null)
const socketStore = useSocketStore()

const gameStateStore = useGameStateStore()

// Clash phase 

const firstPlayer = ref(null)
const opponentMove = ref(null)

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

function clearLocalStorage() {
  localStorage.removeItem('shopActionCardNumbers');
  localStorage.removeItem('handActionCardNumbers');
  localStorage.removeItem('shopReactionCardNumbers');
  localStorage.removeItem('handReactionCardNumbers');
  localStorage.removeItem('playerCredits');
  localStorage.removeItem('playerMorale');
}

onMounted(() => {
  // Pop the first message

  // The first message is being processed, while this component mounts, but it ends mounting before the message is processed.
  // In result, it tries to pop the queue, which is empty, so it subscribes to the onMessageHandler method,
  // which in turn is called before the mounting, so it doesn't intercept the function call.
  // !!!!! THIS IS AN AD HOC SOLUTION, CHANGE IT ASAP !!!!!

  clearLocalStorage();

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
      handleCardPackageMessage(message)
      break;
    case 'purchase_result': 
      handlePurchaseResultMessage(message)
      break;
    case 'clash_start':
      handleClashStartMessage(message)
      break;
    case 'opponent_move':
      handleOpponentMoveMessage(message)
      break;
    case 'clash_result':
      handleClashResultMessage(message)
      break;
    case 'clash_end':
      handleClashEndMessage(message)
      break;
    case 'game_end':
      handleGameEndMessage(message)
      break;
    case 'error':
      handleErrorMessage(message) // TODO
      break;
    default:
      break;
  }
}

function handleCardPackageMessage(message) {
  console.log('Handling card package message: ' + JSON.stringify(message));

  messageProp.value = message
  hubPhase.value = true

  nextMessage()
}

function handlePurchaseMove(choice) {
  console.log('Sending a response choice: ' + choice);

  // Send a response
  socketStore.send({
    type: 'purchase_move',
    action_cards: choice['action_cards'],
    reaction_cards: choice['reaction_cards']
  })
}

function handlePurchaseResultMessage(message) {
  console.log('Handling purchase result message: ' + JSON.stringify(message));

  gameStateStore.money = message['new_money_amount']

  nextMessage()
}

function handleReadyMove() {
  console.log('Sending a ready_move message');

  socketStore.send({
    type: 'ready_move'
  })
}

function handleClashStartMessage(message) {
  console.log('Handling clash start message: ' + JSON.stringify(message));

  hubPhase.value = false
  clashPhase.value = true

  firstPlayer.value = message['next_move_player']

  nextMessage()
}

function handleActionMove(card) {
  console.log('Handling action move: ' + card);

  socketStore.send({
    type: 'action_move',
    action_card: card
  })
}

function handleReactionMove(cards) {
  console.log('Handling reaction move: ' + cards);

  socketStore.send({
    type: 'reaction_move',
    reaction_cards: cards
  })
}

function handleOpponentMoveMessage(message) {
  console.log('Handling opponent move message: ' + JSON.stringify(message));

  opponentMove.value = message

  nextMessage()
}

function handleClashResultMessage(message) {
  console.log('Handling clash result message: ' + JSON.stringify(message));

  gameStateStore.morale['student'] = message['new_student_morale']
  gameStateStore.morale['teacher'] = message['new_teacher_morale']

  nextMessage()
}

function handleClashEndMessage(message) {
  console.log('Handling clash end message: ' + JSON.stringify(message));

  clashPhase.value = false

  nextMessage()
}

function handleGameEndMessage(message) {
  console.log('Handling game end message: ' + JSON.stringify(message));

  hubPhase.value = false
  clashPhase.value = false
  messageProp.value = message
  gameEnd.value = true

  nextMessage()
}

function handleErrorMessage(message) {
  console.log('Handling error message: ' + JSON.stringify(message));

  nextMessage()
}

</script>

<template>
  <div id="game">
    <HubComponent v-if="hubPhase" :message="messageProp" @purchase-made="handlePurchaseMove" @ready="handleReadyMove" /> 
    <ClashComponent v-if="clashPhase" :firstPlayer="firstPlayer" :opponentMove="opponentMove" @action-move="handleActionMove" @reaction-move="handleReactionMove" />
    <GameEndComponent v-if="gameEnd" :message="messageProp" />
  </div>
</template>

<style>

#game {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>