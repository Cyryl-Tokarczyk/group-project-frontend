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
  <div id="nav">
    <div id="ramka">
      <h1>Game title</h1>
    </div>
  </div>
  <LoginPrompt v-if="!isLoggedIn" @logged-in="loggedIn" />
  <ServerAsker v-else :tokens="tokens" />
</template>

<style>
#app {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

html{
  height: 100%;
  box-shadow: 10px 10px 25px inset #0000008f;
}

#nav {
  width: 300px;
  height: 70px;
  margin-top: 25px;
  border: 5px ridge rgb(245, 219, 67);
  background: #e6e6e6;
  box-shadow: 5px 5px 12px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

#ramka {
  width: 100%;
  height: 100%;
  padding: 0px;
  box-shadow: 2px 2px 6px inset #000000;
}

h1{
  margin-top: 7px;
}

@font-face {
  font-family: "DK";
  src: url(fonts/DKLeftoverCrayon.otf) format('truetype');
}

body {
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom, #fbf3ed 90%, #7f593e 90% 90.3%, #482e1a 90.3% 90.6%, #26170a 90.7% 91%,#000000 91%, #d2b48c 91.8% 100%);
  font-family:"DK", Courier, monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 30px;
  text-transform: uppercase;
}

button {
  font-family:'DK', Courier, monospace; 
  font-size: 45px;
  text-transform: uppercase;
}

</style>
