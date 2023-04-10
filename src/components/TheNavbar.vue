<template>
  <header class='navbar'>
    <div class='container'>
      <div class='logo'>
        <img src='@/assets/pixelhive.svg'>
        <span>Pixelhive</span>
      </div>
      <nav v-if='!authStore.user'>
        <HButton size='is-lg' hierarchy='is-secondary-color'>Login</HButton>
        <HButton size='is-lg'>Register</HButton>
      </nav>
      <nav v-if='authStore.user'>
        <HButton size='is-lg' hierarchy='is-secondary-color' @click='openUploadModal'>Upload image</HButton>
        <HButton size='is-lg'>
          <UserIcon class='icon' />
        </HButton>
      </nav>
    </div>
  </header>
</template>

<script setup>
import HButton from '@/components/HButton.vue'
import { useAuthStore } from '@/stores/auth'
import { UserIcon } from '@heroicons/vue/24/solid'
import { useUploadImageStore } from '@/stores/uploadImage'

const uploadImageStore = useUploadImageStore()
const authStore = useAuthStore()

const openUploadModal = () => {
  uploadImageStore.isModalOpen = true
}
</script>

<style scoped lang='scss'>
.navbar {
  padding: 12px 0;
  border-bottom: 1px solid var(--gray-200);
  .logo {
    display: flex;
    align-items: center;
    img {
      height: 48px;
      margin-right: 12px;
    }
    span {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  nav {
    display: flex;
    gap: 16px;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
}
</style>