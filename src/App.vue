<template>
  <section>
    <div ref="containerRef" class="main-banner" :class="{ 'loaded': loaded }">
      <div v-if="isLoaded" class="upper-layer" :class="{ 'expanded': isExpandedCover }">
        <MainBannerContent button-color="white" color="white" />
        <video autoplay muted loop playsinline>
          <source src="/videos/main.mp4" type="video/mp4">
        </video>
      </div>

      <MainBannerContent button-color="accent" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

import MainBannerContent from '@/components/BannerContent.vue'

let expandIntervalId: ReturnType<typeof setInterval> | null = null
let uncoverDelayIntervalId: ReturnType<typeof setTimeout> | null = null

const containerRef = ref<null | HTMLElement>(null)
const currentRadius = ref(0)
const isExpandedCover = ref(false)
const isLoaded = ref(false)
const loaded = ref(false)

const isTouchDevice = computed(() => 'ontouchstart' in window || navigator.maxTouchPoints)

function listenToUserMovements() {
  containerRef.value?.addEventListener('mouseenter', onMouseover, false)
  containerRef.value?.addEventListener('mouseleave', onMouseout, false)
  containerRef.value?.addEventListener('mousemove', updateCoords, true)
  isLoaded.value = true
}

function stopListeningUserMovements() {
  containerRef.value?.removeEventListener('mouseenter', onMouseover, false)
  containerRef.value?.removeEventListener('mouseleave', onMouseout, false)
  containerRef.value?.removeEventListener('mousemove', updateCoords, true)
}

function getMaxExpRadius() {
  if (!containerRef.value) return 0
  return 2 * Math.max((containerRef.value?.getBoundingClientRect().width ?? 0), (containerRef.value?.getBoundingClientRect().height ?? 0))
}

onMounted(() => {
  loaded.value = true
  resetRadius()

  if (isTouchDevice.value) {
    autoExpandForTouchDevices()
  } else {
    listenToUserMovements()
  }
})

onUnmounted(() => {
  stopListeningUserMovements()
  resetTimers()
})

function autoExpandForTouchDevices() {
  isLoaded.value = true
  isExpandedCover.value = true
  containerRef.value?.style.setProperty('--x', '0px')
  containerRef.value?.style.setProperty('--y', '0px')

  uncoverDelayIntervalId = setTimeout(() => {
    expandRadius(getMaxExpRadius(), 20)
  }, 1000)
}

function onMouseover() {
  if (!isExpandedCover.value && !expandIntervalId) {
    expandRadius()
  }
}

function onMouseout() {
  resetRadius()
  resetTimers()
}

function resetTimers() {
  if (expandIntervalId) {
    clearInterval(expandIntervalId)
    expandIntervalId = null
  }

  if (uncoverDelayIntervalId) {
    clearTimeout(uncoverDelayIntervalId)
    uncoverDelayIntervalId = null
  }
}

function resetRadius() {
  currentRadius.value = 0
  containerRef.value?.style.setProperty('--r', currentRadius.value + 'px')
}

function expandRadius(maxRadius = 120, radiusStep = 2) {
  expandIntervalId = setInterval(() => {
    if (currentRadius.value <= maxRadius) {
      currentRadius.value += radiusStep
      containerRef.value?.style.setProperty('--r', currentRadius.value + 'px')
    } else {
      resetTimers()

      if (!isExpandedCover.value) {
        isExpandedCover.value = true
        expandRadius(getMaxExpRadius(), 20)
        stopListeningUserMovements()
      }
    }
  }, 20)
}

function updateCoords(event: MouseEvent) {
  if (!containerRef.value) {
    return
  }

  const offsetX = event.clientX - containerRef.value.getBoundingClientRect().left
  const offsetY = event.clientY - containerRef.value.getBoundingClientRect().top

  containerRef.value.style.setProperty('--x', offsetX + 'px')
  containerRef.value.style.setProperty('--y', offsetY + 'px')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_mixins.scss' as mixins;

.main-banner {
  margin-top: 0;
  height: 100dvh;
  min-height: 500px;
  max-height: 1000px;
  width: 100%;
  background-color: #f6f4f0;
  position: relative;
  opacity: 0;
  transition: opacity 1s ease;

  &.loaded {
    opacity: 1;
  }
}

.main-banner-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.main-banner:hover .upper-layer {
  display: block;
}

.main-banner-content {
  @include mixins.max-768 {
    margin-top: -20px;
  }
}

.upper-layer {
  height: 100%;
  width: 100%;
  clip-path: circle(var(--r) at var(--x) var(--y));
  display: none;
  position: relative;
  z-index: 1;

  .main-banner-content {
    z-index: 2;
  }

  &.expanded {
    display: block;
  }

  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>