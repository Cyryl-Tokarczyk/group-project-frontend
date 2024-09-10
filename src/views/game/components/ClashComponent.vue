<script setup>
import { ref, toRaw, onMounted, watch } from 'vue'
import { ClashState, getAppropriateActionState, nextState } from "@/lib/enums/ClashState.js"
import { useGameStateStore } from "@/stores/gameState"
import { unpackReactionCards, packReactionCardsIds } from "@/lib/CardsHandling.js";
import CardComponent from './CardComponent.vue'
import CardsComponent from './CardsComponent.vue'

const props = defineProps([
  'firstPlayer',
  'message'
])

const emit = defineEmits([
  'action-move',
  'reaction-move'
])

const clashState = ref("")
const gameStateStore = useGameStateStore()
const opponentCards = ref([])
const chosenCards = ref([])
const table = ref(null)
const isTableHovered = ref(false)
const modal = ref(null)
const showModal = ref(false)
const isCardHold = ref(false)
const modalCardData = ref(null)
const moveMade = ref(false)
const readyButton = ref(null)
const showOtherCards = ref(false)

watch(
  () => props.message,
  () => {
    // Implement clash logic
    if (props.message['type'] == 'opponent_move') {
      var x = false;
      if (props.message['action_card']) {
        opponentCards.value = [ props.message['action_card'] ]
        console.log('Opponent cards: ' + JSON.stringify(opponentCards.value));
      }
      if (props.message['reaction_cards']) {
        opponentCards.value = unpackReactionCards(props.message['reaction_cards'])
        console.log('Opponent cards: ' + JSON.stringify(opponentCards.value));
        x = true
      }

      if(x){
        setTimeout(() => {updateClashState()},5000)
      }else{
        updateClashState()
      }
    }
    else if (props.message['type'] == 'clash_result') {
      setTimeout(() => {
        opponentCards.value = []
        chosenCards.value = []
        moveMade.value = false
      },4500)
      // if (clashState.value == ClashState.) {
        
      // }
    }
  },
  { deep: true }
)

onMounted(() => {
  clashState.value = getAppropriateActionState(props.firstPlayer, gameStateStore.playerType)
  table.value.addEventListener("mouseover", handleMouseEnter)
  table.value.addEventListener("mouseleave", handleMouseLeave)
})

// function resetClashState() { // Call when clash result
//   moveMade.value = false
//   readyButton.value.style.color = "white"
//   chosenCards.value = []
// }

function isOneAction() {
  if (toRaw(clashState.value) == ClashState.MyAction){
    if(chosenCards.value.length == 1){
      return true
    }
  }
  return false
}

function startDrag(event, hoverCard, index){
  isCardHold.value = true
  const card = event.target
  card.style.position = "absolute"
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  document.onmousemove = elementDrag
  document.onmouseup = stopDrag
  document.body.style.userSelect = 'none'
  const ot = card.offsetTop
  const ol = card.offsetLeft
  card.style.zIndex  = `100`
  card.style.transition = '0s'
  const cardTop = card.style.top
  const cardLeft = card.style.left
  pos3 = event.pageY
  pos4 = event.pageX
  card.style.top = ot + "px"
  card.style.left = ol + "px"
  card.style.pointerEvents = 'none'
  card.style.transform = 'scale(1.2) translateY(-2vw)'

  function elementDrag(e){
    pos1 = pos3 - e.pageY
    pos2 = pos4 - e.pageX
    card.style.top = ( ot - pos1) + "px"
    card.style.left = ( ol - pos2 ) + "px"
  }

  function stopDrag(){
    card.style.pointerEvents = 'auto'
    card.style.position = "initial"
    card.style.transform = ''
    card.style.transition = '0.2s'
    document.body.style.userSelect = ''
    card.style.zIndex  = `1`
    document.onmousemove = null
    document.onmouseup = null
    isCardHold.value = false
    card.style.left = cardLeft
    card.style.top = cardTop
    if(isTableHovered.value && !isOneAction() && !moveMade.value){
      if(toRaw(clashState.value) == ClashState.MyAction){
        gameStateStore.actionCards.splice(index, 1)
      } else {
        gameStateStore.reactionCards.splice(index, 1)
      }
      chosenCards.value.push(hoverCard)
      card.style.transition = '0s'
    } else {
      card.style.pointerEvents = "none"
      setTimeout(()=>{
        card.style.pointerEvents = ""
      },200)
    }
  }
}

function handleMouseEnter() {
  isTableHovered.value = true
}

function handleMouseLeave() {
  isTableHovered.value = false
}

function hoverCard(e, hoveredCard) {
  if(isCardHold.value==false){
    showModal.value = true
    modalCardData.value = hoveredCard
    const card = e.currentTarget
    card.onmousemove = modalShow
  }
}

function modalShow(e) {
  if(modal.value){
    const card = e.target;
    card.style.opacity = '0'
    modal.value.style.opacity = '100%'
    modal.value.style.transform = 'scale(1.2) translateY(-2vw)'
    card.style.transition = '0s'
    modal.value.style.left = `calc(${card.offsetLeft}px + 25.35vw)`
  }
}

function cardReset(e) {
  showModal.value = false
  const card = e.target;
  card.onmousemove = null
  card.style.opacity = '100%'
}

function displayOtherCards(){
  showOtherCards.value = true
}

function hideOtherCards(){
  showOtherCards.value = false
}

