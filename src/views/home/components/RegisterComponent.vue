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
    <h3>Register</h3>
    <form id="registrationForm" @submit.prevent="register">
      <label class="register_label" for="username">Username:</label><br>
      <input class="register_input" type="text" id="username" name="username" v-model="username" required>
      <label class="register_label" for="email">Email:</label><br>
      <input class="register_input" type="email" id="email" name="email" v-model="email" required>
      <label class="register_label" for="password">Password:</label><br>
      <input class="register_input" type="password" id="password" name="password" v-model="password" required>
      <label class="register_label" for="confirmPassword">Confirm Password:</label><br>
      <input class="register_input" type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword" required>
      <button id="register_submit" type="submit">Register</button>
    </form>
    <span class="registration_error" ref="registration_error"></span>
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
}

#registrationForm{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
}

.register_input{
  font-size: 1vw;
  border: 0.1vw solid black;
  border-radius: 1vw;
  width: 80%;
  margin-top: -2.5vw;
  margin-bottom: 1vw;
}

.register_label{
  font-size: 1.5vw;
}

#register_submit{
  padding: 0;
  margin: 1vw;
  font-size: 2vw;
  font-family: "Venily", Courier, monospace;
}

@media (max-width: 770px) {
  .register_label, .register_input, .registration_error{
    font-size: 3vw;
  }

  #register_submit{
    font-size: 3.5vw;
  }
  
}

</style>