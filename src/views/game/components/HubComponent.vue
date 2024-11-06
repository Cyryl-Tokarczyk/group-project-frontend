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

const showShopActionCards = ref(false)
const showShopReactionCards = ref(false)

function moveToActionHand(card, index, slimViewBuy) {
  if(slimView.value && !slimViewBuy){
    showShopActionCards.value = true
    return
  }

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

function moveToReactionHand(card, index, slimViewBuy){
  if(slimView.value && !slimViewBuy){
    showShopReactionCards.value = true
    return
  }

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
  if(cardBought.value == false){
    showShopActionCards.value = false;
  }
  cardBought.value = false
}

const showReactionCards = ref(false);

function displayReactionCardsModal(){
  showReactionCards.value = true;
}

function hideReactionCardsModal(){
  showReactionCards.value = false;
  if(cardBought.value == false){
    showShopReactionCards.value = false;
  }
  cardBought.value = false
}

function ready_clicked(){
  ready_button.value.classList.add('red_color');
  emit('ready');
}

const handleActionShopCardClick = (card, index) => {
  moveToActionHand(card, index, true)
  cardBought.value = true
  console.log('Kliknięto kartę:', card, 'o indeksie:', index);
};

const handleReactionShopCardClick = (card, index) => {
  moveToReactionHand(card, index, true)
  cardBought.value = true
  console.log('Kliknięto kartę:', card, 'o indeksie:', index);
};

const cardBought = ref(false)

</script>

<template>
  <div id="event">
    <h1>HUB</h1>
    <div id="shop">
      <div id="action_shop">
        <div v-for="(card, index) in shopActionCardNumbers" :key="index" id="action_shop_layout"
        @click="moveToActionHand(card, index, false)" @mouseover="displayCardModal(card)" @mouseleave="hideCardModal">
          <CardComponent :card="card" :index="index" :length="shopActionCardNumbers.length" :size="computedSize" :full="1" :dynamic_position="false" :price="true"/>
        </div>
      </div>
      <div id="reaction_shop">
        <div v-for="(card, index) in shopReactionCardNumbers" :key="index" id="reaction_shop_layout"
        @click="moveToReactionHand(card, index, false)" @mouseover="displayCardModal(card)" @mouseleave="hideCardModal" >
        <CardComponent :card="card" :index="index" :length="shopReactionCardNumbers.length" :size="computedSize" :full="true" :dynamic_position="false" :price="true"/>
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
        <button @click="ready_clicked" ref="ready_button" class="ready_button">READY</button>
      </div>
      <div id="hand">
        <div id="hand_action">
          <div v-for="(card, index) in gameStateStore.actionCards" id="hand_action_layout"
            @click="displayActionCardsModal(card)"
            @mouseover="displayCardModal(card)" @mouseleave="hideCardModal" :key="index">
            <CardComponent :card="card" :index="index" :length="gameStateStore.actionCards.length" :size="computedSize/2" :dynamic_position="false"/>
          </div>
        </div>
        <div id="hand_reaction">
          <div v-for="(card, index) in gameStateStore.reactionCards" id="hand_reaction_layout"
            @click="displayReactionCardsModal(card)"
            @mouseover="displayCardModal(card)" @mouseleave="hideCardModal" :key="index">
            <CardComponent :card="card" :index="index" :length="gameStateStore.reactionCards.length" :size="computedSize/2" :dynamic_position="false"/>
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
        <CardsComponent :cards_tab="gameStateStore.actionCards" :text="'Action cards'"/>
      </div>

      <div v-if="showReactionCards" @click="hideReactionCardsModal()">        
        <CardsComponent :cards_tab="gameStateStore.reactionCards" :text="'Reaction cards'"/>
      </div>

      <div v-if="showShopActionCards" @click="hideActionCardsModal()">
        <CardsComponent :cards_tab="shopActionCardNumbers" :text="'Action cards'" @card-clicked="handleActionShopCardClick"/>
      </div>

      <div v-if="showShopReactionCards" @click="hideReactionCardsModal()">        
        <CardsComponent :cards_tab="shopReactionCardNumbers" :text="'Reaction cards'" @card-clicked="handleReactionShopCardClick"/>
      </div>
    </div>
  </div>
</template>

<style>
.morale{
  display: flex;
  gap: 1vw;
  font-size: 2.5vw;
}

.ready_button{
  font-size: 2.5vw;
  margin-bottom: -1vw;
}

.morale_image{
  width: 3vw;
  height: auto;
}

.money{
  display: flex;
  gap: 1vw;
  font-size: 2.5vw;
}

.modal_content{
  margin-top: 0.5vw;
  position: absolute;
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
  justify-content: center;
  align-items: center;
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
  justify-content: center;
  border-radius: 5%;
  padding-left: 2.5vw;
  padding-right: 2.5vw;
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
  gap: 10vw;
}

#hand_action, #hand_reaction{
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: center;
}

#action_shop, #reaction_shop{
  border: 0.2vw solid black;
  width:45%;
  height: 19vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-left: 7vw;
  padding-right: 7vw;
}

#hand_action_layout, #hand_reaction_layout{
  width: 100%;
  height: 100%;
  max-width: 6vw;
  position: relative;
}

#reaction_shop_layout, #action_shop_layout{
  width: 100%;
  height: 100%;
  max-width: 12.5vw;
  position: relative;
  margin-top: 2vw;
}

.red_color{
  color: brown;
}

#event h1{
  font-size: 3vw;
  margin-top: -42vw;
}

@media (max-width: 770px) {
  #event h1{
    font-size: 10vmin;
    margin-top: 0;
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
    justify-content: center;
    align-items: center;
    gap: 1vmin;
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
    width: 70vmin;
    height: 35vmin;
    border-radius: 1vw;
    padding-left: 10vmin;
    padding-right: 10vmin;
  }

  #reaction_shop{
    margin-left: 0;
  }


  #hand{
    width: 80vmin;
    height: 40vmin;
    margin-top: 5vmin;
    padding-left: 5vmin;
    padding-right: 5vmin;
  }

  #hand_action, #hand_reaction{
    width: 100%;
    height: 100%;
    margin-top: 1.5vmin;
  }

  #hand_action_layout, #hand_reaction_layout{
    width:100%;
    max-width: 12vmin;
  } 

  .morale{
    display: flex;
    gap: 1vw;
    font-size: 5vmin;
  }

  .ready_button{
    font-size: 5vmin;
    margin-bottom: -1vw;
  }

  .morale_image{
    width: 5vmin;
    height: auto;
  }

  .money{
    display: flex;
    gap: 1vw;
    font-size: 5vmin;
  }
}

</style>