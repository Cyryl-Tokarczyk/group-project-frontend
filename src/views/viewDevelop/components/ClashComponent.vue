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
  if (CardNumber < 7) return `0.2vw`
  return `calc(40% / ${CardNumber} - 2.5vw)`
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
  // const storedShopActionCardNumbers = JSON.parse(localStorage.getItem('shopActionCardNumbers'));
  // const storedHandActionCardNumbers = JSON.parse(localStorage.getItem('handActionCardNumbers'));
  // const storedShopReactionCardNumbers = JSON.parse(localStorage.getItem('shopReactionCardNumbers'));
  // const storedHandReactionCardNumbers = JSON.parse(localStorage.getItem('handReactionCardNumbers'));
  // const storedPlayerCredits = JSON.parse(localStorage.getItem('playerCredits'));
  // const storedPlayerMorale = JSON.parse(localStorage.getItem('playerMorale'));
  opponentCards.value = gameStateStore.opRactionCards
})

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

    <div id="thrown_cards">
      <div v-for="(card, index) in myCards"
        :key="index" class="table_cards"
        :style="{ backgroundColor: card.color, marginRight: dynamicMargin('action'), marginLeft: dynamicMargin('action') }">
        <p>{{ card.id }}</p>
        <p>{{ card.des }}</p>
      </div>
    </div>

    <div id="profile">
      <div class="stats">
        <p>Morale {{ gameStateStore.playersMorale }}</p>
        <p>Credits {{ gameStateStore.money }}</p>
      </div>
      <div id="clash_hand">
        <div id="my_hand">
          <div v-for="(card, index) in (clashState == ClashState.MyAction ? gameStateStore.actionCards : gameStateStore.reactionCards)"
            :key="index" class="hand_cards dragable"
            :style="{ backgroundColor: card.color, marginRight: dynamicMargin('action'), marginLeft: dynamicMargin('action') }">
            <p>{{ card.id }}</p>
            <p>{{ card.des }}</p>
          </div>
        </div>
      </div> 
      <div class="stats">
        <button>READY</button> 
      </div>
    </div>
  </div>
</template>

<style>

.scale:hover{
  transform: scale(1.5) translateY(-1vw);
}

.table_cards, .hand_cards{
  border: 1px solid black;
  width: 8vw;
  height: 11vw;
  align-items: center;
  border-radius: 5%;
}

.hand_cards{
  transform: scale(0.8);
}

#profile{
  border: 1px solid black;
  width: 90%;
  height: 10vw;
  display: flex;
  align-items: center;
  border-radius: 5%;
  margin-left: 10px;
  margin-right: 10px;
}

#clash_hand{
  border: 1px solid rgb(0, 0, 0);
  width: 45%;
  height: 10vw;
  display: flex;
  align-items: center;
  border-radius: 5%;
  margin-left: 10px;
  margin-right: 10px;
}

.stats{
  width: 25.5%
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

#my_hand{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>