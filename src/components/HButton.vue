<template>
  <button :class='[classes]'>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'is-md',
  },
  hierarchy: {
    type: String,
    default: 'primary',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const classes = computed(() => {
  return {
    button: true,
    [props.size]: true,
    [props.hierarchy]: true,
    'is-loading': props.loading,
  }
})
</script>

<style scoped lang='scss'>
.button {
  background-color: var(--primary-600);
  color: white;
  outline: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  height: min-content;
  border: none;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  span {
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  &:hover {
    background-color: var(--primary-700);
  }
  &:focus {
    box-shadow: 0px 0px 0px 4px var(--primary-50);
  }
  &[disabled] {
    background-color: var(--primary-200);
    cursor: not-allowed;
  }
}

// Loading state

.button.is-loading {
  pointer-events: none;
  cursor: not-allowed;
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: button-loading-spinner 1s ease infinite;
  }
  span {
    visibility: hidden;
  }
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}

/* SIZES */

.button {
  &.is-sm {
    padding: 8px 14px;
    font-size: 14px;
    line-height: 20px;
  }
  &.is-md {
    padding: 10px 16px;
    font-size: 14px;
    line-height: 20px;
  }
  &.is-lg {
    padding: 10px 18px;
    font-size: 16px;
    line-height: 24px;
  }
  &.is-xl {
    padding: 12px 20px;
    font-size: 16px;
    line-height: 24px;
  }
  &.is-2xl {
    padding: 16px 28px;
    font-size: 18px;
    line-height: 28px;
  }
}

/* Hierarchy */
.button {
  &.is-secondary-color {
    background-color: var(--primary-100);
    color: var(--primary-700);
    &:hover {
      background-color: var(--primary-200);
    }
    &:focus {
      box-shadow: 0px 0px 0px 4px var(--primary-50);
    }
    &[disabled] {
      background-color: var(--primary-50);
      color: var(--primary-300);
    }
  }
  &.is-secondary-gray {
    background-color: white;
    color: var(--gray-700);
    border: 1px solid var(--gray-300);
    &:hover {
      background-color: var(--gray-50);
    }
    &:focus {
      box-shadow: 0px 0px 0px 4px var(--gray-100);
    }
    &[disabled] {
      color: var(--gray-300);
      border: 1px solid var(--gray-300);
      cursor: not-allowed;
    }
  }
  &.is-tertiary-color {
    background-color: transparent;
    color: var(--primary-600);
    &:hover {
      background-color: var(--primary-50);
    }
    &[disabled] {
      color: var(--primary-300);
    }
  }
  &.is-tertiary-gray {
    background-color: transparent;
    color: var(--gray-700);
    &:hover {
      background-color: var(--gray-50);
    }
    &:focus {
      box-shadow: 0px 0px 0px 4px var(--gray-100);
    }
    &[disabled] {
      color: var(--gray-300);
    }
  }
}
</style>