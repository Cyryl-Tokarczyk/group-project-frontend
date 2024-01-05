<script setup>
  document.addEventListener("mousemove", parallax);
  function parallax(e){
    const xAxis = (window.innerWidth / 2 + e.pageX) / 35 - 50;
    const yAxis = (window.innerHeight / 2 + e.pageY) / 35 - 24;
    document.body.style.transform = `translateX(${-xAxis * 2}px) translateY(${-yAxis * 2}px)`;
    document.body.style.backgroundPosition = `${-xAxis * 2}px ${-yAxis * 2}px`;
  }
</script>

<template>
  <router-view />
</template>

<style>
#app {
  background-image: url(assets/table.jpg);
  background-size: 400px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  box-shadow: 0px 0px 20px;
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
  background-image: url(assets/floor.jpg);
  background-size: 600px;
  font-family:"DK", Courier, monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 30px;
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
