<template>
  <div class="input-field" :class='{"destructive": destructive}'>
    <label :for="id" v-if='props.label' class='text is-sm'>{{ props.label }}</label>
    <input :id="id" :type="props.type" :placeholder="props.placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <p class='hint-text text is-sm' v-if='props.hint'>{{props.hint}}</p>
  </div>
</template>

<script setup>
import { makeId } from '@/composables/makeId'

defineEmits(['update:modelValue'])

const props = defineProps({
  label: {
    type: String,
  },
  hint: {
    type: String,
  },
  type: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
  },
  destructive: {
    type: Boolean,
    default: false
  }
})

const id = makeId(6)
</script>

<style scoped lang='scss'>
.input-field {
  display: flex;
  flex-direction: column;
  text-align: start;
  transition: .3s all ease;
  width: 100%;
}

.input-field.destructive {
  input {
    border: 1px solid var(--error-300);
    &:focus {
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEE4E2;
    }
  }
  .hint-text {
    color: var(--error-500);
  }
}

label {
  color: var(--gray-700);
  font-weight: 500;
  margin-bottom: 6px;
  margin-bottom: 6px;
}

.hint-text {
  color: var(--gray-600);
  margin-top: 6px;
}

input {
  border: 1px solid #D0D5DD;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  padding: 8px 12px;
  outline: none;
  color: var(--gray-900);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  transition: .3s all ease;
}

input::placeholder {
  color: var(--gray-500);
}

input:focus {
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px var(--primary-100);;
  border: 1px solid var(--primary-300);
}
</style>