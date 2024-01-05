<script setup>
import LoginPrompt from '@/views/LoginView.vue'
import SettingsPrompt from '@/components/SettingsPrompt.vue'
import { ref } from 'vue';

const login = ref(null)
const settings = ref(null)
const notebook = ref(null)

function hoverButton(tab){
      if (tab) {
        tab.classList.add('tabOpen');
      }
}

function resetTransform(tab){
      if (tab) {
        tab.classList.remove('tabOpen');
      }
}

function chooseTab(tab){
      if (tab.classList.contains('tabSelect')){
        tab.classList.remove('tabSelect');
        tab.classList.remove('tabOpen');
        notebook.value.classList.remove('x');
      } else{
        if (tab) {
          tab.classList.remove('tabOpen');
          tab.classList.add('tabSelect');
          notebook.value.classList.add('x');
        }
        if(tab == login.value && settings.value.classList.contains('tabSelect')){
          settings.value.classList.remove('tabSelect');
        }
        if(tab == settings.value && login.value.classList.contains('tabSelect')){
          login.value.classList.remove('tabSelect');
        }
      }
}

</script>

<template>
  <div id="notebook" ref="notebook">
    <div id="cover">
      <h1 id="notbook_title">Game title</h1>
      <div id="line">
        <button @mouseover="hoverButton(login)" @mouseleave="resetTransform(login)" @click="chooseTab(login)">login</button>
        <button @mouseover="hoverButton(settings)" @mouseleave="resetTransform(settings)" @click="chooseTab(settings)">Setings</button>
      </div>
    </div>

    <div id="loginPrompt" ref="login" class="tab">
      <LoginPrompt/>
    </div>
    <div id="setings" ref="settings"  class="tab">
      <SettingsPrompt/>
    </div>
  </div>
  
</template>

<style>

.x{
  transform: translateX(-37.5vw);
}

#cover{
  background-image: url(../assets/notebook.jpg);
  background-size: 2000px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
}

#notebook{
  width: 25vw;
  height: 70vh;
  box-shadow: 2px 2px 6px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  position: absolute;
  top: 16vh;
  right: 37.5vw;
  transition: 0.5s;
}

#notbook_title{
  width: 77%;
}

.tab{
  width: 100%;
  height:  100%;
  background-image: url(../assets/paper.jpg);
  background-size: cover;
  box-shadow: 2px 2px 10px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  transition: 0.5s;
  position: absolute;
  transition: 0.5s;
  z-index: -1;
}

button{
  margin: 20px;
  border: transparent;
  background: transparent;
  font-size:30px;
}

#line{
  display: flex;
  flex-direction: column;
  width: 23%;
  height: 100%;
  background: rgba(34, 151, 23, 0.28);
  align-items: center;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
}

.tabOpen{
  transform: rotateZ(10deg) translateX(250px) translateY(-30px);
}

.tabSelect{
  transform: translateX(37.5vw);
  z-index: -2;
}

</style>