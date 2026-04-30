<template>
  <footer class="relative overflow-hidden bg-slate-950 text-white">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute -top-32 left-10 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"></div>
      <div class="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"></div>
      <div
        class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 py-16">
      <div class="grid gap-12 lg:grid-cols-[1.15fr_0.8fr_1.1fr_0.8fr_1fr] items-start">
        <!-- BRAND -->
        <div class="text-center">
          <p class="mb-7 text-sm uppercase tracking-[0.28em] text-sky-400 font-semibold">
            Manje stresa, više mora.
          </p>

          <img
            src="/logo_dark.png"
            alt="Taxi Boat Helena"
            class="mx-auto h-44 w-auto object-contain scale-172"
          />
        </div>

        <!-- LOKACIJE -->
        <div>
          <p class="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-sky-400">Lokacije</p>

          <ul class="space-y-4 text-slate-300">
            <li class="transition hover:text-white">Cres</li>
            <li class="transition hover:text-white">Kamp Kovačine</li>
            <li class="transition hover:text-white">Valun</li>
            <li class="transition hover:text-white">Lubenice</li>
            <li class="transition hover:text-white">Plava grota</li>
          </ul>
        </div>

        <!-- KONTAKT -->
        <div>
          <p class="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-sky-400">Kontakt</p>

          <div class="space-y-5">
            <a href="tel:+385915121829" class="group flex items-center gap-4">
              <span class="text-2xl transition group-hover:-translate-y-0.5">📞</span>
              <span>
                <span class="block font-bold text-white transition group-hover:text-sky-200">
                  Nazovite nas
                </span>
                <span class="text-slate-300">+385 91 512 1829</span>
              </span>
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&to=booking.taxi@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4"
            >
              <img
                src="/gmail.png"
                alt="Email"
                class="h-7 w-7 object-contain transition group-hover:-translate-y-0.5"
              />
              <span>
                <span class="block font-bold text-white transition group-hover:text-sky-200">
                  Pošaljite e-mail
                </span>
                <span class="text-slate-300">booking.taxi@gmail.com</span>
              </span>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=385915121829"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4"
            >
              <img
                src="/whatsapp.png"
                alt="WhatsApp"
                class="h-8 w-8 object-contain transition group-hover:-translate-y-0.5"
              />
              <span>
                <span class="block font-bold text-white transition group-hover:text-green-200">
                  WhatsApp
                </span>
                <span class="text-slate-300">Najbrži upit</span>
              </span>
            </a>
          </div>
        </div>

        <!-- PRATITE NAS -->
        <div>
          <p class="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-sky-400">Pratite nas</p>

          <div class="flex items-center gap-4">
            <a
              href="https://www.facebook.com/p/Taxi-Boat-Helena-100063761340612/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              class="transition hover:-translate-y-1 hover:opacity-80"
            >
              <img src="/facebook.png" alt="Facebook" class="h-9 w-9 object-contain" />
            </a>

            <a
              href="https://www.instagram.com/taxi_boat_helena/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="transition hover:-translate-y-1 hover:opacity-80"
            >
              <img src="/instagram.jpg" alt="Instagram" class="h-9 w-9 rounded-lg object-cover" />
            </a>
          </div>
        </div>

        <!-- RADNO VRIJEME -->
        <div>
          <p class="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-sky-400">
            Radno vrijeme
          </p>

          <div class="text-slate-300">
            <p class="font-bold text-white">Svaki dan</p>
            <p class="mt-2">18:00 – 00:00</p>

            <br />
            <p class="text-sm text-slate-400">Taxi linija</p>
            <p class="mt-1 font-semibold text-white">Cres ↔ Kamp Kovačine</p>
          </div>
        </div>
      </div>

      <div
        class="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between"
      >
        <p>© 2025 Taxi Boat Helena. Sva prava pridržana.</p>
        <p class="text-slate-500">Lokalni taxi boat i gliser izleti na otoku Cresu.</p>
      </div>
    </div>
  </footer>
</template>
