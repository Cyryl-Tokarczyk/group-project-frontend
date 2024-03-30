import { defineStore } from "pinia";
import { ref } from "vue";
import router from '@/router';
import { Queue } from "@/lib/Queue";

export const useSocketStore = defineStore('socket', () => {
  const isOpen = ref(false)
  const socket = ref(null)
  const messageQueue = ref(new Queue())

  function connect(url) {
    console.log(url);
    socket.value = new WebSocket(url)
    console.log('Socket state: ' + socket.value.readyState);
    
    socket.value.onopen = onOpen
    socket.value.onmessage = onMessageHandler
  }

  function send(data) {
    socket.value.send(JSON.stringify(data))
  }

  function onOpen() {
    isOpen.value = true
    console.log('Socket state: ' + socket.value.readyState);
  }
  
  function onMessageHandler(event) {
    var reply = JSON.parse(event.data)

    if (reply['type'] == 'game_start' /* and if current route == connect */) {
      messageQueue.value.push(reply)
      router.push({ name: 'game' })
      return
    }

    console.log(messageQueue.value.push(reply));
  }

  return { isOpen, socket, messageQueue, connect, send, onOpen, onMessageHandler }
})