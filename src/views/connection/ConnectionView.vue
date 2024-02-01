<script setup>
import ServerAsker from './components/ServerAsker.vue'
import { onMounted } from 'vue';

var pointer =  "url(src/assets/imgs/wall.jpg)";

onMounted(() => {
  document.body.style.backgroundImage = pointer
});

</script>

<template>
  <div id="connectionView">
    <div id="emblem">Classroom Chronicles</div>
    <ServerAsker/>
  </div>
</template>

<style>
#connectionView {
  background-image: url(@/assets/imgs/wall.jpg);
  background-size: 400px;
  width: 200vw;
  height: 200vh;
  margin-top: -50vh;
  box-shadow: 0px 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#emblem{
  width: 10vw;
  height: 50px;
  font-size: 2vw;
  background-image: url("@/assets/imgs/paper.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: -80vh;
  border: 5px ridge rgb(149, 152, 0);
  box-shadow: 0px 0px 10px;
}

</style>