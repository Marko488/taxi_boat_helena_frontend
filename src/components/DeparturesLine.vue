<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const departures = ref([])
const loading = ref(false)
const errorMessage = ref('')

const email = ref('')

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
  const prosaoJe = new Date(`${dep.departure_date}T${dep.departure_time}`) < new Date()

  if (prosaoJe) {
    errorMessage.value = 'Ovaj polazak je već prošao.'
    return
  }

  errorMessage.value = ''
  selectedDeparture.value = dep
  adults.value = 1
  children.value = 0
  email.value = ''
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
  email.value = ''
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

    if (!email.value) {
      reservationError.value = 'Email je obavezan.'
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email.value)) {
      reservationError.value = 'Unesite ispravnu email adresu.'
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
      email: email.value,
      from_location: selectedDeparture.value.from_location,
      to_location: selectedDeparture.value.to_location,
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

const formatirajDatum = (datum) => {
  if (!datum) return ''

  const d = new Date(datum)

  if (Number.isNaN(d.getTime())) {
    return datum
  }

  return d.toLocaleDateString('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const povecajAdults = () => {
  adults.value = Number(adults.value) + 1
}

const smanjiAdults = () => {
  if (Number(adults.value) > 1) {
    adults.value = Number(adults.value) - 1
  }
}

const povecajChildren = () => {
  children.value = Number(children.value) + 1
}

const smanjiChildren = () => {
  if (Number(children.value) > 0) {
    children.value = Number(children.value) - 1
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
              new Date(dep.departure_date + 'T' + dep.departure_time) < new Date()
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : dep.available_seats > 0
                  ? 'bg-white border-slate-200 hover:bg-sky-600 hover:text-white hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03]'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            "
          >
            <span
              class="absolute top-2 right-2 w-2.5 h-2.5 rounded-full"
              :class="
                new Date(dep.departure_date + 'T' + dep.departure_time) < new Date()
                  ? 'bg-amber-500'
                  : dep.available_seats > 0
                    ? 'bg-green-500'
                    : 'bg-red-400'
              "
            ></span>

            <div class="text-lg md:text-xl font-bold">
              {{ dep.departure_time }}
            </div>

            <div class="text-xs md:text-sm mt-1">
              {{ dep.from_location }} → {{ dep.to_location }}
            </div>

            <div class="text-xs md:text-sm mt-2 font-medium">
              {{
                new Date(dep.departure_date + 'T' + dep.departure_time) < new Date()
                  ? 'Polazak je prošao'
                  : dep.available_seats === 0
                    ? 'Popunjeno'
                    : `${dep.available_seats} mjesta`
              }}
            </div>
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
      class="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-md flex items-center justify-center px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto"
    >
      <div
        class="relative w-full max-w-2xl bg-white rounded-[26px] sm:rounded-[32px] border border-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.35)] overflow-hidden max-h-[94vh] flex flex-col"
      >
        <!-- top glow -->
        <div class="h-1.5 w-full bg-gradient-to-r from-sky-600 via-cyan-400 to-blue-300"></div>

        <!-- close -->
        <button
          @click="zatvoriModal"
          class="absolute top-4 right-4 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-white transition shadow-sm flex items-center justify-center"
        >
          <span class="text-2xl leading-none">×</span>
        </button>

        <!-- header -->
        <div class="px-5 sm:px-7 lg:px-8 pt-6 sm:pt-7 pb-5 border-b border-slate-100">
          <div class="pr-12">
            <p
              class="text-[11px] sm:text-xs uppercase tracking-[0.24em] text-sky-700 font-bold mb-3"
            >
              Rezervacija taxi line
            </p>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div class="flex items-center gap-3 flex-wrap">
                  <h3
                    class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-none"
                  >
                    {{ selectedDeparture.departure_time }}
                  </h3>

                  <span
                    class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border"
                    :class="
                      selectedDeparture.available_seats > 0
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    "
                  >
                    <span
                      class="w-2 h-2 rounded-full"
                      :class="
                        selectedDeparture.available_seats > 0 ? 'bg-emerald-500' : 'bg-red-500'
                      "
                    ></span>
                    {{ selectedDeparture.available_seats > 0 ? 'Dostupno' : 'Popunjeno' }}
                  </span>
                </div>

                <p class="text-slate-600 mt-3 text-sm sm:text-base font-medium break-words">
                  {{ selectedDeparture.from_location }} → {{ selectedDeparture.to_location }}
                </p>
              </div>

              <div
                class="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-50 px-4 py-3 shadow-sm min-w-[180px]"
              >
                <p class="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-bold mb-1">
                  Datum polaska
                </p>
                <p class="text-lg sm:text-xl font-bold text-slate-900">
                  {{ formatirajDatum(selectedDeparture.departure_date) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- body -->
        <div class="px-5 sm:px-7 lg:px-8 py-5 sm:py-6 overflow-y-auto">
          <div v-if="!reservationMessage" class="space-y-5">
            <!-- top cards -->
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <!-- email -->
              <div
                class="lg:col-span-3 rounded-[24px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 sm:p-5 shadow-sm"
              >
                <div class="flex items-center gap-2 mb-3">
                  <div
                    class="w-9 h-9 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-sm font-bold"
                  >
                    @
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-900">Email adresa</p>
                    <p class="text-xs text-slate-500">Na ovu adresu stiže potvrda rezervacije</p>
                  </div>
                </div>

                <input
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  placeholder="npr. ivan@gmail.com"
                  class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition"
                />
              </div>

              <!-- seats -->
              <div
                class="lg:col-span-2 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5 shadow-sm"
              >
                <p class="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-bold mb-2">
                  Dostupno mjesta
                </p>
                <p class="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                  {{ selectedDeparture.available_seats }}
                </p>
              </div>
            </div>

            <!-- counters -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- adults -->
              <div class="rounded-[24px] border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                <div class="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p class="text-base font-bold text-slate-900">Odrasli</p>
                    <p class="text-sm text-slate-500">Barem 1 odrasla osoba je obavezna</p>
                  </div>
                  <div
                    class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200"
                  >
                    4 € / osoba
                  </div>
                </div>

                <div class="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    @click="smanjiAdults"
                    class="w-12 h-12 rounded-2xl border border-slate-300 bg-white text-2xl text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
                    :disabled="Number(adults) <= 1"
                  >
                    −
                  </button>

                  <div class="flex-1 text-center">
                    <div class="text-3xl font-black text-slate-900">{{ adults }}</div>
                    <div
                      class="text-xs uppercase tracking-[0.14em] text-slate-400 font-semibold mt-1"
                    >
                      putnika
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="povecajAdults"
                    class="w-12 h-12 rounded-2xl border border-slate-300 bg-white text-2xl text-slate-700 hover:bg-slate-50 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- children -->
              <div class="rounded-[24px] border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                <div class="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p class="text-base font-bold text-slate-900">Djeca 6 – 12</p>
                    <p class="text-sm text-slate-500">Dodaj dječje karte ako trebaju</p>
                  </div>
                  <div
                    class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200"
                  >
                    2 € / dijete
                  </div>
                </div>

                <div class="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    @click="smanjiChildren"
                    class="w-12 h-12 rounded-2xl border border-slate-300 bg-white text-2xl text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
                    :disabled="Number(children) <= 0"
                  >
                    −
                  </button>

                  <div class="flex-1 text-center">
                    <div class="text-3xl font-black text-slate-900">{{ children }}</div>
                    <div
                      class="text-xs uppercase tracking-[0.14em] text-slate-400 font-semibold mt-1"
                    >
                      putnika
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="povecajChildren"
                    class="w-12 h-12 rounded-2xl border border-slate-300 bg-white text-2xl text-slate-700 hover:bg-slate-50 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <!-- summary -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5 shadow-sm">
                <p class="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-bold mb-2">
                  Ukupno mjesta
                </p>
                <p class="text-3xl font-black tracking-tight text-slate-900">
                  {{ totalSeats }}
                </p>
              </div>

              <div class="rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5 shadow-sm">
                <p class="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-bold mb-2">
                  Ruta
                </p>
                <p class="text-sm sm:text-base font-bold text-slate-900 break-words">
                  {{ selectedDeparture.from_location }} → {{ selectedDeparture.to_location }}
                </p>
              </div>

              <div
                class="rounded-[24px] border border-sky-200 bg-gradient-to-br from-sky-50 via-cyan-50 to-white p-4 sm:p-5 shadow-sm"
              >
                <p class="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-bold mb-2">
                  Ukupna cijena
                </p>
                <p class="text-4xl sm:text-5xl font-black tracking-tight text-sky-700">
                  {{ totalPrice }} €
                </p>
              </div>
            </div>
          </div>

          <!-- success -->
          <div
            v-if="reservationMessage"
            class="rounded-[28px] bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 p-5 sm:p-7 text-center shadow-sm"
          >
            <div
              class="w-16 h-16 mx-auto mb-4 rounded-full bg-white border border-emerald-200 flex items-center justify-center text-3xl shadow-sm"
            >
              ✅
            </div>

            <p class="text-xl sm:text-2xl font-black text-emerald-800 mb-2">
              Rezervacija uspješna!
            </p>

            <p class="text-sm sm:text-base text-emerald-700">
              {{ reservationMessage }}
            </p>

            <p class="text-sm text-emerald-700 mt-3">Plaćanje se izvršava gotovinom na polasku.</p>

            <p class="text-sm text-emerald-700 mt-2">
              Pripremite fotoaparat 📸 vidimo se na polasku i uživajte u doživljaju!
            </p>

            <div
              v-if="reservationCode"
              class="mt-5 inline-flex items-center rounded-2xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 shadow-sm"
            >
              Kod rezervacije: {{ reservationCode }}
            </div>
          </div>

          <!-- error -->
          <div
            v-if="reservationError"
            class="mt-4 rounded-[20px] border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-medium text-red-700 shadow-sm"
          >
            {{ reservationError }}
          </div>
        </div>

        <!-- footer -->
        <div class="px-5 sm:px-7 lg:px-8 py-4 sm:py-5 border-t border-slate-100 bg-white">
          <div class="flex flex-col-reverse sm:flex-row gap-3">
            <button
              v-if="!reservationMessage"
              @click="zatvoriModal"
              class="sm:w-auto rounded-2xl border border-slate-300 bg-white px-5 py-3.5 font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Odustani
            </button>

            <button
              v-if="!reservationMessage"
              @click="rezerviraj"
              :disabled="reservationLoading"
              class="flex-1 rounded-2xl bg-gradient-to-r from-sky-700 to-sky-600 text-white px-5 py-3.5 font-semibold hover:from-sky-800 hover:to-sky-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-sky-700/20"
            >
              {{ reservationLoading ? 'Spremanje...' : 'Potvrdi rezervaciju' }}
            </button>

            <button
              v-else
              @click="zatvoriModal"
              class="flex-1 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-5 py-3.5 font-semibold hover:from-emerald-700 hover:to-emerald-600 transition shadow-lg shadow-emerald-600/20"
            >
              Zatvori
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
