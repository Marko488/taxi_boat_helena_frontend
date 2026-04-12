<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const departures = ref([])
const loading = ref(false)
const errorMessage = ref('')

const danasnjiDatum = () => {
  const danas = new Date()
  return danas.toISOString().split('T')[0]
}

const filters = ref({
  date: danasnjiDatum(),
  from: '',
})

const groupedDepartures = computed(() => {
  const groups = {}

  departures.value.forEach((dep) => {
    const date = String(dep.departure_date).split('T')[0]

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

const ocistiFiltere = async () => {
  filters.value.date = danasnjiDatum()
  filters.value.from = ''
  await dohvatiPolaske()
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
    <!-- NASLOV SEKCIJE -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-sky-700 font-semibold mb-2">
          Taxi boat linija
        </p>
        <h2 class="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
          Pregled dostupnih polazaka
        </h2>
        <p class="text-slate-600 max-w-2xl leading-7 text-sm md:text-base">
          Odaberi datum i polazište kako bi brzo pronašao najprikladniji termin vožnje između grada
          Cresa i kampa Kovačine.
        </p>
      </div>
    </div>

    <!-- FILTER KARTICA -->
    <div class="bg-white rounded-[28px] border border-slate-200 shadow-sm p-5 md:p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-semibold mb-2 text-slate-700"> Datum </label>
          <input
            v-model="filters.date"
            type="date"
            class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-slate-700"> Polazište </label>
          <select
            v-model="filters.from"
            class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="">Sva polazišta</option>
            <option value="Cres">Cres</option>
            <option value="Kamp Kovačine">Kamp Kovačine</option>
          </select>
        </div>

        <div class="flex items-end gap-3">
          <button
            @click="dohvatiPolaske"
            class="flex-1 rounded-2xl bg-sky-700 text-white px-5 py-3 font-semibold shadow-sm transition hover:bg-sky-800"
          >
            Pretraži
          </button>

          <button
            @click="ocistiFiltere"
            class="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Očisti
          </button>
        </div>
      </div>
    </div>

    <!-- LOADING -->
    <div
      v-if="loading"
      class="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 text-slate-600"
    >
      Učitavanje polazaka...
    </div>

    <!-- ERROR -->
    <div
      v-else-if="errorMessage"
      class="bg-red-50 text-red-700 border border-red-200 rounded-[28px] p-5"
    >
      {{ errorMessage }}
    </div>

    <!-- EMPTY -->
    <div
      v-else-if="departures.length === 0"
      class="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 text-slate-600"
    >
      Nema dostupnih polazaka za odabrane filtere.
    </div>

    <!-- GRID PRIKAZ -->
    <div v-else class="space-y-8">
      <div
        v-for="(deps, date) in groupedDepartures"
        :key="date"
        class="bg-white rounded-[28px] border border-slate-200 shadow-sm p-5 md:p-6"
      >
        <!-- HEADER DANA -->
        <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <p class="text-sm text-slate-500 mb-1">Datum polazaka</p>
            <h3 class="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>📅</span>
              <span>{{ date }}</span>
            </h3>
          </div>

          <div class="text-sm text-slate-500">
            Ukupno termina: <span class="font-semibold text-slate-700">{{ deps.length }}</span>
          </div>
        </div>

        <!-- GRID TERMINA -->
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          <button
            v-for="dep in deps"
            :key="dep.id"
            @click="odaberiPolazak(dep)"
            :disabled="dep.available_seats === 0"
            class="group relative rounded-2xl border p-3 text-center transition-all duration-300"
            :class="
              dep.available_seats > 0
                ? 'bg-white border-slate-200 hover:bg-sky-600 hover:text-white hover:shadow-lg hover:-translate-y-0.5'
                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
            "
          >
            <!-- STATUS DOT -->
            <span
              class="absolute top-2 right-2 w-2.5 h-2.5 rounded-full"
              :class="dep.available_seats > 0 ? 'bg-green-500' : 'bg-red-400'"
            ></span>

            <!-- VRIJEME -->
            <div class="text-base md:text-lg font-bold">
              {{ dep.departure_time }}
            </div>

            <!-- RUTA -->
            <div
              class="text-[11px] mt-1 leading-4"
              :class="dep.available_seats > 0 ? 'text-slate-500 group-hover:text-white/80' : ''"
            >
              {{ dep.from_location }} → {{ dep.to_location }}
            </div>

            <!-- MJESTA -->
            <div
              class="text-[11px] mt-2 font-medium"
              :class="dep.available_seats > 0 ? 'text-slate-500 group-hover:text-white/80' : ''"
            >
              {{ dep.available_seats }} mjesta
            </div>
          </button>
        </div>

        <!-- MINI INFO ISPOD -->
        <div class="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p class="text-sm text-slate-500">
            Polasci se odvijaju paralelno iz obje lokacije svakih 10 minuta.
          </p>

          <div class="text-sm text-slate-500">
            Status:
            <span class="inline-flex items-center gap-2 ml-2">
              <span class="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
              dostupno
            </span>
            <span class="inline-flex items-center gap-2 ml-4">
              <span class="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
              popunjeno
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
