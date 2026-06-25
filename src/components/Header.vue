<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

const mobileOpen = ref(false)
const route = useRoute()

const toggleMenu = () => {
  mobileOpen.value = !mobileOpen.value
}

const closeMenu = () => {
  mobileOpen.value = false
}

// Zaključaj scroll pozadine kad je meni otvoren
watch(mobileOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

// Zatvori meni kad se promijeni ruta (npr. klik na link)
watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

const navLinks = [
  { to: '/', label: 'Početna' },
  { to: '/linije', label: 'Polasci' },
  { to: '/izleti', label: 'Izleti' },
  { to: '/izleti#kontakt1', label: 'Kontakt' },
]

const languages = [
  { src: '/hr.png', alt: 'Hrvatski' },
  { src: '/gb.png', alt: 'English' },
  { src: '/it.png', alt: 'Italiano' },
  { src: '/de.png', alt: 'Deutsch' },
]
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-white/40 bg-white/55 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,23,42,0.10)]"
  >
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <div class="flex h-20 md:h-24 items-center justify-between">
        <!-- LOGO -->
        <RouterLink
          to="/"
          @click="closeMenu"
          class="flex items-center gap-3 md:gap-4 group focus:outline-none focus-visible:outline-none"
        >
          <img
            src="/Logo_light.png"
            alt="Taxi Boat Helena"
            class="h-14 sm:h-16 md:h-25 w-auto object-contain"
          />

          <div class="hidden sm:block">
            <p
              class="text-lg md:text-2xl font-black tracking-tight text-slate-950 group-hover:text-sky-700 transition"
            >
              Taxi Boat Helena
            </p>
            <p class="text-xs md:text-sm text-slate-500 tracking-wide">Cres • Taxi boat • Izleti</p>
          </div>
        </RouterLink>

        <!-- NAV (desktop) -->
        <nav class="hidden md:flex items-center gap-10 text-[15px] font-semibold text-slate-800">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="relative group focus:outline-none focus-visible:outline-none"
          >
            {{ link.label }}
            <span
              class="absolute left-0 -bottom-1 h-[2px] w-0 bg-sky-600 transition-all group-hover:w-full"
            ></span>
          </RouterLink>
        </nav>

        <!-- JEZICI (desktop) -->
        <div
          class="hidden md:flex items-center gap-2 rounded-full border border-white/60 bg-white/55 px-3 py-2 shadow-[0_12px_35px_rgba(15,23,42,0.10)] backdrop-blur-xl"
        >
          <img
            v-for="lang in languages"
            :key="lang.alt"
            :src="lang.src"
            :alt="lang.alt"
            class="w-6 h-6 rounded-full object-cover hover:scale-110 transition cursor-pointer"
          />
        </div>

        <!-- HAMBURGER (mobile) -->
        <button
          type="button"
          @click="toggleMenu"
          :aria-expanded="mobileOpen"
          aria-label="Izbornik"
          class="md:hidden relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/60 bg-white/65 text-slate-900 shadow-sm backdrop-blur-xl"
        >
          <span class="sr-only">Izbornik</span>
          <div class="relative w-5 h-4">
            <span
              class="absolute left-0 block h-[2px] w-5 rounded-full bg-slate-900 transition-all duration-300"
              :class="mobileOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'"
            ></span>
            <span
              class="absolute left-0 top-1/2 -translate-y-1/2 block h-[2px] w-5 rounded-full bg-slate-900 transition-all duration-300"
              :class="mobileOpen ? 'opacity-0' : 'opacity-100'"
            ></span>
            <span
              class="absolute left-0 block h-[2px] w-5 rounded-full bg-slate-900 transition-all duration-300"
              :class="mobileOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <!-- MOBILE MENU PANEL -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden absolute inset-x-0 top-full border-b border-white/40 bg-white/80 backdrop-blur-2xl shadow-[0_30px_60px_rgba(15,23,42,0.15)]"
      >
        <nav class="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            @click="closeMenu"
            class="flex items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold text-slate-800 hover:bg-sky-50 hover:text-sky-700 active:scale-[0.98] transition"
          >
            {{ link.label }}
            <span class="text-slate-400">›</span>
          </RouterLink>

          <!-- JEZICI (mobile) -->
          <div class="mt-3 pt-4 border-t border-slate-200/70">
            <p class="px-4 mb-3 text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold">
              Jezik
            </p>
            <div class="flex items-center gap-3 px-4">
              <img
                v-for="lang in languages"
                :key="lang.alt"
                :src="lang.src"
                :alt="lang.alt"
                class="w-8 h-8 rounded-full object-cover hover:scale-110 transition cursor-pointer shadow-sm"
              />
            </div>
          </div>
        </nav>
      </div>
    </Transition>

    <!-- OVERLAY (zatamnjenje pozadine na mobitelu) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileOpen"
        @click="closeMenu"
        class="md:hidden fixed inset-0 top-20 -z-10 bg-slate-950/30"
      ></div>
    </Transition>
  </header>
</template>
