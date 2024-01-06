<script setup>

import { useTokensStore } from '@/stores/tokens';
import LoginPrompt from '@/components/LoginPrompt.vue'
import ServerAsker from '@/components/ServerAsker.vue'

const tokensStore = useTokensStore()

function loggedIn(t) {
  tokensStore.loggedIn(t)

  console.log(tokensStore.tokens['access']);
  console.log(tokensStore.tokens['refresh']);
}

</script>

<template>
  <LoginPrompt v-if="!tokensStore.isLoggedIn" @logged-in="loggedIn" />
  <ServerAsker v-else />
</template>