import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserDetailsStore = defineStore('userDetails', () => {
  const user_id = ref('')
  const username = ref('')
  const email = ref('')
  const phone = ref('')
  const bio = ref('')
  return { user_id, username, email, phone, bio }
})