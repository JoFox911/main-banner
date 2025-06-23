<template>
  <div class="language-toggle">
    <span>EN</span>
    <UiToggle v-model="langToggle" />
    <span>UK</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import UiToggle from '@/components/ui/UiToggle.vue'
import { useLocale } from '@/composables/useLocale'

const { locale, changeLocale } = useLocale()
const langToggle = ref(locale.value === 'uk')

watch(locale, (newVal) => {
  langToggle.value = newVal === 'uk'
})

watch(langToggle, (val) => {
  changeLocale(val ? 'uk' : 'en')
})
</script>

<style scoped lang="scss">
.language-toggle {
  display: flex;
  align-items: center;
  background-color: var(--color-content-80-inv);
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
}
</style>
