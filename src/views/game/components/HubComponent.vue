<script setup>
import { ref, onMounted, computed } from 'vue';
import { useGameStateStore } from "@/stores/gameState";
import { unpackReactionCards } from "@/lib/CardsHandling";
import CardComponent from './CardComponent.vue'
import CardsComponent from './CardsComponent.vue'

const props = defineProps([
  'message'
])

const emit = defineEmits([
  'purchase-made',
  'ready'
])

const gameStateStore = useGameStateStore()

const shopActionCardNumbers = ref([]);
const shopReactionCardNumbers = ref([]);
const ready_button = ref(null);
const windowWidth = ref(window.innerWidth);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const computedSize = computed(() => {
  return windowWidth.value < 770 ? 1.38 : 0.7;
});

const slimView = computed(() => {
  return windowWidth.value < 770 ? true : false;
});

onMounted(() => {
  console.log('I am mounted! [HubComponent]')

  window.addEventListener('resize', updateWindowWidth);

  if (props.message['action_cards']) {
    shopActionCardNumbers.value = props.message['action_cards']
    console.log("Action cards " + JSON.stringify(shopActionCardNumbers.value))
  }

  // Read reaction cards provided by the server
  if (props.message['reaction_cards']) {
    shopReactionCardNumbers.value = unpackReactionCards(props.message['reaction_cards'])
  }
})

// onBeforeUnmount(() => {
//   window.removeEventListener('resize', updateWindowWidth);
// });

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

const handleCardClick = (card, index) => {
  console.log('Kliknięto kartę:', card, 'o indeksie:', index);
};

</script>

<template>
  <div id="event">
    <h1>HUB</h1>
    <div id="shop">
      <div id="action_shop">
        <div id="action_shop_layout">
          <div v-for="(card, index) in shopActionCardNumbers" :key="index"
          @click="moveToActionHand(card, index)" @mouseover="displayCardModal(card)" @mouseleave="hideCardModal">
            <CardComponent :card="card" :index="index" :length="shopActionCardNumbers.length" :size="computedSize" :full="1" :dynamic_position="true" :price="true"/>
          </div>
        </div>  
      </div>
      <div id="reaction_shop">
        <div id="reaction_shop_layout">
          <div v-for="(card, index) in shopReactionCardNumbers" :key="index"
          @click="moveToReactionHand(card, index)" @mouseover="displayCardModal(card)" @mouseleave="hideCardModal" >
          <CardComponent :card="card" :index="index" :length="shopReactionCardNumbers.length" :size="computedSize" :full="true" :dynamic_position="true" :price="true"/>
          </div>
        </div>
      </div>
    </div>

    <div id="user_part">
      <div class="info">
        <div class="morale">
          <img src="@/assets/imgs/morale.png" :alt="'morale image'" class="morale_image">
          {{ gameStateStore.playersMorale }}
        </div>
        <div class="money">
          <img src="@/assets/imgs/coin.png" :alt="'morale image'" class="morale_image">
          {{ gameStateStore.money }}
        </div>
        <button @click="ready_clicked" ref="ready_button">READY</button>
      </div>
      <div id="hand">
        <div id="hand_action">
          <div id="hand_action_layout">
            <div v-for="(card, index) in gameStateStore.actionCards"
              @click="displayActionCardsModal(card)"
              @mouseover="displayCardModal(card)" @mouseleave="hideCardModal" :key="index">
              <CardComponent :card="card" :index="index" :length="gameStateStore.actionCards.length" :size="0.8" :dynamic_position="true"/>
            </div>
          </div>
        </div>
        <div id="hand_reaction">
          <div id="hand_reaction_layout">
            <div v-for="(card, index) in gameStateStore.reactionCards"
              @click="displayReactionCardsModal(card)"
              @mouseover="displayCardModal(card)" @mouseleave="hideCardModal" :key="index">
              <CardComponent :card="card" :index="index" :length="gameStateStore.reactionCards.length" :size="0.8" :dynamic_position="true"/>
            </div>
          </div>
        </div>
      </div>
      <div class="card_dis" v-if="!slimView">
        <div v-if="showCardModal">
          <div class="modal_content">
            <CardComponent :card="modalCardData" :length="1" :size="0.82" :full="true" :price="true"/>
          </div>
        </div>
      </div>
      
      <div v-if="showActionCards" @click="hideActionCardsModal()">
        <CardsComponent :cards_tab="gameStateStore.actionCards" :text="'Action cards'" @card-clicked="handleCardClick"/>
      </div>

      <div v-if="showReactionCards" @click="hideReactionCardsModal()">        
        <CardsComponent :cards_tab="gameStateStore.reactionCards" :text="'Reaction cards'" @card-clicked="handleCardClick"/>
      </div>
    </div>
  </div>
</template>

<style>
.morale{
  display: flex;
  gap: 1vw;
}

.morale_image{
  width: 2vw;
  height: auto;
}

.modal_content{
  margin-top: 0.5vw;
}

button:hover{
  color: rgb(138, 35, 35);
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
  margin-top: 0.5vw;
}

#hand_reaction{
  margin-top: 10.5vw;
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

.red_color{
  color: brown;
}

#event h1{
  font-size: 10vmin;
}

@media (max-width: 770px) {
  #event h1{
    font-size: 10vmin;
  }

  #event{
    width: 100vw;
    height: 90vh;
  }

  .info{
    position: relative;
    width: 50vmin;
    height: 30vmin;
    font-size: 4vmin;
    align-items: center;
    justify-content: center;
  }

  .info p, .info button{
    font-size: 4vmin;
  }

  .morale_image{
    width: 5vw;
    height: auto;
  }

  #shop{
    display: flex;
    height: 70vmin;
    width: 90vmin;
    flex-direction: column;
    position: relative;
    margin: 0;
  }

  #user_part{
    display: flex;
    height: 90vmin;
    width: 90vmin;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5vmin;
  }

  #action_shop, #reaction_shop{
    width: 90vmin;
    height: 35vmin;
    position: relative;
    border-radius: 1vw;
  }

  #reaction_shop{
    margin-left: 0;
  }

  #reaction_shop_layout, #action_shop_layout{
    --width: 75;
    margin-left: 7.5vmin;
  }

  #hand{
    width: 80vmin;
    height: 40vmin;
    margin-top: 5vmin;
    margin-bottom: 5vmin;
  }

    #hand_action, #hand_reaction{
    --width: 75;
    position: absolute;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    width: 38%;
    height: 50%;
    margin-top: 0.5vw;
  }


}

</style>