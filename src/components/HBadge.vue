<template>
  <div class='badge'>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'HBadge'
}
</script>

<style scoped>
.badge {
  padding: 2px 8px;
  border-radius: 999px;
  background-color: var(--gray-100);
  cursor: pointer;
}
</style>