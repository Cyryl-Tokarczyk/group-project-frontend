<script setup>
import { ref, onMounted } from 'vue';
const win = ref(false) 
const test = ref(null) 

const props = defineProps([
  'message'
])

onMounted(() => {
    if (props.message['winner']  == "teacher"){
      win.value = true;
    }
    else if (props.message['winner']  == "student"){
      win.value = false;
    }else{
      win.value = true;
    }
    setTimeout(()=>{
      test.value.classList.add('animate_slide_in');
    },850)
});
</script>

<template>
  <div id="teacher_end">
    <div class="test_paper" ref="test">
      <h1 id="evaluation_F" :style="{ color: !win ? 'green' : 'brown' }">{{ !win ? "A+" : "F-"}}</h1>
    </div>
    <div class="teacher_paper">
      <h1 v-if="!win" :style="{ color: win ? 'green' : 'brown' }">YOU LOSE!</h1>
      <h1 v-if="win" :style="{ color: win ? 'green' : 'brown' }">YOU WIN!</h1>
      <span class="black_color">{{ win ? " I have defeated the student, giving them an F grade." : "Better luck next time! The student has triumphed over me, earning an A+ grade." }}</span>
      <router-link :to="{ name: 'home' }" class="link"><span class="back_home">Back home</span></router-link>
    </div>
  </div>
</template>

<style>

#evaluation_F{
  font-size: 10vw;
  margin: 0;
}

.test_paper, .teacher_paper{
  width: 27vw;
  height: 35vw;
  background-image: url(@/assets/imgs/paper.jpg);
  background-size: cover;
  box-shadow: 0.2vw 0.2vw 1vw black;
  transition: 0.5s;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.8s;
  z-index: 0;
  flex-direction: column;
  z-index: 2;
}

.teacher_paper{
  z-index: 0;
  transform: rotateZ(5deg);
}

.black_color{
  color: black;
  font-size: 1.6vw;
  text-align: justify;
  padding: 0vw 2vw 0vw 2vw;
}

.back_home{
  font-size: 1.6vw;
}

.animate_slide_in {
  transform: translateY(-150vw);
}


</style>