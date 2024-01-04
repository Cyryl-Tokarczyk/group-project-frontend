<script setup>
import { ref } from 'vue';
import SocketConnector from './SocketConnector.vue'

const props = defineProps([
  'tokens'
])

const playerTypeChosen = ref(false)
const playerType = ref('')

const gameTokenURL = 'http://localhost:8000/game/game_token/'

const gameToken = ref('')

async function choosePlayerType(type) {
  var BoardLeft = document.querySelector(".left_board")
  var BoardRight = document.querySelector(".right_board")
  BoardLeft.classList.add("left_board_animation")
  BoardRight.classList.add("right_board_animation")

  setTimeout(async () => {
    playerTypeChosen.value = true
    playerType.value = type

    await getGameToken()

    console.log(!playerTypeChosen.value);
  }, 1000);
}

async function getGameToken() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + props.gameToken },
  }

  await fetch(gameTokenURL, requestOptions)
    .then(r => {
      return r.json()
    })
    .then(data => {
      console.log(data)
      gameToken.value = data['id']  // Two more properties: issue date and user id (only if it is the first issuer)
    })

  console.log(gameToken.value)
}

</script>

<template>
  <div class="server-asker">
    <div class="board" v-if="!playerTypeChosen">
      <div class="left_board">
        <button class="left" @click="choosePlayerType('teacher')">Teacher<span></span></button>
      </div>
      <div class="tab"><h2>Choose your class:</h2></div>
      <div class="right_board">
        <button class="right" @click="choosePlayerType('student')">Student<span></span></button>
      </div>  
    </div>
    <SocketConnector v-else :playerType=playerType :gameToken=gameToken />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.server-asker{
  margin-top: 5%;
  width: 80%;
}

.board{
  display: flex;
  height: 100%;
  width: 100%;
  perspective: 1000px;
}

.tab {
  height: 450px;
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e1e1e1;
  background: #285e31;
  border: 5px ridge rgb(176, 176, 176);
}

button {
  position: relative;
  background: transparent;
  color: #e1e1e1;
  cursor: pointer;
  z-index: 1;
  width: 100%;
  height: 100%;
  transition: 0.5s;
  backface-visibility: hidden;
  border: hidden;
}

.left_board{
  transition: transform 0.5s;
  transform-origin: right;
  width: 25vw;
  transform-style: preserve-3d;
  border: 5px ridge rgb(176, 176, 176);
  background: #285e31;
}
.right_board{
  transition: transform 0.5s;
  transform-origin: left;
  width: 25vw;
  transform-style: preserve-3d;
  border: 5px ridge rgb(176, 176, 176);
  background: #285e31;
}

span{
  position: absolute;
  height: 2px;
  background: #e1e1e1;
  width: 0px;
  transition: 0.5s;
  margin-top: 50px;
  margin-left: -165px;
}

.left_board_animation{
  transform: rotateY(180deg);
}

.right_board_animation{
  transform: rotateY(-180deg);
}


button:hover span{
  width: 180px;
}
</style>
