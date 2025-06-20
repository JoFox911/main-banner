<template>
  <div class="main-banner-content" :class="color">
    <div class="texts-block ">
      <MainTextAnimation v-if="color === 'black'" :animation-data="blackAnimationData" animation-name="main-text" />
      <MainTextAnimation v-else :animation-data="whiteAnimationData" animation-name="main-text-white" />

      <p class="subtitle">
        {{ t('banner_subtitle') }}
      </p>
    </div>
    <CustomButton :color="buttonColor" :text="t('join_our_team')" aria-label="Join our team" @click="clickedOnJoin" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import CustomButton from '@/components/CustomButton.vue'
import MainTextAnimation from '@/components/LottieAnimation.vue'
import { type ButtonColor } from '@/types/Data.ts'


import blackAnimationDataEN from '@/animation/main-text-en.json'
import blackAnimationDataUK from '@/animation/main-text-uk.json'
import whiteAnimationDataEN from '@/animation/main-text-en-white.json'
import whiteAnimationDataUK from '@/animation/main-text-uk-white.json'

import { useLocale } from '@/composables/useLocale'
const { t, locale } = useLocale()

interface Props {
  buttonColor?: ButtonColor
  color?: 'white' | 'black'
}

withDefaults(defineProps<Props>(), {
  buttonColor: 'accent',
  color: 'black'
})

const blackAnimationData = computed(() => locale.value === 'en' ? blackAnimationDataEN : blackAnimationDataUK)
const whiteAnimationData = computed(() => locale.value === 'en' ? whiteAnimationDataEN : whiteAnimationDataUK)

function clickedOnJoin() {
  console.log('Join button clicked')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_mixins.scss' as mixins;

.main-banner-content {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .texts-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 52px;

    @include mixins.max-1167 {
      margin-bottom: 36px;
    }
  }

  &.white {
    color: var(--color-content-100-inv);
  }

  &.black {
    color: var(--color-content-100);
  }

  .subtitle {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-regular);
    line-height: var(--font-size-lg);
    letter-spacing: 0px;
    margin-top: -50px;

    @include mixins.max-1167 {
      margin-top: -100px;
      max-width: 280px;
    }
  }
}
</style>