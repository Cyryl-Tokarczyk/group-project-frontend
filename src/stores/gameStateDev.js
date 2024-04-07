import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useGameStateStore = defineStore('gameState', () => {
  const playerType = ref('student')
  const opponentType = computed(() => {
    if (playerType.value == 'student') {
      return 'teacher'
    }
    if (playerType.value == 'teacher') {
      return 'student'
    }

    // Error if playerType doesn't match 'student' or 'teacher'
    throw new Error('Wrong/No playerType set')
  })

  const money = ref(1000)
  const morale = ref({
    'student': 100,
    'teacher': 90
  })
  const playersMorale = computed(() => {
    if (playerType.value == 'student') {
      return morale.value['student']
    }
    if (playerType.value == 'teacher') {
      return morale.value['teacher']
    }

    // Error if playerType doesn't match 'student' or 'teacher'
    throw new Error('Wrong/No playerType set')
  })

  const opponentsMorale = computed(() => {
    if (playerType.value == 'student') {
      return morale.value['teacher']
    }
    if (playerType.value == 'teacher') {
      return morale.value['student']
    }

    // Error if playerType doesn't match 'student' or 'teacher'
    throw new Error('Wrong/No playerType set')
  })

  const actionCards = ref([{id: 1,des: "Karta A 1",color: "rgb(50,50,100)"},{id: 2,des: "Karta A 2",color: "rgb(100,50,0)"},{id: 3,des: "Karta A 3",color: "rgb(50,150,50)"},{id: 1,des: "Karta A 1",color: "rgb(150,210,100)"},{id: 2,des: "Karta A 2",color: "rgb(50,150,80)"},{id: 3,des: "Karta A 3",color: "rgb(150,50,100)"}])
  const reactionCards = ref([{id: 2,des: "Karta R 2",color: "rgb(50,150,80)"},{id: 1,des: "Karta R 1",color: "rgb(150,210,100)"},{id: 2,des: "Karta R 2",color: "rgb(50,150,80)"},{id: 1,des: "Karta R 1",color: "rgb(150,210,100)"},{id: 2,des: "Karta R 2",color: "rgb(50,150,80)"},{id: 1,des: "Karta R 1",color: "rgb(150,210,100)"},{id: 2,des: "Karta R 2",color: "rgb(50,150,80)"},{id: 3,des: "Karta R 3",color: "rgb(150,50,100)"},{id: 1,des: "Karta R 1",color: "rgb(150,210,100)"},{id: 2,des: "Karta R 2",color: "rgb(50,150,80)"},{id: 3,des: "Karta R 3",color: "rgb(150,50,100)"},{id: 1,des: "Karta R 1",color: "rgb(150,210,100)"},{id: 2,des: "Karta R 2",color: "rgb(50,150,80)"},{id: 3,des: "Karta R 3",color: "rgb(150,50,100)"},{id: 1,des: "Karta R 1",color: "rgb(150,210,100)"},{id: 2,des: "Karta R 2",color: "rgb(50,150,80)"},{id: 3,des: "Karta R 3",color: "rgb(150,50,100)"},{id: 1,des: "Karta R 1",color: "rgb(150,210,100)"},{id: 2,des: "Karta R 2",color: "rgb(50,150,80)"},{id: 3,des: "Karta R 3",color: "rgb(150,50,100)"}])

  function setPlayerMorale() {
    if (playerType.value == 'student') {
      morale.value['student'] = 100
    }
    else if (playerType.value == 'teacher') {
      morale.value['teacher'] = 90
    }
    else {
      // Error if playerType doesn't match 'student' or 'teacher'
      throw new Error('Wrong/No playerType set')
    }
  }


  const opActionCards = ref([{id: 1,des: "Karta A 1",color: "rgb(50,150,120)"}])
  const opRactionCards = ref([{id: 1,des: "Karta R 1",color: "rgb(150,210,100)"},{id: 2,des: "Karta R 2",color: "rgb(50,150,80)"},{id: 3,des: "Karta R 3",color: "rgb(150,50,100)"}])

  return { playerType, opponentType, money, morale, playersMorale, opponentsMorale, actionCards, reactionCards, setPlayerMorale, opActionCards, opRactionCards }
})