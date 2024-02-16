<script setup>
import { ref, onMounted, watch } from 'vue';
import { getAppropriateActionState } from "@/lib/ClashState.js";
import { useGameStateStore } from "@/stores/gameState";

const props = defineProps([
  'firstPlayer',
  'opponentMove'
])

// const emit = defineEmits([
//   'choice-made'
// ])

const clashState = ref(null)
const gameStateStore = useGameStateStore()

watch(
  props.opponentMove,
  () => {
    // Implement clash logic
  }
)

onMounted(() => {
  clashState.value = getAppropriateActionState(props.firstPlayer)
})

</script>

<template>
  <div id="debug">
    <button class="de">phase</button>
    <button class="de">opponent</button>
    <h2>Clash</h2>
    <p>{{ JSON.stringify(props.message) }}</p>
  </div>
  <div id="clash">
    <div id="oponnent_cards">
    </div>
    <div id="thrown_cards">
    </div>
    <div id="profile">
      <div class="stats">
        <p>Morale</p>
        {{ gameStateStore.playersMorale }}
        <p>Credits</p>
        {{ gameStateStore.money }}
      </div>
      <div id="clash_hand">
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
      <div class="stats">
        <button>READY</button> 
      </div>
    </div>
  </div>
</template>

<style>

#debug{
  display: flex;
  background: rgba(0, 128, 0, 0.349);
  width: 10vw;
  height: 10vw;
  position: absolute;
  top: 0vw;
  left: 0vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  font-size: 0.5vw;
}

.de{
  height: 15%;
  width: 100%;
  font-size: 0.75vw;
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
  border: 1px solid black;
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
}

</style>