<template>
  <main v-if='authStore.user'>
    <div class='profile'>
      <div class='heading'>
        <div class='gradient'></div>
        <div class='avatar'>
          <img :src='authStore.user.photoURL' alt='profile image'>
        </div>
      </div>
      <div class='profile-details container'>
        <h1 class='display is-sm'>{{authStore.user.displayName}}</h1>
        <p class='text is-md'>{{ authStore.user.email }}</p>
        <div class='actions'>
          <HButton size='is-lg' @click.prevent='signOut'>Edit profile</HButton>
          <HButton size='is-lg' @click.prevent='authStore.logOut()' hierarchy='is-secondary-gray'>Sign out</HButton>
        </div>
        <div class='search'>
          <InputField placeholder='Search something' type='text' class='search-input' />
          <HButton size='is-lg' hierarchy='is-secondary-color'>Search</HButton>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import HButton from '@/components/HButton.vue'
import { useAuthStore } from '@/stores/auth'
import InputField from '@/components/InputField.vue'

const authStore = useAuthStore()
</script>

<style scoped lang='scss'>
.profile {
  position: relative;
  .gradient {
    width: 100%;
    height: 280px;
    background: linear-gradient(45deg, #101828 0%, #475467 100%);
    position: absolute;
    top: 0;
    left: 0;
  }
  .heading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar {
    margin-top: 180px;
    border-radius: 200px;
    height: 160px;
    width: 160px;
    overflow: hidden;
    border: 4px solid #FFFFFF;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .profile-details {
    margin-top: 24px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-weight: 600;
    }
    p {
      color: var(--gray-600);
    }
    .actions {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
    .search {
      display: flex;
      margin-top: 24px;
      gap: 12px;
      .search-input {
        width: 300px;
      }
    }
  }
}
</style>