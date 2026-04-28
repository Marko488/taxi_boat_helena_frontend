<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const whatsappLink = 'https://api.whatsapp.com/send?phone=385915121829'
const emailLink = 'https://mail.google.com/mail/?view=cm&fs=1&to=booking.taxi@gmail.com'
const facebookLink = 'https://www.facebook.com/p/Taxi-Boat-Helena-100063761340612/'
const instagramLink = 'https://www.instagram.com/taxi_boat_helena/'
const lubeniceImages = [
  '/blue-cave-3.jpg',
  '/Lubenice-krajolik.jpg',
  '/speedy-helena.jpg',
  '/blue-cave.jpg',
]

const valunImages = ['/pravi_valun.jpg', '/beach-valun.jpg', '/Valun_(1).jpg', '/na-moru.jpg']

const selectedLubeniceImage = ref(lubeniceImages[0])
const selectedValunImage = ref(valunImages[0])

let lubeniceIndex = 0
let valunIndex = 0
let lubeniceInterval = null
let valunInterval = null

const pokreniLubeniceAuto = () => {
  lubeniceInterval = setInterval(() => {
    lubeniceIndex = (lubeniceIndex + 1) % lubeniceImages.length
    selectedLubeniceImage.value = lubeniceImages[lubeniceIndex]
  }, 3500)
}

const pokreniValunAuto = () => {
  valunInterval = setInterval(() => {
    valunIndex = (valunIndex + 1) % valunImages.length
    selectedValunImage.value = valunImages[valunIndex]
  }, 4000)
}

const odaberiLubeniceSliku = (image) => {
  selectedLubeniceImage.value = image
  lubeniceIndex = lubeniceImages.indexOf(image)
}

const odaberiValunSliku = (image) => {
  selectedValunImage.value = image
  valunIndex = valunImages.indexOf(image)
}

onMounted(() => {
  pokreniLubeniceAuto()
  pokreniValunAuto()
})

onBeforeUnmount(() => {
  if (lubeniceInterval) clearInterval(lubeniceInterval)
  if (valunInterval) clearInterval(valunInterval)
})
</script>

