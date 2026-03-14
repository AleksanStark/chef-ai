<template>
  <main>
    <HeroSection />
    <HowItWorksSection />
    <DemoSection />
    <FeaturesSection />
    <!-- <PricingSection /> -->
    <TeamSection />
    <CtaSection />
  </main>
</template>

<script setup lang="ts">
import { useScrollReveal } from '@/shared/lib/useScrollReveal'
import HeroSection from './HeroSection.vue'
import HowItWorksSection from './HowItWorksSection.vue'
import DemoSection from './DemoSection.vue'
import FeaturesSection from './FeaturesSection.vue'
import PricingSection from './PricingSection.vue'
import TeamSection from './TeamSection.vue'
import CtaSection from './CtaSection.vue'

useScrollReveal()
</script>
