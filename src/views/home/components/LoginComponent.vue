<script setup>
import { ref } from 'vue';

const emit = defineEmits([
  'logged-in'
])

const loginError = ref(false)

const userTokenURL = '/api/users/token/'

const login = ref('')
const password = ref('')
const passwordLine = ref('')
const loginLine = ref('')

async function logIn() {
  if (login.value == ""){
    loginLine.value.classList.add('underlineError');
  } else{
    loginLine.value.classList.remove('underlineError');
  }
  if (password.value == ""){
    passwordLine.value.classList.add('underlineError');
  } else{
    passwordLine.value.classList.remove('underlineError');
  }
  if (login.value == "" || password.value == ""){
    return;
  }

  console.log(login.value, password.value);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': login.value.toLowerCase(),
      'password': password.value
    })
  }

  try {
    const response = await fetch(userTokenURL, requestOptions);
    const data = await response.json();

    if (response.ok) {
      emit('logged-in', data);
      console.log('Successfully logged in:', data);
    } else {
      // Logging in failure handling
      loginError.value = true;
      console.error('Login failed:', data);
      login.value = "";
      password.value = "";
      loginLine.value.classList.add('underlineError');
      passwordLine.value.classList.add('underlineError');
    }

  } catch (error) {
    console.error('Error during login:', error);
  }
}

function logInAsAdmin() {
  login.value = 'admin@admin.admin'
  password.value = 'admin'

  logIn()
}

function logInAsUser() {
  login.value = 'user@user.user'
  password.value = 'user1234'

  logIn()
}

</script>

<template>
  <div class="paper">
    <h3>Log in</h3>
    <form @submit.prevent="logIn" novalidate>
      <div class="form_content">
        <p>Name:</p>
        <div class="inputs">
          <input v-model="login" required/>
          <div class="underline" ref="loginLine"></div>
        </div>
        <p>Password:</p>
        <div class="inputs">
          <input v-model="password" type="password" required/>
          <div class="underline" ref="passwordLine"></div>
        </div>
      </div>
      <div>
        <p id="login_error" v-if="loginError">e-mail or password is incorrect</p>
      </div>
      <button id="sub_button" type="submit">Signature</button>
    </form>

    <button class="debug_button" @click="logInAsAdmin">Log in as admin</button>
    <button class="debug_button" @click="logInAsUser">Log in as user</button>
  </div>
</template>

<style>

@font-face {
  font-family: "DK";
  src: url(@/assets/fonts/DKLeftoverCrayon.otf) format('truetype');
}

input {
  margin: auto;
  display: block;
}

.paper{
  margin-top: -1.5vw;
  width: 100%;
  height: 100%;
}

input{
  background: transparent;
  font-family:"DK", Courier, monospace;
  border: transparent;
  width: 100%;
  outline: none;
  font-size: 1.5vw;
}

.form_content{
  display: flex;
  height: 5vw;
  align-items: center;
  justify-content: left;
}

form{
  display: block;
  margin-top: -2.5vw;
}

.inputs{
  display: block;
  padding-right: 0.5vw;
}

.underline{
  background: black;
  width: 100%;
  height: 0.1vw;
  transition: 0.2s;
}

.underlineError{
  background: rgb(168, 0, 0);
}

.debug_button{
  padding: 0;
}

p{
  font-size: 1.5vw;
  padding-right: 0.5vw;
  padding-left: 0.5vw;
}

#sub_button{
  border: transparent;
  background: transparent;
  transition: 0.5s;
  margin-top: 1vw;
}

#sub_button:hover{
  color: #940000d6;
}

#login_error{
  font-size: 0.9vw;
  color: #940000d6;
}

</style>