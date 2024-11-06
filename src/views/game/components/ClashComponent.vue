<script setup>
import { ref, toRaw, onMounted, watch, computed } from 'vue'
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
const windowWidth = ref(window.innerWidth);


const computedSize = computed(() => {
  return windowWidth.value < 770 ? 1 : 0.5;
});

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

watch(
  () => props.message,
  () => {
    // Implement clash logic
    if (props.message['type'] == 'opponent_move') {

      if (props.message['action_card']) { // Means that it was opponents action_move
        opponentCards.value = [ props.message['action_card'] ]
        console.log('Opponent cards: ' + JSON.stringify(opponentCards.value));
        updateClashState()
      }

      if (props.message['reaction_cards']) { // Means that it was opponents reaction_move
        opponentCards.value = unpackReactionCards(props.message['reaction_cards'])
        console.log('Opponent cards: ' + JSON.stringify(opponentCards.value));
      }

    } else if (props.message['type'] == 'clash_result') {
      setTimeout(() => {
        resetClashState()
      }, 4000)
    }
  },
  { deep: true }
)

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
  clashState.value = getAppropriateActionState(props.firstPlayer, gameStateStore.playerType)
  table.value.addEventListener("mouseover", handleMouseEnter)
  table.value.addEventListener("mouseleave", handleMouseLeave)
})

function resetClashState() { // Call when clash result
  moveMade.value = false
  chosenCards.value = []
  opponentCards.value = []
  updateClashState()
}

function updateClashState(){
  clashState.value = nextState(toRaw(clashState.value))
  if (readyButton.value && toRaw(clashState.value) == ClashState.MyAction || toRaw(clashState.value) == ClashState.MyReaction) {
    readyButton.value.style.color = "black"
  }
}

function ready() {
  if(toRaw(clashState.value) == ClashState.OpponentReaction || toRaw(clashState.value) == ClashState.OpponentAction) {
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
  }
}

function readyMouseEnter() {
  if (readyButton.value.style.color == "black") {
    readyButton.value.style.color = "rgb(138, 35, 35)"
  }
}

function readyMouseLeave() {
  if (readyButton.value.style.color == "rgb(138, 35, 35)") {
    readyButton.value.style.color = "black"
  }
}

const cardThrown = ref(false)

const handleHandCardClick = (card, index) => {
  if(toRaw(clashState.value) == ClashState.MyAction){
    gameStateStore.actionCards.splice(index, 1)
  } else {
    gameStateStore.reactionCards.splice(index, 1)
  }
  chosenCards.value.push(card)
  cardThrown.value = true
  console.log('Kliknięto kartę:', card, 'o indeksie:', index);
};

function isOneAction() {
  if (toRaw(clashState.value) == ClashState.MyAction){
    if(chosenCards.value.length == 1){
      return true
    }
  }
  return false
}

const slimView = computed(() => {
  return windowWidth.value < 770 ? true : false;
});

const showSlimHandCards = ref(false)

