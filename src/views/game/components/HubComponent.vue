<script setup>
import { ref, onMounted } from 'vue';
import { useGameStateStore } from "@/stores/gameState";
import { unpackReactionCards } from "@/lib/CardsHandling";

const props = defineProps([
  'message'
])

const emit = defineEmits([
  'purchase-made',
  'ready'
])

const gameStateStore = useGameStateStore()

const readyButton = ref(null)

const shopActionCardNumbers = ref([]);
const shopReactionCardNumbers = ref([]);
const ready_button = ref(null);

onMounted(() => {
  console.log('I am mounted! [HubComponent]')

  if (props.message['action_cards']) {
    shopActionCardNumbers.value = props.message['action_cards']
    console.log("Action cards " + JSON.stringify(shopActionCardNumbers.value))
  }

  // Read reaction cards provided by the server
  if (props.message['reaction_cards']) {
    shopReactionCardNumbers.value = unpackReactionCards(props.message['reaction_cards'])
  }
})

function readyClicked() {
  readyButton.value.style.color = "red"

  emit('ready')
}

function moveToActionHand(card, index) {

  if (gameStateStore.money >= card.price) {
    console.log("Card chosen: " + JSON.stringify(card));
    shopActionCardNumbers.value.splice(index, 1); // Remove the card from shop
    console.log("Action cards " + JSON.stringify(shopActionCardNumbers.value))
    gameStateStore.actionCards.push(card);
    gameStateStore.money -= card.price;

    const cardsBought = {
      action_cards: [ card.id ],
      reaction_cards: []
    }
    emit('purchase-made', cardsBought)
  } else {
    alert("You don't have enough credits!");
  }
}

function moveToReactionHand(card, index){

  if (gameStateStore.money >= card.price) {
    shopReactionCardNumbers.value.splice(index, 1);
    gameStateStore.reactionCards.push(card);
    gameStateStore.money -= card.price;

    const cardsBought = {
      action_cards: [],
      reaction_cards: [ {
        id: card.id,
        amount: 1
      } ]
    }
    emit('purchase-made', cardsBought)
  } else {
    alert("You don't have enough credits!");
  }
}

const showCardModal = ref(false);
const modalCardData = ref(null);

function displayCardModal(card){
  modalCardData.value = card;
  showCardModal.value = true;
}

function hideCardModal(){
  showCardModal.value = false;
}

const showActionCards = ref(false);

function displayActionCardsModal(){
  showActionCards.value = true;
}

function hideActionCardsModal(){
  showActionCards.value = false;
}

const showReactionCards = ref(false);

function displayReactionCardsModal(){
  showReactionCards.value = true;
}

function hideReactionCardsModal(){
  showReactionCards.value = false;
}

function ready_clicked(){
  ready_button.value.classList.add('red_color');
  emit('ready');
}

</script>

