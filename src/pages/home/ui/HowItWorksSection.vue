<template>
  <section id="how" class="how-section">
    <div class="how-inner">
      <div class="how-header reveal">
        <SectionLabel centered>How it works</SectionLabel>
        <h2 class="text-[24px]" style="text-align: center">
          From fridge to table<br />in three steps
        </h2>
        <p class="section-sub" style="margin: 14px auto 0; text-align: center">
          No shopping needed. No waste. Just real food from what you already have.
        </p>
      </div>

      <div class="steps-grid">
        <div
          v-for="(step, i) in STEPS"
          :key="step.title"
          class="step-card reveal"
          :style="`transition-delay:${i * 0.12}s`"
        >
          <div class="step-num">0{{ i + 1 }}</div>
          <div class="step-icon">{{ step.icon }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-desc">{{ step.desc }}</p>
          <div v-if="i < STEPS.length - 1" class="step-arrow">→</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SectionLabel } from '@/shared/ui'

const STEPS = [
  {
    icon: '📦',
    title: 'List your ingredients',
    desc: "Type or photograph what's in your fridge. Our AI instantly recognizes and categorizes every product — from half an onion to leftover chicken.",
  },
  {
    icon: '🎯',
    title: 'Set your goals',
    desc: "Losing weight? Building muscle? Tell us your goals and dietary restrictions and we'll optimize every single meal for your body.",
  },
  {
    icon: '🍽️',
    title: 'Get your recipes',
    desc: "Receive a personalized meal plan with step-by-step recipes, nutritional breakdown, and smart shopping suggestions for what's missing.",
  },
]
</script>

<style scoped>
.how-section {
  background: var(--white);
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
  padding: 100px 0;
}
.how-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 48px;
}
.how-header {
  margin-bottom: 64px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: var(--border);
  border-radius: 20px;
}
.step-card {
  background: var(--light-bg);
  padding: 44px 36px;
  position: relative;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}
.step-card:hover {
  background: var(--primary-soft);
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  z-index: 2;
}
.step-card:first-child {
  border-radius: 20px 0 0 20px;
}
.step-card:last-child {
  border-radius: 0 20px 20px 0;
}

.step-num {
  font-family: 'Fraunces', serif;
  font-weight: 900;
  font-size: 72px;
  color: rgba(255, 122, 0, 0.1);
  line-height: 1;
  margin-bottom: 20px;
  letter-spacing: -0.04em;
}
.step-icon {
  width: 52px;
  height: 52px;
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 20px;
  box-shadow: var(--shadow-sm);
}
.step-title {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--dark);
}
.step-desc {
  font-size: 14px;
  color: var(--dark-muted);
  line-height: 1.7;
}
.step-arrow {
  position: absolute;
  right: -16px;
  top: 50%;
  transform: translateY(-50%) scale(0.9);
  opacity: 0;

  transition:
    transform 0.25s ease,
    opacity 0.25s ease;

  z-index: 10;

  width: 32px;
  height: 32px;
  background: var(--primary);
  color: white;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  box-shadow: 0 4px 12px rgba(255, 122, 0, 0.3);
}

.step-card:hover .step-arrow {
  opacity: 1;
  transform: translateY(-50%) translateX(6px) scale(1);
}

.demo-strip {
  margin-top: 48px;
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  box-shadow: var(--shadow-sm);
}
.strip-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--dark-muted);
  white-space: nowrap;
}
.fridge-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
}
.fridge-pill {
  background: var(--primary-soft);
  border: 1px solid rgba(255, 122, 0, 0.18);
  color: var(--primary);
  font-size: 13px;
  padding: 5px 14px;
  border-radius: 100px;
}
.strip-arrow {
  flex-shrink: 0;
}
.strip-output {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--primary-soft);
  border: 1.5px solid rgba(255, 122, 0, 0.22);
  border-radius: 12px;
  padding: 12px 20px;
  flex-shrink: 0;
}
.output-icon {
  font-size: 28px;
}
.output-title {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--dark);
}
.output-meta {
  font-size: 12px;
  color: var(--dark-muted);
  margin-top: 2px;
}

@media (max-width: 768px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
  .step-card:first-child {
    border-radius: 20px 20px 0 0;
  }
  .step-card:last-child {
    border-radius: 0 0 20px 20px;
  }
  .step-arrow {
    display: none;
  }
  .how-section {
    padding: 64px 0;
  }
  .how-inner {
    padding: 0 24px;
  }
  .demo-strip {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
