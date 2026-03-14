<script setup lang="ts">
import { SectionLabel } from '@/shared/ui'

const FEATURES = [
  {
    emoji: '🧠',
    tag: 'AI-Powered',
    title: 'Smart meal planning',
    desc: 'Qwen AI analyzes your ingredients, dietary needs, and health goals to build a full weekly meal plan that actually makes sense for your lifestyle.',
    visual: null,
  },
  {
    emoji: '📊',
    tag: 'Health data',
    title: 'Nutrition tracking',
    desc: 'Every recipe comes with a detailed breakdown — calories, macros, vitamins. Watch your progress daily.',
    visual: 'macros',
  },
  {
    emoji: '🛒',
    tag: 'Zero waste',
    title: 'Smart shopping lists',
    desc: 'Missing just one ingredient? We generate a minimal shopping list so you never overbuy.',
    visual: 'cart',
  },
  {
    emoji: '🔄',
    tag: 'Personalized',
    title: 'Adapts to your taste',
    desc: 'The AI learns your preferences over time and never suggests the same thing twice unless you ask.',
    visual: null,
  },
]

const MACROS = [
  { label: 'Protein', val: '24g', pct: 68, color: 'var(--primary)' },
  { label: 'Carbs', val: '38g', pct: 48, color: 'var(--accent-light)' },
  { label: 'Fat', val: '14g', pct: 32, color: 'var(--accent-light)' },
  { label: 'Fiber', val: '8g', pct: 22, color: '#a3c96e' },
]

const CART_ITEMS = ['🥬 Spinach', '🍋 Lemon', '🫒 Olive oil', '🌿 Basil']
</script>

<template>
  <section id="features" class="features-section bg-[var(--white)] py-[100px] max-md:py-[64px]">
    <div class="features-inner mx-auto max-w-[1160px] px-[48px] max-md:px-[24px]">
      <div class="features-header reveal mb-[56px]">
        <SectionLabel>Features</SectionLabel>
        <h2
          class="section-title text-[clamp(32px,4vw,48px)] font-[700] text-[var(--dark)] leading-[1.2] mt-2 mb-4"
        >
          Everything your<br />kitchen needs
        </h2>
        <p class="section-sub text-[16px] text-[var(--dark-muted)] leading-[1.65]">
          Built by developers who care about clean code and clean eating.
        </p>
      </div>

      <div class="features-grid grid grid-cols-2 gap-[16px] max-md:grid-cols-1">
        <div
          v-for="(f, i) in FEATURES"
          :key="f.title"
          class="feature-card reveal relative overflow-hidden rounded-[20px] p-[36px] bg-[var(--light-bg)] border-[1.5px] border-[var(--border)] transition-all duration-300"
          :style="`transition-delay:${i * 0.1}s`"
        >
          <div class="card-top flex justify-between items-start mb-[20px]">
            <span class="card-emoji text-[32px]">{{ f.emoji }}</span>
            <span
              class="card-tag text-[11px] font-[500] tracking-[0.08em] uppercase text-[var(--primary)] bg-[var(--primary-soft)] px-[12px] py-[4px] rounded-[100px] border border-[rgba(255,122,0,0.18)]"
            >
              {{ f.tag }}
            </span>
          </div>

          <h3 class="card-title font-[700] text-[21px] text-[var(--dark)] mb-[10px]">
            {{ f.title }}
          </h3>
          <p class="card-desc text-[14px] text-[var(--dark-muted)] leading-[1.72]">{{ f.desc }}</p>

          <div
            v-if="f.visual === 'macros'"
            class="visual-macros mt-[24px] flex flex-col gap-[10px]"
          >
            <div v-for="m in MACROS" :key="m.label" class="macro-bar flex items-center gap-[10px]">
              <div class="macro-label text-[12px] text-[var(--dark-muted)] w-[50px] flex-shrink-0">
                {{ m.label }}
              </div>
              <div
                class="macro-track flex-1 h-[6px] bg-[var(--primary-soft)] rounded-[100px] overflow-hidden"
              >
                <div
                  class="macro-fill h-full rounded-[100px]"
                  :style="`width:${m.pct}%;background:${m.color}`"
                />
              </div>
              <div
                class="macro-val text-[12px] font-[500] text-[var(--dark)] w-[28px] text-right flex-shrink-0"
              >
                {{ m.val }}
              </div>
            </div>
          </div>

          <div v-if="f.visual === 'cart'" class="visual-cart mt-[20px] flex flex-wrap gap-[8px]">
            <div
              v-for="item in CART_ITEMS"
              :key="item"
              class="cart-pill text-[13px] text-[var(--dark-muted)] bg-[var(--white)] border-[1.5px] border-[var(--border)] px-[14px] py-[6px] rounded-[100px]"
            >
              {{ item }}
            </div>
          </div>

          <div
            class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--primary)] to-[var(--accent-light)] opacity-0 transition-opacity duration-300 feature-card-hover"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-card:hover {
  border-color: rgba(255, 122, 0, 0.3);
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}
.feature-card:hover > .feature-card-hover {
  opacity: 1;
}
</style>
