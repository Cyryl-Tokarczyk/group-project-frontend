<script setup>
import { ref } from 'vue';
import { useTokensStore } from '@/stores/tokens';
import LoginComponent from './LoginComponent.vue'
import RegisterComponent from './RegisterComponent.vue'
import UserComponent from './UserComponent.vue'

const tokensStore = useTokensStore()
 
const loginOption = ref(true)
const registerOption = ref(false)

function logIn() {
  loginOption.value = true
  registerOption.value = false
}

function register() {
  loginOption.value = false
  registerOption.value = true
}

</script>

<template>
  <button v-if="!tokensStore.isLoggedIn" @click="logIn" class="reglog">Login</button>
  <button v-if="!tokensStore.isLoggedIn" @click="register" class="reglog">Register</button>
  <LoginComponent v-if="!tokensStore.isLoggedIn && loginOption == true" @logged-in="tokensStore.loggedIn" />
  <RegisterComponent v-else-if="!tokensStore.isLoggedIn && registerOption == true" @logged-in="tokensStore.loggedIn" />
  <UserComponent v-else/>
</template>

<style>

#user_logged{
  margin-top: 2vw;
}

#log_out_button{
  transition: 0.2s;
}

#log_out_button:hover{
  color:brown;
}

.reglog{
  margin-bottom: 0;
}
</style>
