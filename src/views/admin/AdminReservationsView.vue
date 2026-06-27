<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../../services/api'

const reservations = ref([])
const loading = ref(false)
const errorMessage = ref('')

const search = ref('')
const statusFilter = ref('')

const statusLabel = (value) => (value === 'cancelled' ? 'Otkazana' : 'Aktivna')

const dohvati = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    const res = await api.get('/line-reservations')
    reservations.value = res.data
  } catch (error) {
    errorMessage.value = 'Greška kod dohvaćanja rezervacija.'
    console.error(error)
  } finally {
    loading.value = false
  }
}

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return reservations.value.filter((r) => {
    if (statusFilter.value && r.status !== statusFilter.value) return false
    if (!q) return true
    const haystack = [
      r.reservation_code,
      r.guest_name,
      r.guest_email,
      r.departure_date,
      r.departure_time,
      r.from_location,
      r.to_location,
      r.boat_name,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
})

const otkazi = async (r) => {
  if (!confirm(`Otkazati rezervaciju ${r.reservation_code}?`)) return
  try {
    await api.delete(`/line-reservations/${r.id}`)
    await dohvati()
  } catch (error) {
    alert(error.response?.data?.message || 'Otkazivanje nije uspjelo.')
  }
}

onMounted(dohvati)
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-900">Rezervacije</h1>
      <p class="text-sm text-slate-500">Pregled i otkazivanje rezervacija</p>
    </div>

    <div v-if="loading" class="p-6 bg-white rounded-2xl border border-slate-200">Učitavanje...</div>

    <div
      v-else-if="errorMessage"
      class="p-6 bg-red-50 text-red-700 rounded-2xl border border-red-200"
    >
      {{ errorMessage }}
    </div>

    <div
      v-else-if="reservations.length === 0"
      class="p-6 bg-white rounded-2xl border border-slate-200"
    >
      Još nema rezervacija.
    </div>

    <div v-else>
      <!-- TRAŽILICA -->
      <div class="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="Traži po kodu, datumu, ruti, barki..."
          class="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-sky-500"
        />
        <select
          v-model="statusFilter"
          class="rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-sky-500"
        >
          <option value="">Sve rezervacije</option>
          <option value="active">Aktivne</option>
          <option value="cancelled">Otkazane</option>
        </select>
      </div>

      <div
        v-if="filtered.length === 0"
        class="p-6 bg-white rounded-2xl border border-slate-200 text-slate-500"
      >
        Nema rezervacija koje odgovaraju filteru.
      </div>

      <div v-else class="bg-white rounded-[20px] border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-slate-600 text-left">
              <tr>
                <th class="px-4 py-3 font-semibold">Kod</th>
                <th class="px-4 py-3 font-semibold">Gost</th>
                <th class="px-4 py-3 font-semibold">Datum</th>
                <th class="px-4 py-3 font-semibold">Vrijeme</th>
                <th class="px-4 py-3 font-semibold">Ruta</th>
                <th class="px-4 py-3 font-semibold">Mjesta</th>
                <th class="px-4 py-3 font-semibold">Status</th>
                <th class="px-4 py-3 font-semibold text-right">Akcije</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="r in filtered" :key="r.id" class="hover:bg-slate-50">
                <td class="px-4 py-3 whitespace-nowrap font-mono text-xs font-semibold">
                  {{ r.reservation_code }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="font-medium">{{ r.guest_name || '—' }}</div>
                  <div class="text-xs text-slate-500">{{ r.guest_email }}</div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">{{ r.departure_date }}</td>
                <td class="px-4 py-3 whitespace-nowrap font-medium">{{ r.departure_time }}</td>
                <td class="px-4 py-3 whitespace-nowrap">
                  {{ r.from_location }} → {{ r.to_location }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  {{ r.seats_count }}
                  <span class="text-slate-400 text-xs">
                    ({{ r.adults_count }} odr. / {{ r.children_count }} dj.)
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span
                    class="inline-block rounded-full px-2.5 py-1 text-xs font-semibold"
                    :class="
                      r.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    "
                  >
                    {{ statusLabel(r.status) }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-right">
                  <button
                    v-if="r.status === 'active'"
                    @click="otkazi(r)"
                    class="rounded-lg border border-red-300 text-red-700 px-3 py-1.5 text-xs font-semibold hover:bg-red-50 transition"
                  >
                    Otkaži
                  </button>
                  <span v-else class="text-xs text-slate-400">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