function startDrag(event, hoverCard, index, slimViewHand){
  if(slimView.value && !slimViewHand){
    showSlimHandCards.value = true
    return
  }

  isCardHold.value = true
  const card = event.target
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  document.onmousemove = elementDrag
  document.onmouseup = stopDrag
  document.body.style.userSelect = 'none'
  const ot = 0
  const ol = 0
  card.style.zIndex  = `100`
  card.style.transition = '0s'
  const cardTop = card.style.top
  const cardLeft = card.style.left
  pos3 = event.pageY
  pos4 = event.pageX
  card.style.top = ot  + "px"
  card.style.left = ol + "px"
  card.style.pointerEvents = 'none'
  card.style.transform = 'scale(1.2)'

  function elementDrag(e){
    pos1 = pos3 - e.pageY
    pos2 = pos4 - e.pageX
    card.style.top = ( ot - pos1) + "px"
    card.style.left = ( ol - pos2 ) + "px"
  }

  function stopDrag(){
    card.style.pointerEvents = 'auto'
    card.style.position = "relative"
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
  if(isCardHold.value==false && !slimView.value){
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
  if (cardThrown.value == false){
    showSlimHandCards.value = false;
  }
  cardThrown.value = false
  showOtherCards.value = false
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
    <div id="oponnetn_stats">
      <p>{{ gameStateStore.opponentType }}</p>
      <div id="oponnetn_morale">
        <img src="@/assets/imgs/morale.png" :alt="'morale image'" class="morale_image">
        <p>{{ gameStateStore.opponentsMorale }}</p>
      </div>
    </div>

    <div id="oponnent_cards" :class="((toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction)  ? '' : 'action')">
      <div v-for="(card, index) in opponentCards" :key="card.id" class="table_thrown_cards">
        <CardComponent class="oponnent_thrown_card" :card="card" :index="index" :length="opponentCards.length" :size="computedSize*1.2" :full="true" :dynamic_position="false" :price="true"/>
      </div>
    </div>

    <div id="thrown_cards" ref="table" :class="((toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction)  ? 'action' : '')">
      <div v-for="(card, index) in chosenCards" :key="card.id" class="table_thrown_cards">
        <CardComponent class="thrown_card" :card="card" :index="index" :length="chosenCards.length" :size="computedSize*1.2" :full="true" :dynamic_position="false" :price="true"/>
      </div>
    </div>

    <div id="profile">
      <div class="stats">
        <p>{{ gameStateStore.playerType }}</p>
        <div class="morale">
          <img src="@/assets/imgs/morale.png" :alt="'morale image'" class="morale_image">
          <p>{{ gameStateStore.playersMorale }}</p>
        </div>
        <button @click="displayOtherCards()">{{ (toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction) ? 'Reaction' : 'Action' }} cards</button>
      </div>
        <div id="clash_hand" ref="hand">
          <div v-for="(card, index) in ((toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction)  ? gameStateStore.actionCards : gameStateStore.reactionCards)"
            :key="card.id" class="dragable hand_card" @mousedown="startDrag($event, card, index, false)"
            @mouseenter="hoverCard($event, card)" @mouseleave="cardReset($event)">
            <CardComponent :card="card" :index="index" :style="{pointerEvents: 'none'}"
             :length="((toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction)  ? gameStateStore.actionCards : gameStateStore.reactionCards).length"
             :size="computedSize" :dynamic_position="false" />
          </div>
        </div> 

      <div class="stats ready_undo">
        <button class="button_right" @click="ready()" @mouseenter="readyMouseEnter()" @mouseleave="readyMouseLeave()" ref="readyButton">READY</button> 
        <button class="button_right" @click="undo()">UNDO</button> 
      </div>
    </div>

    <div v-if="showModal" ref="modal" class="modal_cont">
      <CardComponent :card="modalCardData" :size="computedSize" :full="true" :price="true"/>
    </div>

    <div v-if="showOtherCards" class="reactionAllCard" @click="hideOtherCards()">        
      <CardsComponent :cards_tab="((toRaw(clashState) == ClashState.OpponentAction || toRaw(clashState) == ClashState.MyReaction)  ? gameStateStore.actionCards : gameStateStore.reactionCards)"
      :text="((toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction) ? 'Reaction' : 'Action') + 'cards'"/>
    </div>

    <div v-if="showSlimHandCards" class="handAllCard" @click="hideOtherCards()">        
      <CardsComponent :cards_tab="((toRaw(clashState) == ClashState.OpponentAction || toRaw(clashState) == ClashState.MyReaction)  ? gameStateStore.reactionCards : gameStateStore.actionCards)"
      :text="((toRaw(clashState) == ClashState.MyAction || toRaw(clashState) == ClashState.OpponentReaction) ? 'Action' : 'Reaction') + 'cards'" @card-clicked="handleHandCardClick"/>
    </div>
  </div>
</template>

<style>
.ready_undo{
  gap: 2vw;
}

#oponnetn_morale{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

#oponnetn_morale img{
  height: 3vw;
  width: auto;
}

#oponnetn_stats{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

p{
  margin: 0;
}

#clash{
  --width: 74;
}

.table_thrown_cards{
  width: 100%;
  max-width: 10vw;
  position: relative;
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
.thrown_card, .oponnent_thrown_card{
  margin-top: -7vw;
}

.hand_card{
  width: 100%;
  max-width: 8vw;
  height: 135%;
  margin-top: 3vw;
  position: relative;
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
  gap: 5vw;
  margin-top: 2vw;
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 0.5vw;
  background-image: url(@/assets/imgs/paper.jpg);
  box-shadow: 0 0 0.5vw;
}

.stats button{
  height: 0.2vw;
  margin-top: 0;
}

.stats p{
  margin-top: 0;
}

.morale{
  margin-top: 0vw;
  display: flex;
  align-items: center;
  justify-content: center;

}

.action{
  max-width: 12vw;
  --width: 12;
}

.button_right{
  margin: 1vw;
}

@media (max-width: 770px) {

  .ready_undo{
    gap: 2vmin;
  }

  #oponnetn_morale img{
    height: 4vmin;
    width: auto;
  }


  .table_thrown_cards{
    width: 100%;
    max-width: 20vmin;
    position: relative;
  }


  #clash{
    height: 90vh;
  }

  #profile{
    width: 90vw;
    height: 50vmin;
    gap: 10vmin;
    margin-top: 2vmin;
  }

  #clash_hand{
    width: 50vw;
    margin-top: -12.5vmin;
  }

  .stats{
    width: 50vw;
    height: 20vmin;
    border-radius: 0.5vmin;
    box-shadow: 0 0 0.5vmin;
  }

  .stats button{
    font-size: 3vmin;
  }

  .morale p{
    font-size: 5vmin;
  }

  #oponnent_cards, #thrown_cards{
  width: 74vw;
  height: 30vmin;
  border: 0.2vw  inset rgba(255, 255, 255, 0.377);
  border-radius: 1vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2.5vw inset;
  padding-left: 6vw;
  padding-right: 6vw;
}

.thrown_card, .oponnent_thrown_card{
  margin-top: -14vw;
}

}

</style>