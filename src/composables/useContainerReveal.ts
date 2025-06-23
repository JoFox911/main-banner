import { ref, type Ref, computed, onMounted, onUnmounted } from 'vue'

export function useContainerReveal(containerRef: Ref<HTMLElement | null>) {
  const currentRadius = ref(0)
  const isCoverExpanded = ref(false)
  const isCoverReady = ref(false)
  const isContainerMounted = ref(false)

  const isTouchDevice = computed(
    () => 'ontouchstart' in window || navigator.maxTouchPoints > 0
  )

  let uncoverDelayTimeout: ReturnType<typeof setTimeout> | null = null
  let animationFrameId: number | null = null
  let coordFrameId: number | null = null

  onMounted(() => {
    isContainerMounted.value = true
    resetRadius()

    if (isTouchDevice.value) {
      autoExpand()
    } else {
      startPointerListeners()
    }
  })

  onUnmounted(() => {
    stopPointerListeners()
    cancelAnimation()
    cancelCoordUpdate()
    if (uncoverDelayTimeout) clearTimeout(uncoverDelayTimeout)
  })

  function autoExpand() {
    isCoverReady.value = true
    isCoverExpanded.value = true
    containerRef.value?.style.setProperty('--x', '0px')
    containerRef.value?.style.setProperty('--y', '0px')

    uncoverDelayTimeout = setTimeout(() => {
      expandRadius(getMaxRadius(), 20)
    }, 1000)
  }

  function getMaxRadius(): number {
    if (!containerRef.value) return 0
    const rect = containerRef.value.getBoundingClientRect()
    return 2 * Math.max(rect.width, rect.height)
  }

  function expandRadius(maxRadius = 120, step = 2) {
    cancelAnimation()

    const animate = () => {
      if (!containerRef.value) return

      if (currentRadius.value <= maxRadius) {
        currentRadius.value += step
        containerRef.value.style.setProperty('--r', `${currentRadius.value}px`)
        animationFrameId = requestAnimationFrame(animate)
      } else {
        cancelAnimation()
        if (!isCoverExpanded.value) {
          isCoverExpanded.value = true
          expandRadius(getMaxRadius(), 20)
          stopPointerListeners()
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  function onMouseEnter() {
    if (!isCoverExpanded.value && !animationFrameId) {
      expandRadius()
    }
  }

  function onMouseLeave() {
    resetRadius()
    cancelAnimation()
  }

  function updateCoords(event: MouseEvent) {
    cancelCoordUpdate()

    coordFrameId = requestAnimationFrame(() => {
      if (!containerRef.value) return
      const rect = containerRef.value.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      containerRef.value.style.setProperty('--x', `${x}px`)
      containerRef.value.style.setProperty('--y', `${y}px`)
    })
  }

  function startPointerListeners() {
    const el = containerRef.value
    if (!el) return

    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mousemove', updateCoords)
    isCoverReady.value = true
  }

  function stopPointerListeners() {
    const el = containerRef.value
    if (!el) return

    el.removeEventListener('mouseenter', onMouseEnter)
    el.removeEventListener('mouseleave', onMouseLeave)
    el.removeEventListener('mousemove', updateCoords)
  }

  function resetRadius() {
    currentRadius.value = 0
    containerRef.value?.style.setProperty('--r', '0px')
  }

  function cancelAnimation() {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  function cancelCoordUpdate() {
    if (coordFrameId !== null) {
      cancelAnimationFrame(coordFrameId)
      coordFrameId = null
    }
  }

  return {
    isCoverReady,
    isCoverExpanded,
    isContainerMounted
  }
}
