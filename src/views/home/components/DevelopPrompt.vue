<script setup>
</script>

<template>
    <div class="paper">
        <h3>
            Develop
        </h3>
        <div>
            <router-link :to="{ name: 'dev' }" class="link">Develop</router-link>
        </div>
    </div>

</template>

<style>

#devPrompt{
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