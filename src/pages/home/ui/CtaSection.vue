<!-- <template>
  <section class="cta-section">
    <div class="cta-inner reveal">
      <div class="cta-bg-1" />
      <div class="cta-bg-2" />

      <div class="cta-label">
        <span class="badge-pulse" />
        Join the waitlist
      </div>
      <h2 class="cta-title">Stop letting food<br />go to waste.</h2>
      <p class="cta-sub">
        Join early adopters who cook smarter, eat healthier, and spend less on groceries every week.
      </p>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px">
        <EmailSubscribe @submit="onSubscribe" />
        <p class="cta-fine">No spam. No credit card. Cancel anytime.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { EmailSubscribe } from '@/features/email-subscribe'

function onSubscribe(email: string) {
  alert(`Thanks! We'll reach out to ${email} soon.`)
}
</script>

<style scoped>
.cta-section {
  padding: 40px 48px 80px;
  background: var(--white);
}
.cta-inner {
  max-width: 1060px;
  margin: 0 auto;
  background: var(--dark);
  border-radius: 28px;
  padding: 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cta-bg-1 {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 122, 0, 0.15) 0%, transparent 70%);
  top: -150px;
  left: -100px;
  pointer-events: none;
}
.cta-bg-2 {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 154, 47, 0.1) 0%, transparent 70%);
  bottom: -100px;
  right: -80px;
  pointer-events: none;
}

.cta-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-light);
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}
.badge-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-light);
  animation: pulse 2s infinite;
}

.cta-title {
  font-family: 'Fraunces', serif;
  font-weight: 900;
  font-size: clamp(40px, 5.5vw, 68px);
  letter-spacing: -0.035em;
  line-height: 1;
  color: white;
  position: relative;
  z-index: 1;
  margin-bottom: 16px;
}
.cta-sub {
  font-size: 16px;
  color: #9ca3af;
  max-width: 440px;
  line-height: 1.65;
  position: relative;
  z-index: 1;
  margin-bottom: 40px;
}
.cta-fine {
  font-size: 12px;
  color: #6b7280;
  position: relative;
  z-index: 1;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.75);
  }
}

@media (max-width: 768px) {
  .cta-section {
    padding: 24px 24px 60px;
  }
  .cta-inner {
    padding: 56px 32px;
  }
}
</style> -->

<script setup lang="ts">
import { EmailSubscribe } from '@/features/email-subscribe'

function onSubscribe(email: string) {
  alert(`Thanks! We'll reach out to ${email} soon.`)
}
</script>

<template>
  <section
    class="bg-[var(--white)] px-[48px] pt-[40px] pb-[80px] max-md:px-[24px] max-md:pt-[24px] max-md:pb-[60px]"
  >
    <div
      class="reveal relative z-0 mx-auto flex max-w-[1060px] flex-col items-center overflow-hidden rounded-[var(--radius-xl)] bg-[var(--dark)] px-[80px] py-[80px] text-center max-md:px-[32px] max-md:py-[56px]"
    >
      <div class="cta-bg-1"></div>
      <div class="cta-bg-2"></div>

      <div
        class="relative z-[1] mb-[20px] inline-flex items-center gap-[8px] text-[12px] font-[500] uppercase tracking-[0.12em] text-[var(--accent-light)]"
      >
        <span class="badge-pulse h-[7px] w-[7px] rounded-full bg-[var(--accent-light)]" />
        Join the waitlist
      </div>

      <h2
        class="relative z-[1] mb-[16px] font-['Fraunces',serif] text-[clamp(40px,5.5vw,68px)] font-[900] leading-[1] tracking-[-0.035em] text-white"
      >
        Stop letting food<br />
        go to waste.
      </h2>

      <p
        class="relative z-[1] mb-[40px] max-w-[440px] text-[16px] leading-[1.65] text-[var(--text-muted-light)]"
      >
        Join early adopters who cook smarter, eat healthier, and spend less on groceries every week.
      </p>

      <div class="relative z-[1] flex flex-col items-center gap-[12px]">
        <EmailSubscribe @submit="onSubscribe" />

        <p class="text-[12px] text-[var(--dark-muted)]">No spam. No credit card. Cancel anytime.</p>
      </div>
    </div>
  </section>
</template>
