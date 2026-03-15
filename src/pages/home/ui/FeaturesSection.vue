<template>
  <section id="features" class="features-section">
    <div class="features-inner">
      <div class="features-header reveal">
        <SectionLabel>Features</SectionLabel>
        <h2 class="text-[24px]">Everything your<br />kitchen needs</h2>
        <p class="section-sub">
          Built by developers who care about clean code and clean eating.
        </p>
      </div>

      <div class="features-grid">
        <div
          v-for="(f, i) in FEATURES"
          :key="f.title"
          class="feature-card reveal"
          :style="`transition-delay:${i * 0.1}s`"
        >
          <div class="card-top">
            <span class="card-emoji">{{ f.emoji }}</span>
            <span class="card-tag">{{ f.tag }}</span>
          </div>
          <h3 class="card-title">{{ f.title }}</h3>
          <p class="card-desc">{{ f.desc }}</p>

          <div v-if="f.visual === 'macros'" class="visual-macros">
            <div v-for="m in MACROS" :key="m.label" class="macro-bar">
              <div class="macro-label">{{ m.label }}</div>
              <div class="macro-track">
                <div
                  class="macro-fill"
                  :style="`width:${m.pct}%;background:${m.color}`"
                />
              </div>
              <div class="macro-val">{{ m.val }}</div>
            </div>
          </div>

          <div v-if="f.visual === 'cart'" class="visual-cart">
            <div v-for="item in CART_ITEMS" :key="item" class="cart-pill">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SectionLabel } from "@/shared/ui";

const FEATURES = [
  {
    emoji: "🧠",
    tag: "AI-Powered",
    title: "Smart meal planning",
    desc: "Qwen AI analyzes your ingredients, dietary needs, and health goals to build a full weekly meal plan that actually makes sense for your lifestyle.",
    visual: null,
  },
  {
    emoji: "📊",
    tag: "Health data",
    title: "Nutrition tracking",
    desc: "Every recipe comes with a detailed breakdown — calories, macros, vitamins. Watch your progress daily.",
    visual: "macros",
  },
  {
    emoji: "🛒",
    tag: "Zero waste",
    title: "Smart shopping lists",
    desc: "Missing just one ingredient? We generate a minimal shopping list so you never overbuy.",
    visual: "cart",
  },
  {
    emoji: "🔄",
    tag: "Personalized",
    title: "Adapts to your taste",
    desc: "The AI learns your preferences over time and never suggests the same thing twice unless you ask.",
    visual: null,
  },
];

const MACROS = [
  { label: "Protein", val: "24g", pct: 68, color: "var(--primary)" },
  { label: "Carbs", val: "38g", pct: 48, color: "var(--accent)" },
  { label: "Fat", val: "14g", pct: 32, color: "var(--accent-light)" },
  { label: "Fiber", val: "8g", pct: 22, color: "#a3c96e" },
];

const CART_ITEMS = ["🥬 Spinach", "🍋 Lemon", "🫒 Olive oil", "🌿 Basil"];
</script>

<style scoped>
.features-section {
  padding: 100px 0;
  background: var(--white);
}
.features-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 48px;
}
.features-header {
  margin-bottom: 56px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.feature-card {
  background: var(--light-bg);
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 36px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
.feature-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent-light));
  opacity: 0;
  transition: opacity 0.3s;
}
.feature-card:hover::before {
  opacity: 1;
}
.feature-card:hover {
  border-color: rgba(255, 122, 0, 0.3);
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.card-emoji {
  font-size: 32px;
  line-height: 1;
}
.card-tag {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid rgba(255, 122, 0, 0.18);
}
.card-title {
  font-family: "Fraunces", serif;
  font-weight: 700;
  font-size: 21px;
  color: var(--dark);
  margin-bottom: 10px;
}
.card-desc {
  font-size: 14px;
  color: var(--dark-muted);
  line-height: 1.72;
}

.visual-macros {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.macro-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}
.macro-label {
  font-size: 12px;
  color: var(--dark-muted);
  width: 50px;
  flex-shrink: 0;
}
.macro-track {
  flex: 1;
  height: 6px;
  background: var(--primary-soft);
  border-radius: 100px;
  overflow: hidden;
}
.macro-fill {
  height: 100%;
  border-radius: 100px;
}
.macro-val {
  font-size: 12px;
  font-weight: 500;
  color: var(--dark);
  width: 28px;
  text-align: right;
  flex-shrink: 0;
}

.visual-cart {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}
.cart-pill {
  background: var(--white);
  border: 1.5px solid var(--border);
  color: var(--dark-muted);
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 100px;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  .features-section {
    padding: 64px 0;
  }
  .features-inner {
    padding: 0 24px;
  }
}
</style>
