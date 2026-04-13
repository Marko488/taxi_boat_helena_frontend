<script setup>
import Header from './components/Header.vue'
import FooterSection from './components/FooterSection.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">
    <Header />

    <main class="flex-1">
      <RouterView />
    </main>

    <FooterSection />
  </div>
</template>
