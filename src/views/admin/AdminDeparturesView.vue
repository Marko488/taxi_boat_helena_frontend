<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../../services/api'

const departures = ref([])
const locations = ref([])
const boats = ref([])

const loading = ref(false)
const errorMessage = ref('')

const showModal = ref(false)
const saving = ref(false)
const formError = ref('')
const editId = ref(null)

const blankForm = () => ({
  boat_id: '',
  departure_date: '',
  departure_time: '',
  from_location_id: '',
  to_location_id: '',
  capacity: '',
  status: 'scheduled',
})

const form = ref(blankForm())

const statusi = [
  { value: 'scheduled', label: 'Aktivan' },
  { value: 'full', label: 'Popunjen' },
  { value: 'cancelled', label: 'Otkazan' },
]

// Statusi koje admin može ručno postaviti (popunjenost je automatska po mjestima).
const urediviStatusi = [
  { value: 'scheduled', label: 'Aktivan' },
  { value: 'cancelled', label: 'Otkazan' },
]

const statusLabel = (value) => statusi.find((s) => s.value === value)?.label || value

// Prikazani status: otkazano (admin) > popunjeno (nema mjesta) > aktivno.
const prikazaniStatus = (dep) => {
  if (dep.status === 'cancelled') return 'cancelled'
  if (dep.status === 'full' || dep.reserved_seats >= dep.capacity) return 'full'
  return 'scheduled'
}

const isEdit = computed(() => editId.value !== null)

// --- TRAŽILICA / FILTER ---
const search = ref('')
const statusFilter = ref('')

