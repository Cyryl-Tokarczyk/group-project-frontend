<script setup>
import LoginPrompt from './components/LoginPrompt.vue'
import SettingsPrompt from './components/SettingsPrompt.vue'
import PlayPrompt from './components/PlayPrompt.vue'
import { useTokensStore } from '@/stores/tokens';
import { ref, defineEmits } from 'vue';

const login = ref(null)
const settings = ref(null)
const notebook = ref(null)
const game = ref(null)
const tokensStore = useTokensStore()
const refs = [login, settings, game]


const emit = defineEmits(['updateParallax']);

function updateParallax(newValue) {
  emit('updateParallax', newValue);  // Emitujemy zmiany do App.vue
}

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
      tab.classList.remove('tabNotSelect');
      tab.classList.add('tabSelect');
      notebook.value.classList.add('x');
    }
    refs.forEach(element => {
      if (tab != element.value){
        if (element.value.classList.contains('tabSelect')) {
          element.value.classList.remove('tabSelect');
          element.value.classList.add('tabNotSelect');
          element.value.addEventListener('animationend', () => {
            element.value.classList.remove('tabNotSelect');
          }, { once: true });
        }
      }
    });
  }
}

</script>

<template>
  <div id="homeView">
    <div id="notebook" ref="notebook">
      <div id="cover">
        <h1 id="notbook_title">Classroom Chronicles</h1>
        <div id="line">
          <div class="menu_buttons" v-if="!tokensStore.isLoggedIn">
            <img src="@/assets/imgs/user.png" :alt="'user'" class="buttons_imgs">
            <button class="notebook_button" @mouseover="hoverButton(login)" @mouseleave="resetTransform(login)" @click="chooseTab(login)" >Login</button>
          </div>
          <div class="menu_buttons" v-if="tokensStore.isLoggedIn">
            <img src="@/assets/imgs/user.png" :alt="'user'" class="buttons_imgs">
            <button class="notebook_button" @mouseover="hoverButton(login)" @mouseleave="resetTransform(login)" @click="chooseTab(login)" >User</button>
          </div>
          <div class="menu_buttons">
            <img src="@/assets/imgs/settings.png" :alt="'user'" class="buttons_imgs">
            <button class="notebook_button" @mouseover="hoverButton(settings)" @mouseleave="resetTransform(settings)" @click="chooseTab(settings)">Settings</button>
          </div>
          <div class="menu_buttons" v-if="tokensStore.isLoggedIn">
            <img src="@/assets/imgs/play.png" :alt="'user'" class="buttons_imgs">
            <button class="notebook_button" @mouseover="hoverButton(game)" @mouseleave="resetTransform(game)" @click="chooseTab(game)" >Game</button>
          </div>
        </div>
      </div>

      <div id="loginPrompt" ref="login" class="tab">
        <LoginPrompt/>
      </div>
      <div id="setings" ref="settings"  class="tab">
        <SettingsPrompt :parallaxActive="parallaxActive" @updateParallax="updateParallax"/>
      </div>
      <div id="game" ref="game"  class="tab">
        <PlayPrompt/>
      </div>
    </div>
  </div>
</template>

<style>
.buttons_imgs{
  position: absolute;
  width: 1.8vw;
  height: auto;
  top: -1vw;
}

.menu_buttons{
  width: 100%;
  height: 2.5vw;
  background-color: rgba(255, 255, 255, 0.479);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vw;
  margin-bottom: -0.8vw;
  box-sizing: border-box;
  box-shadow: inset 0 0 1vw rgba(0, 0, 0, 0.5);
  position: relative;
}

.menu_buttons:hover{
  background-color: rgba(0, 216, 11, 0.308);
}

.menu_buttons:hover button{
  color: rgb(255, 255, 255);
}

.menu_buttons button{
  width: 100%;
  height: 100%;
}

