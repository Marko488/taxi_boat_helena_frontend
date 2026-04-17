<script setup>
import DeparturesLine from '../components/DeparturesLine.vue'
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative min-h-[72vh] md:min-h-[78vh] flex items-end overflow-hidden">
      <div
        class="absolute inset-0 bg-center bg-cover"
        style="background-image: url('/night-line.jpg')"
      ></div>

      <div class="absolute inset-0 bg-slate-950/45"></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent"
      ></div>
      <div
        class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent"
      ></div>

      <div class="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 pb-20 md:pb-24 w-full">
        <div class="max-w-3xl">
          <p class="uppercase tracking-[0.28em] text-xs md:text-sm text-sky-200 mb-4">
            Večernja taxi boat linija
          </p>

          <h1 class="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-5">
            Uživajte u večernjoj vožnji između Cresa i kampa Kovačine
          </h1>

          <p class="text-base md:text-xl text-slate-100/90 max-w-2xl leading-8 mb-8">
            Brz i ugodan prijevoz morem, bez gužve i bez dugog čekanja — uz pogled na obalu, zalazak
            sunca i opuštenu atmosferu creskih večeri.
          </p>

          <div class="flex flex-wrap gap-3">
            <div class="bg-white/12 backdrop-blur rounded-2xl px-4 py-3 border border-white/10">
              <p class="text-white font-semibold">18:00 – 00:00</p>
              <p class="text-slate-200 text-xs mt-1">svakodnevno</p>
            </div>

            <div class="bg-white/12 backdrop-blur rounded-2xl px-4 py-3 border border-white/10">
              <p class="text-white font-semibold">Svakih 10 minuta</p>
              <p class="text-slate-200 text-xs mt-1">dvije barke u prometu</p>
            </div>

            <div class="bg-white/12 backdrop-blur rounded-2xl px-4 py-3 border border-white/10">
              <p class="text-white font-semibold">Cres ↔ Kamp Kovačine</p>
              <p class="text-slate-200 text-xs mt-1">jednostavan večernji prijevoz</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VIDEO + SLIKA -->
    <section class="relative -mt-8 z-20 bg-[#041b4d] pt-10 pb-10">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <!-- TEKST IZNAD -->
        <div class="mb-8">
          <p class="text-sm uppercase tracking-[0.18em] text-sky-300 font-semibold mb-2">
            Atmosfera večernje vožnje
          </p>

          <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
            Doživite Cres uz more, zalazak sunca i mir večernje plovidbe
          </h2>

          <p class="text-base md:text-lg text-slate-200 leading-8 max-w-4xl">
            Večernja linija između grada Cresa i kampa Kovačine nije samo praktičan prijevoz, nego i
            poseban doživljaj vožnje morem — trenutak kada se dan smiruje, a more i obala dobivaju
            tople tonove zalaska sunca.
          </p>

          <p class="text-base md:text-lg text-slate-200 leading-8 max-w-4xl mt-3">
            Bez gužve, bez čekanja i bez stresa, plovidba postaje dio iskustva boravka na otoku —
            kratko putovanje koje spaja udobnost prijevoza, pogled na horizont i opuštenu atmosferu
            creskih večeri.
          </p>
        </div>

        <!-- MEDIA -->
        <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_1.5fr] gap-4 items-stretch">
          <!-- VIDEO -->
          <div class="rounded-[28px] overflow-hidden relative h-[380px] md:h-[500px]">
            <video
              autoplay
              muted
              loop
              playsinline
              preload="auto"
              class="absolute inset-0 w-full h-full object-cover scale-[1.72]"
            >
              <source src="/video_nocne_voznje.mp4" type="video/mp4" />
            </video>

            <div class="absolute inset-0 bg-slate-950/10"></div>
          </div>

          <!-- DESNA SLIKA -->
          <div class="rounded-[28px] overflow-hidden h-[380px] md:h-[500px]">
            <img
              src="/tx_nocu.jpg"
              alt="Taxi Boat Helena večernja vožnja"
              class="w-full h-full object-cover object-left"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CIJENE -->
    <section class="relative mt-8 z-20">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="bg-white rounded-[32px] border border-slate-200 shadow-xl p-6 md:p-7">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div class="max-w-xl">
              <p class="text-sm uppercase tracking-[0.18em] text-sky-700 font-semibold mb-2">
                Cijene večernje linije
              </p>
              <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Jednostavne i jasne cijene za cijelu obitelj
              </h2>
              <p class="text-slate-600 leading-7">
                Odaberite termin koji vam odgovara i uživajte u brzoj vožnji morem između grada
                Cresa i kampa Kovačine.
              </p>
            </div>

            <div class="grid sm:grid-cols-3 gap-4 lg:min-w-[520px]">
              <div class="rounded-2xl bg-sky-50 border border-sky-100 p-5">
                <p class="text-sm text-slate-500 mb-1">Odrasli</p>
                <p class="text-2xl font-bold text-slate-900">4 €</p>
              </div>

              <div class="rounded-2xl bg-sky-50 border border-sky-100 p-5">
                <p class="text-sm text-slate-500 mb-1">Djeca 6 – 12</p>
                <p class="text-2xl font-bold text-slate-900">2 €</p>
              </div>

              <div class="rounded-2xl bg-sky-50 border border-sky-100 p-5">
                <p class="text-sm text-slate-500 mb-1">Djeca do 6</p>
                <p class="text-2xl font-bold text-slate-900">Besplatno</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TERMINI -->
    <section class="max-w-[1200px] mx-auto px-4 md:px-6 pt-10 pb-16">
      <DeparturesLine />
    </section>
  </div>
</template>
