<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <!-- LOGO -->
      <RouterLink to="/" class="block">
        <h1 class="text-lg md:text-xl font-bold text-sky-700">Taxi Boat Helena</h1>
        <p class="text-xs text-slate-500">Booking aplikacija</p>
      </RouterLink>

      <!-- NAV -->
      <nav class="hidden md:flex gap-6 text-sm font-medium">
        <RouterLink to="/" class="hover:text-sky-700 transition"> Početna </RouterLink>

        <RouterLink to="/linije" class="hover:text-sky-700 transition"> Polasci </RouterLink>

        <a href="#kontakt" class="hover:text-sky-700 transition"> Kontakt </a>
      </nav>
    </div>
  </header>
</template>
