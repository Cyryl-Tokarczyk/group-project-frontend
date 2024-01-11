<script setup>
import { useTokensStore } from '@/stores/tokens';
import LoginPrompt from '@/components/LoginPrompt.vue'
import UserComponent from '@/components/UserComp.vue'

const tokensStore = useTokensStore()

function loggedIn(t) {
  tokensStore.loggedIn(t)

  console.log(tokensStore.tokens['access']);
  console.log(tokensStore.tokens['refresh']);
  
}




</script>

<template>
  <LoginPrompt v-if="!tokensStore.isLoggedIn" @logged-in="loggedIn" />
  <UserComponent v-else/>
</template>

<style>

#user_logged{
  margin-top: 20px;
}

#log_out_button{
  transition: 0.2s;
}

#log_out_button:hover{
  color:brown;
}

</style>