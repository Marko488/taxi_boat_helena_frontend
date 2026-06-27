<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()

const code = ref('')
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

onMounted(() => {
  if (route.query.kod) {
    code.value = String(route.query.kod)
  }
})

const otkazi = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!code.value.trim()) {
    errorMessage.value = 'Unesite kod rezervacije.'
    return
  }

  try {
    loading.value = true
    const res = await axios.post('http://localhost:3000/line-reservations/cancel-by-code', {
      reservation_code: code.value.trim(),
    })
    successMessage.value = res.data.message || 'Rezervacija je otkazana.'
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Otkazivanje nije uspjelo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="max-w-md mx-auto px-4 py-20">
    <div class="bg-white rounded-[28px] border border-slate-200 shadow-xl p-8">
      <h1 class="text-2xl font-bold text-slate-900 mb-2">Otkazivanje rezervacije</h1>
      <p class="text-sm text-slate-500 mb-6">
        Unesite kod rezervacije iz potvrdnog emaila (npr. RES-ABC123).
      </p>

      <div v-if="!successMessage">
        <label class="block text-sm font-semibold mb-2 text-slate-700">Kod rezervacije</label>
        <input
          v-model="code"
          type="text"
          placeholder="RES-XXXXXX"
          class="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500 uppercase"
        />

        <div
          v-if="errorMessage"
          class="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {{ errorMessage }}
        </div>

        <button
          @click="otkazi"
          :disabled="loading"
          class="mt-6 w-full rounded-2xl bg-red-600 text-white px-5 py-3 font-semibold hover:bg-red-700 transition disabled:opacity-60"
        >
          {{ loading ? 'Otkazivanje...' : 'Otkaži rezervaciju' }}
        </button>
      </div>

      <div
        v-else
        class="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-6 text-center"
      >
        <div class="text-3xl mb-2">✅</div>
        <p class="font-bold text-emerald-800 mb-1">{{ successMessage }}</p>
        <p class="text-sm text-emerald-700">Mjesto je oslobođeno. Hvala što ste nas obavijestili.</p>
        <RouterLink to="/" class="inline-block mt-4 text-sky-700 font-semibold"
          >Natrag na početnu</RouterLink
        >
      </div>
    </div>
  </section>
</template>
