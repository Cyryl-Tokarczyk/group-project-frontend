<script setup>
import { ref, onMounted } from 'vue';

// Directly import images
import bruteImage from '@/assets/imgs/brute.png';
import IntelligenceImage from '@/assets/imgs/intelligence.png';
import redirectImage from '@/assets/imgs/redirect.png';
import blockImage from '@/assets/imgs/block.png';
import conditionalImage from '@/assets/imgs/conditional.png';


// Dictionary for images
const typeImages = {
  Brute: bruteImage,
  Intelligence: IntelligenceImage,
}; 

const playerTypeColor = {
  teacher: 'rgba(14, 64, 121, 0.705)',
  student: 'rgba(16, 110, 13, 0.616)'
};

const typeColor = {
  Brute: 'rgb(212, 86, 86)',
  Intelligence: 'rgb(86, 108, 198)',
  Action: 'rgb(150, 240, 158)',
};

// Define props
const props = defineProps([
  'card',
  'index',
  'length',
  'size',
  'full',
  'dynamic_position'
]);

const card_ref = ref(null);
const card_background = ref();

onMounted(() => {
  if (props.dynamic_position) {
    card_ref.value.classList.add('dynamic_position');
  } else{
    card_ref.value.classList.add('no_dynamic_position');
  }

  if(props.card['type']){
    card_background.value = typeColor[props.card['type']]
  } else {
    card_background.value = typeColor['Action']
  }
});

// Function to parse values
function parseValues(values) {
  let tempResult = {};
    let result = {};
    
    // Check if values are defined
    if (values) {
        let pairs = values.split(';');
    
        pairs.forEach(pair => {
            let [key, value] = pair.split('=');
            if (key === 'block' || key === 'redirect') {
                result[key] = parseInt(value);
            } else if (key === 'percentage_value' || key === 'percentage') {
                tempResult[key] = value;
            } else if (key.startsWith('conditional')) {
                result['conditional'] = null;
            }
        });
    
        // Handle percentage_value and percentage
        if (tempResult['percentage_value']) {
            result[tempResult['percentage_value']] = `${tempResult['percentage']}%`;
        }
    }
    
    return result;
}

// Get parsed values
const values = parseValues(props.card["values"]);

// Dictionary for value images
const valueImages = {
  redirect: redirectImage,
  block: blockImage,
  blocked: blockImage,
  conditional: conditionalImage
};

</script>

<template>
  <div class="card" ref="card_ref"
    :style="{background: card_background, '--order': props.index + 1, '--quantity': props.length + 1, '--size': props.size}">
    <div v-if="props.full" class="full_card">
      <div class="card_header" :style="{background: playerTypeColor[props.card['playerType']]}">
        <h2>{{ props.card["name"] }}</h2>
        <div class="left_side_header">
          <div class="card_price">
            {{ props.card["price"] }}
          </div>
          <img v-if="typeImages[props.card['type']]" :src="typeImages[props.card['type']]" alt="Type Image" class="type-image"> 
        </div>
      </div>
      <div class="card_img">
        <img :src='props.card["image"]' :alt="' image'" class="card_image">
      </div>
      <div class="card_stats">
        <div class="values" v-if="Object.keys(values).length"  :style="{'--value_quantity': Object.keys(values).length}">
          <div v-for="(value, key) in values" :key="key" class="value-item">
            <img :src="valueImages[key]" :alt="key + ' image'" class="value-image">
            <span class="values_value">{{ value }}</span>
          </div>
        </div>
      </div>  
      <div class="card_description">
        <p>{{ props.card["description"] }}</p>
      </div>
    </div>

    <div v-else  class="simple_card">
      <div class="card_header_simple" :style="{background: playerTypeColor[props.card['playerType']]}">
        <h2>{{ props.card["name"] }}</h2>
      </div>
      <div class="card_img_simple">
        <img :src='props.card["image"]' :alt="' image'" class="card_image">
      </div>
      <img  v-if="props.card['type']" :src="typeImages[props.card['type']]" alt="Type Image" class="type-image_simple"> 
      <div class="card_stats_simple">
        <div class="values_simple" v-if="Object.keys(values).length" :style="{'--value_quantity': Object.keys(values).length}">
          <div v-for="(value, key) in values" :key="key" class="value-item">
            <img :src="valueImages[key]" :alt="key + ' image'" class="value-image_simple">
            <span class="values_value">{{ value }}</span>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<style>
.full_card, .simple_card{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
}

