import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Returns a reactive `scrolled` boolean that becomes true
 * once the page has scrolled past `offset` pixels.
 */
export function useNavScroll(offset = 30) {
  const scrolled = ref(false)

  function onScroll() {
    scrolled.value = window.scrollY > offset
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { scrolled }
}
