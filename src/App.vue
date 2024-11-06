<script setup>
  import { useTokensStore } from '@/stores/tokens';
  import { useSettingsStore } from '@/stores/settings';
  import { onMounted, watch } from 'vue';
  const tokensStore = useTokensStore()
  const settingsStore = useSettingsStore();

  const isMobile = window.matchMedia("(pointer: coarse)").matches;
  document.addEventListener("mousemove", parallax);

  function parallax(e){
    const xAxis = (window.innerWidth / 2 - e.pageX)/400;
    const yAxis = (window.innerHeight / 2 - e.pageY)/800;
    document.body.style.transform = `translateX(${xAxis}vw) translateY(${yAxis}vw)`;
    document.body.style.backgroundPosition = `${xAxis}vh ${yAxis}vh`;
  }

  watch(() => settingsStore.parallax, (newValue) => {
    if (newValue && !isMobile) {
      document.addEventListener('mousemove', parallax);
    } else {
      document.removeEventListener('mousemove', parallax);
      document.body.style.transform = '';
      document.body.style.backgroundPosition = '';
    }
  });

  window.addEventListener('load', function() {
    localStorage.clear();
  });

  onMounted(() => {
    if (isMobile) {
        console.log("Parallax is disabled on mobile devices.");
        document.removeEventListener('mousemove', parallax);
      }
  })
  // Load tokens from local storage
  document.addEventListener('DOMContentLoaded', tokensStore.loadFromLocalStorage);
</script>

<template>
  <router-view />
</template>

<style>
.home_link{
  font-size: 10vw;
  position: absolute;
  z-index: -2;
  pointer-events: all;
}

#app {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

html{
  height: 100%;
  box-shadow: 1vw 1vw 2.5vw inset #0000008f;
}


@font-face {
  font-family: "DK";
  src: url(assets/fonts/DKLeftoverCrayon.otf) format('truetype');
}

@font-face {
  font-family: "Cartoon";
  src: url(assets/fonts/Cartoon.ttf) format('truetype');
}

@font-face {
  font-family: "Stone";
  src: url(assets/fonts/Stone.ttf) format('truetype');
}

@font-face {
  font-family: "Sketch";
  src: url(assets/fonts/Sketch.ttf) format('truetype');
}

@font-face {
  font-family: "SketchSerif";
  src: url(assets/fonts/SketchSerif.ttf) format('truetype');
}

@font-face {
  font-family: "Match";
  src: url(assets/fonts/Match.ttf) format('truetype');
}

@font-face {
  font-family: "Itim";
  src: url(assets/fonts/Venily.otf) format('truetype');
}

@font-face {
  font-family: "Itim";
  src: url(assets/fonts/Itim-Regular.ttf) format('truetype');
}

body {
  margin: 0;
  padding: 0;
  background-image: url(assets/imgs/floor.jpg);
  background-size: 60vw;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2vw;
  text-transform: uppercase;
  overflow: hidden;
}

a{
  text-decoration: none;
  color: black;
}

button{
  font-family: "Itim", Courier, monospace;
}

</style>
