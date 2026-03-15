<template>
  <div class="section-label" :class="{ centered }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ centered?: boolean }>()
</script>

<style scoped>
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 14px;
}
.section-label::before {
  content: '';
  width: 20px;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
}
.section-label.centered {
  justify-content: center;
}
.section-label.centered::before {
  display: none;
}
</style>
