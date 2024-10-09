import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore('settingsStore', () => {
  const parallax = ref(true)
  return { parallax }
})