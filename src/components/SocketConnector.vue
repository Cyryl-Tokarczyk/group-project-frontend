<script setup>
import { ref } from 'vue'

const props = defineProps([
    'playerType',
    'gameToken'
])

const socket = ref(null)

const connected = ref(false)

function connectToSocket() {
  if (connected.value) {
    connected.value = !connected.value
  }

  console.log(props.gameToken);

  socket.value = new WebSocket('ws://localhost:8080/api/ws/game/' + props.playerType + '/?token=' + props.gameToken)

  socket.value.onopen = socketConnected
}

function socketConnected() {
  connected.value = true
  
  socket.value.onmessage = (event) => {
    reply.value = JSON.parse(event.data)
  }
}

const reply = ref('') // TO BE DELETED

</script>

<template>
  <div>
  <h3>Connect as a {{ props.playerType }}</h3>
    <div>
      <button @click="connectToSocket">Connect</button>
      <router-link :to="{ name: 'home' }" class="link">Home</router-link>
    </div>
    <p v-if="connected">Connected!</p>
    <p v-else>Wait for the connection...</p>
    <p v-if="connected">Waiting for another player to join...</p>
  </div>
</template>

<style scoped>
.moveinput {
  width: 250px;
  height: 40px;
  text-align: left;
  resize: none;
}
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
  font-size: 35px;
}
button {
  margin: 15px;
}
</style>