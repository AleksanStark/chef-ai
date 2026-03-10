<script setup lang="ts"></script>

<template>
  <footer class="bg-[#FFF2E0] text-[#2B2B2B] py-12">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h2 class="text-[#FF7A00] text-xl font-bold mb-4">О создателях</h2>
        <p class="text-[#2B2B2B] text-sm leading-relaxed">
          Мы — <span class="font-semibold">AtlasDev</span>, начинающие специалисты, которые создают
          маленькие проекты и активно развиваются в поисках инвесторов и прогресса.
        </p>
      </div>

      <div>
        <h2 class="text-[#FF7A00] text-xl font-bold mb-4">Контакты</h2>
        <ul class="space-y-2 text-sm">
          <li class="flex gap-2">
            <span class="font-semibold">Телефон 1:</span>
            <a href="tel:+380123456789" class="text-[#FF9A2F] hover:text-[#E96F00]">
              +380 12 345 67 89</a
            >
          </li>
          <li class="flex gap-2">
            <span class="font-semibold">Телефон 2:</span>
            <a href="tel:+380987654321" class="text-[#FF9A2F] hover:text-[#E96F00]">
              +380 98 765 43 21</a
            >
          </li>
          <li class="flex gap-2">
            <span class="font-semibold">Email 1:</span>
            <a href="mailto:hello@atlasdev.com" class="text-[#FF9A2F] hover:text-[#E96F00]">
              hello@atlasdev.com</a
            >
          </li>
          <li class="flex gap-2">
            <span class="font-semibold">Email 2:</span>
            <a href="mailto:contact@atlasdev.com" class="text-[#FF9A2F] hover:text-[#E96F00]">
              contact@atlasdev.com</a
            >
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-[#FF7A00] text-xl font-bold mb-4">Мы в сети</h2>
        <ul class="flex space-x-4">
          <li><a href="#" class="text-[#FF9A2F] hover:text-[#E96F00] font-semibold">Twitter</a></li>
          <li>
            <a href="#" class="text-[#FF9A2F] hover:text-[#E96F00] font-semibold">LinkedIn</a>
          </li>
          <li><a href="#" class="text-[#FF9A2F] hover:text-[#E96F00] font-semibold">GitHub</a></li>
        </ul>
      </div>
    </div>

    <div class="mt-10 border-t border-[#FFC078] pt-6 text-center text-[#2B2B2B] text-xs">
      &copy; 2026 AtlasDev. Все права защищены.
    </div>
  </footer>
</template>
