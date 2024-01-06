import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokensStore = defineStore('tokens', () => {
  const isLoggedIn = ref(false) // Doesn't really fit in a 'tokens' store, up for debate
  const tokens = ref(null)

  function loggedIn(t) {
    isLoggedIn.value = true
    tokens.value = t
  }

  return { isLoggedIn, tokens, loggedIn }
})