<script setup>
  import { useTokensStore } from '@/stores/tokens';
  import { useUserDetailsStore } from '@/stores/userDetails';
  import { ref, onMounted } from 'vue';
  const tokensStore = useTokensStore();
  const userDetailsStore = useUserDetailsStore();
  const games = ref(null)

  onMounted(() => {
    getUserGames()
  })

  async function getUserGames() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + tokensStore.tokens['access'] },
    }

    try {
      const gameUserURL = '/api/archives/?username=' + userDetailsStore.username
      const response = await fetch(gameUserURL, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      games.value = data.results
      console.log(data); // Tu możesz przetwarzać otrzymane dane
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  function getRowClass(game) {
    if (
      (game.winner === "student" && game.student_player.username === userDetailsStore.username) ||
      (game.winner === "teacher" && game.teacher_player.username === userDetailsStore.username)
    ) {
      return 'winner-row';
    } else {
      return 'loser-row';
    }
  }

</script>

<template>
  <h3 id="my_games_header">My Games</h3>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Student</th>
          <th>Teacher</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, index) in games" :key="index" :class="getRowClass(game)">
          <td>{{ index + 1}}</td>
          <td>{{ game.start_date }}</td>
          <td>{{ game.student_player.username }}</td>
          <td>{{ game.teacher_player.username }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
#my_games_header{
  margin: 0.7vw;
}

.container {
  width: 90%;
  height: 90%;
  overflow-x: auto;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.table {
  width: 100%;
  border-collapse:initial;
  font-size: 0.7vw;
  margin-bottom: 1vw;
}

.table thead th {
  position: sticky;
  top: 0;
  height: 1vw;
  background: #828282;
  color: rgb(0, 0, 0);
  z-index: 1;
  font-size: 1vw;
}

.table th, .table td {
  border: 0.1vw solid #000000;
  text-align: center;
  font-size: 1vw;
}

.scrollable-body {
  display: block;
  max-height: 60vh;
  overflow-y: auto;
}

.winner-row {
  background-color: #30ff6022;
}

.loser-row {
  background-color: #ff2a3c3e;
}

@media (max-width: 770px) {

  .table thead th, .table td{
    font-size: 2vw;
  }

}

</style>