<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <section id="pocetna" class="relative min-h-[78vh] flex items-center overflow-hidden">
      <div
        class="absolute inset-0 bg-center bg-cover"
        style="background-image: url('/bg.jpg')"
      ></div>

      <div class="absolute inset-0 bg-slate-950/45"></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-transparent"
      ></div>

      <div class="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24 w-full">
        <div class="max-w-3xl">
          <p class="uppercase tracking-[0.25em] text-xs md:text-sm text-sky-100 mb-4">
            Cres • Kamp Kovačine • Taxi Boat
          </p>

          <h2 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
            Rezerviraj vožnju brodom brzo, jednostavno i sigurno
          </h2>

          <p class="text-base md:text-lg text-slate-100/90 max-w-2xl mb-8 leading-7">
            Pregledaj večernje linijske polaske između grada Cresa i kampa Kovačine, provjeri broj
            slobodnih mjesta i rezerviraj svoju vožnju u nekoliko klikova.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink
              to="/linije"
              class="inline-flex items-center justify-center rounded-2xl bg-sky-600 text-white font-semibold px-6 py-3 hover:bg-sky-700 transition shadow-lg"
            >
              Pregledaj polaske
            </RouterLink>

            <button
              class="inline-flex items-center justify-center rounded-2xl border border-white/40 text-white font-semibold px-6 py-3 hover:bg-white/10 transition"
            >
              Pogledaj izlete
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="relative -mt-10 md:-mt-14 z-20">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white rounded-3xl shadow-lg border border-slate-200 p-5">
            <p class="text-sm text-slate-500 mb-1">Večernja linija</p>
            <h3 class="text-lg font-bold mb-2">Cres ↔ Kamp Kovačine</h3>
            <p class="text-sm text-slate-600 leading-6">
              Dvije barke prometuju paralelno i izmjenično svakih 10 minuta od 18:00 do 00:00.
            </p>
          </div>

          <div class="bg-white rounded-3xl shadow-lg border border-slate-200 p-5">
            <p class="text-sm text-slate-500 mb-1">Brza rezervacija</p>
            <h3 class="text-lg font-bold mb-2">Pregled slobodnih mjesta</h3>
            <p class="text-sm text-slate-600 leading-6">
              Korisnici mogu pregledati raspoložive polaske i provjeriti kapacitet prije
              rezervacije.
            </p>
          </div>

          <div class="bg-white rounded-3xl shadow-lg border border-slate-200 p-5">
            <p class="text-sm text-slate-500 mb-1">Turistički izleti</p>
            <h3 class="text-lg font-bold mb-2">Lubenice, Plava grota i Valun</h3>
            <p class="text-sm text-slate-600 leading-6">
              Zasebno plovilo koristi se za dnevne izlete s polaskom iz grada Cresa.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 pt-14 pb-16">
      <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div class="flex items-start justify-between gap-4 flex-col md:flex-row">
          <div>
            <p class="text-sm uppercase tracking-wider text-sky-700 font-semibold mb-2">
              Linijski polasci
            </p>
            <h3 class="text-2xl md:text-3xl font-bold mb-3">Pregled večernjih vožnji</h3>
            <p class="text-slate-600 max-w-2xl leading-7">
              Na zasebnoj stranici možeš pregledati sve dostupne polaske, filtrirati ih po datumu i
              polazištu te odabrati željeni termin za rezervaciju.
            </p>
          </div>

          <RouterLink
            to="/linije"
            class="rounded-2xl bg-sky-700 text-white px-5 py-3 font-semibold hover:bg-sky-800 transition"
          >
            Otvori linijske polaske
          </RouterLink>
        </div>
      </div>
    </section>

    <section id="izleti" class="max-w-6xl mx-auto px-4 pb-16">
      <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div class="flex items-start justify-between gap-4 flex-col md:flex-row">
          <div>
            <p class="text-sm uppercase tracking-wider text-sky-700 font-semibold mb-2">
              Turistički izleti
            </p>
            <h3 class="text-2xl md:text-3xl font-bold mb-3">Dnevne ture gliserom</h3>
            <p class="text-slate-600 max-w-2xl leading-7">
              Sljedeći korak je dodavanje posebne sekcije za turističke izlete i rezervacije dnevnih
              tura.
            </p>
          </div>

          <button
            class="rounded-2xl bg-sky-700 text-white px-5 py-3 font-semibold hover:bg-sky-800 transition"
          >
            Uskoro dostupno
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
