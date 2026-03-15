<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="base-btn"
    :class="[`base-btn--${variant}`, { 'base-btn--sm': size === 'sm' }]"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md'
  href?: string
}>()
</script>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Fraunces', serif;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s, color 0.2s;
  font-size: 15px;
  padding: 13px 28px;
  border: none;
  text-decoration: none;
  letter-spacing: -0.01em;
}

.base-btn--sm { font-size: 13px; padding: 9px 20px; }

/* Primary */
.base-btn--primary {
  background: var(--primary);
  color: #fff;
}
.base-btn--primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(255, 122, 0, 0.28);
}

/* Outline */
.base-btn--outline {
  background: transparent;
  color: var(--dark);
  border: 1.5px solid var(--border);
}
.base-btn--outline:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-soft);
}
</style>
