<script setup>
import DeparturesLine from '../components/DeparturesLine.vue'
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-10">
      <p class="text-sm uppercase tracking-[0.2em] text-sky-700 font-semibold mb-2">
        Taxi boat linija
      </p>

      <h1 class="text-3xl md:text-5xl font-bold text-slate-900 mb-3">Linijski polasci</h1>

      <p class="text-slate-600 max-w-2xl leading-7">
        Pregled dostupnih termina i filtriranje polazaka između grada Cresa i kampa Kovačine.
      </p>
    </div>

    <DeparturesLine />
  </div>
</template>
