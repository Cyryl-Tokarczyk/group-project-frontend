<script setup>
import { ref } from 'vue';

const emit = defineEmits([
  'logged-in'
])

const loginError = ref(false)

const userTokenURL = 'http://localhost:8000/api/tokens/'

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
  login.value = 'michalski.44@wp.pl'
  password.value = '123456PIOTR'

  logIn()
}

function logInAsUser() {
  login.value = 'piuqey.pl@gmail.com'
  password.value = 'user1234'

  logIn()
}

</script>

<template>
  <div class="paper">
    <h2>Log in</h2>
    <form @submit.prevent="logIn" novalidate>
      <div class="form_content">
        <div class="inputs">
          <p>Name:</p>
          <input class="login_input" v-model="login" ref="loginLine" required/>
        </div>
        <div class="inputs">
          <p>Password:</p>
          <input class="login_input" v-model="password" type="password" ref="passwordLine" required/>
        </div>
      </div>
      <div id="login_error">
        <p  v-if="loginError">e-mail or password is incorrect</p>
      </div>
      <button id="sub_button" type="submit">SIGN</button>
    </form>
      <button @click="logInAsAdmin">1</button>
      <button @click="logInAsUser">2</button>
  </div>
</template>

<style>

@font-face {
  font-family: "DK";
  src: url(@/assets/fonts/DKLeftoverCrayon.otf) format('truetype');
}

.paper{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 15%;
}

.login_input{
  display: block;
  background: transparent;
  font-family: "Itim", Courier, monospace;
  border: 0.15vw solid rgb(0, 0, 0);
  font-size: 1.2vw;
  pointer-events: all;
}

.form_content{
  display: flex;
  height: 5vw;
  align-items: center;
  flex-direction: column;
}

form{
  display: block;
  margin-top: -1vw;
  pointer-events: none;
}

.inputs{
  display: block;
  margin-top: 1vw;
}

.underlineError{
  border: 0.15vw solid rgb(255, 0, 0);
}

.debug_button{
  margin-bottom: 0;
}

p{
  font-size: 1.5vw;
}

#sub_button{
  background: transparent;
  transition: 0.1s;
  font-family: "Itim", Courier, monospace;
  margin-top: 13.8vw;
  border: 0.2vw solid black;
  background-color: rgba(180, 180, 180, 0.842);
  padding-left: 1vw;
  padding-right: 1vw;
  pointer-events: all;
}

#sub_button:hover{
  color: #ffffffd6;
  background-color: rgba(109, 109, 109, 0.842)
}

#login_error{
  position: absolute;
  width: 100%;
  top:43%;
}

#login_error p{
  font-size: 0.9vw;
  color: #940000d6;
}

@media (max-width: 770px) {
  .login_input, p{
    font-size: 4vmin;
  }

  .login_input{
    border: 0.3vmin solid rgb(0, 0, 0);
  }

  .debug_button, #sub_button, h3{
    font-size: 2.5vmin;
  }

  #sub_button{
    margin-top: 39vmin;
    font-size: 4vmin;
    border: 0.3vmin solid rgb(0, 0, 0);
  }
  
}


</style>