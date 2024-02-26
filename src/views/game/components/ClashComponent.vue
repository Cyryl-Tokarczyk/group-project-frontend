<script setup>
import { ref, onMounted, watch } from 'vue';
import { getAppropriateActionState } from "@/lib/ClashState.js";
import { useGameStateStore } from "@/stores/gameState";

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

function dynamicMargin(type) {
  var CardNumber = 0;
  if (type == 'action') {
    CardNumber = gameStateStore.actionCards.length;
  } else {
    CardNumber = gameStateStore.reactionCards.length;
  }
  return `calc(40% / ${CardNumber} - 2.5vw)`;
}

watch(
  props.opponentMove,
  () => {
    // Implement clash logic
  }
)

onMounted(() => {
  clashState.value = getAppropriateActionState(props.firstPlayer)
  // const storedShopActionCardNumbers = JSON.parse(localStorage.getItem('shopActionCardNumbers'));
  // const storedHandActionCardNumbers = JSON.parse(localStorage.getItem('handActionCardNumbers'));
  // const storedShopReactionCardNumbers = JSON.parse(localStorage.getItem('shopReactionCardNumbers'));
  // const storedHandReactionCardNumbers = JSON.parse(localStorage.getItem('handReactionCardNumbers'));
  // const storedPlayerCredits = JSON.parse(localStorage.getItem('playerCredits'));
  // const storedPlayerMorale = JSON.parse(localStorage.getItem('playerMorale'));



})

</script>

<template>
  <div id="clash">
    <div id="oponnent_cards">
      <div v-for="(card, index) in handActionCardNumbers"
        @click="displayActionCardsModal(card)"
        @mouseover="displayCardModal(card)" @mouseleave="hideCardModal"
        :key="index" class="action_card_hand"
        :style="{ backgroundColor: card.img, marginRight: dynamicMargin('action'), marginLeft: dynamicMargin('action') }">
        <p>{{ card.number }}</p>
      </div>
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
            :key="index" class="reaction_card_hand scale"
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



</style>