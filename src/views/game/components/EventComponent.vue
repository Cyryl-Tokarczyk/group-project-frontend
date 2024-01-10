<script setup>

const props = defineProps([
  'message'
])

const emit = defineEmits([
  'choice-made'
])

function randomColor(index){
      // Generate a random color based on the index
      const hue = (index * 137.508 + 17) % 360; // You can adjust this formula
      return `hsl(${hue}, 70%, 80%)`;
}

</script>

<template>
  <div id="event">
    <h2 class="db">Event: </h2>
    <p class="db">{{ JSON.stringify(props.message) }}</p>
    <div id="choices">
      <button class="choice_type type1" :style="{ backgroundColor: randomColor(0) }"  @click.prevent="emit('choice-made',0)">Type 1</button>
      <button class="choice_type type2" :style="{ backgroundColor: randomColor(1) }"  @click.prevent="emit('choice-made',1)">Type 2</button>
    </div>
  </div>
</template>

<style>
.db {
  margin-top: -5vh;
}

#event{
  background-image: url(@/assets/imgs/table.jpg);
  background-size: 400px;
  width: 100vw;
  height: 50vw;
  box-shadow: 0px 0px 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#choices{
  width: 40vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.choice_type{
  height: 25vw;
  width: 18vw;
  border-radius: 5%;
  box-shadow: rgb(87, 87, 87) 0px 0px 15px;
  font-size: 5vw;
  transition: 0.5s;
}

.type1:hover{
  animation: zoomInOut1 0.7s;
  box-shadow: rgb(255, 121, 121) 0px 0px 15px;
}

.type2:hover{
  animation: zoomInOut2 0.7s;
  box-shadow: rgb(85, 159, 255) 0px 0px 15px;
}

@keyframes zoomInOut1 {
  0% {
    transform: scale(1); /* Początkowy rozmiar elementu */
  }
  50% {
    transform: scale(1.3) rotateZ(-10deg); /* Powiększenie do 120% */
  }
  100% {
    transform: scale(1); /* Powrót do początkowego rozmiaru */
  }
}

@keyframes zoomInOut2 {
  0% {
    transform: scale(1); /* Początkowy rozmiar elementu */
  }
  50% {
    transform: scale(1.2) rotateZ(10deg); /* Powiększenie do 120% */
  }
  100% {
    transform: scale(1); /* Powrót do początkowego rozmiaru */
  }
}

</style>