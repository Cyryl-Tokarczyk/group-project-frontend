<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
    playerType: String
})

const socket = ref(null)

const reply = ref('')
const token = ref('')
const tokenInput = ref('')
const connected = ref(false)

function winMove() {
  const messageData = { 
    type: 'win_move',
    move: 'Winning move'
  }

  socket.value.send(JSON.stringify(messageData))
}

function madeMove() {
  const messageData = {
    type: 'made_move',
    move: 'Best move possible'
  }
  
  socket.value.send(JSON.stringify(messageData))
}

// admin's token: ca022b89-d2d3-4752-93d0-27d660c96edc
// user's token: e6290006-b5a7-49f8-a499-7005360af809

function connectToSocket() {
  if (connected.value) {
    connected.value = !connected.value
  }
  token.value = tokenInput.value
  tokenInput.value = ''

  socket.value = new WebSocket('ws://localhost:8000/ws/game/' + props.playerType + '/?token=' + token.value)

  socket.value.onopen = socketConnected
}

function socketConnected() {
  connected.value = true
  
  socket.value.onmessage = (event) => {
    reply.value = JSON.parse(event.data)
  }
}

</script>

<template>
    <div>
        <div>
            <button @click="winMove">Win move</button>
            <button @click="madeMove">Made move</button>
        </div>
        <div>
            Type in the token: <input v-model="tokenInput"/>
            <button @click="connectToSocket">Connect</button>
        </div>
        <p v-if="connected">Connected!</p>
        <p v-else>Wait for the connection...</p>
        <span class="response">
            <h3>Response:</h3>
            <p>{{ reply }}</p>
        </span>
    </div>
</template>

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