<template>
  <section>
    <div ref="containerRef" class="main-banner" :class="{ loaded: isContainerMounted }">
      <div v-if="isCoverReady" class="banner-cover" :class="{ expanded: isCoverExpanded }">
        <MainBannerContent button-color="white" color="white" />
        <video autoplay muted loop playsinline>
          <source src="/videos/main.mp4" type="video/mp4" />
        </video>
      </div>

      <MainBannerContent button-color="accent" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainBannerContent from '@/components/Banner/BannerContent.vue'
import { useContainerReveal } from '@/composables/useContainerReveal'

const containerRef = ref<HTMLElement | null>(null)

const {
  isCoverReady,
  isCoverExpanded,
  isContainerMounted
} = useContainerReveal(containerRef)
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

.main-banner:hover .banner-cover {
  display: block;
}

.main-banner-content {
  @include mixins.max-768 {
    margin-top: -20px;
  }
}

.banner-cover {
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