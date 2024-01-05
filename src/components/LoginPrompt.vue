<script setup>
import { ref } from 'vue';

const emit = defineEmits([
  'logged-in'
])

const loggedIn = ref(false)

const userTokenURL = '/api/users/token/'

const login = ref('')
const password = ref('')

const response = ref(null)


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
      <div class="form_content">
        <p>Name:</p>
        <div class="inputs">
          <input v-model="login" />
          <div class="underline"></div>
        </div>
        <p>Password:</p>
        <div class="inputs">
          <input v-model="password" type="password" />
          <div class="underline"></div>
        </div>
      </div>
      <button id="sub_button" type="submit">Signature</button>
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
  margin-top: -15px;
  width: 100%;
  height: 100%;
}

input{
  background: transparent;
  font-family:"DK", Courier, monospace;
  border: transparent;
  width: 100%;
  outline: none;
  font-size: 30px;
}

.form_content{
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: left;
}

form{
  display: block;
  margin-top: -25px;
}

.inputs{
  display: block;
  padding-right: 20px;
}

.underline{
  background: black;
  width: 100%;
  height: 1px;
}

p{
  padding-right: 10px;
  padding-left: 20px;
}

.sub_button{
  border: transparent;
  background: transparent;
  transition: 0.2s;
  margin-top: 35px;
}

button:hover{
  color: #711a1ad6;
}

</style>