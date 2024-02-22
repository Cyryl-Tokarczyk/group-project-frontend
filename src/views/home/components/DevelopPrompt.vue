<script setup>
</script>

<template>
    <div class="paper">
        <div id="devPrompt">
            Develop
        </div>
        <div>
            <router-link :to="{ name: 'dev' }" class="link">Develop</router-link>
        </div>
    </div>

</template>

<style>

#devPrompt{
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