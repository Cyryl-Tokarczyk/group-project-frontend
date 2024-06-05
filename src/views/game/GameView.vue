<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useSocketStore } from '@/stores/socket';
import { useGameStateStore } from '@/stores/gameState';
import HubComponent from './components/HubComponent.vue';
import ClashComponent from './components/ClashComponent.vue';
import StudentEndComponent from "./components/StudentEndComponent.vue";
import TeacherEndComponent from "./components/TeacherEndComponent.vue";

var waitingForAnotherMessage = false
const hubPhase = ref(false)
const clashPhase = ref(false)
const gameEnd = ref(false)
const messageProp = ref(null)
const socketStore = useSocketStore()

const gameStateStore = useGameStateStore()

// Clash phase 

const firstPlayer = ref(null)
const clashMessageProp = ref('')

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

onBeforeMount(() => {
  // Pop the first message
  nextMessage()
})


function nextMessage() {
  if (socketStore.messageQueue.isEmpty()) {
    console.log('Queue empty, waiting...');
    waitingForAnotherMessage = true
    return
  }
  handleMessage(socketStore.messageQueue.pop())
}

// TODO: Maybe make an enum out of message types (it's not neccessary now)

function handleMessage(message){
  switch (message.type) {
    case 'game_start':
      handleGameStartMessage(message)
      break;
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

function handleGameStartMessage(message) {
  console.log('Handling game start message: ' + JSON.stringify(message))

  gameStateStore.money = message['initial_money_amount']
  gameStateStore.setPlayerMorale(message['initial_morale'])

  nextMessage()
}

function handleCardPackageMessage(message) {
  console.log('Handling card package message: ' + JSON.stringify(message));

  messageProp.value = message
  hubPhase.value = true

  nextMessage()
}

function handlePurchaseMove(choice) {
  console.log('Sending a response choice: ' + JSON.stringify(choice));

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

  firstPlayer.value = message['next_move']

  nextMessage()
}

function handleActionMove(cardId) {
  console.log('Handling action move: ' + JSON.stringify(cardId));

  socketStore.send({
    type: 'action_move',
    id: cardId
  })
}

function handleReactionMove(reactionCardsIds) {
  console.log('Handling reaction move: ' + JSON.stringify(reactionCardsIds));

  socketStore.send({
    type: 'reaction_move',
    reaction_cards: reactionCardsIds
  })
}

function handleOpponentMoveMessage(message) {
  console.log('Handling opponent move message: ' + JSON.stringify(message));

  clashMessageProp.value = message

  nextMessage()
}

function handleClashResultMessage(message) {
  console.log('Handling clash result message: ' + JSON.stringify(message));

  gameStateStore.setPlayerMorale(message['new_player_morale'])
  gameStateStore.setOpponentMorale(message['new_opponent_morale'])

  clashMessageProp.value = message
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
    <ClashComponent v-if="clashPhase" :firstPlayer="firstPlayer" :message="clashMessageProp" @action-move="handleActionMove" @reaction-move="handleReactionMove" />
    <StudentEndComponent v-if="gameEnd && gameStateStore.playerType == 'student'" :message="messageProp" />
    <TeacherEndComponent v-if="gameEnd && gameStateStore.playerType == 'teacher'" :message="messageProp" />
  </div>
</template>

<style>

#game {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>