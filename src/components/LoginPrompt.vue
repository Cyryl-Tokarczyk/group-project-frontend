<script setup>
import { ref } from 'vue';

const emit = defineEmits([
  'logged-in'
])

const loggedIn = ref(false)

const userTokenURL = 'http://localhost:8000/users/token/'

const login = ref('')
const password = ref('')

const response = ref(null)

document.addEventListener("DOMContentLoaded", function() {
  var bodyElement = document.body;
  bodyElement.style.backgroundColor = "#ae834e";
  bodyElement.style.backgroundImage = "none";
})

async function logIn() {

  console.log(login.value, password.value);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': login.value,
      'password': password.value
    })
  }

  await fetch(userTokenURL, requestOptions)
    .then(r => {
      loggedIn.value = true
      return r.json()
    })
    .then(data => response.value = data)

  console.log(response.value)

  emit('logged-in', response.value)

}

</script>

<template>
  <div class="paper">
    <h3>Log in</h3>
    <form @submit.prevent="logIn">
      <input v-model="login" />
      <input v-model="password" type="password" />
      <button type="submit">Log in</button>
    </form>
  </div>
</template>

<style>

@font-face {
  font-family: "DK";
  src: url(../assets/fonts/DKLeftoverCrayon.otf) format('truetype');
}

input {
  margin: auto;
  display: block;
}

.paper{
  background-image: url(../assets/paper.jpg);
  background-size: 250px;
  background-repeat:repeat;
  width: 70%;
  height: 650px;
  transform: rotateZ(-2deg);
}

input{
  background: transparent;
  font-family:"DK", Courier, monospace;
  border: transparent
}

</style>