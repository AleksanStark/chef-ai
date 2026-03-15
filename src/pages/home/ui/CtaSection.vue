<template>
  <section class="pt-10 px-12 pb-20 bg-white">
    <div
      class="max-w-[1060px] mx-auto bg-dark rounded-[28px] p-20 text-center relative overflow-hidden flex flex-col items-center reveal"
    >
      <div class="cta-bg-1" />
      <div class="cta-bg-2" />

      <div
        class="flex items-center gap-2 text-sm font-bold tracking-[0.12em] uppercase text-accent-light mb-5 relative z-1"
      >
        <span class="badge-pulse" />
        Join the waitlist
      </div>
      <h2 class="cta-title">Stop letting food<br />go to waste.</h2>
      <p class="text-base text-[#9ca3af] max-w-[440px] mb-10">
        Join early adopters who cook smarter, eat healthier, and spend less on
        groceries every week.
      </p>

      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        "
      >
        <EmailSubscribe @submit="onSubscribe" />
        <p class="cta-fine">No spam. No credit card. Cancel anytime.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { EmailSubscribe } from "@/features/email-subscribe";

function onSubscribe(email: string) {
  alert(`Thanks! We'll reach out to ${email} soon.`);
}
</script>

<style scoped>
.cta-sub {
  font-size: 16px;
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
</style>
