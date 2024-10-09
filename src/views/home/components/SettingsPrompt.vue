<script setup>
  import { useSettingsStore } from '@/stores/settings';
  import { ref, watch } from 'vue';

  const settingsStore = useSettingsStore();
  const parallaxChecked = ref(settingsStore.parallax);

  watch(parallaxChecked, () => {
    settingsStore.parallax = !settingsStore.parallax
  });
</script>

<template>
    <h2>Settings</h2>
    <label>
      <input type="checkbox" v-model="parallaxChecked" />
      Parallax
    </label>
</template>

<style>
</style>