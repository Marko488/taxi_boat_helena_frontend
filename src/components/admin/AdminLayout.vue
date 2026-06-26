<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { auth, logout } from '../../stores/auth'

const router = useRouter()

const odjava = () => {
  logout()
  router.push('/admin/login')
}
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <!-- TOP BAR -->
    <header class="bg-slate-900 text-white">
      <div class="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <span class="font-bold tracking-tight">Helena · Admin</span>
          <nav class="hidden sm:flex items-center gap-4 text-sm">
            <RouterLink
              to="/admin/polasci"
              class="px-3 py-1.5 rounded-lg hover:bg-white/10 transition"
              active-class="bg-white/15"
            >
              Polasci
            </RouterLink>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <span class="hidden sm:block text-sm text-slate-300">
            {{ auth.admin?.full_name || auth.admin?.email }}
          </span>
          <button
            @click="odjava"
            class="rounded-lg border border-white/30 px-3 py-1.5 text-sm hover:bg-white/10 transition"
          >
            Odjava
          </button>
        </div>
      </div>

      <!-- mobilna navigacija -->
      <nav class="sm:hidden border-t border-white/10 px-4 py-2 flex gap-2 text-sm">
        <RouterLink
          to="/admin/polasci"
          class="px-3 py-1.5 rounded-lg hover:bg-white/10 transition"
          active-class="bg-white/15"
        >
          Polasci
        </RouterLink>
      </nav>
    </header>

    <main class="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <RouterView />
    </main>
  </div>
</template>
