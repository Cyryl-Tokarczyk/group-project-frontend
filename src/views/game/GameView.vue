<script setup>
import { onMounted } from 'vue';
import EventComponent from './components/EventComponent.vue';

import { useSocketStore } from '@/stores/socket';

const socketStore = useSocketStore()

/* Flow of reacting:
First message is popped on mount
After handling a message another message is popped from the queue
If there are no messages on the queue it should make a watch function watching a queue ???
*/

onMounted(() => {
  // Pop the first message

  handleMessage(socketStore.messsageQueue.pop())
})

function nextMessage() {
  handleMessage(socketStore.messsageQueue.pop())
}

// TODO: Make an enum out of message types

function handleMessage(message){
  switch (message.type) {
    case 'collect_action':
      handleCollectAction(message)
      break;
    default:
      break;
  }

  // Maybe just make a loop xd
  nextMessage()
}

function handleCollectAction(message) {
  // TODO: Handle the task
  console.log(message);

  // Send a response
  socketStore.send({
    type: 'collecting_move',
    choice: ''
  })
}

</script>

<template>
  <EventComponent />
</template>