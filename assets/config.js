/* ============================================================
   FILE INI ISINYA SEMUA KONTEN YANG BISA KAMU EDIT
   Ganti teks di bawah ini sesuka hati, TIDAK PERLU sentuh
   file index.html atau script.js sama sekali.
   ============================================================ */

const SITE_CONFIG = {
  // ---- IDENTITAS ----
  name: "Zesha",
  location: "Tangerang",
  locationFlag: "🇮🇩",
  role: "📊 Data Analyst",
  email: "reudintazha@gmail.com",
  linkedin: "https://linkedin.com/in/reudinta-zesha/",
  available: true, // ganti ke false kalau lagi tidak available

  // ---- HERO SECTION ----
  heroWords: ["operational data", "messy spreadsheets", "raw logistics data"], // akan muncul bergantian (efek ketik)
  heroSubtext: "I specialize in creating thoughtful and impactful systems, optimizing supply chain workflows, and translating raw data into robust business execution.",

  // ---- STATS (angka yang muncul dengan animasi hitung) ----
  stats: [
    { label: "Projects Built", value: 8, suffix: "+" },
    { label: "Automation Scripts", value: 15, suffix: "+" },
    { label: "Hours Saved / Month", value: 40, suffix: "h" },
  ],

  // ---- GOOGLE SHEETS UNTUK PROJECTS ----
  // Ganti ID di bawah ini dengan ID spreadsheet kamu
  spreadsheetId: "MASUKKAN_SPREADSHEET_ID_ANDA_DISINI",

  // Data cadangan (fallback) kalau Google Sheets gagal / belum diisi
  fallbackProjects: [
    {
      title: "IT Asset Tracking Dashboard",
      category: "Web App",
      description: "Dashboard multi-tab untuk tracking asset IT secara real-time, lengkap dengan filter, catatan editable, dan analitik lokasi.",
      tools: "Google Apps Script, Google Sheets, JavaScript",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "IT Asset Request & Return Form",
      category: "Automation",
      description: "Form otomatis dengan autocomplete facility/asset untuk pengajuan repair dan return asset IT.",
      tools: "Google Apps Script, HTML, CSS",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Data Cleaning Pipeline",
      category: "Data Engineering",
      description: "Skrip fuzzy-matching untuk membersihkan data Province/City yang berantakan di form responses.",
      tools: "Google Apps Script, Regex",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // ---- SERVICES ----
  services: [
    {
      icon: "fa-chart-line",
      title: "Data Analytics & BI",
      description: "Merancang dasbor KPI, integrasi data otomatis, serta analisis geospatial untuk efisiensi distribusi operasional."
    },
    {
      icon: "fa-gears",
      title: "Systems & Automation",
      description: "Otomasi sistem operasional menggunakan Google Apps Script, Excel VBA, dan manajemen basis data relasional."
    }
  ],

  // ---- WORKFLOW STEPS ----
  workflow: [
    { number: "01", title: "Understand & Analyze", description: "Menggali permasalahan operasional terdalam, struktur database, dan memetakan alur kerja sistem." },
    { number: "02", title: "Develop & Automate", description: "Membangun skrip otomasi, formula mutakhir, dan visualisasi interaktif agar data siap dikonsumsi manajemen." },
    { number: "03", title: "Handover & Refine", description: "Dokumentasi sistem, pelatihan tim, dan penyempurnaan fitur secara berkelanjutan agar performa tetap maksimal." }
  ],

  footerText: "Discover the perfect design approach tailored to your needs, blending logic, structured analytics, and seamless automation.",
  footerYear: "2026"
};
