<script setup>
import { ref, onMounted, watch } from 'vue'
import { getAppropriateActionState } from "@/lib/ClashState.js"
import { useGameStateStore } from "@/stores/gameStateDev"
import { unpackReactionCards } from "@/lib/CardsHandling.js";

const props = defineProps([
  'firstPlayer',
  'opponentMove'
])

const emit = defineEmits([
  'action-move',
  'reaction-move'
])

const clashState = ref("")
const gameStateStore = useGameStateStore()
const opponentCards = ref([])
const myCards = ref([])

watch(
  props.opponentMove,
  () => {
    // Implement clash logic
    if (props.opponentMove['action_card']) {
      opponentCards.value = [ props.opponentMove['action_card'] ]
    }
    if (props.opponentMove['reaction_cards']) {
      opponentCards.value = unpackReactionCards(props.opponentMove['reaction_cards'])
    }
  }
)

onMounted(() => {
  clashState.value = getAppropriateActionState("sd", gameStateStore.playerType).enumKey 
  opponentCards.value = (clashState.value == 'MyAction'  ? gameStateStore.opRactionCards : gameStateStore.opActionCards)
  

  table.value.addEventListener("mouseover", handleMouseEnter);
  table.value.addEventListener("mouseleave", handleMouseLeave);
})


function isOneAction(){
  if (clashState.value == "MyAction"){
    if(myCards.value.length == 1){
      return true
    }
  }
  return false
}

function startDrag(event, index, hoverCard){
  isCardHold.value = true
  const card = event.target;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  document.onmousemove = elementDrag;
  document.onmouseup = stopDrag;
  document.body.style.userSelect = 'none';
  const ot = card.offsetTop
  const ol = card.offsetLeft
  card.style.zIndex  = `100`
  card.style.transition = '0s'
  const cardTop = card.style.top
  const cardLeft = card.style.left
  pos3 = event.pageY
  pos4 = event.pageX
  card.style.top = ot + "px";
  card.style.left = ol + "px";
  card.style.pointerEvents = 'none';
  card.style.transform = 'scale(1.2) translateY(-2vw)'

  function elementDrag(e){
    pos1 = pos3 - e.pageY
    pos2 = pos4 - e.pageX
    card.style.top = ( ot - pos1) + "px";
    card.style.left = ( ol - pos2 ) + "px";
  }

  function stopDrag(){
    card.style.pointerEvents = 'auto';
    card.style.transform = ''
    card.style.transition = '0.2s'
    document.body.style.userSelect = '';
    card.style.zIndex  = `1`
    document.onmousemove = null;
    document.onmouseup = null;
    isCardHold.value = false
    card.style.left = cardLeft
    card.style.top = cardTop
    if(isTableHovered.value && !isOneAction() && !moveMade.value){
      if(clashState.value == "MyAction"){
        gameStateStore.actionCards.splice(index, 1);
      } else {
        gameStateStore.reactionCards.splice(index, 1);
      }
      myCards.value.push(hoverCard);
      card.style.transition = '0s'
    } else {
      card.style.pointerEvents = "none"
      setTimeout(()=>{
        card.style.pointerEvents = ""
      },200)
    }
  }
}

const table = ref(null)
const isTableHovered = ref(false)

function handleMouseEnter() {
  isTableHovered.value = true;
}

function handleMouseLeave() {
  isTableHovered.value = false;
}

const modal = ref(null)
const showModal = ref(false)
const isCardHold = ref(false)
const modalCardData = ref(null);

