<script setup>
  import { useTokensStore } from '@/stores/tokens';
  import { ref, onMounted } from 'vue';
  const tokensStore = useTokensStore();
  const mail = ref(null);

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLogged');
    localStorage.removeItem('usermail');
    tokensStore.isLoggedIn  = false;
    tokensStore.tokens  = null;
  }

  onMounted(() => {
    mail.value.textContent = localStorage.getItem('usermail')
  })
</script>

<template>
    <div id="usercom">
        <h2>User</h2>
        <span ref="mail"></span>
        <button id="log_out_button" @click="logOut()">Logout</button>
    </div>
</template>

<style>

#usercom{
    display: flex;
    flex-direction: column;
}

#log_out_button{
  transition: 0.2s;
}

#log_out_button:hover{
  color:brown;
}
</style>