// =========================================================
// 1. Durasi Pacaran
// =========================================================

// GANTI TANGGAL INI dengan tanggal kalian mulai pacaran (Format: YYYY-MM-DDTHH:MM:SS)
const START_DATE = new Date("2025-10-04T18:30:00"); 

function updateDuration() {
    const now = new Date();
    const diff = now - START_DATE; // Selisih dalam milidetik

    // Cek jika tanggal mulai belum tiba
    if (diff < 0) {
        document.getElementById('duration-timer').textContent = "Menunggu Tanggal Mulai...";
        return;
    }

    // Konversi milidetik ke unit waktu
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Perhitungan Tahun dan Sisa Hari (estimasi sederhana)
    const daysPerYear = 365.25;
    const years = Math.floor(daysTotal / daysPerYear);
    const remainingDays = daysTotal - (years * daysPerYear);

    // Update elemen HTML
    document.getElementById('years').textContent = `${years} Year`;
    document.getElementById('days').textContent = `${Math.floor(remainingDays)} Day`;
    document.getElementById('hours').textContent = `${hours} Hour`;
    document.getElementById('minutes').textContent = `${minutes} Minute`;
    document.getElementById('seconds').textContent = `${seconds} Second`;
}

// Panggil fungsi sekali untuk inisialisasi, lalu setiap detik
updateDuration();
setInterval(updateDuration, 1000);


// =========================================================
// 2. Daily Streak
// =========================================================

const STREAK_KEY = 'relationshipStreak';
const LAST_RESPONSE_KEY = 'lastResponseTime';
const RESPOND_BUTTON = document.getElementById('respond-button');
const CURRENT_STREAK_ELEMENT = document.getElementById('current-streak');
const LAST_RESPONSE_TIME_ELEMENT = document.getElementById('last-response-time');
const STREAK_MESSAGE_ELEMENT = document.getElementById('streak-message');
const MAX_HOURS_FOR_STREAK = 48; // Batas putus streak
const MIN_HOURS_TO_RESPOND = 24; // Batas minimal untuk merespon kembali

function loadStreak() {
    let streak = parseInt(localStorage.getItem(STREAK_KEY)) || 0;
    let lastResponseTime = localStorage.getItem(LAST_RESPONSE_KEY);
    const now = new Date();
    
    CURRENT_STREAK_ELEMENT.textContent = streak;
    
    if (lastResponseTime) {
        const lastTime = new Date(lastResponseTime);
        const diffHours = (now - lastTime) / (1000 * 60 * 60);

        LAST_RESPONSE_TIME_ELEMENT.textContent = `Respon Terakhir: ${lastTime.toLocaleString()}`;

        if (diffHours >= MAX_HOURS_FOR_STREAK) {
            // Streak putus karena sudah lebih dari 48 jam
            if (streak > 0) {
                 localStorage.setItem(STREAK_KEY, 0); // Reset
                 CURRENT_STREAK_ELEMENT.textContent = 0;
                 STREAK_MESSAGE_ELEMENT.textContent = `💔 Streak putus! Lebih dari ${MAX_HOURS_FOR_STREAK} jam berlalu. Mulai streak baru!`;
            }
            RESPOND_BUTTON.disabled = false; // Boleh merespon, akan mulai streak baru
        } else if (diffHours < MIN_HOURS_TO_RESPOND) {
             // Belum 24 jam, tunggu
             const remaining = MIN_HOURS_TO_RESPOND - diffHours;
             const hours = Math.floor(remaining);
             const minutes = Math.floor((remaining - hours) * 60);

             STREAK_MESSAGE_ELEMENT.textContent = `⏱️ Tunggu ${hours} jam ${minutes} menit lagi sebelum bisa merespon kembali.`;
             RESPOND_BUTTON.disabled = true;
        } else {
             // Di antara 24 jam dan 48 jam, boleh merespon
             STREAK_MESSAGE_ELEMENT.textContent = "✅ Waktunya merespon! Klik tombol di bawah untuk menjaga streak!";
             RESPOND_BUTTON.disabled = false;
        }

    } else {
        // Belum ada respon sama sekali
        STREAK_MESSAGE_ELEMENT.textContent = "Klik tombol untuk memulai Daily Streak pertama!";
        RESPOND_BUTTON.disabled = false;
    }
}

function handleResponse() {
    let { streak, lastResponseTime } = loadStreak();
    const now = new Date();

    if (lastResponseTime) {
        const lastTime = new Date(lastResponseTime);
        const diffHours = (now - lastTime) / (1000 * 60 * 60);

        if (diffHours < MIN_HOURS_TO_RESPOND) {
            // Seharusnya tombol nonaktif, tapi mencegah pengiriman ganda
            return; 
        }

        // Streak berhasil dijaga (antara 24 dan 48 jam)
        if (diffHours < MAX_HOURS_FOR_STREAK) {
            streak += 1;
        } else {
            // Jika diklik setelah 48 jam, streak direset dan dimulai lagi
            streak = 1; 
        }

    } else {
        // Respon pertama
        streak = 1;
    }

    // Simpan data baru
    localStorage.setItem(STREAK_KEY, streak);
    localStorage.setItem(LAST_RESPONSE_KEY, now.toString());
    
    // Muat ulang status untuk refresh tampilan
    loadStreak(); 
    STREAK_MESSAGE_ELEMENT.textContent = "🎉 Respon berhasil dicatat! Streakmu aman.";
}

RESPOND_BUTTON.addEventListener('click', handleResponse);

// Muat status streak saat halaman pertama kali dibuka
loadStreak();
