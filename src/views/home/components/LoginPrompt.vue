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
  <div id="login_paper">
    <button v-if="!tokensStore.isLoggedIn" @click="logIn" class="reg">Login</button>
    <button v-if="!tokensStore.isLoggedIn" @click="register" class="log">Register</button>
    <LoginComponent v-if="!tokensStore.isLoggedIn && loginOption == true" @logged-in="tokensStore.loggedIn" />
    <RegisterComponent v-else-if="!tokensStore.isLoggedIn && registerOption == true" @logged-in="tokensStore.loggedIn" />
    <UserComponent v-else/>
  </div>
</template>

<style>

#login_paper{
  height: 100%;
  width: 100%;
  position: relative;
}

#user_logged{
  margin-top: 2vw;
}

.reg, .log{
  position: absolute;
  margin: 0;
  margin: 0;
  font-family: "Itim", Courier, monospace;
  top: 8%;
  text-decoration: underline;
}

.reg{
  left: 13.5%
}

.log{
  left: 63%
}

@media (max-width: 770px) {
  .reg, .log{
    font-size: 4vmin;
  }

  .reg{
    left: 15%
  }

  .log{
    left: 60%
  }
}

</style>
