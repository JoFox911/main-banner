<template>
  <label
    class="ui-toggle"
    role="switch"
    :aria-checked="modelValue ? 'true' : 'false'"
  >
    <input
      type="checkbox"
      class="ui-toggle__input"
      :checked="modelValue"
      @change="onChange"
    />
    <span class="ui-toggle__slider" />
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function onChange(event: Event) {
  const target = event.target as HTMLInputElement | null
  if (target) {
    emit('update:modelValue', target.checked)
  }
}
</script>


<style lang="scss" scoped>
.ui-toggle {
  position: relative;
  width: 28px;
  height: 16px;
  display: inline-block;
  cursor: pointer;

  &__input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0;
    z-index: 2;
    cursor: pointer;
  }

  &__slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-content-90);
    border-radius: 20px;
    transition: background-color var(--transition-basic) ease;

    &::before {
      content: "";
      position: absolute;
      height: 12px;
      width: 12px;
      left: 2px;
      bottom: 2px;
      background-color: var(--color-primary);
      border-radius: 50%;
      transition: transform var(--transition-basic) ease;
    }
  }

  &__input:checked + &__slider::before {
    transform: translateX(12px);
  }
}
</style>
