<script setup>
import { ref } from 'vue';

const emit = defineEmits([
    'logged-in'
])

const loggedIn = ref(false)

const userURL = 'http://localhost:8000/users/token/'

const login = ref('')
const password = ref('')

const response = ref(null)

function logIn() {
    console.log(login.value, password.value);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'email': login.value,
            'password': password.value
        })
    }

    fetch(userURL, requestOptions)
        .then(r => {
            loggedIn.value = true
            return r.json()
        })
        .then(data => response.value = data)

    console.log(response)

    emit('logged-in') // TODO: przekazuj tokeny
}

</script>

<template>
    <div>
        <h3>Log in</h3>
        <form @submit.prevent="logIn">
            <input v-model="login" />
            <input v-model="password" type="password" />
            <button type="submit">Log in</button>
        </form>
    </div>
</template>

<style>

input {
    margin: auto;
    display: block;
}

</style>