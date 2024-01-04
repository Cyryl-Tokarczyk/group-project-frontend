<script setup>

</script>

<template>
  <div id="nav">
    <div id="ramka">
      <h1>Game title</h1>
    </div>
    <div>
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'login' }">Login</router-link>
    </div>
  </div>
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
}

@font-face {
  font-family: "DK";
  src: url(assets/fonts/DKLeftoverCrayon.otf) format('truetype');
}

body {
  margin: 0;
  padding: 0;
  background-image: url(assets/wall.jpg);
  background-size: 250px;
  background-repeat:repeat;
  font-family:"DK", Courier, monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 30px;
  text-transform: uppercase;
}

button {
  font-family:'DK', Courier, monospace; 
  font-size: 45px;
  text-transform: uppercase;
}

</style>
