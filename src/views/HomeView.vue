<script setup>
import LoginPrompt from '@/views/LoginView.vue'
import SettingsPrompt from '@/components/SettingsPrompt.vue'
import { ref, onMounted } from 'vue';

const login = ref(null)
const setings = ref(null)

function clickLogin(){
  login.value.classList.remove('onSideLogin');
  login.value.classList.remove('tabHover');
  setings.value.classList.add('tabHover');
  setings.value.classList.add('onSideSettings');
}

function clickSettings(){
  setings.value.classList.remove('onSideSettings');
  setings.value.classList.remove('tabHover');
  login.value.classList.add('tabHover');
  login.value.classList.add('onSideLogin');
}


onMounted(() => {
  login.value.classList.add('tabHover');
  login.value.classList.add('onSideLogin');
  setings.value.classList.add('tabHover');
  setings.value.classList.add('onSideSettings');
})
</script>

<template>
  <div id="loginPrompt" ref="login" class="tab" @click="clickLogin">
    <LoginPrompt/>
  </div>
  <div id="setings" ref="setings" @click="clickSettings" class="tab">
    <SettingsPrompt/>
  </div>
</template>

<style>

.tab{
  width: 750px;
  height: 900px;
  background-image: url(../assets/paper.jpg);
  background-size: cover;
  box-shadow: 2px 2px 10px;
}

.tabHover:hover{
  transform: rotateZ(15deg) translateX(200px) translateY(-50px);
}

.onSideLogin {
  position: absolute;
  top: 15vh;
  right: 70vw;
  transition: 0.5s;
}

.onSideSettings {
  position: absolute;
  top: 20vh;
  right: 70vw;
  transition: 0.5s;
}

</style>