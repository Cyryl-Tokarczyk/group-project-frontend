<script setup>
import { ref, onMounted } from 'vue';

const storeActionCardNumbers = ref([]);
const storeReactionCardNumbers = ref([]);
const handActionCardNumbers = ref([]);
const handReactionCardNumbers = ref([]);
const playerCredits = ref(1000);
const playerMorale = ref(100);

const props = defineProps([
  'message'
])

// const emit = defineEmits([
//   'choice-made'
// ])

function saveToLocalStorage(){
  localStorage.setItem('storeActionCardNumbers', JSON.stringify(storeActionCardNumbers.value));
  localStorage.setItem('handActionCardNumbers', JSON.stringify(handActionCardNumbers.value));
  localStorage.setItem('storeReactionCardNumbers', JSON.stringify(storeReactionCardNumbers.value));
  localStorage.setItem('handReactionCardNumbers', JSON.stringify(handReactionCardNumbers.value));
  localStorage.setItem('playerCredits', JSON.stringify(playerCredits.value));
  localStorage.setItem('playerMorale', JSON.stringify(playerMorale.value));
}

function generateCardNumbers(){
  for (let i = 0; i < 3; i++) {
    const action_card = {
      number: Math.floor(Math.random() * 11),
      cost: Math.floor(Math.random() * 30),
      img: 'rgb(100,100,200)',
    };
    const reaction_card = {
      number: Math.floor(Math.random() * 11),
      cost: Math.floor(Math.random() * 30),
      img: 'rgb(200,100,100)',
    };
    storeActionCardNumbers.value.push(action_card);
    storeReactionCardNumbers.value.push(reaction_card);
  }
}

function generateActionCardNumbers(){
  const action_card = {
      number: Math.floor(Math.random() * 11),
      cost: Math.floor(Math.random() * 30),
      img: 'rgb(100,100,200)',
    };
    storeActionCardNumbers.value.push(action_card);
}

function dynamicMargin(type) {
      var CardNumber = 0;
      if (type == 'action'){
        CardNumber = handActionCardNumbers.value.length;
      }else{
        CardNumber = handReactionCardNumbers.value.length;
      }
      return `calc(40% / ${CardNumber} - 2.5vw)`;
    }

function generateReactionCardNumbers(){
  const reaction_card = {
      number: Math.floor(Math.random() * 11),
      cost: Math.floor(Math.random() * 30),
      img: 'rgb(200,100,100)',
    };
    storeReactionCardNumbers.value.push(reaction_card);
}

function moveToActionHand(index){
  const clickedCard = storeActionCardNumbers.value[index];
  if (playerCredits.value >= clickedCard.cost) {
    storeActionCardNumbers.value.splice(index, 1);
    handActionCardNumbers.value.push(clickedCard);
    playerCredits.value = playerCredits.value - clickedCard.cost;
    generateActionCardNumbers();
    saveToLocalStorage();
    //emit('choice-made',index)
  } else {
    alert('Nie masz wystarczająco kredytów!');
  }
}

function moveToReactionHand(index){
  const clickedCard = storeReactionCardNumbers.value[index];
  if (playerCredits.value >= clickedCard.cost) {
    storeReactionCardNumbers.value.splice(index, 1);
    handReactionCardNumbers.value.push(clickedCard);
    playerCredits.value = playerCredits.value - clickedCard.cost;
    generateReactionCardNumbers();
    saveToLocalStorage();
    //emit('choice-made',index)
  } else {
    alert('Nie masz wystarczająco kredytów!');
  }
}

function resetStore(){
  storeActionCardNumbers.value = [];
  handActionCardNumbers.value = [];
  storeReactionCardNumbers.value = [];
  handReactionCardNumbers.value = [];
  playerCredits.value = 1000;
  playerMorale.value = 100;
  generateCardNumbers();
  saveToLocalStorage();
}

onMounted(() => {
  const storedStoreActionCardNumbers = JSON.parse(localStorage.getItem('storeActionCardNumbers'));
  const storedHandActionCardNumbers = JSON.parse(localStorage.getItem('handActionCardNumbers'));
  const storedStoreReactionCardNumbers = JSON.parse(localStorage.getItem('storeReactionCardNumbers'));
  const storedHandReactionCardNumbers = JSON.parse(localStorage.getItem('handReactionCardNumbers'));
  const storedPlayerCredits = JSON.parse(localStorage.getItem('playerCredits'));
  const storedPlayerMorale = JSON.parse(localStorage.getItem('playerMorale'));
  if (storedStoreActionCardNumbers && storedHandActionCardNumbers && storedStoreReactionCardNumbers && storedHandReactionCardNumbers) {
    storeActionCardNumbers.value = storedStoreActionCardNumbers;
    handActionCardNumbers.value = storedHandActionCardNumbers;
    storeReactionCardNumbers.value = storedStoreReactionCardNumbers;
    handReactionCardNumbers.value = storedHandReactionCardNumbers;
    playerCredits.value = storedPlayerCredits;
    playerMorale.value = storedPlayerMorale;
  } else {
    playerCredits.value = 1000;
    generateCardNumbers();
    saveToLocalStorage();
  }
})


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

