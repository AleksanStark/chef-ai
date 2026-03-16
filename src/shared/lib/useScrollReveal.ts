import { onMounted } from 'vue'

/**
 * Attaches an IntersectionObserver to every `.reveal` element
 * found inside `scope` (defaults to `document`).
 * Adds `.visible` class when the element enters the viewport.
 */
export function useScrollReveal(threshold = 0.08) {
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold },
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
  })
}