.card_header{
  height: calc(10 * var(--size) * 1%);
  width: 85%;
  margin-top: calc(0.5 * var(--size) * 1vw);
  border: 0.1vw solid black;
  border-radius: calc(0.4 * var(--size) * 1vw);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: calc(0.8 * var(--size) * 1vw);
}

.card_header_simple{
  height: calc(30 * var(--size) * 1%);
  width: 85%;
  margin-top: calc(0.5 * var(--size) * 1vw);
  border: 0.1vw solid black;
  border-radius: calc(0.4 * var(--size) * 1vw);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: calc(0.8 * var(--size) * 1vw);
}

.left_side_header{
  height: 100%;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card_price{
  width: calc(1.2 * var(--size) * 1vw);
  min-width: calc(1.2 * var(--size) * 1vw);
  height: calc(1.2 * var(--size) * 1vw);
  max-height: calc(1.1 * var(--size) * 1vw);
  background-color: rgb(189, 201, 30);
  border: 0.15vw solid rgb(74, 75, 5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: calc(2 * var(--size) * 1vw);
  margin-left: auto;
  margin-right: calc(0.2 * var(--size) * 1vw);
  font-size: calc(1.3 * var(--size) * 1vw);
  font-family: "Venily", Courier, monospace;
}

.card_img{
  height: 40%;
  width: 90%;
  margin-top: calc(0.2 * var(--size) * 1vw);
  border: 0.1vw solid black;
  border-radius: calc(0.2 * var(--size) * 1vw);
}

.card_img_simple{
  height: 65%;
  width: 90%;
  margin-top: calc(0.2 * var(--size) * 1vw);
  border: 0.1vw solid black;
  border-radius: calc(0.2 * var(--size) * 1vw);
}

.card_stats{
  height: 8%;
  width: 90%;
  margin-top: calc(0.2 * var(--size) * 1vw);
  border: 0.1vw solid black;
  border-radius: calc(0.2 * var(--size) * 1vw);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.card_stats_simple{
  height: 15%;
  width: 90%;
  margin-top: calc(0.2 * var(--size) * 1vw);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-size: calc(2.5 * var(--size) * 1vw);
}

.card_description{
  height: 25%;
  width: 80%;
  border: 0.1vw solid black;
  border-radius: calc(0.2 * var(--size) * 1vw);
  padding: calc(0.8 * var(--size) * 1vw);
  margin-top: calc(0.2 * var(--size) * 1vw);
}

.no_dynamic_position {
  position: absolute; 
  left: calc(50% - 16 * var(--size) * 0.5vw);
}

.values_value{
  margin-left: calc(-0.5 * var(--size) * 1vw);
}

.card {
  height: calc(23 * var(--size) * 1vw);
  width: calc(16 * var(--size) * 1vw);
  border-radius: 5%;
  box-shadow: rgb(87, 87, 87) 0 0 1.5vw;
  font-size: calc(1 * var(--size) * 1vw);
  transition: 0.5s;
  --card-width: calc(16 * var(--size));
  z-index: 1;
}

.card h2 {
  font-size: calc(1 * var(--size) * 1vw);
  font-family: "Venily", Courier, monospace;
  position: relative;
  margin-left: calc(-0.5 * var(--size) * 1vw);
}

.card p {
  text-align: justify;
  font-size: calc(0.7 * var(--size) * 1vw);
  font-family: "Venily", Courier, monospace;
}

.type-image {
  height: 80%;
  object-fit: cover;
  margin-left: auto;
  margin-right: calc(0.2 * var(--size) * 1vw);
}

.values {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(5 * var(--size) / var(--value_quantity) * 1vw);
  font-family: "Venily", Courier, monospace;

}

.card_image{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.values_simple {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(9 * var(--size) / var(--value_quantity) * 1vw);
  font-family: "Venily", Courier, monospace;
  z-index: 5;
}

.value-item {
  display: flex;
  align-items: center;
}

.value-image {
  width: calc(1.5 * var(--size) * 1vw);
  height: calc(1.5 * var(--size) * 1vw);
  margin-right: 0.5vw;
  object-fit: cover;
}

.value-image_simple{
  width: calc(3 * var(--size) * 1vw);
  height: calc(3 * var(--size) * 1vw);
  margin-right: calc(-2.4 * var(--size) * 1vw);
  position: relative;
  left: calc(-0.85 * var(--size) * 1vw);
  object-fit: cover;
  z-index: -1;
}

.type-image_simple{
  height: calc(3 * var(--size) * 1vw);
  object-fit: cover;
  position: absolute;
  top: calc(3 * var(--size) * 1vw);
}

</style>
