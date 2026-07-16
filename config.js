/* ============================================================
   FILE INI ISINYA SEMUA KONTEN YANG BISA KAMU EDIT
   Ganti teks di bawah ini sesuka hati, TIDAK PERLU sentuh
   file index.html atau script.js sama sekali.
   ============================================================ */

const SITE_CONFIG = {
  // ---- IDENTITAS ----
  name: " Reudinta Zesha",
  location: "Tangerang",
  locationFlag: "🇮🇩",
  role: "📊 Supply Chain & Analyst",
  email: "reudintazha@gmail.com",
  linkedin: "https://linkedin.com/in/reudinta-zesha/",
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
      description: "Validated and processed 50+ IT asset return and repair shipments daily, ensuring shipment data accuracy and compliance with operational requirements before dispatch.\nActed as the primary liaison for regional hubs in resolving shipment issues, including delayed movements, airport rejections, damaged packages, and other logistics-related escalations.\nDeveloped and maintained an integrated asset tracking dashboard connecting Admin and IT operational data, enabling real-time monitoring of over 500+ asset shipments and faster identification of delivery status discrepancies, delays, and tracking anomalies.\nDeveloped a web-based asset request system using Google Apps Script and Google Sheets, reducing duplicate data entry and improving data accuracy through automated validation and master-data integration."
    },
    {
      role: "Intern",
      company: "PT Garudafood Putra Putri Jaya Tbk",
      period: "July 2025 — January 2026",
      description: "Maintained and enhanced KPI dashboards for divisional management and 4 regional heads, enabling consistent monitoring of Sales Achievement, Distribution Coverage, Billing Rate, and Target Realization.\nBuilt automated incentive calculation templates with Advanced Excel, Pivot Tables, and OLAP for 2,000+ sales employees across 5 incentive schemes, significantly improving reporting efficiency and payout accuracy.\nConducted QGIS-based geospatial analysis of regional sales coverage outside Java, supporting territory expansion and distribution planning initiatives.\nGenerated weekly and monthly sales performance reports at both individual and regional levels to support operational decision-making."
    }
    // Tambah pengalaman baru: copy blok di atas ({ ... }), tempel di bawah,
    // jangan lupa tambah koma "," setelah kurung kurawal "}" kalau bukan yang terakhir,
    // dan JANGAN PERNAH pencet Enter beneran di dalam tanda kutip, selalu pakai \n
  ],

  // ---- STATS (angka yang muncul dengan animasi hitung) ----
  // Kalau value-nya bukan angka (misal GPA), animasi hitung otomatis dimatikan, teksnya tampil apa adanya
  stats: [
    { label: "Bachelor of Industrial Engineering", value: "GPA 3.55/4.00", suffix: "" },
    { label: "Automation Scripts", value: 4, suffix: "+" },
    { label: "Hours Saved / Month", value: 40, suffix: "h" },
  ],

  // ---- GOOGLE SHEETS UNTUK PROJECTS ----
  // Ganti ID di bawah ini dengan ID spreadsheet kamu
  spreadsheetId: "MASUKKAN_SPREADSHEET_ID_ANDA_DISINI",

  // Data cadangan (fallback) kalau Google Sheets gagal / belum diisi
  // "metrics" = angka pencapaian project, pisahkan tiap poin pakai " | " (garis tegak)
  fallbackProjects: [
    {
      title: "IT Asset Tracking Dashboard",
      category: "Web App",
      description: "This system gives the team a single, reliable place to track IT assets in motion, automatically check that nothing falls through the cracks.",
      tools: "Google Apps Script, Google Sheets, JavaScript",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://script.google.com/macros/s/AKfycbynk4wj1p-FFbUXghESo-r7RG2_BYRdEjrmP5QQhZ_748OCyQIV1NadhaNK_mSgSQbT/exec", // isi link demo/deploy project kamu, kosongkan "" kalau belum ada
      metrics: "500+ Assets Tracked | 58% Reduced pending update status AWBs from 300+ to 128 through regular status update submissions  | Reduced the number of shipments with no status updates "
    },
    {
      title: "IT Asset Request & Return Form",
      category: "Automation",
      description: "Developed a web-based request management system using Google Apps Script and Google Workspace to streamline IT asset repair and return submissions across facilities. The system replaces manual request forms with a standardized, validated, and trackable workflow.",
      tools: "Google Apps Script, HTML, CSS",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://script.google.com/macros/s/AKfycbyLGi-9oJsdmxEM2vxPTaYiK_fH4hs1DYdDTVKCxNXnaGtjGMdhXrN4HyhBY3zRMMdADg/exec",
      metrics: "60% Fewer Duplicate Entries | 25% Increased processing capacity | 50% Reduce Processing Time"
    },
    {
      title: "Summary Tracker",
      category: "Automation Report",
      description: "Report on overall performance — without anyone needing to touch a spreadsheet..",
      tools: "Google Apps Script, Regex",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://script.google.com/macros/s/AKfycbynk4wj1p-FFbUXghESo-r7RG2_BYRdEjrmP5QQhZ_748OCyQIV1NadhaNK_mSgSQbT/exec?page=summary",
      metrics: "Automat Update Report "
    }
  ],

  // ---- SKILLS & TOOLS (muncul sebagai chip/badge di bagian Services) ----
  skills: [
    { name: "Google Apps Script", icon: "fa-code" },
    { name: "Google Sheets", icon: "fa-table" },
    { name: "Advanced Excel", icon: "fa-file-excel" },
    { name: "Basic SQL", icon: "fa-database" },
    { name: "QGIS", icon: "fa-map-location-dot" },
    { name: "Power BI", icon: "fa-chart-pie" },
    { name: "Looker Studio", icon: "fa-js" },
    { name: "Pivot Tables & OLAP", icon: "fa-layer-group" }
  ],

  // ---- SERVICES ----
  services: [
    {
      icon: "fa-chart-line",
      title: "Data Analytics & BI",
      description: "Designing KPI dashboards, automated data integration, and geospatial analysis to drive operational distribution efficiency."
    },
    {
      icon: "fa-gears",
      title: "Systems & Automation",
      description: "Automating operational systems using Google Apps Script, Excel VBA, and relational database management."
    }
  ],

  // ---- WORKFLOW STEPS ----
  workflow: [
    { 
      number: "01", 
      title: "Understand & Analyze", 
      description: "Deeply exploring operational bottlenecks, database structures, and mapping out system workflows." 
    },
    { 
      number: "02", 
      title: "Develop & Automate", 
      description: "Building automation scripts, advanced formulas, and interactive visualizations to ensure data is management-ready." 
    },
    { 
      number: "03", 
      title: "Handover & Refine", 
      description: "Providing system documentation, team training, and continuous feature refinement to maintain peak performance." 
    }
  ],

  footerText: "Discover the perfect design approach tailored to your needs, blending logic, structured analytics, and seamless automation.",
  footerYear: "2026"
};
