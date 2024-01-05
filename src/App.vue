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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

html{
  height: 100%;
  box-shadow: 10px 10px 25px inset #0000008f;
}

#nav {
  width: 300px;
  height: 70px;
  margin-top: 25px;
  margin-bottom: 25px;
  border: 5px ridge rgb(245, 165, 67);
  background: #e6e6e6;
  box-shadow: 5px 5px 12px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

#ramka {
  width: 100%;
  height: 100%;
  padding: 0px;
  box-shadow: 2px 2px 6px inset #000000;
}

h1{
  margin-top: 7px;
  color: #000000;
  font-weight: normal;
}

@font-face {
  font-family: "DK";
  src: url(assets/fonts/DKLeftoverCrayon.otf) format('truetype');
}

body {
  margin: 0;
  padding: 0;
  background-image: url(assets/table.jpg);
  background-size: cover;
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
