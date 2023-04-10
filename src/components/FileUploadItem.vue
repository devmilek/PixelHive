<template>
  <div class='item' :class='{"completed": completed}'>
    <div class='progress' :style='{width: progress + "%"}' v-if='!completed'></div>
    <div class='icon'>
      <img src='@/assets/icons/image.svg' alt='file' />
    </div>
    <div class='info'>
      <h5 class='text is-sm'>{{ props.name }}</h5>
      <p class='text is-sm'>{{ (size / (1024 * 1024)).toFixed(2) }} MB – {{ progress.toFixed() }}% uploaded</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  uploaded: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
})

const progress = computed(() => {
  return (props.uploaded / props.size) * 100
})
</script>

<style scoped lang='scss'>
.item {
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  display: flex;
  padding: 14px 16px;
  position: relative;
  &.completed {
    border-color: var(--primary-500);
  }
  //z-index: 2;
  .icon {
    background: #D1FADF;
    border: 4px solid #ECFDF3;
    border-radius: 28px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
  }
  h5 {
    color: var(--gray-700);
    font-weight: 500;
  }
  p {
    color: var(--gray-500);
  }
  .progress {
    height: 100%;
    background: var(--gray-50);
    position: absolute;
    top: 0;
    left: 0;
    transition: .2s all ease;
    //z-index: 1;
  }
}
</style>