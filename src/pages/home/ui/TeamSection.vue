<script setup lang="ts">
import { SectionLabel, BaseButton } from '@/shared/ui'

const TEAM = [
  {
    emoji: '👨‍💻',
    name: 'Ibrahim Chekmazov',
    role: 'Full-stack Developer',
    bio: 'A full-stack developer with extensive experience. Strong knowledge of backend architecture, frontend development, and the creation of production-ready features.',
    tags: [
      'JavaScript',
      'CSS',
      'TypeScript',
      'Vue',
      'HTML',
      'Node.js',
      'Firebase',
      'Express.js',
      'Java',
      'Spring',
      'MongoDB',
      'React',
      'SASS',
      'Flutter',
    ],
    bg: 'linear-gradient(135deg, #FFE8D1, #FFC078)',
  },
  {
    emoji: '👨‍💻',
    name: 'Aleksan Vartapetyan',
    role: 'Full-stack Developer',
    bio: 'Frontend engineering, UX design, and product vision. Turns complex AI outputs into beautiful user experiences.',
    tags: ['TypeScript', 'TailwindCSS', 'REST APIs', 'UI/UX'],
    bg: 'linear-gradient(135deg, #FFE8D1, #FF9A2F44)',
  },
]
</script>

<template>
  <section id="team" class="team-section">
    <div class="team-inner">
      <div class="team-header reveal">
        <SectionLabel>The atlasDEV team</SectionLabel>
        <h2 class="text-[24px]">Built by two full-stack devs<br />who love good food</h2>
        <p class="section-sub">
          We're a two-person team looking for clients and investors who believe in zero food waste
          and personalized nutrition.
        </p>
      </div>

      <div class="team-grid">
        <div
          v-for="(member, i) in TEAM"
          :key="member.name"
          class="team-card reveal"
          :style="`transition-delay:${i * 0.12}s`"
        >
          <div class="member-avatar" :style="`background:${member.bg}`">
            {{ member.emoji }}
          </div>
          <div class="member-info">
            <h3 class="member-name">{{ member.name }}</h3>
            <div class="member-role">{{ member.role }}</div>
            <p class="member-bio">{{ member.bio }}</p>
            <div class="member-tags">
              <span v-for="t in member.tags" :key="t" class="skill-tag">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="investor-card reveal">
        <div class="investor-icon">📬</div>
        <div class="investor-text">
          <h4>Interested in investing or partnering?</h4>
          <p>
            We're open to clients, investors, and early adopters. Let's build something great
            together.
          </p>
        </div>
        <BaseButton variant="primary" href="mailto:hello@fridgeai.com">
          Contact us
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7h10M7 3l4 4-4 4"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  padding: 100px 0;
  background: var(--white);
}
.team-inner {
  max-width: 1060px;
  margin: 0 auto;
  padding: 0 48px;
}
.team-header {
  margin-bottom: 56px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.team-card {
  background: var(--light-bg);
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 36px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
  transition: all 0.3s;
}
.team-card:hover {
  border-color: rgba(255, 122, 0, 0.3);
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.member-avatar {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  flex-shrink: 0;
  border: 1.5px solid rgba(255, 122, 0, 0.15);
}
.member-name {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 19px;
  color: var(--dark);
  margin-bottom: 4px;
}
.member-role {
  font-size: 13px;
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 10px;
}
.member-bio {
  font-size: 13.5px;
  color: var(--dark-muted);
  line-height: 1.68;
  margin-bottom: 16px;
}
.member-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.skill-tag {
  background: var(--primary-soft);
  border: 1px solid rgba(255, 122, 0, 0.18);
  color: var(--primary);
  font-size: 11px;
  font-weight: 500;
  padding: 3px 11px;
  border-radius: 100px;
}

.investor-card {
  margin-top: 32px;
  background: var(--primary-soft);
  border: 1.5px solid rgba(255, 122, 0, 0.22);
  border-radius: 16px;
  padding: 28px 32px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.investor-icon {
  font-size: 32px;
}
.investor-text {
  flex: 1;
  min-width: 200px;
}
.investor-text h4 {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 17px;
  color: var(--dark);
  margin-bottom: 4px;
}
.investor-text p {
  font-size: 13px;
  color: var(--dark-muted);
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
  .team-card {
    flex-direction: column;
  }
  .team-section {
    padding: 64px 0;
  }
  .team-inner {
    padding: 0 24px;
  }
  .investor-card {
    flex-direction: column;
  }
}
</style>
