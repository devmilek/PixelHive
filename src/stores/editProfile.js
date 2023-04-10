import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useEditProfileStore = defineStore('editProfile', () => {
  const authStore = useAuthStore()

  const isModalOpened = ref(false)
  const name = authStore.user.displayName
  const email = authStore.user.email

  return { isModalOpened, name, email }
})
