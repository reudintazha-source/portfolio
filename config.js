/* ============================================================
   FILE INI ISINYA SEMUA KONTEN YANG BISA KAMU EDIT
   Ganti teks di bawah ini sesuka hati, TIDAK PERLU sentuh
   file index.html atau script.js sama sekali.
   ============================================================ */

const SITE_CONFIG = {
  // ---- IDENTITAS ----
  name: "Reudinta Zesha",
  location: "Tangerang",
  locationFlag: "🇮🇩",
  role: "📊 Supply Chain & Analyst",
  email: "reudintazha@gmail.com",
  linkedin: "https://www.linkedin.com/in/reudinta-zesha/",
  available: true, // ganti ke false kalau lagi tidak available

  // ---- HERO SECTION ----
  heroWords: ["operational data", "messy spreadsheets", "raw logistics data"], // akan muncul bergantian (efek ketik)
  heroSubtext: "I specialize in creating thoughtful and impactful systems, optimizing supply chain workflows, and translating raw data into robust business execution.",

  // ---- VIDEO INTRO DI HERO (paling atas) ----
  heroVideo: {
    enabled: true,          // ganti false kalau belum ada video / mau matiin
    src: "video/intro.mp4", // taruh file video kamu di folder "video" dengan nama intro.mp4
    overlayOpacity: 0.5,    // 0 = terang penuh, 1 = gelap penuh. Atur biar teks tetap kebaca
  },

  // ---- ANIMASI BUNGA MELAYANG DI HERO ----
  flowerAnimation: {
    enabled: true,
    emojis: ["🌸", "🌼", "🌺"], // ganti/tambah emoji bunga sesuka hati
    count: 10,                  // jumlah bunga yang melayang
  },

  // ---- EXPERIENCE (tinggal copy-paste blok { } untuk nambah baru) ----
  experience: [
    {
      role: "Inventory Analyst",
      company: "SPX Express",
      period: "April 2026 — July 2026",
      description: "Validated and processed 50+ IT asset return and repair shipments daily, ensuring shipment data accuracy and compliance with operational requirements before dispatch,
         Acted as the primary liaison for regional hubs in resolving shipment issues, including delayed movements, airport rejections, damaged packages, and other logistics-related escalations,
, Developed and maintained an integrated asset tracking dashboard connecting Admin and IT operational data, enabling real-time monitoring of over 500+ asset shipments and faster identification of delivery status discrepancies, delays, and tracking anomalies, 
     Developed a web-based asset request system using Google Apps Script and Google Sheets, reducing duplicate data entry and improving data accuracy through automated validation and master-data integration.
     "
    },
    {
      role: "Intern",
      company: "PT Garudafood Putra Putri Jaya Tbk",
      period: "July 2025 — January 2026",
      description: "Menjalani magang dengan fokus pada proses operasional dan analisis data industri."
    }
    // Tambah pengalaman baru: copy blok di atas ({ ... }), tempel di bawah,
    // jangan lupa tambah koma "," setelah kurung kurawal "}" kalau bukan yang terakhir
  ],

  // ---- STATS (angka yang muncul dengan animasi hitung) ----
  stats: [
    { label: "Projects Built", value: 3, suffix: "+" },
    { label: "Automation Scripts", value: 4, suffix: "+" },
    { label: "Hours Saved / Month", value: 40, suffix: "h" },
  ],

  // ---- GOOGLE SHEETS UNTUK PROJECTS ----
  // Ganti ID di bawah ini dengan ID spreadsheet kamu
  spreadsheetId: "1KeDxHrSWE7Gezt38I4l0I58sI2mKz_40BNbvzmdxpYE",

  // Data cadangan (fallback) kalau Google Sheets gagal / belum diisi
  fallbackProjects: [
    {
      title: "IT Asset Tracking Dashboard",
      category: "Automation Tracker & Report",
      description: "This system gives the team a single, reliable place to track IT assets in motion, automatically check that nothing falls through the cracks.",
      tools: "Google Apps Script, Google Sheets, JavaScript",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://script.google.com/macros/s/AKfycbynk4wj1p-FFbUXghESo-r7RG2_BYRdEjrmP5QQhZ_748OCyQIV1NadhaNK_mSgSQbT/exec" // isi link demo/deploy project kamu, kosongkan "" kalau belum ada
    },
    {
      title: "IT Asset Request & Return Form",
      category: "Web Form",
      description: "Developed a web-based request management system using Google Apps Script and Google Workspace to streamline IT asset repair and return submissions across facilities. The system replaces manual request forms with a standardized, validated, and trackable workflow.",
      tools: "Google Apps Script, HTML, CSS",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://script.google.com/macros/s/AKfycbyLGi-9oJsdmxEM2vxPTaYiK_fH4hs1DYdDTVKCxNXnaGtjGMdhXrN4HyhBY3zRMMdADg/exec"
    },
    {
      title: "Summary Tracker",
      category: "Automation Tracker & Report",
      description: "Report on overall performance — without anyone needing to touch a spreadsheet.",
      tools: "Google Apps Script, Regex,HTML",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://script.google.com/macros/s/AKfycbynk4wj1p-FFbUXghESo-r7RG2_BYRdEjrmP5QQhZ_748OCyQIV1NadhaNK_mSgSQbT/exec?page=summary"
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
