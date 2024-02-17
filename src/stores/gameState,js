import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useGameStateStore = defineStore('gameState', () => {
  const playerType = ref('')
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
    'student': 0,
    'teacher': 0
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

  const actionCards = ref([])
  const reactionCards = ref([])

  function setPlayerMorale(value) {
    if (playerType.value == 'student') {
      morale.value['student'] = value
    }
    else if (playerType.value == 'teacher') {
      morale.value['teacher'] = value
    }
    else {
      // Error if playerType doesn't match 'student' or 'teacher'
      throw new Error('Wrong/No playerType set')
    }
  }

  return { playerType, opponentType, money, morale, playersMorale, actionCards, reactionCards, setPlayerMorale }
})