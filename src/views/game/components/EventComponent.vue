<script setup>

const props = defineProps([
  'message'
])

const emit = defineEmits([
  'choice-made'
])

</script>

<template>
  <h2>Event: </h2>
  <p>{{ JSON.stringify(props.message) }}</p>
  <button @click.prevent="emit('choice-made')">Make choice</button>
</template>