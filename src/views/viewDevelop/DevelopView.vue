<script setup>
import { ref } from "vue";
import ClashComponent from './components/ClashComponent.vue'

const firstPlayer = ref('student')
const opponentMove = ref('cos')
</script>

<template>
  <div id="develop">
    <ClashComponent :firstPlayer="firstPlayer" :opponentMove="opponentMove"></ClashComponent>
  </div>
</template>

<style>

#develop {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>