<script setup>
import { ref } from 'vue'

const socket = new WebSocket('ws://localhost:8000/ws/game/student/?token=ca022b89-d2d3-4752-93d0-27d660c96edc')

const reply = ref('')

function winMove() {
  const messageData = { 
    type: 'win_move',
    move: 'Winning move'
  }

  socket.send(JSON.stringify(messageData))
}

function madeMove() {
  reply.value = "Made move"
}

socket.onmessage = (event) => {
  reply.value = JSON.parse(event.data)
}

</script>

<template>
  <div class="server-asker">
    <h3>Ask the server!</h3>
    <button @click="winMove">Win move</button>
    <button @click="madeMove">Made move</button>
    <span class="response">
      <h3>Response:</h3>
      <p>{{ reply }}</p>
    </span>
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
  margin: 5px;
}
</style>
