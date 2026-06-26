<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import FooterSection from './components/FooterSection.vue'
import { RouterView } from 'vue-router'

const route = useRoute()
// Na admin stranicama sakrij javni header, footer i WhatsApp gumb.
const isAdmin = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div class="min-h-screen flex flex-col overflow-x-clip bg-slate-50 text-slate-800">
    <Header v-if="!isAdmin" />

    <main class="flex-1">
      <RouterView />
    </main>

    <FooterSection v-if="!isAdmin" />
    <a
      v-if="!isAdmin"
      href="https://api.whatsapp.com/send?phone=385915121829"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pošalji poruku na WhatsApp"
      class="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[9999] w-[68px] h-[68px] rounded-full bg-[#25D366] shadow-[0_12px_30px_rgba(0,0,0,0.35)] flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-[bounce_3.4s_ease-in-out_infinite]"
    >
      <img src="/whatsapp.png" alt="WhatsApp" class="w-9 h-9 object-contain" />
    </a>
  </div>
</template>
