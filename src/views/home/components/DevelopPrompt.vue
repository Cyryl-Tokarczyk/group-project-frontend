<script setup>
</script>

<template>
    <h2>Develop</h2>
    <div>
        <router-link :to="{ name: 'dev' }" class="link">Develop</router-link>
    </div>
</template>

<style>

.link{
    transition: 0.3s;
    font-size: 3.5vw;
}

.link:hover{
    color: rgb(142, 0, 0);
}

</style>