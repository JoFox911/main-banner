<template>
  <div class="svg-wrapper">
    <div ref="mainText" class="animation-main-text" />
  </div>
</template>

<script lang="ts" setup>

import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import lottiePlayer, { type AnimationItem } from 'lottie-web';

interface Props {
  animationData: Object,
  loop?: boolean,
  autoplay?: boolean,
  animationName: string,
  renderer?: 'svg' | 'canvas' | 'html',
}

const props = withDefaults(defineProps<Props>(), {
  loop: true,
  autoplay: true,
  renderer: 'html',
})

const mainText = ref<HTMLElement | null>(null);
let anim: AnimationItem | null = null;

const loadAnimation = () => {
  if (mainText.value) {
    if (anim) {
      anim.destroy()
    }
    anim = lottiePlayer.loadAnimation({
      container: mainText.value,
      renderer: props.renderer,
      loop: props.loop,
      autoplay: props.autoplay,
      animationData: props.animationData,
      name: props.animationName,
    })
  }
}

onMounted(() => {
  loadAnimation()
})

watch(() => props.animationData, () => {
  loadAnimation()
}, { deep: true })


onBeforeUnmount(() => {
  if (anim) {
    anim.destroy(props.animationName)
  }
})
</script>

<style lang="scss">
@use '@/assets/styles/_mixins.scss' as mixins;

.animation-main-text {
  width: 100%;
  height: 100%;
}

.svg-wrapper {
  --lottie-scale: 0.8;
  scale: var(--lottie-scale);

  @include mixins.max-1167 {
    --lottie-scale: 0.4;
  }
}

.animation-main-text>div:first-child {
  position: relative !important;
  transform: unset !important;
}
</style>