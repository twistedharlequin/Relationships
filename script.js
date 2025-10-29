const startDate = new Date('2025-10-04');
const durationText = document.getElementById('duration-text');
const levelInfo = document.getElementById('level-info');
const sparkContainer = document.getElementById('spark-container');
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');

// --- Hapus semua kode musik ---

/**
 * Fungsi untuk Menghitung Durasi dan Level
 */
function updateDurationAndLevel() {
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Logika Level Couple Sederhana (Sama)
    let level, levelName;
    if (diffDays < 30) {
        level = 1; levelName = 'Newbie Sparks 🔥';
    } else if (diffDays < 90) {
        level = 2; levelName = 'Growing Flames ✨';
    } else if (diffDays < 365) {
        level = 3; levelName = 'Solid Bond 💖';
    } else {
        const years = Math.floor(diffDays / 365);
        level = years + 3; 
        levelName = `True Love ${'💎'.repeat(years)}`;
    }

    durationText.innerHTML = `We have been together for ${diffDays} day`;
    levelInfo.innerHTML = `LEVEL ${level}: ${levelName}`; 
}

/**
 * Fungsi untuk Animasi Background Spark Love
 */
function createSpark() {
    const spark = document.createElement('div');
    spark.classList.add('spark');
    spark.innerHTML = '✨'; 
    
    const size = Math.random() * 10 + 10; 
    spark.style.fontSize = `${size}px`;
    spark.style.left = Math.random() * 100 + 'vw';
    spark.style.top = Math.random() * 100 + 'vh';
    
    const duration = Math.random() * 3 + 3; 
    spark.style.animationDuration = `${duration}s`;
    
    spark.style.animationDelay = `${Math.random() * 3}s`; 
    
    sparkContainer.appendChild(spark);
    
    setTimeout(() => {
        spark.remove();
    }, 4 * 1000); 
}

/**
 * Fungsi untuk Menghilangkan Loading Screen
 */
function hideLoadingScreen() {
    // 1. Tambahkan kelas fade-out
    loadingScreen.classList.add('fade-out');
    
    // 2. Tunggu sebentar (sesuai transisi CSS)
    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Sembunyikan sepenuhnya
        mainContent.classList.remove('hidden'); // Tampilkan konten utama
    }, 1000); // 1000ms sesuai transisi di CSS
}


// --- INISIALISASI DAN LOGIKA UTAMA ---
updateDurationAndLevel();
setInterval(updateDurationAndLevel, 1000 * 60 * 60 * 24); 

// Buat kilauan cinta terus menerus
setInterval(createSpark, 150); 

// Atur waktu tunggu loading screen (misalnya 2 detik)
// Gunakan window.onload untuk memastikan semua aset (termasuk placeholder images) selesai dimuat
window.onload = function() {
    setTimeout(hideLoadingScreen, 2000); // Tampilkan loading screen selama 2 detik
};
