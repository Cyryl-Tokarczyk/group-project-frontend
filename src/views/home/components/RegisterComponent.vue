<script setup>
import { ref } from 'vue';

const emit = defineEmits([
  'logged-in'
])

const registration_error = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const userRegisterURL = '/api/users/'
const userTokenURL = '/api/tokens/'

async function logIn() {
  console.log(email.value, password.value);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': email.value,
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
      console.error('Login failed:', data);
    }

  } catch (error) {
    console.error('Error during login:', error);
  }
}

async function register() {
  if(password.value != confirmPassword.value){
    registration_error.value.textContent = "The passwords did not match"
    return
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': email.value,
      'password': password.value,
      'username': username.value
    })
  }

  try {
    const response = await fetch(userRegisterURL, requestOptions);
    const data = await response.json();

    if (response.ok) {
      console.log('Successfully registered in:', data);
      logIn()
    } else {
      console.error('Registration failed:', data);
      registration_error.value.textContent = Object.values(data.errors)[0]
    }

  } catch (error) {
    console.error('Error during registration:', error);
  }
}

</script>

<template>
  <div class="paper">
    <h2>Register</h2>
    <form id="registrationForm" @submit.prevent="register">
      <label class="register_label" for="username">Username:</label><br>
      <input class="register_input" type="text" id="username" name="username" v-model="username" required>
      <label class="register_label" for="email">Email:</label><br>
      <input class="register_input" type="email" id="email" name="email" v-model="email" required>
      <label class="register_label" for="password">Password:</label><br>
      <input class="register_input" type="password" id="password" name="password" v-model="password" required>
      <label class="register_label" for="confirmPassword">Confirm Password:</label><br>
      <input class="register_input" type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword" required>
      <button id="register_submit" type="submit">REGISTER</button>
    </form>
    <div class="registration_error">
      <span ref="registration_error"></span>
    </div>
  </div>
</template>

<style>

@font-face {
  font-family: "DK";
  src: url(@/assets/fonts/DKLeftoverCrayon.otf) format('truetype');
}

.registration_error{
  color: brown;
  font-size: 1vw;
  margin-top: -6.5vw;
}

#registrationForm{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
}

.register_input{
  font-size: 1vw;
  border: 0.2vw solid black;
  width: 80%;
  margin-top: -2.5vw;
  margin-bottom: 1vw;
  background: none;
  height: 1.5vw;
  pointer-events: all;
}

.register_label{
  font-size: 1.5vw;
}

#register_submit{
  background: transparent;
  transition: 0.1s;
  font-family: "Itim", Courier, monospace;
  border: 0.2vw solid black;
  background-color: rgba(180, 180, 180, 0.842);
  padding-left: 1vw;
  padding-right: 1vw;
  margin-top: 0vw;
  pointer-events: all;
}

#register_submit:hover{
  color: #ffffffd6;
  background-color: rgba(109, 109, 109, 0.842)
}

@media (max-width: 770px) {
  .register_label, .register_input, .registration_error{
    font-size: 2vmin;
  }

  .registration_error{
    font-size: 3vmin;
    margin-top: -6.5vmin;
  }

  .register_input{
    font-size: 4vmin;
    border: 0.3vmin solid black;
    margin-top: -2.5vmin;
    margin-bottom: 1vmin;
    height: 4vmin;
  }

  .register_label{
    font-size: 4vmin;
  }

  #register_submit{
    font-size: 4vmin;
    border: 0.3vmin solid black;
    padding-left: 1vmin;
    padding-right: 1vmin;
    margin-top: 1.7vmin;
  }  
}

</style>