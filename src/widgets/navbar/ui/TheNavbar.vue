<template>
  <nav :class="{ scrolled }">
    <div class="nav-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-mark">🧑‍🍳</span>
        ChefAI
      </RouterLink>

      <ul class="nav-links">
        <li v-for="link in NAV_LINKS" :key="link.href">
          <a :href="link.href">{{ link.label }}</a>
        </li>
      </ul>

      <div class="nav-actions">
        <BaseButton variant="primary" size="sm" href="#">Get started free</BaseButton>
      </div>

      <button
        class="burger"
        @click="mobileOpen = !mobileOpen"
        :class="{ open: mobileOpen }"
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </div>

    <div class="mobile-menu" :class="{ open: mobileOpen }">
      <a v-for="link in NAV_LINKS" :key="link.href" :href="link.href" @click="mobileOpen = false">
        {{ link.label }}
      </a>
      <BaseButton variant="primary" href="#" style="margin-top: 8px">Get started free</BaseButton>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNavScroll } from '@/shared/lib/useNavScroll'
import { BaseButton } from '@/shared/ui'

const { scrolled } = useNavScroll()
const mobileOpen = ref(false)

const NAV_LINKS = [
  { href: '#how', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#team', label: 'Team' },
  { href: '#demo', label: 'Demo' },
]
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  transition:
    background 0.3s,
    box-shadow 0.3s;
}
nav.scrolled .nav-inner {
  background: rgba(255, 248, 241, 0.92);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow-sm);
  padding: 14px 48px;
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 48px;
  transition: all 0.3s;
}
.logo {
  font-family: 'Fraunces', serif;
  font-weight: 900;
  font-size: 22px;
  color: var(--dark);
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;
  gap: 8px;
}
.logo-mark {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(255, 122, 0, 0.3));
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 34px;
}
.nav-links a {
  font-size: 14px;
  color: var(--dark-muted);
  transition: color 0.2s;
}
.nav-links a:hover {
  color: var(--primary);
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}
.nav-login {
  font-size: 14px;
  color: var(--dark-muted);
  transition: color 0.2s;
}
.nav-login:hover {
  color: var(--primary);
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--dark);
  border-radius: 2px;
  transition: all 0.25s;
}
.burger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.burger.open span:nth-child(2) {
  opacity: 0;
}
.burger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 16px 24px 24px;
  background: rgba(255, 248, 241, 0.98);
  backdrop-filter: blur(18px);
  gap: 4px;
  border-top: 1px solid var(--border);
}
.mobile-menu a {
  font-size: 15px;
  color: var(--dark);
  padding: 10px 8px;
  border-radius: 8px;
  transition: background 0.2s;
}
.mobile-menu a:hover {
  background: var(--primary-soft);
}

@media (max-width: 768px) {
  .nav-links,
  .nav-actions {
    display: none;
  }
  .burger {
    display: flex;
  }
  .mobile-menu.open {
    display: flex;
  }
  .nav-inner {
    padding: 16px 24px;
  }
}
</style>
