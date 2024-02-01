<script setup>
import { useTokensStore } from '@/stores/tokens';
import LoginComponent from './LoginComponent.vue'
import UserDetails from './UserDetails.vue'

const tokensStore = useTokensStore()

</script>

<template>
  <LoginComponent v-if="!tokensStore.isLoggedIn" @logged-in="tokensStore.loggedIn" />
  <UserDetails v-else/>
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