<template>
  <div id="event">
    <button class="db">HUB</button>
    <div id="shop">
      <div id="action_shop">
        <div id="action_shop_layout">
          <div v-for="(card, index) in shopActionCardNumbers" :key="index" class="choice_type type1 dynamic_position" 
          :style="{ backgroundColor: 'rgb(235,53,25)', '--order': index + 1, '--quantity': shopActionCardNumbers.length + 1}"
          @click="moveToActionHand(card, index)" @mouseover="displayCardModal(card)" @mouseleave="hideCardModal">
            <h2>{{ card.name }}</h2>
            <h3>Price: {{ card.price }}</h3>
            <h3>Description</h3>
            <p>{{ card.description }}</p>
          </div>
        </div>  
      </div>
      <div id="reaction_shop">
        <div id="reaction_shop_layout">
          <div v-for="(card, index) in shopReactionCardNumbers" :key="index" class="choice_type type2 dynamic_position" 
          :style="{ backgroundColor: 'rgb(35,35,225)', '--order': index + 1, '--quantity': shopReactionCardNumbers.length + 1}" 
          @click="moveToReactionHand(card, index)" @mouseover="displayCardModal(card)" @mouseleave="hideCardModal" >
            <h2>{{ card.name }}</h2>
            <h3>Price: {{ card.price }}</h3>
            <h3>Description</h3>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div id="user_part">
      <div class="info">
        <p>Morale</p>
        {{ gameStateStore.playersMorale }}
        <p>Money</p>
        {{ gameStateStore.money }}
        <button @click="ready_clicked" ref="ready_button">READY</button>
      </div>
      <div id="hand">
        <div id="hand_action">
          <div id="hand_action_layout">
            <div v-for="(card, index) in gameStateStore.actionCards"
              @click="displayActionCardsModal(card)"
              @mouseover="displayCardModal(card)" @mouseleave="hideCardModal"
              :key="index" class="action_card_hand dynamic_position"
              :style="{ backgroundColor: 'rgb(235,53,25)', '--order': index + 1, '--quantity': gameStateStore.actionCards.length + 1}">
              <p>{{ card.name }}</p>
            </div>
          </div>
        </div>
        <div id="hand_reaction">
          <div id="hand_reaction_layout">
            <div v-for="(card, index) in gameStateStore.reactionCards"
              @click="displayReactionCardsModal(card)"
              @mouseover="displayCardModal(card)" @mouseleave="hideCardModal"
              :key="index" class="reaction_card_hand dynamic_position"
              :style="{ backgroundColor: 'rgb(35,35,225)', '--order': index + 1, '--quantity': gameStateStore.reactionCards.length + 1}">
              <p>{{ card.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card_dis">
      </div>
      <div v-if="showCardModal">
        <div class="modal_content" :style="{ backgroundColor: ((gameStateStore.actionCards.includes(modalCardData) || shopActionCardNumbers.includes(modalCardData)) ? 'rgb(235,53,25)' : 'rgb(35,35,225)') }">
          <h2>{{ modalCardData.name }}</h2>
            <h3>Price: {{ modalCardData.price }}</h3>
            <h3>Description</h3>
            <p>{{ modalCardData.description }}</p>
        </div>
      </div>
      
      <div v-if="showActionCards" class="actionAllCard" @click="hideActionCardsModal()">
        <h1 class="h1_all_cards">Action cards</h1>
        <div class="all_cards">
          <div v-for="(card, index) in gameStateStore.actionCards" :key="index" class="action_card_all" 
          :style="{ backgroundColor: 'rgb(235,53,25)'}">
            <p>{{ card.number }}</p>
            <p>Description:</p>
            <p>{{ card.price }}</p>
          </div>
        </div>
      </div>

      <div v-if="showReactionCards" class="reactionAllCard" @click="hideReactionCardsModal()">        
        <h1 class="h1_all_cards">Reaction cards</h1>
        <div class="all_cards">
          <div v-for="(card, index) in gameStateStore.reactionCards" :key="index" class="reaction_card_all" :style="{ backgroundColor: 'rgb(35,53,225)' }">
            <p>{{ card.number }}</p>
            <p>Description:</p>
            <p>{{ card.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
button:hover{
  color: rgb(138, 35, 35);
}

.h1_all_cards{
  color: #ffffff;
  font-size: 6vw;
  margin-bottom: -1vw;
}

.actionAllCard, .reactionAllCard{
  position: fixed;
  top: -15vh;
  left: -10vw;
  width: 120vw;
  height: 120vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.all_cards{
  display: grid;
  grid-auto-flow: column;
  scroll-behavior: auto;
  width: 90vw;
  height: 19vw;
  gap: 1vw;
  overflow-y: auto;
  overscroll-behavior-inline: contain;
}

::-webkit-scrollbar {
  width: 0.6vw;
}
     
::-webkit-scrollbar-track {
background: rgba(77, 64, 39, 0.551);
border-radius: 0.2vw;
box-shadow: 0 0 0.1vw inset;
}
     
::-webkit-scrollbar-thumb {
  background: rgba(182, 168, 129, 0.747);
  border-radius: 2vw; 
}

.action_card_all, .reaction_card_all{
  scroll-snap-align: start;
  height: 16vw;
  width: 11vw;
  min-width: 5vw;
  border-radius: 1vw;
  box-shadow: rgb(87, 87, 87) 0 0 1.5vw;
  font-size: 3vw;
}

.modal_content {
  position: absolute;
  top: 50%;
  left: 85%;
  transform: translate(-50%, -50%);
  padding: 0;
  border-radius: 0.8vw;
  box-shadow: 0 0 0.2vw rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 999;
  height: 14vw;
  width: 9vw;
  font-size: 1vw;
}

.modal_content h2{
  margin-bottom: 0;
  margin-top: 0;
}

.modal_content h3{
  margin-bottom: 0;
  margin-top: 0.5vw;
}

.modal_content p{
  text-align: justify;
  font-size: 1vw;
}

.db {
  position: absolute;
  margin-top: -40vw;
}

.info{
  width: 30%;
  height: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(@/assets/imgs/paper.jpg);
}

.card_dis{
  width: 30%;
  height: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(126, 126, 126, 0.322);
  border-radius: 1.5vw;
}


#hand{
  border: 0.1vw solid black;
  width: 40%;
  height: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5%;
  margin-left: 0.1vw;
  margin-right: 0.1vw;
}

#user_part{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 23vw;
  margin-top: 25vw;
}

#event, #clash, #teacher_end, #student_end{
  background-image: url(@/assets/imgs/table.jpg);
  background-size: 40vw;
  width: 100vw;
  height: 50vw;
  box-shadow: 0 0 2vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#choices{
  width: 40vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#shop{
  position: absolute;
  display: flex;
  width: 90%;
  margin-top: -20vw;
}

#hand_action, #hand_reaction{
  --width: 38;
  position: absolute;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  width: 38%;
  margin-top: 2vw;
}

#hand_reaction{
  margin-top: 11vw;
}