const filteredDepartures = computed(() => {
  const q = search.value.trim().toLowerCase()
  return departures.value.filter((dep) => {
    const ds = prikazaniStatus(dep)
    if (statusFilter.value && ds !== statusFilter.value) return false
    if (!q) return true
    const haystack = [
      dep.departure_date,
      dep.departure_time,
      dep.from_location,
      dep.to_location,
      dep.boat,
      statusLabel(ds),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
})

const dohvatiSve = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    const [dep, loc, boat] = await Promise.all([
      api.get('/line-departures'),
      api.get('/locations'),
      api.get('/boats'),
    ])
    departures.value = dep.data
    locations.value = loc.data
    boats.value = boat.data
  } catch (error) {
    errorMessage.value = 'Greška kod dohvaćanja podataka.'
    console.error(error)
  } finally {
    loading.value = false
  }
}

const otvoriDodaj = () => {
  editId.value = null
  form.value = blankForm()
  formError.value = ''
  showModal.value = true
}

const otvoriUredi = (dep) => {
  editId.value = dep.id
  form.value = {
    boat_id: dep.boat_id,
    departure_date: dep.departure_date,
    departure_time: dep.departure_time,
    from_location_id: dep.from_location_id,
    to_location_id: dep.to_location_id,
    capacity: dep.capacity,
    status: dep.status === 'cancelled' ? 'cancelled' : 'scheduled',
  }
  formError.value = ''
  showModal.value = true
}

const zatvoriModal = () => {
  showModal.value = false
}

// Kad se odabere barka pri dodavanju, predloži kapacitet te barke
const naPromjenuBarke = () => {
  if (!isEdit.value) {
    const odabrana = boats.value.find((b) => String(b.id) === String(form.value.boat_id))
    if (odabrana) {
      form.value.capacity = odabrana.capacity
    }
  }
}

const spremi = async () => {
  formError.value = ''

  const f = form.value
  if (
    !f.boat_id ||
    !f.departure_date ||
    !f.departure_time ||
    !f.from_location_id ||
    !f.to_location_id ||
    !f.capacity
  ) {
    formError.value = 'Popunite sva polja.'
    return
  }

  if (String(f.from_location_id) === String(f.to_location_id)) {
    formError.value = 'Polazište i odredište ne mogu biti isti.'
    return
  }

  try {
    saving.value = true
    if (isEdit.value) {
      await api.put(`/line-departures/${editId.value}`, f)
    } else {
      await api.post('/line-departures', f)
    }
    showModal.value = false
    await dohvatiSve()
  } catch (error) {
    formError.value = error.response?.data?.message || 'Spremanje nije uspjelo.'
  } finally {
    saving.value = false
  }
}

const obrisi = async (dep) => {
  if (!confirm(`Obrisati polazak ${dep.departure_date} u ${dep.departure_time}?`)) {
    return
  }
  try {
    await api.delete(`/line-departures/${dep.id}`)
    await dohvatiSve()
  } catch (error) {
    alert(error.response?.data?.message || 'Brisanje nije uspjelo.')
  }
}

// --- GENERATOR POLAZAKA ---
const showGen = ref(false)
const genSaving = ref(false)
const genError = ref('')
const genResult = ref('')

const genForm = ref({
  date_from: '',
  date_to: '',
  time_from: '18:00',
  time_to: '00:00',
  interval_minutes: 10,
  location_a_id: '',
  location_b_id: '',
  capacity: '',
})

const otvoriGenerator = () => {
  genError.value = ''
  genResult.value = ''
  const grad = locations.value.find((l) => l.type === 'city')
  const kamp = locations.value.find((l) => l.type === 'camp')
  const prvaBarka = boats.value[0]
  genForm.value = {
    date_from: '',
    date_to: '',
    time_from: '18:00',
    time_to: '00:00',
    interval_minutes: 10,
    location_a_id: grad ? grad.id : '',
    location_b_id: kamp ? kamp.id : '',
    capacity: prvaBarka ? prvaBarka.capacity : 20,
  }
  showGen.value = true
}

const zatvoriGenerator = () => {
  showGen.value = false
}

const generiraj = async () => {
  genError.value = ''
  genResult.value = ''
  const g = genForm.value

  if (
    !g.date_from ||
    !g.date_to ||
    !g.time_from ||
    !g.time_to ||
    !g.interval_minutes ||
    !g.location_a_id ||
    !g.location_b_id ||
    !g.capacity
  ) {
    genError.value = 'Popunite sva polja.'
    return
  }

  if (String(g.location_a_id) === String(g.location_b_id)) {
    genError.value = 'Dvije lokacije moraju biti različite.'
    return
  }

  try {
    genSaving.value = true
    const res = await api.post('/line-departures/generate', g)
    genResult.value = res.data.message
    await dohvatiSve()
  } catch (error) {
    genError.value = error.response?.data?.message || 'Generiranje nije uspjelo.'
  } finally {
    genSaving.value = false
  }
}

onMounted(dohvatiSve)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Polasci</h1>
        <p class="text-sm text-slate-500">Upravljanje večernjim linijskim polascima</p>
      </div>
      <div class="flex gap-3">
        <button
          @click="otvoriGenerator"
          class="rounded-2xl bg-sky-700 text-white px-5 py-3 font-semibold hover:bg-sky-800 transition"
        >
          Generiraj polaske
        </button>
        <button
          @click="otvoriDodaj"
          class="rounded-2xl border border-slate-300 text-slate-700 px-5 py-3 font-semibold hover:bg-slate-100 transition"
        >
          + Pojedinačni
        </button>
      </div>
    </div>

    <div v-if="loading" class="p-6 bg-white rounded-2xl border border-slate-200">Učitavanje...</div>

    <div
      v-else-if="errorMessage"
      class="p-6 bg-red-50 text-red-700 rounded-2xl border border-red-200"
    >
      {{ errorMessage }}
    </div>

    <div v-else-if="departures.length === 0" class="p-6 bg-white rounded-2xl border border-slate-200">
      Nema polazaka. Klikni "Dodaj polazak".
    </div>

    <div v-else>
      <!-- TRAŽILICA -->
      <div class="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="Traži po datumu, vremenu, ruti, barki..."
          class="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-sky-500"
        />
        <select
          v-model="statusFilter"
          class="rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-sky-500"
        >
          <option value="">Svi statusi</option>
          <option value="scheduled">Aktivni</option>
          <option value="full">Popunjeni</option>
          <option value="cancelled">Otkazani</option>
        </select>
      </div>

      <div
        v-if="filteredDepartures.length === 0"
        class="p-6 bg-white rounded-2xl border border-slate-200 text-slate-500"
      >
        Nema polazaka koji odgovaraju filteru.
      </div>

      <div v-else class="bg-white rounded-[20px] border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-slate-600 text-left">
              <tr>
                <th class="px-4 py-3 font-semibold">Datum</th>
                <th class="px-4 py-3 font-semibold">Vrijeme</th>
                <th class="px-4 py-3 font-semibold">Ruta</th>
                <th class="px-4 py-3 font-semibold">Barka</th>
                <th class="px-4 py-3 font-semibold">Mjesta</th>
                <th class="px-4 py-3 font-semibold">Status</th>
                <th class="px-4 py-3 font-semibold text-right">Akcije</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="dep in filteredDepartures" :key="dep.id" class="hover:bg-slate-50">
                <td class="px-4 py-3 whitespace-nowrap">{{ dep.departure_date }}</td>
                <td class="px-4 py-3 whitespace-nowrap font-medium">{{ dep.departure_time }}</td>
                <td class="px-4 py-3 whitespace-nowrap">
                  {{ dep.from_location }} → {{ dep.to_location }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap">{{ dep.boat }}</td>
                <td class="px-4 py-3 whitespace-nowrap">
                  {{ dep.reserved_seats }} / {{ dep.capacity }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span
                    class="inline-block rounded-full px-2.5 py-1 text-xs font-semibold"
                    :class="{
                      'bg-emerald-50 text-emerald-700': prikazaniStatus(dep) === 'scheduled',
                      'bg-amber-50 text-amber-700': prikazaniStatus(dep) === 'full',
                      'bg-red-50 text-red-700': prikazaniStatus(dep) === 'cancelled',
                    }"
                  >
                    {{ statusLabel(prikazaniStatus(dep)) }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-right">
                  <button
                    @click="otvoriUredi(dep)"
                    class="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-100 transition mr-2"
                  >
                    Uredi
                  </button>
                  <button
                    @click="obrisi(dep)"
                    class="rounded-lg border border-red-300 text-red-700 px-3 py-1.5 text-xs font-semibold hover:bg-red-50 transition"
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 bg-slate-950/60 flex items-start justify-center px-3 py-6 overflow-y-auto"
    >
      <div class="w-full max-w-lg bg-white rounded-[24px] shadow-2xl p-6">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-xl font-bold text-slate-900">
            {{ isEdit ? 'Uredi polazak' : 'Dodaj polazak' }}
          </h2>
          <button @click="zatvoriModal" class="text-slate-400 hover:text-slate-700 text-2xl leading-none">
            ×
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-1.5 text-slate-700">Barka</label>
            <select
              v-model="form.boat_id"
              @change="naPromjenuBarke"
              class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
            >
              <option value="">Odaberi barku</option>
              <option v-for="b in boats" :key="b.id" :value="b.id">
                {{ b.name }} ({{ b.capacity }} mjesta)
              </option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Datum</label>
              <input
                v-model="form.departure_date"
                type="date"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Vrijeme</label>
              <input
                v-model="form.departure_time"
                type="time"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Polazište</label>
              <select
                v-model="form.from_location_id"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              >
                <option value="">Odaberi</option>
                <option v-for="l in locations" :key="l.id" :value="l.id">{{ l.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Odredište</label>
              <select
                v-model="form.to_location_id"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              >
                <option value="">Odaberi</option>
                <option v-for="l in locations" :key="l.id" :value="l.id">{{ l.name }}</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Kapacitet</label>
              <input
                v-model="form.capacity"
                type="number"
                min="1"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Status</label>
              <select
                v-model="form.status"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              >
                <option v-for="s in urediviStatusi" :key="s.value" :value="s.value">
                  {{ s.label }}
                </option>
              </select>
            </div>
          </div>

          <div
            v-if="formError"
            class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {{ formError }}
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            @click="zatvoriModal"
            class="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Odustani
          </button>
          <button
            @click="spremi"
            :disabled="saving"
            class="flex-1 rounded-xl bg-sky-700 text-white px-5 py-3 font-semibold hover:bg-sky-800 transition disabled:opacity-60"
          >
            {{ saving ? 'Spremanje...' : 'Spremi' }}
          </button>
        </div>
      </div>
    </div>

    <!-- GENERATOR MODAL -->
    <div
      v-if="showGen"
      class="fixed inset-0 z-50 bg-slate-950/60 flex items-start justify-center px-3 py-6 overflow-y-auto"
    >
      <div class="w-full max-w-lg bg-white rounded-[24px] shadow-2xl p-6">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-bold text-slate-900">Generiraj polaske</h2>
          <button
            @click="zatvoriGenerator"
            class="text-slate-400 hover:text-slate-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <p class="text-sm text-slate-500 mb-5">
          Kreira sve termine u rasponu za oba smjera i preskače one koji već postoje.
        </p>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Od datuma</label>
              <input
                v-model="genForm.date_from"
                type="date"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Do datuma</label>
              <input
                v-model="genForm.date_to"
                type="date"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Od</label>
              <input
                v-model="genForm.time_from"
                type="time"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Do</label>
              <input
                v-model="genForm.time_to"
                type="time"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Interval (min)</label>
              <input
                v-model="genForm.interval_minutes"
                type="number"
                min="1"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Lokacija A</label>
              <select
                v-model="genForm.location_a_id"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              >
                <option value="">Odaberi</option>
                <option v-for="l in locations" :key="l.id" :value="l.id">{{ l.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1.5 text-slate-700">Lokacija B</label>
              <select
                v-model="genForm.location_b_id"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
              >
                <option value="">Odaberi</option>
                <option v-for="l in locations" :key="l.id" :value="l.id">{{ l.name }}</option>
              </select>
            </div>
          </div>
          <p class="text-xs text-slate-500 -mt-2">Generira oba smjera: A → B i B → A.</p>

          <div>
            <label class="block text-sm font-semibold mb-1.5 text-slate-700">
              Kapacitet po polasku
            </label>
            <input
              v-model="genForm.capacity"
              type="number"
              min="1"
              class="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500"
            />
          </div>

          <div
            v-if="genError"
            class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {{ genError }}
          </div>
          <div
            v-if="genResult"
            class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
          >
            {{ genResult }}
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            @click="zatvoriGenerator"
            class="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Zatvori
          </button>
          <button
            @click="generiraj"
            :disabled="genSaving"
            class="flex-1 rounded-xl bg-sky-700 text-white px-5 py-3 font-semibold hover:bg-sky-800 transition disabled:opacity-60"
          >
            {{ genSaving ? 'Generiranje...' : 'Generiraj' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