function hoverCard(e,hoveredCard) {
  if(isCardHold.value==false){
    showModal.value = true
    modalCardData.value = hoveredCard;
    const card = e.target;
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


const showOtherCards = ref(false);

function displayOtherCards(){
  showOtherCards.value = true;
}

function hideOtherCards(){
  showOtherCards.value = false;
}

const moveMade = ref(false)
const readyButton = ref(null)


function ready(){
  moveMade.value = true
  emit(clashState.value == 'MyAction' ? 'action-move' : 'reaction-move', myCards)
  readyButton.value.style.color = "red"
}

function undo(){
  if (myCards.value.length > 0 && !moveMade.value) {
    const lastElement = myCards.value.pop();
    (clashState.value == 'MyAction' ? gameStateStore.actionCards : gameStateStore.reactionCards).push(lastElement);
  }
}

</script>

<template>
  <div id="clash">
    <div id="oponnent_cards" :class="(clashState == 'MyAction'  ? '' : 'action')">
      <div v-for="(card, index) in opponentCards"
        :key="index" class="table_cards  dynamic_position"
        :style="{ backgroundColor: card.color, '--order': index + 1, '--quantity': opponentCards.length + 1}">
        <p>{{ card.id }}</p>
        <p>{{ card.des }}</p>
      </div>
    </div>

    <div id="thrown_cards" ref="table" :class="(clashState == 'MyAction'  ? 'action' : '')">
      <div v-for="(card, index) in myCards"
        :key="index" class="table_cards dynamic_position"
        :style="{ backgroundColor: card.color, '--order': index + 1, '--quantity': myCards.length + 1}">
        {{ card.id }}
        <p></p>
        {{ card.des }}
      </div>
    </div>

    <div id="profile">
      <div class="stats">
        <p>Morale {{ gameStateStore.playersMorale }}</p>
        <button @click="displayOtherCards()">{{ clashState == 'MyAction' ? 'Reaction' : 'Action' }} cards</button>
      </div>
      <div id="clash_hand" ref="hand">
        <div v-for="(card, index) in (clashState == 'MyAction'  ? gameStateStore.actionCards : gameStateStore.reactionCards)"
          :key="index" class="hand_cards dragable dynamic_position" ref="draggableCards" @mousedown="startDrag($event, index, card)"
          @mouseenter="hoverCard($event, card)" @mouseleave="cardReset($event)"
          :style="{ backgroundColor: card.color, '--order': index + 1, '--quantity': (clashState == 'MyAction' ? gameStateStore.actionCards : gameStateStore.reactionCards).length + 1}">
          {{ card.id }}
          <p></p>
          {{ card.des }}
        </div>
      </div> 
      <div class="stats">
        <button @click="ready()" ref="readyButton">READY</button> 
        <button @click="undo()">undo</button> 
      </div>
    </div>
    <div v-if="showModal" ref="modal" class="modal_cont" :style="{ backgroundColor: modalCardData.color}">
      {{ modalCardData.id }}
      <p></p>
      {{ modalCardData.des }}
    </div>
    <div v-if="showOtherCards" class="reactionAllCard" @click="hideOtherCards()">        
      <h1 class="h1_all_cards">{{ clashState == 'MyAction' ? 'Reaction' : 'Action' }} cards</h1>
      <div class="all_cards">
        <div v-for="(card, index) in (clashState == 'OpponentAction'  ? gameStateStore.actionCards : gameStateStore.reactionCards)" :key="index" class="reaction_card_all" :style="{ backgroundColor: card.color}">
          {{ card.id }}
          <p>Descritpion:</p>
          {{ card.des }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>

#clash{
  --width: 74;
}

#xd{
  height: 100%;
  width: 1px;
  background: red;
  position: absolute;
  top: 0;
  left: 50vw;
}
.scale:hover{
  transform: scale(1.5) translateY(-1vw);
}

.table_cards{
  margin-top: 1.5vw;
}

.table_cards, .hand_cards, .modal_cont{
  border: 1.5px solid rgb(0, 0, 0);
  box-shadow: 0px 0px 3px;
  width: 8vw;
  --card-width: 8;
  height: 11vw;
  min-width: 8vw;
  align-items: center;
  border-radius: 5%;
  box-sizing: border-box;
}

.dynamic_position{
  position: absolute;
  top: 0.4vw;
  left: calc((var(--width)/var(--quantity) * var(--order)*1vw) - var(--card-width)/2 * 1vw);
}

.hand_cards, .modal_cont{
  width: 6.4vw;
  --card-width: 6.4;
  height: 8.8vw;
  min-width: 6.4vw;
  z-index: 1;
}

.modal_cont{
  position: absolute;
  top: 36.1vw;
  pointer-events: none;
  opacity: 0;
}

.hand_cards:active {
  cursor: grabbing;
}

#profile{
  width: 90vw;
  height: 10vw;
  display: flex;
  align-items: center;
  border: 0px;
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
  margin: 0;
  border: 0px;
}

.stats{
  width: 20vw;
  display: flex;
  flex-direction: column;
}

#oponnent_cards, #thrown_cards{
  position: relative;
  width: 74vw;
  height: 30%;
  border: 1px solid black;
  margin-bottom: 1vw;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
}

.action{
  max-width: 12vw;
  --width: 12;
}

</style>