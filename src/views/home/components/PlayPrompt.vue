<script setup>
</script>

<template>
    <div class="paper">
        <h2>Game</h2>
        <div class="play_link">
            <router-link :to="{ name: 'connection' }" class="link_hover">Play</router-link>
        </div>
    </div>
</template>

<style>
.play_link{
    font-size: 3.5vw;
    margin-top: 5vw;
}

.link_hover{
    transition: 0.3s;
    border: 0.2vw solid black;
    padding-left: 1vw;
    padding-right: 1vw;
    background: rgba(145, 145, 145, 0.418);
}

.link_hover:hover{
    color: rgb(255, 255, 255);
    background: rgba(34, 34, 34, 0.418);
}

@media (max-width: 770px) {

  .play_link{
    font-size: 10vmin;
    margin-top: 10vmin;
  }

}


</style>