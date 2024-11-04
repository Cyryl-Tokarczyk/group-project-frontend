<script setup>
import { ref, onMounted, computed } from 'vue';
import CardComponent from './CardComponent.vue'

const props = defineProps([
  'cards_tab',
  'text', 
  'card_choose'
])


const windowWidth = ref(window.innerWidth);
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const computedSize = computed(() => {
  return windowWidth.value < 770 ? 3 : 1;
});

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
})

const emit = defineEmits(['card-clicked']);

const handleClick = (card, index) => {
  
  console.log('Klieknieto karte' + index)

  emit('card-clicked', card, index);
};
</script>

<template>
  <div class="all_cards_div">
    <h1>{{props.text}}</h1>
    <div class="all_cards">
      <div v-for="(card, index) in props.cards_tab" :key="index">
        <CardComponent @click="handleClick(card, index)" :card="card" :index="index" :size="computedSize" :full="true"/>
      </div>
    </div>
  </div>
</template>

<style>
.all_cards_div{
  position: fixed;
  top: -15vh;
  left: -10vw;
  width: 120vw;
  height: 120vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.all_cards_div h1{
  color: #ffffff;
  font-size: 6vw;
}

.all_cards{
  display: grid;
  grid-auto-flow: column;
  scroll-behavior: auto;
  width: 90vw;
  height: 25vw;
  gap: 1vw;
  overflow-y: auto;
  overscroll-behavior-inline: contain;
}

::-webkit-scrollbar {
  width: 0.6vw;
}
     
::-webkit-scrollbar-track {
background: rgba(77, 64, 39, 0.551);
border-radius: 0.2vw;
box-shadow: 0 0 0.1vw inset;
}
     
::-webkit-scrollbar-thumb {
  background: rgba(182, 168, 129, 0.747);
  border-radius: 2vw; 
}

@media (max-width: 770px) {
  .all_cards{
  display: grid;
  grid-auto-flow: column;
  scroll-behavior: auto;
  width: 90vw;
  height: 80vmin;
  gap: 1vw;
  overflow-y: auto;
  overscroll-behavior-inline: contain;
}


}


</style>