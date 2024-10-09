<script setup>
import ServerAsker from './components/ServerAsker.vue'

</script>

<template>
  <div id="connectionView">
    <router-link :to="{ name: 'home' }" id="emblem">Classroom Chronicles</router-link>
    <ServerAsker/>
  </div>
</template>

<style>
#connectionView {
  background-image: url(@/assets/imgs/wall.jpg);
  background-size: 40vw;
  width: 150vw;
  height: 150vh;
  box-shadow: 0vw 0vw 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#emblem{
  width: 25vmin;
  height: 12vmin;
  font-size: 3.5vmin;
  background-image: url("@/assets/imgs/paper.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 5vmin;
  border: 0.5vmin ridge rgb(149, 152, 0);
  box-shadow: 0 0 1vmin;
  z-index: 1;
}

</style>