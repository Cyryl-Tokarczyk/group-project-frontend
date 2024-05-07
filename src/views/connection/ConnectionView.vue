<script setup>
import ServerAsker from './components/ServerAsker.vue'

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
  background-size: 40vw;
  width: 200vw;
  height: 200vh;
  margin-top: -50vh;
  box-shadow: 0vw 0vw 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#emblem{
  width: 15vw;
  height: 6vw;
  font-size: 2vw;
  background-image: url("@/assets/imgs/paper.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 4vh;
  border: 0.5vw ridge rgb(149, 152, 0);
  box-shadow: 0 0 1vw;
}

</style>