<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const departures = ref([])
const loading = ref(false)
const errorMessage = ref('')

const selectedDeparture = ref(null)
const showModal = ref(false)

const adults = ref(1)
const children = ref(0)

const reservationMessage = ref('')
const reservationError = ref('')
const reservationLoading = ref(false)
const reservationCode = ref('')

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

const totalSeats = computed(() => Number(adults.value) + Number(children.value))
const totalPrice = computed(() => Number(adults.value) * 4 + Number(children.value) * 2)

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
  selectedDeparture.value = dep
  adults.value = 1
  children.value = 0
  reservationMessage.value = ''
  reservationError.value = ''
  reservationCode.value = ''
  showModal.value = true
}

const zatvoriModal = () => {
  showModal.value = false
  selectedDeparture.value = null
  adults.value = 1
  children.value = 0
  reservationMessage.value = ''
  reservationError.value = ''
  reservationCode.value = ''
}

const rezerviraj = async () => {
  try {
    reservationLoading.value = true
    reservationMessage.value = ''
    reservationError.value = ''
    reservationCode.value = ''

    if (!selectedDeparture.value) {
      reservationError.value = 'Nijedan polazak nije odabran.'
      return
    }

    if (Number(adults.value) < 1) {
      reservationError.value = 'Potrebno je odabrati barem 1 odraslu osobu.'
      return
    }

    if (Number(children.value) < 0) {
      reservationError.value = 'Broj djece nije ispravan.'
      return
    }

    if (totalSeats.value > selectedDeparture.value.available_seats) {
      reservationError.value = `Za ovaj polazak dostupno je još ${selectedDeparture.value.available_seats} mjesta.`
      return
    }

    const response = await axios.post('http://localhost:3000/line-reservations', {
      line_departure_id: selectedDeparture.value.id,
      user_id: 1,
      adults_count: Number(adults.value),
      children_count: Number(children.value),
    })

    reservationMessage.value = response.data.message || 'Rezervacija je uspješna.'
    reservationCode.value = response.data.reservationCode || ''
    await dohvatiPolaske()
  } catch (error) {
    console.error('Greška kod rezervacije:', error)
    reservationError.value =
      error.response?.data?.message || 'Došlo je do greške prilikom rezervacije.'
  } finally {
    reservationLoading.value = false
  }
}

onMounted(() => {
  dohvatiPolaske()
})
</script>

