import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '@/firebase/config'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  // const doubleCount = computed(() => count.value * 2)
  function init() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
        console.log('user')
      } else {
        console.log('no user')
      }
    });
  }

  function logOut() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error)
    });
  }

  return { user, init, logOut }
})
