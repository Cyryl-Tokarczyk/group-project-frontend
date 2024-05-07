<script setup>
</script>

<template>
    <div class="paper">
        <div id="playPrompt">
            Develop
        </div>
        <div>
            <router-link :to="{ name: 'connection' }" class="link">Play</router-link>
        </div>
    </div>

</template>

<style>

#playPrompt{
    margin-top: 2vw;
    margin-bottom: 10vw;
}

.link{
    transition: 0.3s;
    font-size: 3.5vw;
}

.link:hover{
    color: rgb(142, 0, 0);
}

</style>