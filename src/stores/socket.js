import { defineStore } from "pinia";
import { ref } from "vue";
import router from '@/router';

export const useSocketStore = defineStore('socket', () => {
  const isOpen = ref(false)
  const socket = ref(null)

  function connect(url) {
    console.log(url);
    socket.value = new WebSocket(url)
    console.log('Socket state: ' + socket.value.readyState);
    
    socket.value.onopen = onOpen
    socket.value.onmessage = onMessageHandler
  }

  function onOpen() {
    isOpen.value = true
    console.log('Socket state: ' + socket.value.readyState);
  }
  
  function onMessageHandler(event) {
    var reply = JSON.parse(event.data)

    if (reply['type'] == 'game_start' /* and if current route == connect */) {
      router.push({ name: 'game' })
    }
  }

  return { isOpen, socket, connect, onOpen, onMessageHandler }
})