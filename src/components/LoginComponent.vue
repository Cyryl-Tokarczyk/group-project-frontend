<script setup>
import { useTokensStore } from '@/stores/tokens';
import LoginPrompt from '@/components/LoginPrompt.vue'
import UserDetails from '@/components/UserDetails.vue'

const tokensStore = useTokensStore()

</script>

<template>
  <LoginPrompt v-if="!tokensStore.isLoggedIn" @logged-in="tokensStore.loggedIn" />
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