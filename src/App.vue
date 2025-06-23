<template>
  <LanguageToggle class="app-header"/>
  <MainBanner />
</template>

<script setup lang="ts">
import MainBanner from '@/components/Banner/MainBanner.vue'
import LanguageToggle from '@/components/Language/LanguageToggle.vue'
</script>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  right: 0;
  width: fit-content;
  z-index: 10;
  border-radius: 0 0 0 12px;
  box-shadow: var(--shadow-basic);
}
</style>