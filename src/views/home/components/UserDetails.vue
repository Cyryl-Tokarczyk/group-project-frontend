<script setup>
  import { useTokensStore } from '@/stores/tokens';
  import { useUserDetailsStore } from '@/stores/userDetails';
  import { ref, onMounted } from 'vue';
  import { jwtDecode } from "jwt-decode";
  const tokensStore = useTokensStore();
  const userDetailsStore = useUserDetailsStore();
  const mail = ref(null);
  const username = ref(null);
  const bio = ref(null);
  const win = ref(null);
  const game = ref(null);

  function logOut() {
    tokensStore.loggedOut()
    console.log('Logged out');
  }

  onMounted(() => {
    getUserDetails()
  })

  async function getUserDetails() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + tokensStore.tokens['access'] },
  }

  try {
    const token = tokensStore.tokens['access']; // Tutaj podaj swój token JWT
    const decoded = jwtDecode(token);
    console.log(decoded);
    userDetailsStore.user_id = decoded.user_id
    const gameUserURL = '/api/users/' + decoded.user_id + '/'
    const response = await fetch(gameUserURL, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data); // Tu możesz przetwarzać otrzymane dane
    username.value.textContent = data.username
    userDetailsStore.username = data.username
    mail.value.textContent = data.email
    userDetailsStore.email = data.email
    bio.value.textContent = data.bio
    userDetailsStore.bio = data.bio
    game.value.textContent = data.games_played
    win.value.textContent = Math.ceil(data.games_won / (data.games_played == 0 ? 1 : data.games_played) * 100) + '%'


  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
</script>

<template>
  <div id="usercom">
    <h3>User</h3>
    <table id="userDetailsTable">
      <tr>
        <td>Username</td>
        <td id="usernameCell"><span ref="username"></span></td>
      </tr>
      <tr>
        <td>Email</td>
        <td id="emailCell"><span ref="mail"></span></td>
      </tr>
      <tr>
        <td>Games played</td>
        <td id="gameCell"><span ref="game"></span></td>
      </tr>
      <tr>
        <td>Win %</td>
        <td id="winCell"><span ref="win"></span></td>
      </tr>
    </table>
    <span class="bio_span" v-if="bio">{{ bio }}</span>
    <button id="log_out_button" @click="logOut()">Logout</button>
  </div>
</template>

<style>

#usercom{
  display: flex;
  flex-direction: column;
  align-items: center;
}

#log_out_button{
  transition: 0.2s;
}

#log_out_button:hover{
  color:brown;
}

#userDetailsTable{
  text-align: left;
  margin-left: 2vw;
  margin-right: 2vw;
  font-size: 1.5vw;
  border: 0.1vw solid black;
  width: 90%;
}

td{
  border: 0.1vw solid black;
}

.bio_span{
  margin-top: 1vw;
  font-size: 1vw;
  text-align: justify;
  width: 84%;
  padding: 2%;
  border: 0.3vw groove rgba(0, 0, 0, 0.424);
}

@media (max-width: 770px) {

  td, .bio_span{
    font-size: 3vw;
  }

  #log_out_button{
    font-size: 4vw;
  }

}

</style>