.action_card_hand, .reaction_card_hand{
  height: 7vw;
  width: 5vw;
  min-width: 5vw;
  border-radius: 0.3vw;
  box-shadow: rgb(87, 87, 87) 0 0 1.5vw;
  font-size: 1vw;
  transition: 0.25s;
  cursor: pointer;
  --card-width: 5;
  z-index: 1;
}

.action_card_hand p,.reaction_card_hand p{
  font-size: 1vw;
}

#action_shop, #reaction_shop{
  border: 0.2vw solid black;
  width:45%;
  height: 19vw;
  position: relative;
  border-radius: 1vw;
  --width: 38;
}

#hand_action_layout, #hand_reaction_layout{
  width:90%;
  margin-left: 1vw;
  position: relative;
  --width: 30;
}

#reaction_shop_layout, #action_shop_layout{
  width:90%;
  margin-top: 1.5vw;
  margin-left: 5vw;
  position: relative;
  --width: 30;
}

#reaction_shop{
  margin-left: 10%;
}

.choice_type{
  height: 15vw;
  width: 10vw;
  border-radius: 5%;
  box-shadow: rgb(87, 87, 87) 0 0 1.5vw;
  font-size: 3vw;
  transition: 0.5s;
  --card-width: 10;
  font-size: 1vw;
  z-index: 1;
}

.red_color{
  color: brown;
}

.choice_type h2{
  margin-bottom: 0;
  margin-top: 0;
}

.choice_type h3{
  margin-bottom: 0;
  margin-top: 0.5vw;
}

.choice_type p{
  text-align: justify;
  font-size: 1vw;
}

.type1:hover{
  animation: zoomInOut1 0.7s;
  box-shadow: rgb(0, 0, 0) 0 0 2vw;
}

.type2:hover{
  animation: zoomInOut2 0.7s;
  box-shadow: rgb(0, 0, 0) 0 0 2vw;
}

@keyframes zoomInOut1 {
  0% {
    transform: scale(1); /* Początkowy rozmiar elementu */
  }
  50% {
    transform: scale(1.3) rotateZ(-10deg); /* Powiększenie do 120% */
  }
  100% {
    transform: scale(1); /* Powrót do początkowego rozmiaru */
  }
}

@keyframes zoomInOut2 {
  0% {
    transform: scale(1); /* Początkowy rozmiar elementu */
  }
  50% {
    transform: scale(1.2) rotateZ(10deg); /* Powiększenie do 120% */
  }
  100% {
    transform: scale(1); /* Powrót do początkowego rozmiaru */
  }
}

</style>