function updateClashState(){
  clashState.value = nextState(toRaw(clashState.value))
  if (readyButton.value){
    readyButton.value.style.color = "black"
  }
}

function ready(){
  if(toRaw(clashState.value) == ClashState.OpponentReaction || toRaw(clashState.value) == ClashState.OpponentAction){
    readyButton.value.style.color = "black"
    return
  }
  moveMade.value = true
  readyButton.value.style.color = "brown"
  if (toRaw(clashState.value) == ClashState.MyAction) {
      console.log(chosenCards.value[0].id);
      emit('action-move', chosenCards.value[0].id)
      updateClashState()
  }
  else if (toRaw(clashState.value) == ClashState.MyReaction) {
    emit('reaction-move', packReactionCardsIds(chosenCards.value))
    setTimeout(() => {updateClashState()},5000)
  }
  else{
    updateClashState()
  }
}

function undo(){
  if (chosenCards.value.length > 0 && !moveMade.value) {
    const lastElement = chosenCards.value.pop();
    (toRaw(clashState.value) == ClashState.MyAction ? gameStateStore.actionCards : gameStateStore.reactionCards).push(lastElement)
  }
}

</script>

<template>

  <div id="clash">
    <div id="oponnent_cards" :class="((toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction)  ? '' : 'action')">
      <div v-for="(card, index) in opponentCards" :key="card.id">
        <CardComponent :card="card" :index="index" :length="opponentCards.length" :size="0.4" :full="true" :dynamic_position="true" :price="true"/>
      </div>
    </div>

    <div id="thrown_cards" ref="table" :class="((toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction)  ? 'action' : '')">
      <div v-for="(card, index) in chosenCards" :key="card.id">
        <CardComponent class="thrown_card" :card="card" :index="index" :length="chosenCards.length" :size="0.4" :full="true" :dynamic_position="true" :price="true"/>
      </div>
    </div>

    <div id="profile">
      <div class="stats">
        <div class="morale">
          <img src="@/assets/imgs/morale.png" :alt="'morale image'" class="morale_image">
          <p>Morale {{ gameStateStore.playersMorale }}</p>
        </div>
        <button @click="displayOtherCards()">{{ (toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction) ? 'Reaction' : 'Action' }} cards</button>
      </div>
        <div id="clash_hand" ref="hand">
          <div v-for="(card, index) in ((toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction)  ? gameStateStore.actionCards : gameStateStore.reactionCards)"
            :key="card.id" class="dragable hand_card" @mousedown="startDrag($event, card, index)"
            @mouseenter="hoverCard($event, card)" @mouseleave="cardReset($event)">
            <CardComponent :card="card" :index="index" :style="{pointerEvents: 'none'}"
             :length="((toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction)  ? gameStateStore.actionCards : gameStateStore.reactionCards).length"
             :size="0.5" :dynamic_position="true" />
          </div>
        </div> 
      <div class="stats">
        <button class="button_right" @click="ready()" ref="readyButton">READY</button> 
        <button class="button_right" @click="undo()">undo</button> 
      </div>
    </div>

    <div v-if="showModal" ref="modal" class="modal_cont">
      <CardComponent :card="modalCardData" :size="0.5" :full="true" :price="true"/>
    </div>

    <div v-if="showOtherCards" class="reactionAllCard" @click="hideOtherCards()">        
      <CardsComponent :cards_tab="(toRaw(clashState) == ClashState.OpponentAction  ? gameStateStore.actionCards : gameStateStore.reactionCards)"
      :text="((toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction) ? 'Reaction' : 'Action') + 'cards'"/>
    </div>
  </div>
</template>

<style>


p{
  margin: 0;
}

#clash{
  --width: 74;
}

#oponnent_cards, #thrown_cards{
  width: 74vw;
  height: 30%;
  border: 0.2vw  inset rgba(255, 255, 255, 0.377);
  border-radius: 1vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2.5vw inset;
}
.thrown_card{
  margin-top: -10vw;
}

.hand_card{
  width: 100%;
  height: 135%;
  margin-top: 3vw;
}

.table_cards, .hand_cards, .modal_cont{
  border: 0.15vw solid rgb(0, 0, 0);
  border-radius: 0.5vw;
  box-sizing: border-box;
  box-shadow: 0 0 0.8vw;
  align-items: center;
}

.table_cards{
  height: 11vw;
  width: 8vw;
  min-width: 8vw;
  --card-width: 8;
  margin-top: 1.5vw;
}

.hand_cards, .modal_cont{
  width: 6.4vw;
  min-width: 6.4vw;
  height: 8.8vw;
  --card-width: 6.4;
  z-index: 1;
  font-size: 1vw;
}

.modal_cont{
  position: absolute;
  top: 36.1vw;
  pointer-events: none;
  opacity: 0;
}

#profile{
  width: 90vw;
  height: 10vw;
  display: flex;
  align-items: center;
}

#clash_hand{
  width: 50vw;
  --width: 50;
  height: 10vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
}

.stats{
  width: 20vw;
  height: 8vw;
  display: flex;
  flex-direction: column;
  border-radius: 0.5vw;
  background-image: url(@/assets/imgs/paper.jpg);
  box-shadow: 0 0 0.5vw;
}

.action{
  max-width: 12vw;
  --width: 12;
}

.button_right{
  margin: 1vw;
}

</style>