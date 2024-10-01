import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokensStore = defineStore('tokens', () => {
  const isLoggedIn = ref(false) // Doesn't really fit in a 'tokens' store, up for debate
  const tokens = ref(null)

  function loggedIn(t) {
    isLoggedIn.value = true
    tokens.value = t
    saveToLocalStorage()

    console.log(`ACCESS TOKEN: ${tokens.value['access']}`);
    console.log(`REFRESH TOKEN: ${tokens.value['refresh']}`);
  }

  function loggedOut() {
    removeFromLocalStorage()
    isLoggedIn.value  = false;
    tokens.value = null;
    saveToLocalStorage()
  }

  function saveToLocalStorage() {    
    localStorage.setItem('tokens', JSON.stringify(tokens.value));
    localStorage.setItem('isLoggedIn', isLoggedIn.value.toString());
  }

  function loadFromLocalStorage() {
    let localStorageisLoggedIn = localStorage.getItem('isLoggedIn');
    let localStorageTokens = JSON.parse(localStorage.getItem('tokens'));

    // Chcek if the variables exist in the local storage
    if (localStorageisLoggedIn && localStorageTokens) {
      isLoggedIn.value = localStorageisLoggedIn
      tokens.value = localStorageTokens
      
      console.log('Data in local storage found');
      console.log('Tokens successfully loaded:', tokens.value);
      console.log('IsLoggedIn successfully loaded:', isLoggedIn.value);
    } else {
      console.log('No data in local storage.');
    }
  }

  function removeFromLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLogged');
  }

  return { isLoggedIn, tokens, loggedIn, loggedOut, saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage }
})