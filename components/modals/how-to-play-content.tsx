"use client";

const STEPS = [
  { icon: "🎲", title: "Lempar Dadu", text: "Klik tombol 'Lempar Dadu' saat giliranmu tiba." },
  { icon: "👣", title: "Pion Berjalan", text: "Pion akan berjalan selangkah demi selangkah sesuai angka dadu." },
  { icon: "🪜", title: "Tangga & Ular", text: "Mendarat di dasar tangga akan membawamu naik. Mendarat di kepala ular akan membuatmu turun." },
  { icon: "⚡", title: "Kumpulkan Power", text: "Beberapa kotak berisi Super Power. Power instan langsung aktif, power manual bisa dipakai kapan saja lewat panel power." },
  { icon: "🌪️", title: "Event Acak", text: "Setiap beberapa ronde, event acak bisa muncul dan mengubah jalannya permainan." },
  { icon: "🏁", title: "Menang", text: "Pemain pertama yang mencapai kotak terakhir adalah pemenangnya!" },
];

export function HowToPlayContent() {
  return (
    <div className="flex flex-col gap-3">
      {STEPS.map((s, i) => (
        <div key={s.title} className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-yellow/20 text-lg">
            {s.icon}
          </span>
          <div>
            <p className="text-sm font-bold text-ink">
              {i + 1}. {s.title}
            </p>
            <p className="text-xs text-ink/55">{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
