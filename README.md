# Taxi Boat Helena — frontend

Frontend web aplikacije taksi-brod servisa "Taxi Boat Helena", izrađen u Vue 3 (Vite) i Tailwind CSS-u.

Sastoji se od javnog dijela (početna, večernji polasci s rezervacijama, izleti, otkazivanje rezervacije) i admin dijela (prijava, upravljanje polascima, pregled rezervacija).

Backend (Node.js / Express + MySQL) je u zasebnom repozitoriju i mora biti pokrenut da bi aplikacija radila.

## Preduvjeti

- Node.js 20+
- Pokrenut backend (vidi backend repozitorij)

## 1. Postavljanje okruženja (.env)

U korijenu projekta napravi datoteku `.env`:

```
VITE_API_URL=http://localhost:3000
```

Ovo je adresa backenda. Lokalno je `http://localhost:3000`; kod objave (deploy) stavlja se adresa živog backenda.

## 2. Pokretanje (razvoj)

```
npm install
npm run dev
```

Aplikacija se otvara na `http://localhost:5173`.

## 3. Build (produkcija)

```
npm run build
```

Rezultat je u mapi `dist/` (statičke datoteke za posluživanje).

## Pristup

- Javni dio: `http://localhost:5173/`
- Admin dio: `http://localhost:5173/admin` (potrebna prijava — admin se kreira u backendu skriptom `createAdmin.js`)