#homeView {
  background-image: url(@/assets/imgs/table.jpg);
  background-size: 40vw;
  width: 100vw;
  height: 50vw;
  box-shadow: 0 0 2vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.x{
  transform: translateX(-35vw);
}

#cover{
  background-image: url(@/assets/imgs/notebook.jpg);
  font-family:"Itim", Courier, monospace;
  font-size: 1.4vw;
  background-size: 200vw;
  border-bottom-right-radius: 1vw;
  border-top-right-radius: 1vw;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  z-index: 1;
}

#notebook{
  width: 27vw;
  height: 35vw;
  box-shadow: 0.2vw 0.2vw 0.6vw;
  border-bottom-right-radius: 1.5vw;
  border-top-right-radius: 1.5vw;
  position: absolute;
  right: 37.5vw;
  transition: 0.5s;
}

#notbook_title{
  width: 77%;
}

.tab{
  font-family:"Itim", Courier, monospace;
  width: 100%;
  height:  100%;
  background-image: url(@/assets/imgs/paper.jpg);
  background-size: cover;
  box-shadow: 0.2vw 0.2vw 1vw;
  border-bottom-right-radius: 1vw;
  border-top-right-radius: 1vw;
  transition: 0.5s;
  position: absolute;
  transition: 0.5s;
  z-index: 0;
}

button{
  margin: 2vw;
  border: transparent;
  background: transparent;
  font-size:1.5vw;
}

#line{
  display: flex;
  flex-direction: column;
  width: 23%;
  height: 100%;
  background: rgba(34, 151, 23, 0.28);
  align-items: center;
  border-bottom-right-radius: 1vw;
  border-top-right-radius: 1vw;
}

#line button{
  font-family:"Itim", Courier, monospace;
}

.tabOpen{
  transform: rotateZ(10deg) translateX(25vw) translateY(-3vw);
}

.tabSelect{
  transform: translateX(37.5vw);
  z-index: -2;
}

h2{
  font-size: 2vw;
}

@media (max-width: 770px) {
  #homeView {
    height: 90vh;
  }

  #notebook{
    width: 70vmin;
    height: 95vmin;
    max-width: 70vw;
    right: auto;
  }

  #cover{
    font-size: 4.5vmin;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-end; 
  }

  #line{
    display: flex;
    flex-direction: row;
    width: 90%;
    height: 10%;
    align-items: center;
    justify-content: center;
    gap: 3vmin;
    padding-left: 5%;
    padding-right: 5%;
    border-bottom-right-radius: 0;
  }

  #cover h1{
    margin: 0;
    padding: 4vmin;
  }

  .notebook_button{
    font-size: 4.5vmin;
    margin: 0;
    margin-top: 3.2vmin;
  }

  .tabOpen{
    transform: translateY(-10vmin);
  }
  
  .tabSelect{
    animation: bounceRight 0.75s ease-in-out forwards;
  }

  .tabNotSelect {
    animation: bounceLeft 0.75s ease-in-out forwards;
  }

  .x{
    transform: translateY(-10vmin);
  }

  h2{
    font-size: 6vmin;
  }

  .buttons_imgs{
    width: 4vmin;
    position: absolute;
    top: 5%;
  }

  .menu_buttons{
    height: 100%;
    margin: 0;
  }

  @keyframes bounceRight {
    0% {
      transform: translateX(0);
      transform: translateY(-10vmin);
    }
    30% {
      transform: translateX(70vmin)rotateZ(5deg)
    }
    50%{
      z-index: 2;
    }
    100% {
      transform: translateY(9.5vmin);
      z-index: 2;
    }
  }

  @keyframes bounceLeft {
    0% {
      transform: translateX(0);
      transform: translateY(9.5vmin);
      z-index: 2;
    }
    30% {
      transform: translateX(-70vmin)rotateZ(-5deg);
      z-index: 2;
    }
    50% {
      z-index: -2;
    }
  }

}

</style>