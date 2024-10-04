<script setup>
</script>

<template>
    <div class="paper">
        <h3>
            Game
        </h3>
        <div class="play_link">
            <router-link :to="{ name: 'connection' }" class="link_hover">Play</router-link>
        </div>
    </div>

</template>

<style>
.play_link{
    font-size: 3.5vw;
    margin-top: 10vw;
}

.link_hover:hover{
    color: rgb(142, 0, 0);
    transition: 0.3s;
}

@media (max-width: 770px) {

  .play_link{
    font-size: 15vw;
    margin-top: 30vw;
  }

}


</style>