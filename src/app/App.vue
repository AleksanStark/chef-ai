<template>
  <TheNavbar />
  <RouterView />
  <TheFooter />
</template>

<script setup lang="ts">
import { TheNavbar } from '@/widgets/navbar'
import { TheFooter } from '@/widgets/footer'
</script>