</script>

<template>
  <div id="event">
    <button class="db" @click="resetStore()">HUB </button>
    <div id="shop">
      <div id="action_shop">
        <div v-for="(card, index) in storeActionCardNumbers" :key="index" class="choice_type type1" :style="{ backgroundColor: card.img }" @click="moveToActionHand(index)">
          <p>{{ card.number }}</p>
          <p>Cost: {{ card.cost }}</p>
        </div>
      </div>
      <div id="reaction_shop">
        <div v-for="(card, index) in storeReactionCardNumbers" :key="index" class="choice_type type2" :style="{ backgroundColor: card.img }" @click="moveToReactionHand(index)">
          <p>{{ card.number }}</p>
          <p>Cost: {{ card.cost }}</p>
        </div>
      </div>
    </div>
    
    <p>{{ JSON.stringify(props.message) }}</p>
    <div id="user_part">
      <div class="info">
        <p>Morale</p>
        {{ playerMorale }}
        <p>Credits</p>
        {{ playerCredits }}
        <button>READY</button>
      </div>
      <div id="hand">
        <div id="hand_action">
          <div v-for="(card, index) in handActionCardNumbers"
            @click="displayActionCardsModal(card)"
            @mouseover="displayCardModal(card)" @mouseleave="hideCardModal"
            :key="index" class="action_card_hand"
            :style="{ backgroundColor: card.img, marginRight: dynamicMargin('action'), marginLeft: dynamicMargin('action') }">
            <p>{{ card.number }}</p>
          </div>
        </div>
        <div id="hand_reaction">
          <div v-for="(card, index) in handReactionCardNumbers"
            @click="displayReactionCardsModal(card)"
            @mouseover="displayCardModal(card)" @mouseleave="hideCardModal"
            :key="index" class="reaction_card_hand"
            :style="{ backgroundColor: card.img, marginRight: dynamicMargin('reaction'), marginLeft: dynamicMargin('reaction') }">
            <p>{{ card.number }}</p>
          </div>
        </div>
      </div>
      <div class="card_dis">
      </div>
      <div v-if="showCardModal">
        <div class="modal-content" :style="{ backgroundColor: modalCardData.img}">
          <p>{{ modalCardData.number }}</p>
          <p>Description:</p>
          <p>{{ modalCardData.cost }}</p>
        </div>
      </div>
      
      <div v-if="showActionCards" class="actionAllCard" @click="hideActionCardsModal()">
        <h1 class="h1_all_cards">Action cards</h1>
        <div class="all_cards">
          <div v-for="(card, index) in handActionCardNumbers" :key="index" class="action_card_all" :style="{ backgroundColor: card.img}">
            <p>{{ card.number }}</p>
            <p>Description:</p>
          <p>{{ card.cost }}</p>
          </div>
        </div>
      </div>

      <div v-if="showReactionCards" class="reactionAllCard" @click="hideReactionCardsModal()">        
        <h1 class="h1_all_cards">Reaction cards</h1>
        <div class="all_cards">
          <div v-for="(card, index) in handReactionCardNumbers" :key="index" class="reaction_card_all" :style="{ backgroundColor: card.img}">
            <p>{{ card.number }}</p>
            <p>Description:</p>
          <p>{{ card.cost }}</p>
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
  width: 1vw;
}
     
::-webkit-scrollbar-track {
background: rgba(99, 78, 39, 0.788);
border-radius: 2vw;
box-shadow: 0px 0px 10px inset;
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
  box-shadow: rgb(87, 87, 87) 0px 0px 15px;
  font-size: 3vw;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 85%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 999;
  height: 14vw;
  width: 9vw;
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
  border-radius: 15px;
}


#hand{
  border: 1px solid black;
  width: 40%;
  height: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5%;
  margin-left: 10px;
  margin-right: 10px;
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

#event{
  background-image: url(@/assets/imgs/table.jpg);
  background-size: 400px;
  width: 100vw;
  height: 50vw;
  box-shadow: 0px 0px 20px;
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
  border-radius: 5px;
  box-shadow: rgb(87, 87, 87) 0px 0px 15px;
  font-size: 3vw;
  transition: 0.25s;
  cursor: pointer;
}

#action_shop, #reaction_shop{
  border: 2px solid black;
  width:45%;
  height: 19vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

#reaction_shop{
  margin-left: 10%;
}

.choice_type{
  height: 15vw;
  width: 10vw;
  border-radius: 5%;
  box-shadow: rgb(87, 87, 87) 0px 0px 15px;
  font-size: 3vw;
  transition: 0.5s;
  margin: 0px;
  margin-right: 1vw;
  margin-left: 1vw;
}

.type1:hover{
  animation: zoomInOut1 0.7s;
  box-shadow: rgb(0, 0, 0) 0px 0px 20px;
}

.type2:hover{
  animation: zoomInOut2 0.7s;
  box-shadow: rgb(0, 0, 0) 0px 0px 20px;
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