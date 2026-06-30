export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "king", name: "King", description: "Menangkan 10 permainan", icon: "👑" },
  { id: "snake-survivor", name: "Snake Survivor", description: "Selamat dari 20 gigitan ular", icon: "🐍" },
  { id: "lucky-dice", name: "Lucky Dice", description: "Dapatkan angka 6 sebanyak 15 kali", icon: "🎲" },
  { id: "power-collector", name: "Power Collector", description: "Kumpulkan 50 power-up", icon: "⚡" },
  { id: "champion", name: "Champion", description: "Menangkan game tingkat Hard", icon: "🏆" },
  { id: "no-snake-win", name: "No Snake Win", description: "Menang tanpa kena ular sekalipun", icon: "🛡️" },
  { id: "ultra-lucky", name: "Ultra Lucky", description: "Menang dengan Lucky Roll 3x dalam 1 game", icon: "🍀" },
  { id: "chaos-master", name: "Chaos Master", description: "Menang saat event Chaos Time aktif", icon: "🌪️" },
  { id: "first-win", name: "First Win", description: "Menangkan permainan pertamamu", icon: "🥇" },
  { id: "speedrunner", name: "Speedrunner", description: "Menang dalam waktu kurang dari 3 menit", icon: "⏱️" },
  { id: "ladder-lover", name: "Ladder Lover", description: "Naiki 30 tangga total", icon: "🪜" },
  { id: "shield-master", name: "Shield Master", description: "Blokir 10 gigitan ular dengan Shield", icon: "🛡️" },
  { id: "freeze-king", name: "Freeze King", description: "Bekukan lawan 10 kali", icon: "❄️" },
  { id: "swap-master", name: "Swap Master", description: "Tukar posisi 10 kali", icon: "🔀" },
  { id: "rocket-rider", name: "Rocket Rider", description: "Pakai power Rocket 10 kali", icon: "🚀" },
  { id: "teleporter", name: "Teleporter", description: "Pakai power Teleport 10 kali", icon: "✨" },
  { id: "veteran", name: "Veteran", description: "Mainkan 50 game", icon: "🎖️" },
  { id: "perfect-streak", name: "Perfect Streak", description: "Menang 5 kali berturut-turut", icon: "🔥" },
  { id: "comeback-kid", name: "Comeback Kid", description: "Menang setelah tertinggal lebih dari 30 kotak", icon: "💪" },
  { id: "explorer", name: "Explorer", description: "Mainkan ketiga ukuran board", icon: "🗺️" },
  { id: "bot-slayer", name: "Bot Slayer", description: "Kalahkan 6 bot sekaligus dalam 1 game", icon: "🤖" },
  { id: "social-butterfly", name: "Social Butterfly", description: "Mainkan mode multiplayer 10 kali", icon: "🦋" },
  { id: "collector-supreme", name: "Collector Supreme", description: "Kumpulkan semua jenis power dalam 1 game", icon: "💎" },
  { id: "event-hunter", name: "Event Hunter", description: "Alami 20 event acak", icon: "🎉" },
  { id: "marathoner", name: "Marathoner", description: "Habiskan total 5 jam bermain", icon: "🏃" },
];