<template>
  <div class="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-900">
    <!-- WHATSAPP -->
    <a
      :href="whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pošalji poruku na WhatsApp"
      class="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[9999] w-[68px] h-[68px] rounded-full bg-[#25D366] shadow-[0_12px_30px_rgba(0,0,0,0.35)] flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-[bounce_3.4s_ease-in-out_infinite]"
    >
      <img src="/whatsapp.png" alt="WhatsApp" class="w-9 h-9 object-contain" />
    </a>

    <!-- GORNJI PLAVI DIO -->
    <div class="bg-[#041b4d] text-white">
      <!-- HERO -->
      <section class="relative min-h-[125vh] flex items-center overflow-hidden">
        <!-- SLIKA -->
        <img
          src="/speedey-lubenice.jpg"
          alt="Taxi boat Cres"
          class="absolute inset-0 w-full h-full object-cover object-[center_50%]"
        />

        <!-- LIJEVI GRADIENT -->
        <div
          class="absolute inset-0"
          style="
            background:
              linear-gradient(
                90deg,
                rgba(2, 6, 23, 0.98) 0%,
                rgba(2, 6, 23, 0.88) 18%,
                rgba(2, 6, 23, 0.55) 36%,
                rgba(2, 6, 23, 0.18) 55%,
                rgba(2, 6, 23, 0) 72%
              ),
              linear-gradient(
                180deg,
                rgba(2, 6, 23, 0.05) 0%,
                rgba(2, 6, 23, 0) 45%,
                rgba(2, 6, 23, 0.25) 100%
              );
          "
        ></div>

        <!-- CONTENT -->
        <div class="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-32">
          <div class="max-w-[620px]">
            <p
              class="uppercase tracking-[0.32em] text-[10px] md:text-xs text-sky-100/90 font-semibold mb-5"
            >
              Cres • Gliser izleti • Lubenice • Plava grota • Valun
            </p>

            <h1
              class="text-[2.8rem] sm:text-[3.5rem] md:text-[4.5rem] font-black leading-[0.94] tracking-[-0.055em] mb-6 text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)]"
            >
              Premium gliser izleti za najljepši doživljaj Cresa
            </h1>

            <div class="border-l-2 border-amber-300/90 pl-5 mb-7 max-w-[590px]">
              <p class="text-[1rem] sm:text-lg text-white/95 leading-8">
                Otkrijte skrivene plaže, kristalno čisto more i posebnu atmosferu creske obale.
                Birajte između pažljivo osmišljenih izleta i privatne ture za potpuno poseban
                doživljaj mora.
              </p>
            </div>

            <!-- GUMB -->
            <div class="flex flex-col items-start gap-4">
              <a
                href="#kontakt1"
                class="group relative inline-flex w-[300px] max-w-full items-center justify-between overflow-hidden rounded-[18px] border border-amber-300/60 bg-slate-950/40 px-6 py-4 text-white backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-slate-950/60"
              >
                <!-- unutarnji gradient -->
                <span
                  class="absolute inset-0 bg-gradient-to-r from-amber-300/15 via-white/5 to-transparent opacity-80"
                ></span>

                <!-- glow -->
                <span
                  class="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-amber-300/10 blur-xl"
                ></span>

                <span class="relative flex items-center gap-4">
                  <!-- IKONA -->
                  <span
                    class="flex h-9 w-14 items-center justify-center rounded-xl border border-amber-300/60 bg-gradient-to-br from-amber-300/20 to-amber-300/5"
                  >
                    <img src="/phone.png" class="w-11 h-11 object-contain" />
                  </span>

                  <span class="text-base font-black tracking-tight"> Kontaktiraj nas </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- VIDEO SEKCIJA -->
      <section class="max-w-7xl mx-auto px-4 py-20">
        <div class="text-center mb-10">
          <p class="text-sm uppercase tracking-[0.2em] text-sky-300 font-semibold mb-3">
            Doživljaj na moru
          </p>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Više od izleta — pravo iskustvo Cresa</h2>
          <p class="text-slate-300 max-w-3xl mx-auto leading-8">
            Otkrijte skrivene ljepote Cresa iz jedinstvene perspektive mora. Svaki izlazak donosi
            nove prizore, miris soli i osjećaj slobode.
          </p>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-[1fr_380px_1fr] gap-4 md:gap-6 items-center">
          <div class="flex justify-center">
            <div
              class="relative overflow-hidden rounded-[32px] shadow-2xl border border-white/10 bg-white/5 w-[280px] md:w-[320px] h-[420px] md:h-[520px]"
            >
              <video
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
                class="absolute inset-0 w-full h-full object-cover scale-[1] md:scale-[1.1]"
              >
                <source src="/stijene2.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div class="relative flex items-center justify-center">
            <div
              class="bg-gradient-to-br from-slate-950/90 via-[#041b4d]/90 to-slate-950/90 backdrop-blur-2xl border border-white/20 rounded-[36px] px-8 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)] text-center w-full max-w-[380px]"
            >
              <p class="text-xs uppercase tracking-[0.3em] text-sky-300 font-semibold mb-4">
                Premium iskustvo
              </p>

              <h5 class="text-xl md:text-[1.5rem] font-bold leading-tight text-white mb-5">
                Ponesite fotoaparat — uspomene ostaju zauvijek, a doživljaj Cresa s mora pamti se
                još duže
              </h5>

              <p class="text-slate-300 leading-7 text-sm md:text-base mb-6">
                Plovidba uz divlju obalu Cresa otkriva skrivene uvale, tirkizno more i prizore
                nedostupne s kopna. Svaki izlet donosi jedinstven doživljaj — spoj impresivnih
                stijena, kristalno čistog mora, opuštene atmosfere i, uz malo sreće, susreta s
                dupinima.
              </p>

              <div class="flex flex-wrap justify-center gap-3 text-xs md:text-sm">
                <span class="bg-white/10 px-3 py-1.5 rounded-full">4h doživljaja</span>
                <span class="bg-white/10 px-3 py-1.5 rounded-full">male grupe</span>
                <span class="bg-white/10 px-3 py-1.5 rounded-full">privatne ture</span>

                <span class="bg-white/10 px-3 py-1.5 rounded-full">netaknuta priroda</span>
                <span class="bg-white/10 px-3 py-1.5 rounded-full">mogući dupini 🐬</span>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <div
              class="relative overflow-hidden rounded-[32px] shadow-2xl border border-white/10 bg-white/5 w-[280px] md:w-[320px] h-[420px] md:h-[520px]"
            >
              <video
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
                class="absolute inset-0 w-full h-full object-cover scale-[1] md:scale-[1.09]"
              >
                <source src="/dupini.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- NASLOV PONUDE - IZNAD SVJETLOG DIJELA -->
    <section id="ponuda-izleta" class="max-w-7xl mx-auto px-4 pt-14 pb-12 text-center">
      <div class="flex items-center justify-center gap-4 mb-4">
        <div class="h-px w-16 bg-sky-400/40"></div>
        <p class="text-sm uppercase tracking-[0.24em] text-sky-700 font-semibold">Naša ponuda</p>
        <div class="h-px w-16 bg-sky-400/40"></div>
      </div>

      <h2 class="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
        Dva izleta. Nezaboravno iskustvo.
      </h2>

      <p class="text-slate-600 max-w-2xl mx-auto leading-8">
        Birajte između avanturističkog izleta prema Lubenicama i Plavoj groti ili opuštenijeg dana u
        Valunu, uz mogućnost privatne ture za potpuno poseban doživljaj.
      </p>
    </section>

    <!-- DONJI SVIJETLI PREMIUM DIO -->
    <div class="bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <!-- LUBENICE -->
      <section class="max-w-7xl mx-auto px-4 pb-10">
        <div
          class="grid xl:grid-cols-[1.02fr_1.08fr] gap-8 rounded-[34px] border border-slate-200 bg-white p-4 md:p-5 shadow-[0_25px_80px_rgba(15,23,42,0.08)]"
        >
          <!-- LIJEVO -->
          <div class="flex flex-col h-full">
            <img
              :src="selectedLubeniceImage"
              alt="Lubenice gallery"
              class="w-full h-[420px] md:h-[520px] xl:h-[580px] object-cover rounded-[26px]"
            />

            <div class="grid grid-cols-4 gap-3 mt-4">
              <button
                v-for="image in lubeniceImages"
                :key="image"
                type="button"
                @click="odaberiLubeniceSliku(image)"
                class="rounded-[18px] overflow-hidden border transition-all duration-300 bg-slate-50 hover:bg-white"
                :class="
                  selectedLubeniceImage === image
                    ? 'border-sky-500 shadow-[0_0_0_1px_rgba(14,165,233,0.35)] scale-[1.02]'
                    : 'border-slate-200 hover:-translate-y-0.5'
                "
              >
                <img
                  :src="image"
                  alt="Lubenice thumb"
                  class="w-full h-16 md:h-21 object-cover rounded-[14px]"
                />
              </button>
            </div>

            <div class="mt-4 grid gap-4 flex-1">
              <div class="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
                <p class="text-sm uppercase tracking-[0.18em] text-sky-700 font-semibold mb-3">
                  Praktične informacije
                </p>

                <ul class="space-y-2 text-slate-700 text-sm leading-6">
                  <li>• Hranu i piće potrebno je ponijeti sa sobom</li>
                  <li>
                    • Na korištenje dobivate <strong>2 SUP-a</strong> i <strong>flamingo</strong>
                  </li>
                  <li>• Idealno za kupanje, opuštanje i ljetni vibe</li>
                </ul>
              </div>

              <div
                class="rounded-[22px] border border-amber-300/40 bg-gradient-to-r from-amber-50 to-orange-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <p class="text-sm uppercase tracking-[0.18em] text-amber-700 font-semibold mb-2">
                    Privatna tura
                  </p>
                  <p class="text-slate-900 font-semibold">
                    Lubenice &amp; Plava grota samo za vašu grupu
                  </p>
                  <p class="text-slate-600 text-sm mt-1">
                    Fleksibilnije vrijeme, privatniji tempo i potpun komfor na moru.
                  </p>
                </div>

                <div class="text-left sm:text-right">
                  <p class="text-3xl font-black text-amber-600">400 €</p>
                  <p class="text-xs text-slate-500 mt-1">ukupna cijena ture</p>
                </div>
              </div>
            </div>
          </div>

          <!-- DESNO -->
          <div
            class="flex flex-col h-full rounded-[26px] bg-[#f8fbff] border border-slate-200 p-5 md:p-6"
          >
            <p class="text-sm uppercase tracking-[0.2em] text-sky-700 font-semibold mb-3">
              Gliser izlet
            </p>

            <h3 class="text-3xl md:text-[2.35rem] font-bold text-slate-900 leading-tight mb-4">
              Lubenice &amp; Plava grota
            </h3>

            <p class="text-slate-700 leading-8 mb-4">
              Izlet spaja dvije od najposebnijih lokacija creskog akvatorija — Plavu grotu i
              Lubenice — u iskustvo koje kombinira avanturu, kupanje i opušteno uživanje na moru.
            </p>

            <p class="text-slate-600 leading-8 mb-6">
              Prvi dio ture donosi ulazak u čudesni svijet Plave grotte, dok Lubenice nude mirniji
              nastavak dana uz kupanje, odmor i jednu od najljepših plaža na Cresu.
            </p>

            <div class="grid sm:grid-cols-2 gap-4 mb-6">
              <div class="rounded-2xl bg-white border border-slate-200 p-4">
                <p class="text-sm text-slate-500 mb-1">Trajanje</p>
                <p class="font-semibold text-slate-900">4 sata</p>
              </div>

              <div class="rounded-2xl bg-white border border-slate-200 p-4">
                <p class="text-sm text-slate-500 mb-1">Termini</p>
                <p class="font-semibold text-slate-900">09:00 – 13:00 / 15:00 – 19:00</p>
              </div>

              <div class="rounded-2xl bg-white border border-slate-200 p-4">
                <p class="text-sm text-slate-500 mb-1">Kapacitet</p>
                <p class="font-semibold text-slate-900">Do 12 osoba</p>
              </div>

              <div class="rounded-2xl bg-white border border-slate-200 p-4">
                <p class="text-sm text-slate-500 mb-1">Polazak</p>
                <p class="font-semibold text-slate-900">Cres / pickup po dogovoru</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4 mb-6">
              <div class="rounded-[20px] bg-slate-900 text-white p-5">
                <p class="text-sm uppercase tracking-[0.16em] text-sky-300 font-semibold mb-3">
                  Jutarnja tura
                </p>

                <ul class="space-y-2 text-slate-100 text-sm leading-6">
                  <li><strong>09:00</strong> — polazak iz Cresa</li>
                  <li><strong>09:35</strong> — dolazak do Plavih grotta</li>
                  <li><strong>09:35 – 10:35</strong> — istraživanje i kupanje</li>
                  <li><strong>10:40</strong> — kratka vožnja prema Lubenicama</li>
                  <li><strong>10:45 – 12:30</strong> — boravak na Lubenicama</li>
                  <li><strong>13:00</strong> — povratak prema Cresu</li>
                </ul>
              </div>

              <div class="rounded-[20px] bg-slate-900 text-white p-5">
                <p class="text-sm uppercase tracking-[0.16em] text-sky-300 font-semibold mb-3">
                  Popodnevna tura
                </p>

                <ul class="space-y-2 text-slate-100 text-sm leading-6">
                  <li><strong>15:00</strong> — polazak iz Cresa</li>
                  <li><strong>15:35</strong> — dolazak do Plavih grotta</li>
                  <li><strong>15:35 – 16:35</strong> — istraživanje i kupanje</li>
                  <li><strong>16:40</strong> — kratka vožnja prema Lubenicama</li>
                  <li><strong>16:45 – 18:30</strong> — boravak na Lubenicama</li>
                  <li><strong>19:00</strong> — povratak prema Cresu</li>
                </ul>
              </div>
            </div>

            <div class="rounded-[20px] bg-sky-50 border border-sky-200 p-5 mt-auto">
              <p class="text-sm uppercase tracking-[0.16em] text-sky-700 font-semibold mb-2">
                Cijene
              </p>
              <p class="text-slate-900 mb-1"><strong>Odrasli:</strong> 40 €</p>
              <p class="text-slate-900 mb-1"><strong>Djeca 6 – 12:</strong> 20 €</p>
            </div>
          </div>
        </div>
      </section>

      <!-- VALUN -->
      <section class="max-w-7xl mx-auto px-4 pb-20">
        <div
          class="grid xl:grid-cols-[0.95fr_1.25fr] gap-8 rounded-[34px] border border-slate-200 bg-white p-4 md:p-5 shadow-[0_25px_80px_rgba(15,23,42,0.08)]"
        >
          <!-- LIJEVO -->
          <div
            class="order-2 xl:order-1 flex flex-col h-full rounded-[26px] bg-[#f8fbff] border border-slate-200 p-5 md:p-6"
          >
            <p class="text-sm uppercase tracking-[0.2em] text-sky-700 font-semibold mb-3">
              Gliser izlet
            </p>

            <h3 class="text-3xl md:text-[2.35rem] font-bold text-slate-900 leading-tight mb-4">
              Valun
            </h3>
            <p class="text-slate-700 leading-8 mb-4">
              Opuštena vožnja do ribarskog mjesta Valun pruža idealnu kombinaciju kratke plovidbe i
              dovoljno vremena za uživanje na obali. Ovaj izlet je savršen za goste koji žele
              spojiti more, kupanje i dobar obrok u autentičnom mediteranskom okruženju.
            </p>

            <p class="text-slate-600 leading-8 mb-6">
              Vožnja iz Cresa traje oko <strong>20 minuta u jednom smjeru</strong>, nakon čega dan
              možete organizirati prema vlastitim željama — bilo da želite duže ostati na plaži,
              istražiti mjesto ili uživati u ručku uz more. Fleksibilnost je najveća prednost ovog
              izleta, što ga čini odličnim izborom za parove, obitelji i manje grupe koje žele
              opušten, nenametnut tempo.
            </p>

            <div class="grid sm:grid-cols-2 gap-4 mb-6">
              <div class="rounded-2xl bg-white border border-slate-200 p-4">
                <p class="text-sm text-slate-500 mb-1">Vožnja</p>
                <p class="font-semibold text-slate-900">20 min u jednom smjeru</p>
              </div>

              <div class="rounded-2xl bg-white border border-slate-200 p-4">
                <p class="text-sm text-slate-500 mb-1">Kapacitet</p>
                <p class="font-semibold text-slate-900">Do 12 osoba</p>
              </div>

              <div class="rounded-2xl bg-white border border-slate-200 p-4">
                <p class="text-sm text-slate-500 mb-1">Trajanje</p>
                <p class="font-semibold text-slate-900">Po dogovoru</p>
              </div>

              <div class="rounded-2xl bg-white border border-slate-200 p-4">
                <p class="text-sm text-slate-500 mb-1">Polazak</p>
                <p class="font-semibold text-slate-900">Cres / pickup po dogovoru</p>
              </div>
            </div>

            <div class="rounded-[20px] bg-slate-900 border border-slate-800 p-5 mb-4">
              <p class="text-sm uppercase tracking-[0.16em] text-sky-300 font-semibold mb-2">
                Napomena
              </p>

              <p class="text-slate-200 text-sm leading-6">
                Termin izleta nije strogo definiran — dogovara se fleksibilno prema vašim željama i
                planu dana.
              </p>
            </div>

            <div class="grid sm:grid-cols-2 gap-4 mt-auto">
              <div class="rounded-[20px] bg-sky-50 border border-sky-200 p-5">
                <p class="text-sm uppercase tracking-[0.16em] text-sky-700 font-semibold mb-2">
                  Cijene
                </p>
                <p class="text-slate-900 mb-1"><strong>Odrasli:</strong> 30 €</p>
                <p class="text-slate-900 mb-1"><strong>Djeca 6 – 12:</strong> 15 €</p>
              </div>

              <div
                class="rounded-[20px] border border-amber-300/40 bg-gradient-to-r from-amber-50 to-orange-50 p-5"
              >
                <p class="text-sm uppercase tracking-[0.16em] text-amber-700 font-semibold mb-2">
                  Privatna tura
                </p>
                <p class="text-slate-900 font-semibold mb-1">Valun samo za vašu grupu</p>
                <p class="text-slate-600 text-sm leading-6 mb-3">
                  Privatniji tempo, više fleksibilnosti i opušten dan po vašem dogovoru.
                </p>
                <p class="text-3xl font-black text-amber-600">300 €</p>
              </div>
            </div>
          </div>

          <!-- DESNO -->
          <div
            class="order-1 xl:order-2 bg-white rounded-[32px] border border-slate-200 p-5 shadow-sm h-full flex flex-col"
          >
            <img
              :src="selectedValunImage"
              alt="Valun gallery"
              class="w-full h-[420px] md:h-[520px] xl:h-[580px] object-cover rounded-[26px]"
            />

            <div class="grid grid-cols-4 gap-3 mt-4">
              <button
                v-for="image in valunImages"
                :key="image"
                type="button"
                @click="odaberiValunSliku(image)"
                class="rounded-[18px] overflow-hidden border transition-all duration-300 bg-slate-50 hover:bg-white"
                :class="
                  selectedValunImage === image
                    ? 'border-sky-500 shadow-[0_0_0_1px_rgba(14,165,233,0.35)] scale-[1.02]'
                    : 'border-slate-200 hover:-translate-y-0.5'
                "
              >
                <img
                  :src="image"
                  alt="Valun thumb"
                  class="w-full h-16 md:h-21 object-cover rounded-[14px]"
                />
              </button>
            </div>

            <div class="mt-4 flex-1 rounded-[24px] bg-slate-900 border border-slate-800 p-6">
              <p class="text-sm uppercase tracking-[0.18em] text-sky-300 font-semibold mb-3">
                Atmosfera Valuna
              </p>

              <p class="text-slate-100 leading-7 text-sm md:text-base mb-4">
                Valun je malo ribarsko mjesto koje osvaja mirnom atmosferom, kristalno čistim morem
                i sporijim, opuštenim ritmom dana. Idealno za goste koji žele pobjeći od gužve i
                provesti vrijeme uz more bez žurbe.
              </p>

              <p class="text-slate-300 leading-7 text-sm md:text-base mb-4">
                Restorani uz more, beach barovi i uređene šetnice stvaraju savršenu kombinaciju za
                cjelodnevni boravak — kupanje, ručak i lagana šetnja uz zalazak sunca.
              </p>

              <p class="text-slate-300 leading-7 text-sm md:text-base">
                Ovaj izlet posebno odgovara parovima, obiteljima i manjim grupama koje žele
                fleksibilniji plan, ljepotu mjesta i autentičan mediteranski ugođaj.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section id="kontakt1" class="pb-20 pt-6">
        <div class="max-w-6xl mx-auto px-4">
          <div
            class="relative overflow-hidden rounded-[42px] border border-slate-200 bg-white p-8 md:p-12 text-center shadow-[0_35px_100px_rgba(15,23,42,0.10)]"
          >
            <div class="absolute inset-0 pointer-events-none">
              <div
                class="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-sky-200/45 blur-3xl rounded-full"
              ></div>
            </div>

            <div class="relative z-10">
              <p class="text-sm uppercase tracking-[0.24em] text-sky-700 font-semibold mb-3">
                Zainteresirani ste?
              </p>

              <h2 class="text-3xl md:text-5xl font-black mb-5 text-slate-900 leading-tight">
                Rezervirajte svoj doživljaj Cresa s mora
              </h2>

              <p class="text-slate-600 leading-8 max-w-2xl mx-auto mb-10">
                Pošaljite upit, nazovite nas ili nas pronađite na društvenim mrežama — rado ćemo vam
                pomoći oko termina i svih detalja izleta.
              </p>

              <!-- CTA KARTICE -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
                <!-- WHATSAPP -->
                <a
                  :href="whatsappLink"
                  target="_blank"
                  class="group relative rounded-[28px] bg-[#25D366] p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    class="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-[#25D366]/40 via-green-300/30 to-[#25D366]/40 blur-xl"
                  ></div>

                  <div class="relative flex flex-col items-center gap-4">
                    <img src="/whatsapp.png" class="w-12 h-12 object-contain" />
                    <span class="font-bold text-lg">WhatsApp</span>
                    <span class="text-sm text-white/85">najbrži odgovor</span>
                  </div>
                </a>

                <!-- CALL -->
                <a
                  href="tel:+385915121829"
                  class="group relative rounded-[28px] bg-slate-900 p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    class="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-slate-500/30 via-slate-300/20 to-slate-500/30 blur-xl"
                  ></div>

                  <div class="relative flex flex-col items-center gap-4">
                    <span class="text-4xl">📞</span>
                    <span class="font-bold text-lg">Nazovi nas</span>
                    <span class="text-sm text-white/70">+385 91 512 1829</span>
                  </div>
                </a>

                <!-- EMAIL -->
                <a
                  :href="emailLink"
                  class="group relative rounded-[28px] border border-slate-200 bg-white p-6 text-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    class="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-sky-200/40 via-white/40 to-sky-200/40 blur-xl"
                  ></div>

                  <div class="relative flex flex-col items-center gap-4">
                    <img src="/gmail.png" class="w-12 h-12 object-contain" />
                    <span class="font-bold text-lg">Pošalji email</span>
                  </div>
                </a>
              </div>

              <!-- SOCIAL -->
              <div class="flex items-center justify-center gap-4">
                <div class="h-px w-16 bg-slate-200"></div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">
                  Pratite nas
                </p>
                <div class="h-px w-16 bg-slate-200"></div>
              </div>

              <div class="flex justify-center gap-6 mt-6">
                <a
                  :href="facebookLink"
                  target="_blank"
                  class="group relative w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    class="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-400/40 to-blue-200/30 blur-xl rounded-2xl"
                  ></div>
                  <img src="/facebook.png" class="relative w-11 h-11 object-contain" />
                </a>

                <a
                  :href="instagramLink"
                  target="_blank"
                  class="group relative w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    class="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-pink-400/40 via-orange-300/30 to-yellow-300/40 blur-xl rounded-2xl"
                  ></div>
                  <img src="/instagram.jpg" class="relative w-11 h-11 object-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
