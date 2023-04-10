<template>
  <TheNavbar v-if='showNavbar' />
  <RouterView></RouterView>
  <UploadImageModal v-if='uploadImageStore.isModalOpen' />
  <div class='notification-container'>
    <HAlert v-if='alertsStore.alert' />
  </div>
</template>

<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import UploadImageModal from '@/components/UploadImageModal.vue'
import { useUploadImageStore } from '@/stores/uploadImage'
import { useAlertsStore } from '@/stores/alerts'
import HAlert from '@/components/HAlert.vue'

const route = useRoute()
const authStore = useAuthStore()
const uploadImageStore = useUploadImageStore()
const alertsStore = useAlertsStore()

onMounted(() => {
  authStore.init()
})

const showNavbar = computed(() => {
  if (route.name === 'register' || route.name === 'login' || route.name === 'image') {
    return false
  } else {
    return true
  }
})
</script>

<style>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 40px;
  padding-right: 40px;
}
</style>