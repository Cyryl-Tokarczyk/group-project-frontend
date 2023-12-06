<script setup>
import { ref } from 'vue';
import SocketConnector from './SocketConnector.vue'

const props = defineProps([
  'tokens'
])

const playerTypeChosen = ref(false)
const playerType = ref('')

const userURL = 'http://localhost:8000/users/token/'

const gameToken = ref('')

async function choosePlayerType(type) {
  playerTypeChosen.value = true
  playerType.value = type

  gameToken.value = await getGameToken()

  console.log(!playerTypeChosen.value);
}

async function getGameToken() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + gameToken.value },
  }

  await fetch()
}

</script>

<template>
  <div class="server-asker">
    <h2>Ask the server!</h2>
    <div v-if="!playerTypeChosen">
      <h3>Choose your class:</h3>
      <button @click="choosePlayerType('teacher')">Teacher</button>
      <button @click="choosePlayerType('student')">Student</button>
    </div>
    <SocketConnector v-else :playerType=playerType :token=gameToken />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  margin: 15px;
}
</style>
