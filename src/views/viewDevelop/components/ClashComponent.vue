<script setup>
import { ref, onMounted, watch } from 'vue'
import { ClashState, getAppropriateActionState } from "@/lib/ClashState.js"
import { useGameStateStore } from "@/stores/gameStateDev"
import { unpackReactionCards } from "@/lib/CardsHandling.js";

const props = defineProps([
  'firstPlayer',
  'opponentMove'
])

// const emit = defineEmits([
//   'action-move',
//   'reaction-move'
// ])

const clashState = ref(null)
const gameStateStore = useGameStateStore()
const opponentCards = ref([])
const myCards = ref([])

function dynamicMargin(type) {
  var CardNumber = 0
  if (type == 'action') {
    CardNumber = gameStateStore.actionCards.length
  } else {
    CardNumber = gameStateStore.reactionCards.length
  }
  if (CardNumber < 6) return 0
  return `calc(50vw / ${CardNumber} - 4.3vw)`
}

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
  clashState.value = getAppropriateActionState(props.firstPlayer, gameStateStore.playerType)
  //const myActionPosition = dynamicWidth(gameStateStore.actionCards.length);
  // const storedShopActionCardNumbers = JSON.parse(localStorage.getItem('shopActionCardNumbers'));
  // const storedHandActionCardNumbers = JSON.parse(localStorage.getItem('handActionCardNumbers'));
  // const storedShopReactionCardNumbers = JSON.parse(localStorage.getItem('shopReactionCardNumbers'));
  // const storedHandReactionCardNumbers = JSON.parse(localStorage.getItem('handReactionCardNumbers'));
  // const storedPlayerCredits = JSON.parse(localStorage.getItem('playerCredits'));
  // const storedPlayerMorale = JSON.parse(localStorage.getItem('playerMorale'));
  opponentCards.value = gameStateStore.opRactionCards
  
  table.value.addEventListener("mouseover", handleMouseEnter);
  table.value.addEventListener("mouseleave", handleMouseLeave);
})




function startDrag(event, index, hoverCard){
  isCardHold.value = true
  const card = event.target;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  document.onmousemove = elementDrag;
  document.onmouseup = stopDrag;
  document.body.style.userSelect = 'none';
  const ot = card.offsetTop
  const ol = card.offsetLeft
  const margin = card.style.marginRight
  card.style.marginRight = '0'
  card.style.marginLeft = '0'
  card.style.position = `absolute`
  card.style.zIndex  = `100`
  card.style.transition = '0s'
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
    card.style.position = ``
    card.style.pointerEvents = 'auto';
    card.style.transform = ''
    card.style.transition = '0.2s'
    document.body.style.userSelect = '';
    card.style.zIndex  = `1`
    document.onmousemove = null;
    document.onmouseup = null;
    card.style.marginRight = margin
    card.style.marginLeft = margin
    isCardHold.value = false
    if(isTableHovered.value){
      if(clashState.value == ClashState.MyAction){
        gameStateStore.actionCards.splice(index, 1);
      } else {
        gameStateStore.reactionCards.splice(index, 1);
      }
      myCards.value.push(hoverCard);
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
    modal.value.style.left = card.offsetLeft + 'px';
    modal.value.style.top = card.offsetTop + 'px';
  }
}

function cardReset(e) {
  showModal.value = false
  const card = e.target;
  card.onmousemove = null
  if(isCardHold.value==false){
    card.style.transform = ''
  }
  card.style.opacity = '100%'
}

</script>

<template>
  <div id="clash">
    <div id="oponnent_cards">
      <div v-for="(card, index) in opponentCards"
        :key="index" class="table_cards"
        :style="{ backgroundColor: card.color, marginRight: dynamicMargin('action'), marginLeft: dynamicMargin('action') }">
        <p>{{ card.id }}</p>
        <p>{{ card.des }}</p>
      </div>
    </div>

    <div id="thrown_cards" ref="table">
      <div v-for="(card, index) in myCards"
        :key="index" class="table_cards"
        :style="{ backgroundColor: card.color, marginRight: dynamicMargin('action'), marginLeft: dynamicMargin('action')}">
        {{ card.id }}
        <p></p>
        {{ card.des }}
      </div>
    </div>

    <div id="profile">
      <div class="stats">
        <p>Morale {{ gameStateStore.playersMorale }}</p>
        <p>Credits {{ gameStateStore.money }}</p>
      </div>
      <div id="clash_hand" ref="hand">
        <div v-for="(card, index) in (clashState == ClashState.MyAction ? gameStateStore.actionCards : gameStateStore.reactionCards)"
          :key="index" class="hand_cards dragable" ref="draggableCards" @mousedown="startDrag($event, index, card)"
          @mouseenter="hoverCard($event, card)" @mouseleave="cardReset($event)"
          :style="{ backgroundColor: card.color, marginRight: dynamicMargin('reaction'), marginLeft: dynamicMargin('reaction') }">
          {{ card.id }}
          <p></p>
          {{ card.des }}
        </div>
      </div> 
      <div class="stats">
        <button>READY</button> 
      </div>
    </div>
    <div v-if="showModal" ref="modal" class="modal_cont" :style="{ backgroundColor: modalCardData.color}">
      {{ modalCardData.id }}
      <p></p>
      {{ modalCardData.des }}
    </div>
  </div>
</template>

<style>

.scale:hover{
  transform: scale(1.5) translateY(-1vw);
}

.table_cards, .hand_cards, .modal_cont{
  border: 1px solid black;
  width: 8vw;
  height: 11vw;
  min-width: 8vw;
  align-items: center;
  border-radius: 5%;
}

.hand_cards, .modal_cont{
  width: 6.4vw;
  height: 8.8vw;
  min-width: 6.4vw;
  transition: 0.2s;
  z-index: 1;
}

.modal_cont{
  position: absolute;
  pointer-events: none;
  opacity: 0;
}

.hand_cards:active {
  cursor: grabbing;
}

#profile{
  border: 1px solid black;
  width: 90vw;
  height: 10vw;
  display: flex;
  align-items: center;
  border-radius:0%;
  margin-left: 10px;
  margin-right: 10px;
}

#clash_hand{
  border: 1px solid rgb(0, 0, 0);
  width: 50vw;
  height: 10vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius:0%;
}

.stats{
  width: 20vw
}

#oponnent_cards, #thrown_cards{
  width: 75%;
  height: 30%;
  border: 1px solid black;
  margin-bottom: 1vw;
  align-items: center;
  display: flex;
  justify-content: center;
}

</style>