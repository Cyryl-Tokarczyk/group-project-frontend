<script setup>
import { ref, onMounted } from 'vue';
import SocketConnector from './SocketConnector.vue'
import { useTokensStore } from '@/stores/tokens';

const tokensStore = useTokensStore()

const playerTypeChosen = ref(false)
const playerType = ref('')
const left_board = ref(null)
const right_board = ref(null)

const gameTokenURL = '/api/game/game_token/'

const gameToken = ref('')

async function choosePlayerType(type) {
  left_board.value.classList.add('left_board_animation');
  right_board.value.classList.add('right_board_animation');
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
    headers: { 'Authorization': 'Bearer ' + tokensStore.tokens['access'] },
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

onMounted(() => {
  left_board.value.classList.add('left_board_animation');
  right_board.value.classList.add('right_board_animation');

  setTimeout(()=>{
    left_board.value.classList.remove('left_board_animation');
    right_board.value.classList.remove('right_board_animation');
  },250)
});
</script>

<template>
  <div class="server-asker">
    <div class="board" v-if="!playerTypeChosen">
      <div ref="left_board" class="left_board">
        <button class="left" @click="choosePlayerType('teacher')">Teacher<span></span></button>
      </div>
      <div class="middle_board"><h2>Choose your class:</h2></div>
      <div ref="right_board" class="right_board">
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
  position: absolute;
  top: 11vh;
  right: 10.2vw;
}

.board{
  display: flex;
  height: 100%;
  width: 100%;
  perspective: 1000px;
}

.middle_board {
  height: 450px;
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e1e1e1;
  background-image: url(@/assets/board.jpg);
  background-size:cover;
  border: 5px ridge rgb(176, 176, 176);
}

.left, .right {
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
  font-size: 3vw;
}

.left_board, .right_board{
  transition: transform 0.5s;
  width: 25vw;
  transform-style: preserve-3d;
  border: 5px ridge rgb(176, 176, 176);
  background-image: url(@/assets/board.jpg);
  background-size:cover;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.left_board{
  transform-origin: right;

}
.right_board{
  transform-origin: left;
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
  transform: rotateY(180deg) translateX(5px);
}

.right_board_animation{
  transform: rotateY(-180deg)  translateX(-5px);
}


button:hover span{
  width: 180px;
}
</style>
