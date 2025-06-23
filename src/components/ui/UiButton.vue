<template>
  <button class="ui-button" :class="computedClasses" v-bind="$attrs" :type="props.type">
    <span v-if="text" class="button-extra-margin">{{ text }}</span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ButtonColor } from '@/types/Data.ts'

interface Props {
  color?: ButtonColor,
  text?: string,
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'accent',
  text: '',
  type: 'button'
})

const computedClasses = computed(() => ({
  [`ui-button--${props.color}`]: true,
}))
</script>

<style lang="scss" scoped>
.ui-button {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: var(--border-radius);
  padding: var(--spacing-md) var(--spacing-lg);
  max-width: 100%;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  box-sizing: border-box;
  transition: all var(--transition-basic) ease-in-out;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--font-size-lg);
  letter-spacing: 0rem;
  border: none;

  &--accent {
    background: var(--color-primary);
    color: var(--color-content-100);

    &:hover {
      background: linear-gradient(0deg, var(--color-alpha-12-inv) 0%, var(--color-alpha-12-inv) 100%), var(--color-primary);
      color: var(--color-content-100);
    }
  }

  &--white {
    background-color: var(--color-content-100-inv);
    color: var(--color-content-100);

    &:hover {
      color: var(--color-content-100-inv);
      background: linear-gradient(0deg, var(--color-alpha-12-inv) 0%, var(--color-alpha-12-inv) 100%), var(--color-content-100);
    }
  }
}
</style>
