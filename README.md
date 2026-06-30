# 🐍 Ular Tangga Mania

> Game klasik dengan pengalaman modern. Super Power, Event Acak, dan Arena yang selalu berubah.

Ular Tangga Mania adalah game ular tangga browser modern yang dibangun dengan Next.js 15.
Setiap pertandingan menghadirkan papan yang di-generate secara prosedural, super power acak,
dan event dinamis — sehingga tidak ada dua permainan yang terasa sama.

## ✨ Fitur

- **Single Player** — Main melawan 2–6 bot dengan AI sederhana
- **Multiplayer Lokal** — 2–10 pemain bergantian di browser yang sama (tanpa server)
- **3 Ukuran Board** — 7x7, 10x10, 12x12, masing-masing dengan generator board sendiri
- **3 Level Kesulitan** — Easy, Medium, Hard dengan kepadatan ular/tangga/power berbeda
- **10 Super Power** — Sprint, Double Dice, Shield, Reverse Snake, Rocket, Teleport, Lucky
  Roll, Freeze, Swap Position, Extra Turn
- **5 Event Acak** — Lucky Time, Chaos Time, Snake Frenzy, Golden Dice, Double Ladder
- **8 Karakter/Pion** — Robot, Knight, Ninja, Panda, Kucing, Alien, Bebek, Dino (kosmetik)
- **25 Achievement** — daftar pencapaian lengkap
- **Statistik & Leaderboard Lokal** — tersimpan otomatis di `localStorage`
- **Animasi Halus** — pergerakan pion langkah demi langkah, confetti kemenangan, transisi
  layar, semuanya via Framer Motion
- **Fully Responsive** — nyaman dimainkan dari desktop hingga mobile

## 🛠️ Stack Teknologi

| Layer | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router) |
| Bahasa | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Animasi | Framer Motion |
| State Management | Zustand |
| Icon | Lucide React |
| Confetti | canvas-confetti |
| Linting | ESLint + Prettier |

## 📦 Instalasi

```bash
npm install
```

## 🚀 Menjalankan secara Lokal

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🏗️ Build Production

```bash
npm run build
npm run start
```

## ☁️ Deploy ke Vercel

1. Push repository ini ke GitHub.
2. Buka [vercel.com/new](https://vercel.com/new) dan import repository.
3. Vercel akan otomatis mendeteksi Next.js — tidak perlu konfigurasi tambahan.
4. Klik **Deploy**. Selesai!

Tidak ada environment variable yang dibutuhkan untuk fitur inti (semua data permainan
tersimpan di `localStorage` browser pengguna).

## 📁 Struktur Project

```
app/                    # Next.js App Router: layout, page, global styles
components/
  ui/                   # Komponen UI primitif (Button, Card, Modal, SelectChip)
  layout/                # Navbar, Logo, dekorasi
  landing/               # Hero & feature card untuk landing page
  setup/                 # Panel setup permainan (mode, board, level, karakter)
  game/                  # Komponen gameplay (board, dadu, pion, panel power, dll)
  modals/                # Konten modal (leaderboard, achievement, how-to-play)
game/                   # Engine: board generator, turn resolver, bot AI, player factory
hooks/                  # Custom hooks (confetti, dll)
lib/
  config/                # Konstanta game: karakter, power, event, level
  storage/               # Wrapper localStorage untuk statistik
  utils/                 # Utility umum (cn, random/seeded RNG)
store/                  # Zustand store (single source of truth state game)
types/                  # Definisi TypeScript untuk seluruh domain game
public/sounds/          # Struktur folder untuk aset audio (placeholder)
```

Prinsip arsitektur yang dipakai:

- **Pemisahan engine dan UI** — semua logic permainan murni (board generator, turn
  resolver, bot AI) berada di `game/`, tidak bergantung pada React sama sekali.
- **Single source of truth** — seluruh state permainan dikelola lewat satu Zustand store
  di `store/game-store.ts`.
- **Strict TypeScript** — `noUncheckedIndexedAccess` aktif untuk mencegah bug akses array
  out-of-bounds yang umum di game logic berbasis board.
- **Komponen kecil & reusable** — tidak ada file yang membengkak menjadi ratusan baris
  campur aduk UI + logic.

## 🎮 Cara Bermain Singkat

1. Pilih **Single Player** (lawan bot) atau **Multiplayer** (lokal, gantian).
2. Atur jumlah bot/pemain, ukuran board, dan level kesulitan.
3. Lempar dadu saat giliranmu — pion berjalan otomatis selangkah demi selangkah.
4. Mendarat di tangga = naik. Mendarat di kepala ular = turun (kecuali kamu punya Shield
   atau Reverse Snake).
5. Kumpulkan Super Power di kotak ⚡ dan gunakan secara strategis.
6. Pemain pertama yang mencapai kotak terakhir adalah pemenangnya!

## 📄 Lisensi

MIT License — bebas digunakan, dimodifikasi, dan didistribusikan untuk keperluan apa pun.
