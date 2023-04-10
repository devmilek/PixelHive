import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('alerts', () => {
  const alert = ref(null)

  function setAlert(alertMsg, state, desc) {
    console.log(alert)
    alert.value = {
      alert: alertMsg,
      state: state,
      desc: desc
    }
    setTimeout(() => {
      alert.value = null
    }, 5000)
  }

  return { alert, setAlert }
})
