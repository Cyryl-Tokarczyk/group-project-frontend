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

const move = ref('Type in the move you want to make')

const reply = ref('')

function winMove() {
  const messageData = { 
    type: 'win_move',
    move: move.value
  }

  socket.value.send(JSON.stringify(messageData))
}

function madeMove() {
  const messageData = {
    type: 'made_move',
    move: move.value
  }
  
  socket.value.send(JSON.stringify(messageData))
}

</script>

<template>
  <div>
  <h3>Connect as a {{ props.playerType }}</h3>
    <div>
      <button @click="connectToSocket">Connect</button>
    </div>
    <p v-if="connected">Connected!</p>
    <p v-else>Wait for the connection...</p>
    <div v-if="connected">
      <textarea class="moveinput" v-model="move" ></textarea>
      <div>
        <button @click="winMove"><span></span>Win move</button>
        <button @click="madeMove"><span></span>Made move</button>
      </div>
      <span class="response">
        <h3>Response:</h3>
        <p>{{ reply }}</p>
      </span>
    </div>
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
  color: #42b983;
}
button {
  margin: 15px;
}
</style>