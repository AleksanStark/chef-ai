<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="logo">🧑‍🍳 ChefAI</div>
        <p>Smart cooking for smarter people.<br />Powered by Qwen AI.</p>
      </div>

      <div v-for="col in COLUMNS" :key="col.title" class="footer-col">
        <div class="col-title">{{ col.title }}</div>
        <ul>
          <li v-for="link in col.links" :key="link">
            <a href="#">{{ link }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2025 FridgeAI. Built with ❤️ and Qwen AI by two developers.</span>
      <div class="footer-bottom-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "How it works", "Pricing", "Changelog"],
  },
  { title: "Company", links: ["About", "Team", "Blog", "Careers"] },
  { title: "Support", links: ["Documentation", "FAQ", "Contact", "Status"] },
];
</script>

<style scoped>
footer {
  background: var(--dark);
  color: white;
  padding: 64px 48px 0;
}
.footer-inner {
  max-width: 1060px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 56px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.logo {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: 20px;
  color: var(--accent-light);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}
.footer-brand p {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.65;
}
.col-title {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 16px;
}
.footer-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-col a {
  font-size: 14px;
  color: #6b7280;
  transition: color 0.2s;
}
.footer-col a:hover {
  color: var(--accent-light);
}
.footer-bottom {
  max-width: 1060px;
  margin: 0 auto;
  padding: 24px 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #4b5563;
}
.footer-bottom-links {
  display: flex;
  gap: 24px;
}
.footer-bottom-links a {
  color: #4b5563;
  transition: color 0.2s;
}
.footer-bottom-links a:hover {
  color: var(--accent-light);
}

@media (max-width: 768px) {
  footer {
    padding: 48px 24px 0;
  }
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
</style>
