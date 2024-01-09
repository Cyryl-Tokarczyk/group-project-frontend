<script setup>
import { onMounted } from 'vue';
import EventComponent from './EventComponent.vue';

import { useSocketStore } from '@/stores/socket';

const socketStore = useSocketStore()

onMounted(() => {
  // Pop the first message

  var serverMessage = socketStore.messsageQueue.pop()
})

</script>

<template>
  <EventComponent />
</template>