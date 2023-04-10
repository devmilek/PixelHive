<template>
 <div class='alert' :class='alertsStore.alert.state'>
   <img class='icon' src='@/assets/icons/alert-circle.svg'>
   <h3 class='text is-sm'>{{ alertsStore.alert.alert }}</h3>
   <p class='text is-sm'>{{alertsStore.alert.desc}}</p>
   <img class='close' src='@/assets/icons/x-close.svg'>
 </div>
</template>

<script setup>
import { useAlertsStore } from '@/stores/alerts'

const alertsStore = useAlertsStore()
</script>

<style scoped lang='scss'>
.alert {
  max-width: 340px;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  position: relative;
  h3 {
    font-weight: 600;
    margin-bottom: 4px;
  }
  .icon {
    width: 20px;
    height: 20px;
    margin-bottom: 12px;
  }
  .close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}

.alert.error {
  background: var(--error-25);
  border: 1px solid var(--error-300);
  h3 {
    color: var(--error-700);
  }
  p {
    color: var(--error-700);
  }
  .icon {
    filter: invert(31%) sepia(90%) saturate(5126%) hue-rotate(351deg) brightness(88%) contrast(92%);
  }
  .close {
    filter: invert(31%) sepia(90%) saturate(5126%) hue-rotate(351deg) brightness(88%) contrast(92%);
  }
}
</style>