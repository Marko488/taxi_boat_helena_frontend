<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative min-h-[92vh] flex items-center overflow-hidden">
      <div
        class="absolute inset-0 bg-center bg-cover"
        style="background-image: url('/bg.jpg')"
      ></div>

      <div class="absolute inset-0 bg-slate-950/60"></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent"
      ></div>

      <div class="relative z-10 max-w-6xl mx-auto px-4 py-20 w-full">
        <div class="max-w-3xl">
          <p class="uppercase tracking-[0.3em] text-xs md:text-sm text-sky-200 mb-5">
            Cres • Kamp Kovačine • Taxi Boat • Gliser izleti
          </p>

          <h1 class="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6">
            Doživite Cres s mora uz Taxi Boat Helenu
          </h1>

          <p class="text-base md:text-xl text-slate-100/90 max-w-2xl leading-8 mb-8">
            Od večernjih vožnji između grada Cresa i kampa Kovačine do dnevnih gliser izleta prema
            Lubenicama, Plavoj groti i Valunu — Taxi Boat Helena spaja praktičan prijevoz, opuštenu
            plovidbu i autentičan doživljaj creske obale.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mb-10">
            <RouterLink
              to="/linije"
              class="inline-flex items-center justify-center rounded-2xl bg-sky-600 text-white font-semibold px-7 py-4 hover:bg-sky-700 transition shadow-lg"
            >
              Rezerviraj večernju vožnju
            </RouterLink>

            <a
              href="#ponuda"
              class="inline-flex items-center justify-center rounded-2xl border border-white/40 text-white font-semibold px-7 py-4 hover:bg-white/10 transition"
            >
              Pogledaj ponudu
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-white/10 backdrop-blur rounded-2xl px-4 py-4 border border-white/10">
              <p class="text-white font-semibold text-lg">18:00 – 00:00</p>
              <p class="text-slate-200 text-sm mt-1">
                Svakodnevna večernja linija između Cresa i kampa
              </p>
            </div>

            <div class="bg-white/10 backdrop-blur rounded-2xl px-4 py-4 border border-white/10">
              <p class="text-white font-semibold text-lg">Svakih 10 minuta</p>
              <p class="text-slate-200 text-sm mt-1">
                Dvije barke prometuju paralelno i smanjuju čekanje
              </p>
            </div>

            <div class="bg-white/10 backdrop-blur rounded-2xl px-4 py-4 border border-white/10">
              <p class="text-white font-semibold text-lg">Jutarnji i popodnevni izleti</p>
              <p class="text-slate-200 text-sm mt-1">
                Gliser ture prema najljepšim lokacijama creskog akvatorija
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- UVOD -->
    <section class="max-w-6xl mx-auto px-4 py-16">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-sm uppercase tracking-[0.2em] text-sky-700 font-semibold mb-3">
            Dobro došli
          </p>

          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
            Pouzdana brodska usluga za prijevoz i izlete na otoku Cresu
          </h2>

          <p class="text-slate-600 leading-8 mb-5">
            Taxi Boat Helena namijenjen je gostima koji žele jednostavan i ugodan prijevoz morem,
            ali i svima koji žele istražiti Cres iz posebne perspektive. Večernja vožnja nije samo
            praktična veza između grada i kampa, nego i prilika za uživanje u pogledu na obalu,
            tišini mora i bojama zalaska sunca.
          </p>

          <p class="text-slate-600 leading-8">
            Uz taxi boat liniju dostupni su i dnevni gliser izleti za sve koji žele posjetiti
            Lubenice, Plavu grotu, Valun i druge atraktivne lokacije dostupne morskim putem.
          </p>
        </div>

        <div class="relative">
          <img
            src="/about-helena.jpg"
            alt="Taxi Boat Helena na Cresu"
            class="w-full h-[420px] object-cover rounded-[32px] shadow-lg"
          />
          <div
            class="absolute bottom-5 left-5 bg-white/95 rounded-2xl px-5 py-4 shadow-lg max-w-xs"
          >
            <p class="text-sm text-slate-500 mb-1">Obiteljska tradicija</p>
            <p class="font-semibold text-slate-900">
              Dugogodišnje iskustvo, lokalno znanje i usluga prilagođena gostima Cresa
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- PONUDA -->
    <section id="ponuda" class="bg-slate-100 py-16">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-12">
          <p class="text-sm uppercase tracking-[0.2em] text-sky-700 font-semibold mb-3">
            Naša ponuda
          </p>

          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Odaberite vožnju ili izlet koji vam najviše odgovara
          </h2>

          <p class="text-slate-600 max-w-2xl mx-auto leading-7">
            Večernja taxi boat linija i dnevni gliser izleti osmišljeni su kako bi boravak na Cresu
            učinili jednostavnijim, ugodnijim i ispunjenim pravim doživljajem mora.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- NIGHT LINE -->
          <div class="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <img
              src="/night-line.jpg"
              alt="Večernja taxi boat linija Cres Kamp Kovačine"
              class="w-full h-72 object-cover"
            />

            <div class="p-8">
              <p class="text-sm uppercase tracking-[0.2em] text-sky-700 font-semibold mb-3">
                Večernja linija
              </p>

              <h3 class="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
                Cres ↔ Kamp Kovačine
              </h3>

              <p class="text-slate-600 leading-8 mb-6">
                Večernja taxi boat linija omogućuje brz, jednostavan i ugodan prijevoz između grada
                Cresa i kampa Kovačine. Dvije barke prometuju paralelno i izmjenjuju polaske, pa
                putnici manje čekaju, a više uživaju u plovidbi uz more i večernju atmosferu otoka.
              </p>

              <div class="grid sm:grid-cols-2 gap-4 mb-6">
                <div class="bg-slate-50 rounded-2xl p-4">
                  <p class="text-sm text-slate-500 mb-1">Radno vrijeme</p>
                  <p class="font-semibold text-slate-900">18:00 – 00:00</p>
                </div>

                <div class="bg-slate-50 rounded-2xl p-4">
                  <p class="text-sm text-slate-500 mb-1">Ritam polazaka</p>
                  <p class="font-semibold text-slate-900">Svakih 10 minuta</p>
                </div>
              </div>

              <ul class="text-sm text-slate-600 space-y-3 mb-8">
                <li>• dvije barke u paralelnom prometu</li>
                <li>• manje čekanja i brži dolazak</li>
                <li>• pregled raspoloživih termina i mjesta</li>
                <li>• posebna atmosfera večernje vožnje i zalaska sunca</li>
              </ul>

              <RouterLink
                to="/linije"
                class="inline-flex items-center justify-center rounded-2xl bg-sky-700 text-white px-6 py-3 font-semibold hover:bg-sky-800 transition"
              >
                Pogledaj linijske polaske
              </RouterLink>
            </div>
          </div>

          <!-- DAILY TRIPS -->
          <div class="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <img
              src="/speedy-helena.jpg"
              alt="Gliser izleti Taxi Boat Helena"
              class="w-full h-72 object-cover"
            />

            <div class="p-8">
              <p class="text-sm uppercase tracking-[0.2em] text-sky-700 font-semibold mb-3">
                Dnevni gliser izleti
              </p>

              <h3 class="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
                Lubenice, Plava grota i Valun
              </h3>

              <p class="text-slate-600 leading-8 mb-6">
                Uz gliser “Speedy Helena” moguće je otkriti najljepše lokacije creskog akvatorija
                kroz jutarnje i popodnevne ture. Kristalno čisto more, skrivene uvale, atraktivne
                stijene i prepoznatljive destinacije stvaraju iskustvo koje ostaje u sjećanju.
              </p>

              <div class="grid sm:grid-cols-2 gap-4 mb-6">
                <div class="bg-slate-50 rounded-2xl p-4">
                  <p class="text-sm text-slate-500 mb-1">Jutarnji termin</p>
                  <p class="font-semibold text-slate-900">09:00 – 13:00</p>
                </div>

                <div class="bg-slate-50 rounded-2xl p-4">
                  <p class="text-sm text-slate-500 mb-1">Popodnevni termin</p>
                  <p class="font-semibold text-slate-900">15:00 – 19:00</p>
                </div>
              </div>

              <ul class="text-sm text-slate-600 space-y-3 mb-8">
                <li>• polazak iz grada Cresa</li>
                <li>• izleti prema Lubenicama i Plavoj groti</li>
                <li>• mogućnost izleta u Valun</li>
                <li>• opušteniji i osobniji doživljaj plovidbe</li>
              </ul>

              <button
                class="inline-flex items-center justify-center rounded-2xl bg-slate-800 text-white px-6 py-3 font-semibold opacity-70 cursor-not-allowed"
              >
                Više o izletima uskoro
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- KAKO FUNKCIONIRA -->
    <section class="max-w-6xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <p class="text-sm uppercase tracking-[0.2em] text-sky-700 font-semibold mb-3">
          Rezervacija vožnje
        </p>

        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Rezervirajte svoju vožnju jednostavno
        </h2>

        <p class="text-slate-600 max-w-2xl mx-auto leading-7">
          Večernju taxi boat vožnju možete odabrati kroz jasan pregled termina, datuma i slobodnih
          mjesta.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div class="text-3xl mb-4">1️⃣</div>
          <h3 class="text-lg font-bold mb-3">Odaberi datum i polazište</h3>
          <p class="text-sm text-slate-600 leading-7">
            Pregledaj raspoložive polaske za željeni dan i lokaciju s koje želiš krenuti.
          </p>
        </div>

        <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div class="text-3xl mb-4">2️⃣</div>
          <h3 class="text-lg font-bold mb-3">Pregledaj termine</h3>
          <p class="text-sm text-slate-600 leading-7">
            Jasan prikaz vremena polaska i broja slobodnih mjesta omogućuje brz odabir vožnje.
          </p>
        </div>

        <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div class="text-3xl mb-4">3️⃣</div>
          <h3 class="text-lg font-bold mb-3">Rezerviraj mjesto</h3>
          <p class="text-sm text-slate-600 leading-7">
            Odaberi polazak koji ti odgovara i potvrdi rezervaciju za večernju plovidbu.
          </p>
        </div>
      </div>
    </section>

    <!-- ABOUT / TRUST -->
    <section class="bg-slate-950 text-slate-200 py-16">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p class="text-sm uppercase tracking-[0.2em] text-sky-300 font-semibold mb-3">O nama</p>

            <h2 class="text-3xl md:text-4xl font-bold text-white mb-5">
              Obiteljska usluga s iskustvom i ljubavlju prema Cresu
            </h2>

            <p class="text-slate-300 leading-8 mb-4">
              Taxi Boat Helena obiteljska je brodska usluga koja se oslanja na iskustvo, lokalno
              znanje i pristup usmjeren na goste. Plovidba nije samo prijevoz, nego dio doživljaja
              otoka i njegovih obalnih ljepota.
            </p>

            <p class="text-slate-300 leading-8">
              Večernja vožnja morem, pogled na obalu u zlatnim tonovima zalaska sunca i opuštena
              atmosfera creskih večeri čine ovu uslugu posebnim dijelom boravka na otoku.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div class="bg-white/5 border border-white/10 rounded-3xl p-5">
              <h3 class="font-semibold text-white mb-2">Više od 20 godina iskustva</h3>
              <p class="text-sm text-slate-300 leading-7">
                Dugogodišnja tradicija i sigurna plovidba temelj su usluge Taxi Boat Helena.
              </p>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-3xl p-5">
              <h3 class="font-semibold text-white mb-2">Lokalno znanje</h3>
              <p class="text-sm text-slate-300 leading-7">
                Gosti dobivaju više od prijevoza — dobivaju iskustvo vožnje uz ljude koji poznaju
                Cres.
              </p>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-3xl p-5">
              <h3 class="font-semibold text-white mb-2">Udobna i sigurna plovidba</h3>
              <p class="text-sm text-slate-300 leading-7">
                Večernje vožnje i dnevni izleti osmišljeni su za ugodan i pouzdan boravak na moru.
              </p>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-3xl p-5">
              <h3 class="font-semibold text-white mb-2">Idealno za turiste i goste kampa</h3>
              <p class="text-sm text-slate-300 leading-7">
                Brz pristup gradu, kampu i atraktivnim izletima bez nepotrebne komplikacije.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
