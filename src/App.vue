<script setup>
import { ref } from 'vue';
import LoginPrompt from './components/LoginPrompt.vue'
import ServerAsker from './components/ServerAsker.vue'

const isLoggedIn = ref(false)
const tokens = ref(null)

function loggedIn(t) {
  isLoggedIn.value = true
  tokens.value = t

  console.log(tokens.value['access']);
  console.log(tokens.value['refresh']);
}

</script>

<template>
  <LoginPrompt v-if="!isLoggedIn" @logged-in="loggedIn" />
  <ServerAsker v-else :tokens="tokens" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
