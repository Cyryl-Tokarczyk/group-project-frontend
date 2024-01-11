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

  function loadFromLocalStorage() {
        // Wczytaj zmienne z local storage
        tokensStore.isLoggedIn = JSON.parse(localStorage.getItem('token'));
        tokensStore.tokens = localStorage.getItem('isLogged');
        tokensStore.tokens = tokensStore.tokens == "true";

        // Sprawdź, czy zmienne istnieją w local storage
        if (tokensStore.isLoggedIn && tokensStore.tokens) {
            // Zmienne istnieją, możesz z nich skorzystać
            console.log('Token successfully loaded:', tokensStore.isLoggedIn);
            console.log('IsLogged successfully loaded:', tokensStore.tokens);
        } else {
            console.log('No data in local storage.');
        }
    }

    document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
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
