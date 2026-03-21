<script setup lang="ts">
import { BaseButton } from '@/shared/ui'

const FLOAT_TAGS = [
  {
    emoji: '🥚',
    label: 'Eggs × 3',
    style: 'top:22%;left:5%;animation-delay:0s;animation-duration:18s',
  },
  {
    emoji: '🧀',
    label: 'Cheddar',
    style: 'top:40%;left:2%;animation-delay:3s;animation-duration:22s',
  },
  {
    emoji: '🥦',
    label: 'Broccoli',
    style: 'top:62%;left:6%;animation-delay:1.5s;animation-duration:19s',
  },
  {
    emoji: '🍋',
    label: 'Lemon',
    style: 'top:20%;right:5%;animation-delay:2s;animation-duration:20s',
  },
  {
    emoji: '🐟',
    label: 'Salmon',
    style: 'top:44%;right:3%;animation-delay:4s;animation-duration:21s',
  },
  {
    emoji: '🧄',
    label: 'Garlic',
    style: 'top:65%;right:7%;animation-delay:0.8s;animation-duration:17s',
  },
]

const STATS = [
  { num: '2 min', label: 'To your recipe' },
  { num: '500+', label: 'Recipes generated' },
  { num: '0%', label: 'Food wasted' },
  { num: '100%', label: 'Your ingredients' },
]
</script>

<template>
  <section class="hero">
    <div class="hero-bg-circle circle-1" />
    <div class="hero-bg-circle circle-2" />
    <div class="hero-bg-circle circle-3" />
    <div class="hero-dots" />

    <!-- Floating ingredient tags -->
    <div class="floating-tags" aria-hidden="true">
      <div v-for="(tag, i) in FLOAT_TAGS" :key="i" class="ftag" :style="tag.style">
        {{ tag.emoji }} {{ tag.label }}
      </div>
    </div>

    <div class="hero-inner">
      <div class="hero-badge">
        <span class="badge-pulse" />
        Powered by Chatgpt AI
      </div>

      <h1 class="hero-title">
        Your fridge.<br />
        Your <em>chef.</em><br />
        Your goals.
      </h1>

      <p class="hero-sub">
        Tell us what's in your fridge — we'll craft personalized recipes and diet plans tailored to
        your health goals, using exactly what you have.
      </p>

      <div class="hero-actions">
        <!-- <BaseButton variant="primary" href="#" class="hero-cta">
          Start cooking for free
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </BaseButton> -->
        <BaseButton variant="outline" href="#how">See how it works</BaseButton>
      </div>

      <!-- <div class="hero-proof">
        <div class="proof-avatars">
          <span v-for="e in PROOF_AVATARS" :key="e" class="avatar">{{ e }}</span>
        </div>
        <span class="proof-text"><strong>500+</strong> people already eating smarter</span>
      </div> -->
    </div>

    <div class="hero-stats">
      <div v-for="stat in STATS" :key="stat.label" class="stat-item">
        <span class="stat-num">{{ stat.num }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 130px 48px 60px;
  position: relative;
  overflow: hidden;
  background: var(--light-bg);
}

.hero-bg-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.circle-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 122, 0, 0.09) 0%, transparent 70%);
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
}
.circle-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 192, 120, 0.12) 0%, transparent 70%);
  bottom: 0;
  right: -100px;
}
.circle-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 154, 47, 0.08) 0%, transparent 70%);
  top: 30%;
  left: -80px;
}
.hero-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 122, 0, 0.15) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 70%);
}

.floating-tags {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.ftag {
  position: absolute;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 8px 16px;
  font-size: 13px;
  color: var(--dark-muted);
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
  animation: floatTag linear infinite;
  opacity: 0;
}

.hero-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--primary-soft);
  border: 1px solid rgba(255, 122, 0, 0.22);
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--primary);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 28px;
  animation: fadeDown 0.7s ease both;
}
.badge-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--primary);
  animation: pulse 2s infinite;
}

.hero-title {
  font-family: 'Fraunces', serif;
  font-weight: 900;
  font-size: clamp(52px, 8vw, 100px);
  line-height: 0.95;
  letter-spacing: -0.035em;
  color: var(--dark);
  animation: fadeUp 0.7s 0.15s ease both;
}
.hero-title em {
  font-style: italic;
  color: var(--primary);
  position: relative;
}
.hero-title em::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent-light));
  border-radius: 2px;
  opacity: 0.4;
}

.hero-sub {
  font-size: 17px;
  font-weight: 300;
  color: var(--dark-muted);
  line-height: 1.68;
  max-width: 500px;
  margin-top: 20px;
  animation: fadeUp 0.7s 0.28s ease both;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 36px;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeUp 0.7s 0.4s ease both;
}
.hero-cta {
  font-size: 16px;
  padding: 15px 32px;
}

.hero-proof {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
  animation: fadeUp 0.7s 0.52s ease both;
}
.proof-avatars {
  display: flex;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-soft);
  border: 2px solid var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin-left: -8px;
}
.avatar:first-child {
  margin-left: 0;
}
.proof-text {
  font-size: 13px;
  color: var(--dark-muted);
}
.proof-text strong {
  color: var(--primary);
}

.hero-stats {
  position: relative;
  z-index: 2;
  margin-top: 64px;
  display: flex;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  animation: fadeUp 0.7s 0.65s ease both;
}
.stat-item {
  padding: 20px 40px;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-item:last-child {
  border-right: none;
}
.stat-num {
  font-family: 'Fraunces', serif;
  font-weight: 900;
  font-size: 30px;
  letter-spacing: -0.03em;
  color: var(--primary);
  line-height: 1;
}
.stat-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--dark-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

@media (max-width: 768px) {
  .hero {
    padding: 110px 24px 48px;
  }
  .hero-stats {
    flex-wrap: wrap;
  }
  .stat-item {
    padding: 16px 24px;
    border-right: none;
    border-bottom: 1px solid var(--border);
    width: 50%;
  }
  .stat-item:nth-child(odd) {
    border-right: 1px solid var(--border);
  }
  .stat-item:last-child {
    border-bottom: none;
  }
  .ftag {
    display: none;
  }
}
</style>
