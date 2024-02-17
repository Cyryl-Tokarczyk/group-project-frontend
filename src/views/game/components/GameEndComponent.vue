<script setup>
import { useGameStateStore } from "@/stores/gameState";

const props = defineProps([
  'message'
])

const gameStateStore = useGameStateStore()

</script>

<template>
  <div>
    <div v-if="props.message['winner'] == gameStateStore.playerType">
      <h1>You win!</h1>
    </div>
    <div v-if="props.message['winner'] == gameStateStore.opponentType">
      <h1>You lose!</h1>
    </div>
    <div v-if="props.message['after_surrender']">
      <h2>By surrender</h2>
    </div>
  </div>
</template>

<style>

</style>