<template>
  <section class="space-y-8">
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

    <div v-if="loading" class="p-6 bg-white rounded-2xl">Učitavanje...</div>

    <div v-else-if="errorMessage" class="p-6 bg-red-50 text-red-700 rounded-2xl">
      {{ errorMessage }}
    </div>

    <div v-else-if="departures.length === 0" class="p-6 bg-white rounded-2xl">
      Nema dostupnih polazaka.
    </div>

    <div v-else class="space-y-8">
      <div
        v-for="(deps, date) in groupedDepartures"
        :key="date"
        class="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6"
      >
        <div class="flex justify-between mb-6">
          <div>
            <p class="text-sm text-slate-500">Datum</p>
            <h3 class="text-xl font-bold">{{ date }}</h3>
          </div>

          <div class="text-sm text-slate-500">
            Ukupno: <span class="font-semibold">{{ deps.length }}</span>
          </div>
        </div>

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
            <span
              class="absolute top-2 right-2 w-2.5 h-2.5 rounded-full"
              :class="dep.available_seats > 0 ? 'bg-green-500' : 'bg-red-400'"
            ></span>

            <div class="text-lg md:text-xl font-bold">
              {{ dep.departure_time }}
            </div>

            <div class="text-xs md:text-sm mt-1">
              {{ dep.from_location }} → {{ dep.to_location }}
            </div>

            <div class="text-xs md:text-sm mt-2 font-medium">{{ dep.available_seats }} mjesta</div>
          </button>
        </div>

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

    <!-- MODAL -->
    <div
      v-if="showModal && selectedDeparture"
      class="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center px-4"
    >
      <div
        class="w-full max-w-md bg-white rounded-[30px] shadow-2xl border border-slate-200 overflow-hidden"
      >
        <div class="h-1.5 w-full bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-300"></div>

        <div class="p-6">
          <div class="flex items-start justify-between gap-4 mb-5">
            <div>
              <p class="text-sm uppercase tracking-[0.18em] text-sky-700 font-semibold mb-2">
                Rezervacija polaska
              </p>
              <h3 class="text-2xl font-bold text-slate-900">
                {{ selectedDeparture.departure_time }}
              </h3>
              <p class="text-slate-600 mt-2">
                {{ selectedDeparture.from_location }} → {{ selectedDeparture.to_location }}
              </p>
            </div>

            <button
              @click="zatvoriModal"
              class="text-slate-400 hover:text-slate-700 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div
            v-if="!reservationMessage"
            class="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-5"
          >
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm text-slate-500 mb-1">Dostupno mjesta</p>
                <p class="font-semibold text-slate-900">{{ selectedDeparture.available_seats }}</p>
              </div>

              <div class="text-right">
                <p class="text-sm text-slate-500 mb-1">Datum</p>
                <p class="font-semibold text-slate-900">{{ selectedDeparture.departure_date }}</p>
              </div>
            </div>
          </div>

          <div v-if="!reservationMessage" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold mb-2 text-slate-700">Odrasli</label>
              <input
                v-model="adults"
                type="number"
                min="1"
                class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
              <p class="text-xs text-slate-500 mt-2">Obavezno je odabrati barem 1 odraslu osobu.</p>
            </div>

            <div>
              <label class="block text-sm font-semibold mb-2 text-slate-700">Djeca 6 – 12</label>
              <input
                v-model="children"
                type="number"
                min="0"
                class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <p class="text-sm text-slate-500 mb-1">Ukupno mjesta</p>
                <p class="text-xl font-bold text-slate-900">{{ totalSeats }}</p>
              </div>

              <div class="rounded-2xl bg-sky-50 border border-sky-200 p-4">
                <p class="text-sm text-slate-500 mb-1">Ukupna cijena</p>
                <p class="text-2xl font-bold text-sky-700">{{ totalPrice }} €</p>
              </div>
            </div>
          </div>

          <div
            v-if="reservationMessage"
            class="rounded-2xl bg-green-50 border border-green-200 p-5 text-center mb-4"
          >
            <div class="text-3xl mb-2">✅</div>
            <p class="font-semibold text-green-700 mb-1">Rezervacija uspješna!</p>
            <p class="text-sm text-green-700">{{ reservationMessage }}</p>
            <p class="text-sm text-green-700 mt-2">Vidimo se na polasku! Spremite fotoaparat 📸</p>
            <p v-if="reservationCode" class="text-sm text-green-700 mt-2">
              Kod rezervacije: <span class="font-semibold">{{ reservationCode }}</span>
            </p>
          </div>

          <div
            v-if="reservationError"
            class="rounded-2xl bg-red-50 border border-red-200 text-red-700 p-4 text-sm mb-4"
          >
            {{ reservationError }}
          </div>

          <div class="flex gap-3 pt-2">
            <button
              v-if="!reservationMessage"
              @click="rezerviraj"
              :disabled="reservationLoading"
              class="flex-1 rounded-2xl bg-sky-700 text-white px-5 py-3 font-semibold hover:bg-sky-800 transition disabled:opacity-60"
            >
              {{ reservationLoading ? 'Spremanje...' : 'Potvrdi rezervaciju' }}
            </button>

            <button
              v-else
              @click="zatvoriModal"
              class="flex-1 rounded-2xl bg-green-600 text-white px-5 py-3 font-semibold hover:bg-green-700 transition"
            >
              Zatvori
            </button>

            <button
              v-if="!reservationMessage"
              @click="zatvoriModal"
              class="rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Odustani
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
