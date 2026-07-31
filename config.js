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
  linkedin: "https://linkedin.com/in/reudinta-zesha/",
  available: true,

  heroWords: ["operational data", "messy spreadsheets", "raw logistics data"],
  heroSubtext: "I specialize in creating thoughtful and impactful systems, optimizing supply chain workflows, and translating raw data into robust business execution.",

  heroVideo: {
    enabled: true,
    src: "video/intro.mp4",
    overlayOpacity: 0.5,
  },

  flowerAnimation: {
    enabled: true,
    emojis: ["🌸", "🌼", "🌺"],
    count: 10,
  },

  experience: [
    {
      role: "Inventory Analyst",
      company: "SPX Express",
      period: "April 2026 — July 2026",
      description: "Managed IT asset movements across 3,000+ operational sites, coordinating with logistics vendors and warehouse head to monitor operational performance, resolve shipment discrepancies, and support efficient asset availability.\nProcessed and verified 50+ daily asset movements, identifying shipment discrepancies and supporting timely operational resolution.\nDeveloped a web-based IT asset request system using Google Apps Script and Google Sheets, streamlining assetallocation workflows and reducing duplicate records.\nDeveloped an operational dashboard to monitor 500+ IT asset movements, improving asset visibility and supporting operational performance monitoring."
    },
    {
      role: "Intern",
      company: "PT Garudafood Putra Putri Jaya Tbk",
      period: "July 2025 — January 2026",
      description: "Maintained and enhanced KPI dashboards for divisional management and 4 regional heads, enabling consistent monitoring of Sales Achievement, Distribution Coverage, Billing Rate, and Target Realization.\nBuilt automated incentive calculation templates with Advanced Excel, Pivot Tables, and OLAP for 2,000+ sales employees across 5 incentive schemes, significantly improving reporting efficiency and payout accuracy.\nConducted QGIS-based geospatial analysis of regional sales coverage outside Java, supporting territory expansion and distribution planning initiatives.\nGenerated weekly and monthly sales performance reports at both individual and regional levels to support operational decision-making."
    }
  ],

  stats: [
    { label: "Bachelor of Industrial Engineering", value: "GPA 3.55/4.00", suffix: "" },
    { label: "Automation Scripts", value: 4, suffix: "+" },
    { label: "Hours Saved / Month", value: 40, suffix: "h" },
  ],

  spreadsheetId: "MASUKKAN_SPREADSHEET_ID_ANDA_DISINI",

 // Setiap project sekarang bisa punya "attachments": lampiran file tambahan
 // seperti flowchart, handbook/SOP, laporan PDF, dsb. Ini akan muncul sebagai
 // tombol yang bisa diklik di dalam modal detail project.
 //
 // Cara isi:
 //   attachments: [
 //     { name: "Nama file yang ditampilkan", type: "pdf", url: "https://link-ke-file-kamu" }
 //   ]
 //
 // "type" menentukan ikon yang muncul: pdf, doc, sheet, image, ppt, atau zip (default: file biasa).
 // "url" bisa berupa link Google Drive (klik kanan file > Bagikan > Salin link),
 // link GitHub, atau hosting lain. Kalau project belum ada lampiran, cukup hapus
 // baris "attachments" atau biarkan array-nya kosong: attachments: []
 fallbackProjects: [
    {
      title: "IT Asset Tracking Dashboard",
      category: "Automation",
      description: "A centralized digital ecosystem built to track IT assets in motion, enabling real-time status updates and ensuring zero shipment anomalies fall through the cracks.",
      tools: "Google Apps Script, Google Sheets, JavaScript",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://script.google.com/macros/s/AKfycbyVKn6KCRlxw5StXsXAaaR3ogn_Czy6wFAtThEsfxdkKpnGmbCvwevszVdt1Nar1E774w/exec",
      metrics: "500+ Assets Tracked | 58% Pending Status Reduction | Enhanced Real-Time Visibility",
      attachments: [
        { name: "Flowchart Proses Tracking", type: "pdf", url: "" },
        { name: "Handbook / SOP Penggunaan", type: "pdf", url: "" }
      ]
    },
    {
      title: "IT Asset Request & Return Form",
      category: "Web App",
      description: "Developed a web-based request management system using Google Apps Script and Google Workspace to streamline IT asset repair and return submissions across facilities. The system replaces manual request forms with a standardized, validated, and trackable workflow.",
      tools: "Google Apps Script, HTML, CSS",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://script.google.com/macros/s/AKfycbyLGi-9oJsdmxEM2vxPTaYiK_fH4hs1DYdDTVKCxNXnaGtjGMdhXrN4HyhBY3zRMMdADg/exec",
      metrics: "60% Fewer Duplicate Entries | 25% Higher Processing Capacity | 50% Time Saved",
      attachments: []
    },
    {
      title: "Summary Tracker",
      category: "Automation Report",
      description: "An automated cross-functional monitoring tool generated to report overall asset performance instantly—without anyone needing to touch a spreadsheet manually.",
      tools: "Google Apps Script, HTML, CSS",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://script.google.com/macros/s/AKfycbyVKn6KCRlxw5StXsXAaaR3ogn_Czy6wFAtThEsfxdkKpnGmbCvwevszVdt1Nar1E774w/exec?page=summary",
      metrics: "Auto-Updated Reports | Automated Email Reminders",
      attachments: []
    },
    {
      title: "Summary Performance Salesman",
      category: "Spreadsheet Report",
      description: "An advanced sales monitoring matrix designed to automate complex incentive calculation frameworks and operational business rules, providing clear regional performance evaluation visibility.",
      tools: "Spreadsheet",
      image: "https://plus.unsplash.com/premium_photo-1671461774955-7aab3ab41b90?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      demoUrl: "https://docs.google.com/spreadsheets/d/173XxPf8qLSWQoUYgc6112VTYTBNqE_BTAJ1FeA5GXQg/edit?gid=0#gid=0",
      metrics: "2,000+ Sales Staff Covered | 100% Payout Accuracy | Automated Analytics",
      attachments: [
        { name: "Skema Perhitungan Insentif", type: "sheet", url: "" }
      ]
    },
    {
      title: "Digital Promotion System for Culinary SME (Dapur Siteteh)",
      category: "Academic Project",
      description: "Applied Machine Learning algorithms to identify high-value customer segments and generate data-driven promotional strategies using historical SME transaction data, enabling optimized bundling and customer acquisition.",
      tools: "Python, K-Means Clustering, Market Basket Analysis (Apriori, FP-Growth), Excel",
      image: "https://plus.unsplash.com/premium_photo-1671461774955-7aab3ab41b90?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      demoUrl: "",
      metrics: "300+ Transactions Analyzed | Data-Driven Bundling | Cluster Insights",
      attachments: [
        { name: "Laporan Lengkap (PDF)", type: "pdf", url: "" }
      ]
    },
    {
      title: "Tofu Wastewater Optimization via Green VSM",
      category: "Academic Project",
      description: "Applied Green Value Stream Mapping (Green VSM) and Mass Balance Analysis to support the integration of Nata de Soya production processes. Evaluated strategic alternatives using the TOWS Matrix and Supply Chain Mapping to identify operational improvements and sustainability opportunities.",
      tools: "Green Value Stream Mapping (GVSM), Mass Balance Analysis, Supply Chain Mapping, TOWS Analysis",
      image: "https://plus.unsplash.com/premium_photo-1671461774955-7aab3ab41b90?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      demoUrl: "",
      metrics: "~44% Waste Recycling Rate | Best Presenter at SEMNASTEK 2025",
      attachments: [
        { name: "Green VSM Flowchart", type: "pdf", url: "" },
        { name: "Paper SEMNASTEK 2025", type: "pdf", url: "" }
      ]
    }
  ],

  // ---- SKILL LAB — 3D Coverflow Gallery (bagian "• Skill Lab") ----
  // Ini section baru buat pamer dummy project / eksperimen SQL, dashboard,
  // visualisasi data, dll di luar project kerjaan beneran. Tinggal ganti
  // isi array ini kapan pun project dummy kamu sudah siap.
  //
  // "icon"  : nama ikon Font Awesome (tanpa "fa-solid"), contoh "fa-database"
  // "tools" : dipisah koma, akan tampil sebagai chip kecil
  // "demoUrl" (opsional) : link ke demo/repo, kalau ada akan muncul tombol
  //                        "Buka Demo" di modal detail
  skillLab: [
    {
      title: "SQL Sales Query Playground",
      category: "SQL",
      icon: "fa-database",
      description: "Kumpulan query SQL (window functions, CTE, join bertingkat) untuk menjawab pertanyaan bisnis seperti top customer per region dan tren penjualan bulanan.",
      tools: "PostgreSQL, CTE, Window Functions",
      demoUrl: ""
    },
    {
      title: "Sales Performance Dashboard",
      category: "Visualization",
      icon: "fa-chart-pie",
      description: "Dashboard interaktif yang memvisualisasikan pencapaian penjualan, distribusi coverage, dan billing rate per region secara real-time.",
      tools: "Looker Studio, Power BI, Google Sheets",
      demoUrl: ""
    },
    {
      title: "Inventory Anomaly Detector",
      category: "Python",
      icon: "fa-chart-line",
      description: "Skrip Python sederhana untuk mendeteksi pergerakan aset/stok yang anomali dibanding rata-rata historisnya, lalu menandainya untuk ditinjau.",
      tools: "Python, Pandas, Matplotlib",
      demoUrl: ""
    },
    {
      title: "Geospatial Coverage Map",
      category: "GIS",
      icon: "fa-map-location-dot",
      description: "Pemetaan cakupan distribusi penjualan berbasis QGIS untuk mengidentifikasi wilayah yang belum tercover secara optimal.",
      tools: "QGIS, Geospatial Analysis",
      demoUrl: ""
    },
    {
      title: "Automated Reporting Bot",
      category: "Automation",
      icon: "fa-robot",
      description: "Google Apps Script yang menyusun & mengirim ringkasan laporan mingguan otomatis ke email tim setiap Senin pagi.",
      tools: "Google Apps Script, Gmail API",
      demoUrl: ""
    }
  ],

  skills: [
    { name: "Google Apps Script", icon: "fa-code" },
    { name: "Google Sheets", icon: "fa-table" },
    { name: "Advanced Excel", icon: "fa-file-excel" },
    { name: "Basic SQL", icon: "fa-database" },
    { name: "QGIS", icon: "fa-map-location-dot" },
    { name: "Basic Power BI", icon: "fa-chart-pie" },
    { name: "Looker Studio", icon: "fa-js" },
    { name: "Pivot Tables & OLAP", icon: "fa-layer-group" }
  ],

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
