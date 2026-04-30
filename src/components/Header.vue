<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-white/40 bg-white/55 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,23,42,0.10)]"
  >
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <div class="flex h-24 items-center justify-between">
        <!-- LOGO -->
        <RouterLink
          to="/"
          class="flex items-center gap-4 group focus:outline-none focus-visible:outline-none"
        >
          <img
            src="/Logo_light.png"
            alt="Taxi Boat Helena"
            class="h-18 md:h-25 w-auto object-contain"
          />

          <div class="hidden sm:block">
            <p
              class="text-xl md:text-2xl font-black tracking-tight text-slate-950 group-hover:text-sky-700 transition"
            >
              Taxi Boat Helena
            </p>
            <p class="text-sm text-slate-500 tracking-wide">Cres • Taxi boat • Izleti</p>
          </div>
        </RouterLink>

        <!-- NAV -->
        <nav class="hidden md:flex items-center gap-10 text-[15px] font-semibold text-slate-800">
          <RouterLink to="/" class="relative group focus:outline-none focus-visible:outline-none">
            Početna
            <span
              class="absolute left-0 -bottom-1 h-[2px] w-0 bg-sky-600 transition-all group-hover:w-full"
            ></span>
          </RouterLink>

          <RouterLink
            to="/linije"
            class="relative group focus:outline-none focus-visible:outline-none"
          >
            Polasci
            <span
              class="absolute left-0 -bottom-1 h-[2px] w-0 bg-sky-600 transition-all group-hover:w-full"
            ></span>
          </RouterLink>

          <RouterLink
            to="/izleti"
            class="relative group focus:outline-none focus-visible:outline-none"
          >
            Izleti
            <span
              class="absolute left-0 -bottom-1 h-[2px] w-0 bg-sky-600 transition-all group-hover:w-full"
            ></span>
          </RouterLink>

          <RouterLink
            to="/izleti#kontakt1"
            class="relative group focus:outline-none focus-visible:outline-none"
          >
            Kontakt
            <span
              class="absolute left-0 -bottom-1 h-[2px] w-0 bg-sky-600 transition-all group-hover:w-full"
            ></span>
          </RouterLink>
        </nav>

        <!-- JEZICI -->
        <div
          class="hidden md:flex items-center gap-2 rounded-full border border-white/60 bg-white/55 px-3 py-2 shadow-[0_12px_35px_rgba(15,23,42,0.10)] backdrop-blur-xl"
        >
          <img
            src="/hr.png"
            alt="Hrvatski"
            class="w-6 h-6 rounded-full object-cover hover:scale-110 transition cursor-pointer"
          />
          <img
            src="/gb.png"
            alt="English"
            class="w-6 h-6 rounded-full object-cover hover:scale-110 transition cursor-pointer"
          />
          <img
            src="/it.png"
            alt="Italiano"
            class="w-6 h-6 rounded-full object-cover hover:scale-110 transition cursor-pointer"
          />
          <img
            src="/de.png"
            alt="Deutsch"
            class="w-6 h-6 rounded-full object-cover hover:scale-110 transition cursor-pointer"
          />
        </div>

        <!-- MOBILE -->
        <button
          type="button"
          class="md:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/60 bg-white/65 text-slate-900 shadow-sm backdrop-blur-xl"
        >
          ☰
        </button>
      </div>
    </div>
  </header>
</template>
