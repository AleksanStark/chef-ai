<template>
  <section class="demo-section">
    <div class="demo-inner">
      <div class="demo-text reveal">
        <SectionLabel>Live demo</SectionLabel>
        <h2 class="text-[24px]">See the magic happen</h2>
        <p class="section-sub">
          Just tell the AI what you've got. It understands natural language — no
          forms, no dropdowns, no friction.
        </p>

        <ul class="demo-points">
          <li v-for="p in POINTS" :key="p.text">
            <span class="point-icon">{{ p.icon }}</span>
            <span>{{ p.text }}</span>
          </li>
        </ul>

        <div class="tech-row">
          <span class="tech-label">Built with</span>
          <span class="tech-badge qwen">Qwen 2.5</span>
          <span class="tech-badge">Vue 3</span>
          <span class="tech-badge">TypeScript</span>
        </div>
      </div>

      <DemoChat class="reveal" style="transition-delay: 0.18s" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { SectionLabel } from "@/shared/ui";
import { DemoChat } from "@/features/demo-chat";

const POINTS = [
  { icon: "🗣️", text: "Natural language — just type like texting a friend" },
  { icon: "⚡", text: "Instant recipe suggestions in under 2 seconds" },
  { icon: "🎯", text: "Adapts to your dietary goals and restrictions" },
];
</script>

<style scoped>
.demo-section {
  padding: 100px 48px;
  background: var(--light-bg);
}
.demo-inner {
  max-width: 1160px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.demo-points {
  list-style: none;
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.demo-points li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--dark-muted);
}
.point-icon {
  width: 36px;
  height: 36px;
  background: var(--primary-soft);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex-shrink: 0;
}
.tech-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  flex-wrap: wrap;
}
.tech-label {
  font-size: 12px;
  color: var(--dark-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.tech-badge {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--dark-muted);
}
.tech-badge.qwen {
  color: var(--primary);
  border-color: rgba(255, 122, 0, 0.25);
  background: var(--primary-soft);
}

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
