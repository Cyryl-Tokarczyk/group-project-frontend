<script setup>
import { ref, onMounted } from 'vue';
import EditUser from './EditUser.vue'
import UserDetails from './UserDetails.vue' 
import MyGames from './MyGames.vue' 

const edit = ref(false)
const games = ref(false)
const details = ref(false)
const bool_refs = [edit, games, details]

const edit_button = ref(null)
const games_button = ref(null)
const details_button = ref(null)
const buttons_refs = [edit_button, games_button, details_button]

onMounted(() => {
    start_tab("details", details_button.value)
  })

function start_tab(tab, tab_button){
    bool_refs.forEach(x => {x.value = false})
    switch (tab) {
    case "games":
        games.value = true;
        break;
    case "edit":
        edit.value = true;
        break;
    case "details":
        details.value = true;
    }
    buttons_refs.forEach(x => {x.value.classList.remove('color')})
    tab_button.classList.add('color');
}

</script>

<template>
  <div id="user_buttons">
    <button @click="start_tab('details', details_button)" class="tab_button" ref="details_button">Details</button>
    <button @click="start_tab('games', games_button)" class="tab_button" ref="games_button">My Games</button>
    <button @click="start_tab('edit', edit_button)" class="tab_button" ref="edit_button">Edit</button>
  </div>
  <UserDetails v-if="details" />
  <EditUser v-if="edit"/>
  <div id="my_games">
    <MyGames v-if="games" /> 
  </div>
</template>

<style>
.color{
    color:brown;
}

#user_buttons{
    display: flex;
    align-items: center;
}

#user_buttons button{
    font-family: "Venily", Courier, monospace;
}

.tab_button{
    font-size: 1vw;
    margin: 0.4vw;
    padding: 0;
}

#my_games{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 90%;
    margin: 0;
    padding: 0;
}

@media (max-width: 770px) {

  .tab_button{
    font-size: 2.5vw;
    margin-right: 2vw;
  }

}

</style>