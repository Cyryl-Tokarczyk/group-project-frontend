<script setup>
</script>

<template>
    <div id="playPrompt">
        Game
    </div>
    <div>
        <router-link :to="{ name: 'connection' }" class="link">Play</router-link>
    </div>
</template>

<style>

#playPrompt{
    margin-top: 20px;
    margin-bottom: 100px;
}

.link{
    transition: 0.3s;
    font-size: 3.5vw;
}

.link:hover{
    color: rgb(142, 0, 0);
}

</style>