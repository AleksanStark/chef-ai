<template>
  <section id="pricing" class="pricing-section">
    <div class="pricing-inner">
      <div class="pricing-header reveal">
        <SectionLabel centered>Pricing</SectionLabel>
        <h2 class="text-[24px]" style="text-align: center">
          Simple, transparent pricing
        </h2>
        <p class="section-sub" style="margin: 14px auto 0; text-align: center">
          Start free. Upgrade when you're ready. No hidden fees.
        </p>
        <PricingToggle v-model="billing" />
      </div>

      <div class="pricing-grid">
        <div
          v-for="(plan, i) in PLANS"
          :key="plan.name"
          class="price-card reveal"
          :class="{ featured: plan.featured }"
          :style="`transition-delay:${i * 0.1}s`"
        >
          <div v-if="plan.featured" class="featured-badge">Most popular</div>

          <div class="plan-name">{{ plan.name }}</div>
          <div class="plan-price">
            <sup>$</sup>
            <span class="price-num">{{
              billing === "annual" ? plan.priceAnnual : plan.price
            }}</span>
            <small>/mo</small>
          </div>
          <p class="plan-desc">{{ plan.desc }}</p>

          <ul class="plan-features">
            <li v-for="feat in plan.features" :key="feat">
              <span class="check">✓</span>{{ feat }}
            </li>
          </ul>

          <BaseButton
            :variant="plan.featured ? 'primary' : 'outline'"
            href="#"
            style="width: 100%; justify-content: center"
          >
            {{ plan.cta }}
          </BaseButton>
        </div>
      </div>

      <div class="pricing-note reveal">
        <span>🔒</span>
        No credit card required · Cancel anytime · 14-day money-back guarantee
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SectionLabel, BaseButton } from "@/shared/ui";
import { PricingToggle } from "@/features/pricing-toggle";

const billing = ref<"monthly" | "annual">("monthly");

const PLANS = [
  {
    name: "Free",
    price: 0,
    priceAnnual: 0,
    desc: "Perfect for trying out FridgeAI and cooking smarter from day one.",
    features: [
      "5 recipes per day",
      "Basic nutrition info",
      "Ingredient recognition",
      "Community recipes",
    ],
    cta: "Get started free",
    featured: false,
  },
  {
    name: "Pro",
    price: 9,
    priceAnnual: 7,
    desc: "For people serious about healthy eating and reaching their goals faster.",
    features: [
      "Unlimited recipes",
      "Full nutrition tracking",
      "Weekly meal plans",
      "Smart shopping lists",
      "Personalized AI coach",
    ],
    cta: "Start Pro",
    featured: true,
  },
  {
    name: "Family",
    price: 19,
    priceAnnual: 15,
    desc: "Cook smarter for the whole family with individual profiles for everyone.",
    features: [
      "Up to 5 profiles",
      "Per-member diet goals",
      "Family meal planner",
      "Priority support",
      "Early feature access",
    ],
    cta: "Get Family plan",
    featured: false,
  },
];
</script>

<style scoped>
.pricing-section {
  padding: 100px 0;
  background: var(--light-bg);
}
.pricing-inner {
  max-width: 1060px;
  margin: 0 auto;
  padding: 0 48px;
}
.pricing-header {
  text-align: center;
  margin-bottom: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: start;
}

.price-card {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 36px 32px;
  transition: all 0.3s;
  position: relative;
}
.price-card:hover:not(.featured) {
  border-color: rgba(255, 122, 0, 0.3);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.price-card.featured {
  background: var(--dark);
  border-color: var(--dark);
  transform: scale(1.03);
  box-shadow: var(--shadow-lg);
}

.featured-badge {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary);
  color: white;
  font-family: "Fraunces", serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 4px 16px;
  border-radius: 100px;
}

.plan-name {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dark-muted);
  margin-bottom: 16px;
}
.featured .plan-name {
  color: var(--accent-light);
}

.plan-price {
  display: flex;
  align-items: flex-start;
  gap: 2px;
  margin-bottom: 8px;
  line-height: 1;
}
.plan-price sup {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: 20px;
  color: var(--dark-muted);
  margin-top: 6px;
}
.featured .plan-price sup {
  color: var(--accent-light);
}
.price-num {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: 52px;
  letter-spacing: -0.04em;
  color: var(--dark);
  line-height: 1;
  transition: all 0.3s;
}
.featured .price-num {
  color: white;
}
.plan-price small {
  font-size: 14px;
  color: var(--dark-muted);
  align-self: flex-end;
  margin-bottom: 8px;
}
.featured .plan-price small {
  color: #9ca3af;
}

.plan-desc {
  font-size: 13px;
  color: var(--dark-muted);
  line-height: 1.65;
  margin-bottom: 28px;
}
.featured .plan-desc {
  color: #9ca3af;
}

.plan-features {
  list-style: none;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.plan-features li {
  font-size: 14px;
  color: var(--dark-muted);
  display: flex;
  align-items: center;
  gap: 10px;
}
.featured .plan-features li {
  color: #d1d5db;
}

.check {
  width: 20px;
  height: 20px;
  background: var(--primary-soft);
  border: 1px solid rgba(255, 122, 0, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: var(--primary);
  font-weight: 700;
  flex-shrink: 0;
}
.featured .check {
  background: rgba(255, 122, 0, 0.2);
  border-color: rgba(255, 122, 0, 0.3);
}

.pricing-note {
  text-align: center;
  margin-top: 32px;
  font-size: 13px;
  color: var(--dark-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

@media (max-width: 900px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin: 0 auto;
  }
  .price-card.featured {
    transform: none;
  }
}
@media (max-width: 768px) {
  .pricing-section {
    padding: 64px 0;
  }
  .pricing-inner {
    padding: 0 24px;
  }
}
</style>
