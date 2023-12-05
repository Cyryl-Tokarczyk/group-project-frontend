<script setup>
import { ref } from 'vue';
import LoginPrompt from './components/LoginPrompt.vue'
import ServerAsker from './components/ServerAsker.vue'

const loggedIn = ref(false)

</script>

<template>
  <LoginPrompt v-if="!loggedIn" @logged-in="loggedIn = true" />
  <ServerAsker v-else />
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
