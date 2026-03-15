<template>
  <div class="billing-toggle">
    <button :class="{ active: modelValue === 'monthly' }" @click="emit('update:modelValue', 'monthly')">
      Monthly
    </button>
    <button :class="{ active: modelValue === 'annual' }" @click="emit('update:modelValue', 'annual')">
      Annual
      <span class="save-badge">Save 20%</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: 'monthly' | 'annual' }>()
const emit = defineEmits<{ 'update:modelValue': ['monthly' | 'annual'] }>()
</script>

<style scoped>
.billing-toggle {
  display: inline-flex;
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 4px;
  margin-top: 28px;
  gap: 4px;
}
.billing-toggle button {
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--dark-muted);
  padding: 8px 20px;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}
.billing-toggle button.active {
  background: var(--primary);
  color: white;
}
.save-badge {
  background: rgba(255, 255, 255, 0.25);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 100px;
}
</style>
