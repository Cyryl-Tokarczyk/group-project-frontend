<script setup>
import { ref, onMounted } from 'vue';
import { useTokensStore } from '@/stores/tokens';
import { useSocketStore } from "@/stores/socket";


const socketStore = useSocketStore()
const tokensStore = useTokensStore()

const playerTypeChosen = ref(false)
const playerType = ref('')
const left_board = ref(null)
const right_board = ref(null)
const opponent =  ref('')

const gameTokenURL = '/api/game/game_token/'

const gameToken = ref('')

async function choosePlayerType(type) {
  opponent.value = type;
  left_board.value.classList.add('left_board_animation');
  right_board.value.classList.add('right_board_animation');

  setTimeout(async () => {
    playerTypeChosen.value = true
    playerType.value = type

    await getGameToken()

    console.log(!playerTypeChosen.value);
    console.log(gameToken.value);

    socketStore.connect('ws://localhost:8080/api/ws/game/' + playerType.value + '/?token=' + gameToken.value)
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
      gameToken.value = data['id']
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
    <div class="board">
      <div ref="left_board" class="left_board">
        <button class="left" @click="choosePlayerType('teacher')">Teacher<span></span></button>
        <div class="back" v-if="opponent == 'teacher'">Looking for a student</div>
        <div class="back" v-if="opponent == 'student'">Looking for a teacher</div>
      </div>
      <div class="middle_board"><h2>Choose your class:</h2></div>
      <div ref="right_board" class="right_board">
        <button class="right" @click="choosePlayerType('student')">Student<span></span></button>
        <div class="back" v-if="opponent != ''">
          <div class="board_spinner"></div>
        </div>
      </div>  
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.server-asker{
  margin-top: 5%;
  width: 80vw;
  height: 25vw;
  position: absolute;
  top: 11vh;
  right: 10.2vw;
}

.board_spinner{
  height: 2vw;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  width: 2vw;
  border: 0.2vw solid;
  border-color: rgba(255, 255, 255, 0.63)  transparent ;
  border-radius: 50%;
  animation: spin 1s infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.board{
  display: flex;
  height: 100%;
  width: 100%;
  perspective: 1000px;
}

.middle_board {
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e1e1e1;
  background-image: url(@/assets/imgs/board.jpg);
  background-size:cover;
  border: 0.3vw ridge rgb(176, 176, 176);
  box-sizing: border-box;
}



.back{
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e1e1e1;
}

.left, .right {
  position: relative;
  color: #e1e1e1;
  cursor: pointer;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  z-index: 1;
  width: 100%;
  height: 100%;
  transition: 0.5s;
  border: hidden;
  font-size: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
}



.left_board, .right_board{
  transition: transform 0.5s;
  width: 25%;
  height: 100%;
  border: 0.3vw ridge rgb(176, 176, 176);
  background-image: url(@/assets/imgs/board.jpg);
  background-position: center;
  transform-style: preserve-3d;
  background-size:cover;
  display: flex;
  align-items: center;
  z-index: 1;
  box-sizing: border-box;  
}

.left_board{
  transform-origin: right;

}
.right_board{
  transform-origin: left;
}

span{
  position: absolute;
  height: 1px;
  background: #e1e1e1;
  width: 0px;
  transition: 0.5s;
  margin-top: 2vw;
}

.left_board_animation{
  transform: rotateY(180deg);
}

.right_board_animation{
  transform: rotateY(-180deg);
}


button:hover span{

  width: 10vw;
}
</style>
