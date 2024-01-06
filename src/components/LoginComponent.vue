<script setup>

import { useTokensStore } from '@/stores/tokens';
import LoginPrompt from '@/components/LoginPrompt.vue'

const tokensStore = useTokensStore()

function loggedIn(t) {
  tokensStore.loggedIn(t)

  console.log(tokensStore.tokens['access']);
  console.log(tokensStore.tokens['refresh']);
}

</script>

<template>
  <LoginPrompt v-if="!tokensStore.isLoggedIn" @logged-in="loggedIn" />
  <div v-else id="user_logged">User</div>
</template>

<style>

#user_logged{
  margin-top: 20px;
}

</style>