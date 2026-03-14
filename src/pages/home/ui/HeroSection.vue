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

const PROOF_AVATARS = ['👩‍🍳', '👨‍💻', '🧑‍🎓', '👩‍⚕️']

const STATS = [
  { num: '2 min', label: 'To your recipe' },
  { num: '500+', label: 'Recipes generated' },
  { num: '0%', label: 'Food wasted' },
  { num: '100%', label: 'Your ingredients' },
]
</script>

<template>
  <section
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-(--light-bg) px-[48px] pt-[130px] pb-[60px] max-md:px-[24px] max-md:pt-[110px] max-md:pb-[48px]"
  >
    <div class="hero-bg-circle circle-1" />
    <div class="hero-bg-circle circle-2" />
    <div class="hero-bg-circle circle-3" />
    <div class="hero-dots" />

    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="(tag, i) in FLOAT_TAGS"
        :key="i"
        class="ftag absolute whitespace-nowrap rounded-full border border-(--border) bg-(--white) px-[16px] py-[8px] text-[13px] text-(--dark-muted) shadow-(--shadow-sm) opacity-0"
        :style="tag.style"
      >
        {{ tag.emoji }} {{ tag.label }}
      </div>
    </div>

    <div class="relative z-2 flex flex-col items-center text-center">
      <div
        class="mb-[28px] inline-flex items-center gap-[8px] rounded-full border border-[rgba(255,122,0,0.22)] bg-(--primary-soft) px-[16px] py-[6px] text-[12px] font-[500] uppercase tracking-[0.06em] text-(--primary)"
      >
        <span class="badge-pulse h-[7px] w-[7px] rounded-full bg-(--primary)" />
        Powered by Qwen AI
      </div>

      <h1
        class="font-['Fraunces',serif] text-[clamp(52px,8vw,100px)] font-[900] leading-[0.95] tracking-[-0.035em] text-(--dark)"
      >
        Your fridge.<br />
        Your <em class="italic text-(--primary)">chef.</em><br />
        Your goals.
      </h1>

      <p class="mt-[20px] max-w-[500px] text-[17px] font-[300] leading-[1.68] text-(--dark-muted)">
        Tell us what's in your fridge — we'll craft personalized recipes and diet plans tailored to
        your health goals, using exactly what you have.
      </p>

      <div class="mt-[36px] flex flex-wrap justify-center gap-[12px]">
        <!-- <BaseButton variant="primary" href="#" class="px-[32px] py-[15px] text-[16px]">
          Start cooking for free

          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </BaseButton> -->

        <BaseButton variant="outline" href="#how"> See how it works </BaseButton>
      </div>

      <div class="mt-[28px] flex items-center gap-[12px]">
        <div class="flex">
          <span
            v-for="e in PROOF_AVATARS"
            :key="e"
            class="-ml-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-(--white) bg-(--primary-soft) text-[15px]"
          >
            {{ e }}
          </span>
        </div>

        <span class="text-[13px] text-(--dark-muted)">
          <strong class="text-(--primary)">500+</strong>
          people already eating smarter
        </span>
      </div>
    </div>

    <div
      class="relative z-2 mt-[64px] flex overflow-hidden rounded-[16px] border border-(--border) bg-(--white) shadow-(--shadow-md) max-md:flex-wrap"
    >
      <div
        v-for="stat in STATS"
        :key="stat.label"
        class="flex flex-col items-center gap-[4px] border-r border-(--border) px-[40px] py-[20px] last:border-r-0 max-md:w-1/2 max-md:border-b max-md:border-r-0"
      >
        <span
          class="font-['Fraunces',serif] text-[30px] font-[900] leading-none tracking-[-0.03em] text-(--primary)"
        >
          {{ stat.num }}
        </span>

        <span class="text-[11px] font-[500] uppercase tracking-[0.08em] text-(--dark-muted)">
          {{ stat.label }}
        </span>
      </div>
    </div>
  </section>
</template>
