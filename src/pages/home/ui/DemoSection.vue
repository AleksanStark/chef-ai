<script setup lang="ts">
import { SectionLabel } from '@/shared/ui'
import { DemoChat } from '@/features/demo-chat'

const POINTS = [
  { icon: '🗣️', text: 'Natural language — just type like texting a friend' },
  { icon: '⚡', text: 'Instant recipe suggestions in under 2 seconds' },
  { icon: '🎯', text: 'Adapts to your dietary goals and restrictions' },
]
</script>

<template>
  <section
    class="demo-section bg-[var(--light-bg)] px-[48px] py-[100px] max-md:px-[24px] max-md:py-[64px]"
  >
    <div
      class="demo-inner mx-auto grid max-w-[1160px] grid-cols-2 gap-[64px] items-center max-lg:grid-cols-1 max-lg:gap-[40px]"
    >
      <div class="demo-text reveal">
        <SectionLabel>Live demo</SectionLabel>
        <h2
          class="section-title text-[clamp(32px,4vw,48px)] font-[700] text-[var(--dark)] mt-2 mb-4"
        >
          See the magic happen
        </h2>
        <p
          class="section-sub text-[16px] text-[var(--dark-muted)] max-w-[480px] leading-[1.65] mb-6"
        >
          Just tell the AI what you've got. It understands natural language — no forms, no
          dropdowns, no friction.
        </p>

        <ul class="demo-points flex flex-col gap-[14px] mt-[28px] list-none">
          <li
            v-for="p in POINTS"
            :key="p.text"
            class="flex items-center gap-3 text-[14px] text-[var(--dark-muted)]"
          >
            <span
              class="point-icon w-[36px] h-[36px] flex items-center justify-center rounded-[8px] bg-[var(--primary-soft)] text-[17px] flex-shrink-0"
            >
              {{ p.icon }}
            </span>
            <span>{{ p.text }}</span>
          </li>
        </ul>

        <div class="tech-row flex flex-wrap items-center gap-[10px] mt-[28px]">
          <span class="tech-label text-[12px] uppercase tracking-[0.08em] text-[var(--dark-muted)]"
            >Built with</span
          >
          <span
            class="tech-badge qwen px-[12px] py-[4px] text-[12px] font-[500] rounded-[6px] bg-[var(--primary-soft)] border border-[rgba(255,122,0,0.25)] text-[var(--primary)]"
          >
            Qwen 2.5
          </span>
          <span
            class="tech-badge px-[12px] py-[4px] text-[12px] font-[500] rounded-[6px] bg-[var(--white)] border border-[var(--border)] text-[var(--dark-muted)]"
            >Vue 3</span
          >
          <span
            class="tech-badge px-[12px] py-[4px] text-[12px] font-[500] rounded-[6px] bg-[var(--white)] border border-[var(--border)] text-[var(--dark-muted)]"
            >TypeScript</span
          >
        </div>
      </div>

      <DemoChat class="reveal" style="transition-delay: 0.18s" />
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 900px) {
  .demo-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
@media (max-width: 768px) {
  .demo-section {
    padding: 64px 24px;
  }
}
</style>
