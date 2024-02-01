<script setup>
  import { useTokensStore } from '@/stores/tokens';
  const tokensStore = useTokensStore()

  document.addEventListener("mousemove", parallax);
  function parallax(e){
    const xAxis = (window.innerWidth / 2 - e.pageX)/400;
    const yAxis = (window.innerHeight / 2 - e.pageY)/800;
    document.body.style.transform = `translateX(${xAxis}vw) translateY(${yAxis}vw)`;
    document.body.style.backgroundPosition = `${xAxis}vh ${yAxis}vh`;
  }

  // Load tokens from local storage
  document.addEventListener('DOMContentLoaded', tokensStore.loadFromLocalStorage);
</script>

<template>
  <router-view />
</template>

<style>
#app {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

html{
  height: 100%;
  box-shadow: 10px 10px 25px inset #0000008f;
}


@font-face {
  font-family: "DK";
  src: url(assets/fonts/DKLeftoverCrayon.otf) format('truetype');
}

body {
  margin: 0;
  padding: 0;
  background-image: url(assets/imgs/floor.jpg);
  background-size: 600px;
  font-family:"DK", Courier, monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2vw;
  text-transform: uppercase;
  overflow: hidden;
}

button {
  font-family:'DK', Courier, monospace; 
  font-size: 45px;
  text-transform: uppercase;
}

a{
  text-decoration: none;
  color: black;
}

</style>
