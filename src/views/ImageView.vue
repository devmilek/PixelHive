<template>
  <div class='overlay'>
    <div class='modal'>
      <div class='image-container'>
        <img src='' />
      </div>
      <h1 class='text is-xl'>Blog post published</h1>
      <p class='text is-sm'>This blog post has been published. Team members will be able to edit this post and republish changes.</p>
      <div class='actions'>
        <HButton hierarchy='is-secondary-gray' size='is-lg'>Close</HButton>
        <HButton size='is-lg'>Download</HButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import HButton from '@/components/HButton.vue'
</script>

<style scoped lang='scss'>
.overlay {
  background: rgba(52, 64, 84, 0.7);
  backdrop-filter: blur(8px);
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  max-width: 980px;
  background: white;
  width: 100%;
  padding: 24px;
  border-radius: 16px;
}

h1 {
  font-weight: 600;
}

p {
  color: var(--gray-500);
}

.actions {
  display: flex;
  margin-top: 24px;
  gap: 16px;
  button {
    width: 100%;
  }
}
</style>