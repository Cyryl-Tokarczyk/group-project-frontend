<script setup>
import { ref } from 'vue';
import SocketConnector from './SocketConnector.vue'

const playerTypeChosen = ref(false)
const playerType = ref('')

function choosePlayerType(type) {
  playerTypeChosen.value = true
  playerType.value = type

  console.log(!playerTypeChosen.value);
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
    <SocketConnector v-else :playerType=playerType />
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
