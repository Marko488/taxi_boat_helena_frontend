<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const departures = ref([])
const loading = ref(false)
const errorMessage = ref('')

const danasnjiDatum = () => {
  return new Date().toLocaleDateString('sv-SE')
}

const filters = ref({
  date: danasnjiDatum(),
  from: '',
})

const groupedDepartures = computed(() => {
  const groups = {}

  departures.value.forEach((dep) => {
    const date = String(dep.departure_date)

    if (!groups[date]) {
      groups[date] = []
    }

    groups[date].push(dep)
  })

  Object.keys(groups).forEach((date) => {
    groups[date].sort((a, b) => a.departure_time.localeCompare(b.departure_time))
  })

  return groups
})

const dohvatiPolaske = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const queryParams = {}

    if (filters.value.date) {
      queryParams.date = filters.value.date
    }

    if (filters.value.from) {
      queryParams.from = filters.value.from
    }

    const response = await axios.get('http://localhost:3000/line-departures', {
      params: queryParams,
    })

    departures.value = response.data
  } catch (error) {
    console.error('Greška kod dohvaćanja polazaka:', error)
    errorMessage.value = 'Polaske trenutno nije moguće dohvatiti.'
  } finally {
    loading.value = false
  }
}

const ocistiFiltere = () => {
  filters.value.date = danasnjiDatum()
  filters.value.from = ''
  dohvatiPolaske()
}

const odaberiPolazak = (dep) => {
  console.log('Odabrani polazak:', dep)
}

onMounted(() => {
  dohvatiPolaske()
})
</script>

<template>
  <section class="space-y-8">
    <!-- FILTER -->
    <div class="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-semibold mb-2 text-slate-700">Datum</label>
          <input
            v-model="filters.date"
            type="date"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-slate-700">Polazište</label>
          <select
            v-model="filters.from"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="">Sva polazišta</option>
            <option value="Cres">Cres</option>
            <option value="Kamp Kovačine">Kamp Kovačine</option>
          </select>
        </div>

        <div class="flex items-end gap-3">
          <button
            @click="dohvatiPolaske"
            class="flex-1 rounded-2xl bg-sky-700 text-white px-5 py-3 font-semibold hover:bg-sky-800 transition"
          >
            Pretraži
          </button>

          <button
            @click="ocistiFiltere"
            class="rounded-2xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100 transition"
          >
            Očisti
          </button>
        </div>
      </div>
    </div>

    <!-- STATES -->
    <div v-if="loading" class="p-6 bg-white rounded-2xl">Učitavanje...</div>

    <div v-else-if="errorMessage" class="p-6 bg-red-50 text-red-700 rounded-2xl">
      {{ errorMessage }}
    </div>

    <div v-else-if="departures.length === 0" class="p-6 bg-white rounded-2xl">
      Nema dostupnih polazaka.
    </div>

    <!-- LISTA -->
    <div v-else class="space-y-8">
      <div
        v-for="(deps, date) in groupedDepartures"
        :key="date"
        class="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6"
      >
        <!-- HEADER -->
        <div class="flex justify-between mb-6">
          <div>
            <p class="text-sm text-slate-500">Datum</p>
            <h3 class="text-xl font-bold">{{ date }}</h3>
          </div>

          <div class="text-sm text-slate-500">
            Ukupno: <span class="font-semibold">{{ deps.length }}</span>
          </div>
        </div>

        <!-- TERMINI -->
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          <button
            v-for="dep in deps"
            :key="dep.id"
            @click="odaberiPolazak(dep)"
            :disabled="dep.available_seats === 0"
            class="group relative rounded-2xl border p-3.5 text-center transition-all duration-300"
            :class="
              dep.available_seats > 0
                ? 'bg-white border-slate-200 hover:bg-sky-600 hover:text-white hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            "
          >
            <!-- status dot -->
            <span
              class="absolute top-2 right-2 w-2.5 h-2.5 rounded-full"
              :class="dep.available_seats > 0 ? 'bg-green-500' : 'bg-red-400'"
            ></span>

            <!-- vrijeme -->
            <div class="text-lg md:text-xl font-bold">
              {{ dep.departure_time }}
            </div>

            <!-- ruta -->
            <div class="text-xs md:text-sm mt-1">
              {{ dep.from_location }} → {{ dep.to_location }}
            </div>

            <!-- mjesta -->
            <div class="text-xs md:text-sm mt-2 font-medium">{{ dep.available_seats }} mjesta</div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
