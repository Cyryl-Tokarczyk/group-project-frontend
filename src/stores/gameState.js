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

    return ''
  })

  const money = ref(1000)
  const morale = ref({
    'student': 100,
    'teacher': 100
  })
  const playersMorale = computed(() => {
    if (playerType.value == 'student') {
      return morale.value['student']
    }
    if (playerType.value == 'teacher') {
      return morale.value['teacher']
    }

    // Error if playerType doesn't match 'student' or 'teacher'
    throw new Error('Players morale: Wrong/No playerType set')
  })
  const opponentsMorale = computed(() => {
    if (opponentType.value == 'student') {
      return morale.value['student']
    }
    if (opponentType.value == 'teacher') {
      return morale.value['teacher']
    }

    // Error if playerType doesn't match 'student' or 'teacher'
    throw new Error('Opponents morale: Wrong/No opponentType set')
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
      throw new Error('Set players morale: Wrong/No playerType set')
    }
  }

  function setOpponentMorale(value) {
    if (opponentType.value == 'student') {
      morale.value['student'] = value
    }
    else if (opponentType.value == 'teacher') {
      morale.value['teacher'] = value
    }
    else {
      // Error if playerType doesn't match 'student' or 'teacher'
      throw new Error('Set opponents morale: Wrong/No playerType set')
    }
  }

  return { playerType, opponentType, money, morale, playersMorale, opponentsMorale, actionCards, reactionCards, setPlayerMorale, setOpponentMorale }
})