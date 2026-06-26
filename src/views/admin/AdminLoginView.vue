<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../../stores/auth'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const prijava = async () => {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Unesite email i lozinku.'
    return
  }

  try {
    loading.value = true
    await login(email.value, password.value)
    router.push('/admin/polasci')
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Prijava nije uspjela. Pokušajte ponovno.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 px-4">
    <div class="w-full max-w-md bg-white rounded-[28px] border border-slate-200 shadow-xl p-8">
      <div class="text-center mb-8">
        <p class="text-sm uppercase tracking-[0.2em] text-sky-700 font-semibold mb-2">
          Admin panel
        </p>
        <h1 class="text-2xl font-bold text-slate-900">Taxi Boat Helena</h1>
        <p class="text-sm text-slate-500 mt-1">Prijavite se za upravljanje</p>
      </div>

      <form @submit.prevent="prijava" class="space-y-5">
        <div>
          <label class="block text-sm font-semibold mb-2 text-slate-700">Email</label>
          <input
            v-model="email"
            type="email"
            autocomplete="username"
            placeholder="vas@email.hr"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-slate-700">Lozinka</label>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="••••••••"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none"
          />
        </div>

        <div
          v-if="errorMessage"
          class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-2xl bg-sky-700 text-white px-5 py-3 font-semibold hover:bg-sky-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Prijava...' : 'Prijavi se' }}
        </button>
      </form>
    </div>
  </div>
</template>
