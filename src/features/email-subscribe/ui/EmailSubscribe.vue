<template>
  <div class="subscribe-form">
    <input
      v-model="email"
      type="email"
      placeholder="your@email.com"
      @keydown.enter="handleSubmit"
    />
    <BaseButton variant="primary" @click="handleSubmit">
      {{ label }}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseButton } from '@/shared/ui'

const props = withDefaults(defineProps<{ label?: string }>(), {
  label: 'Get free access',
})

const emit = defineEmits<{ submit: [email: string] }>()
const email = ref('')

function handleSubmit() {
  if (!email.value.trim()) return
  emit('submit', email.value.trim())
  email.value = ''
}
</script>

<style scoped>
.subscribe-form {
  display: flex;
  gap: 10px;
  max-width: 440px;
  width: 100%;
}
.subscribe-form input {
  flex: 1;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 13px 18px;
  font-size: 14px;
  color: white;
  font-family: 'DM Sans', sans-serif;
  outline: none;
  transition: border-color 0.2s;
}
.subscribe-form input::placeholder { color: rgba(255, 255, 255, 0.35); }
.subscribe-form input:focus { border-color: var(--primary); }
</style>
