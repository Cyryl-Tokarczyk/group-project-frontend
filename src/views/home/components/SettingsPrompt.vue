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
  <div class="paper">    
    <h2>Settings</h2>
    <div class="setting_div">
      <label>
        <input class="seting_checkbox" type="checkbox" v-model="parallaxChecked" />
        Parallax
      </label>
    </div>
  </div>
</template>

<style>
.setting_div{
  font-size: 1.8vw;
}

@media (max-width: 770px) {
  .setting_div{
    font-size: 4vmin;
  }
}
</style>