<script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import { useTokensStore } from '@/stores/tokens';
  import { useUserDetailsStore } from '@/stores/userDetails';

  const userDetailsStore = useUserDetailsStore();
  const tokensStore = useTokensStore();
  const save_error = ref(null)
  const save_success = ref(null)
  const username = ref(null)
  const email = ref(null)
  const bio = ref(null)
  const phone_number = ref(null)

  const userRegisterURL = '/api/users/' + userDetailsStore.user_id + '/'

  onMounted(() => {
    getDetails()
  })

  function getDetails() {
    nextTick(() => {
      username.value = userDetailsStore.username;
      email.value = userDetailsStore.email;
      bio.value = userDetailsStore.bio;
      phone_number.value = userDetailsStore.phone_number;
    });
  }


  async function saveUserData() {
    save_error.value.textContent = ""
      save_success.value.textContent = ""
    const bodyData = {};

    if (email.value != '' && email.value != userDetailsStore.email) {
        bodyData.email = email.value.trim();
    }

    if (username.value != '' && username.value != userDetailsStore.username) {
        bodyData.username = username.value.trim();
    }

    if (bio.value != '' && bio.value != userDetailsStore.bio) {
        bodyData.bio = bio.value.trim();
    }

    if (phone_number.value != '' && phone_number.value != userDetailsStore.phone_number) {
        bodyData.phone_number = phone_number.value.trim();
    }

  const requestOptions = {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + tokensStore.tokens['access'],
               'Content-Type': 'application/json'},
    body: JSON.stringify(bodyData)
  }

  try {
    const response = await fetch(userRegisterURL, requestOptions);
    const data = await response.json();

    if (response.ok) {
      console.log('Successfully saved data in:', data);
      userDetailsStore.username = username.value
      userDetailsStore.email = email.value
      userDetailsStore.bio = bio.value
      userDetailsStore.phone_number = phone_number.value
      save_success.value.textContent = "Successfully saved data"
    } else {
    console.error('Save failed:', data);
      save_error.value.textContent = Object.values(data.errors)[0]
    }

  } catch (error) {
    console.error('Error during save:', error);
  }
  }

</script>

<template>
  <div class="paper">
  <h3>Edit Details</h3>
  <form id="edit_form" @submit.prevent="saveUserData">
    <label class="save_label" for="username">Username:</label><br>
    <input class="save_input" type="text" id="username" name="username" v-model="username">
    <label class="save_label" for="email">Email:</label><br>
    <input class="save_input" type="email" id="email" name="email" v-model="email">
    <label class="save_label" for="phone_number">Phone:</label><br>
    <input class="save_input" type="tel" id="phone_number" name="phone_number" v-model="phone_number" pattern="[0-9]{9}" title="Please enter a valid phone number">
    <label class="save_label" for="bio">Bio:</label><br>
    <input class="save_input" type="text" id="bio" name="bio" v-model="bio">
    <button id="save_submit" type="submit">Save</button>
  </form>
  <span class="save_error" ref="save_error"></span>
  <span class="save_success" ref="save_success"></span>
  </div>
</template>

<style>

@font-face {
  font-family: "DK";
  src: url(@/assets/fonts/DKLeftoverCrayon.otf) format('truetype');
}

#edit_form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
}

.save_error{
  color: brown;
  font-size: 1vw;
}

.save_success{
  color: rgb(26, 97, 13);
  font-size: 1.5vw;
}

.save_input{
  font-size: 1vw;
  border: 0.1vw solid black;
  border-radius: 1vw;
  width: 80%;
  font-family: "Venily", Courier, monospace;
  margin-top: -2.5vw;
  margin-bottom: 1vw;
}

.save_label{
  font-size: 1.5vw;
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
}

#save_submit{
  padding: 0;
  margin: 1vw;
  font-size: 2vw;
  font-family: "Venily", Courier, monospace;
}

@media (max-width: 770px) {
  .save_label, .save_input{
    font-size: 3vw;
  }

  #save_submit{
    font-size: 4vw;
  }
  
}

</style>