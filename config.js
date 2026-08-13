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
      description: "Managed IT asset movements across 3,000+ operational sites, coordinating with logistics vendors and warehouse head to monitor operational performance, resolve shipment discrepancies, and support efficient asset availability.\nProcessed and verified 50+ daily asset movements, identifying shipment discrepancies and supporting timely operational resolution.\nDeveloped a web-based IT asset request system using Google Apps Script and Google Sheets, streamlining asset allocation workflows and reducing duplicate records.\nDeveloped an operational dashboard to monitor 500+ IT asset movements, improving asset visibility and supporting operational performance monitoring."
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
  //
  // Setiap project juga sekarang bisa punya "actionsTaken" dan "businessImpact":
  // dua daftar bullet point terpisah yang akan muncul di modal detail project,
  // di bawah deskripsi singkat. Formatnya array of string, satu string = satu bullet.
  //
  //   actionsTaken: [
  //     "Apa yang kamu kerjakan / langkah konkret yang diambil...",
  //     "Langkah lainnya..."
  //   ],
  //   businessImpact: [
  //     "Hasil / dampak bisnis yang terukur...",
  //     "Dampak lainnya..."
  //   ]
  //
  // Kalau salah satu (atau keduanya) tidak diisi / dihapus, modal akan tetap
  // menampilkan "description" seperti biasa tanpa error.
  fallbackProjects: [
    {
      title: "IT Asset Tracking Dashboard",
      category: "Automation",
      description: "A centralized digital ecosystem built to track IT assets in motion, enabling real-time status updates and ensuring zero shipment anomalies fall through the cracks.",
      tools: "Google Apps Script, Google Sheets, JavaScript",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://script.google.com/macros/s/AKfycbyVKn6KCRlxw5StXsXAaaR3ogn_Czy6wFAtThEsfxdkKpnGmbCvwevszVdt1Nar1E774w/exec",
      metrics: "500+ Assets Tracked | 58% Pending Status Reduction | Enhanced Real-Time Visibility",
      actionsTaken: [
        "Designed and developed a web-based dashboard integrated with Google Sheets for real-time IT asset tracking",
        "Designed real-time status update workflows to catch shipment discrepancies before they became bottlenecks",
        "Integrated Google Apps Script with Google Sheets for live data synchronization and automated alerts"
      ],
      businessImpact: [
        "Tracked 500+ IT assets with full end-to-end visibility",
        "Reduced pending AWB status updates by 58% (from 300+ to 128).",
        "Gave warehouse and logistics teams enhanced real-time visibility into asset movement"
      ],
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
      actionsTaken: [
        "Built a web-based request management system with Google Apps Script and Google Workspace",
        "Replaced manual google form-based request forms with a standardized, validated digital workflow",
        "Added input validation rules to catch duplicate and incomplete submissions before they entered the queue"
      ],
      businessImpact: [
        "Cut duplicate entries by 60%",
        "Increased processing capacity by 25%",
        "Saved the team 50% of the time previously spent on manual processing"
      ],
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
      actionsTaken: [
        "Built an automated cross-functional monitoring tool to report overall asset performance instantly",
        "Set up scheduled triggers to auto-refresh the summary without manual spreadsheet edits",
        "Configured automated email reminders to keep stakeholders updated without manual follow-up"
      ],
      businessImpact: [
        "Delivered auto-updated reports with zero manual spreadsheet work",
        "Improved stakeholder response time through automated reminders"
      ],
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
      actionsTaken: [
        "Designed an advanced sales monitoring matrix to automate complex incentive calculation frameworks",
        "Encoded operational business rules into Advanced Excel, Pivot Tables, and OLAP models",
        "Built regional performance evaluation views for divisional management and regional heads"
      ],
      businessImpact: [
        "Covered 2,000+ sales staff across 5 incentive schemes",
        "Achieved 100% payout accuracy",
        "Enabled automated analytics for faster regional performance decisions"
      ],
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
      actionsTaken: [
        "Applied K-Means Clustering to segment high-value customers from historical transaction data",
        "Ran Market Basket Analysis (Apriori, FP-Growth) to uncover product bundling opportunities",
        "Translated model outputs into concrete, data-driven promotional strategies"
      ],
      businessImpact: [
        "Analyzed 300+ transactions to inform promotional strategy",
        "Delivered data-driven bundling recommendations for the SME",
        "Produced actionable cluster insights to support customer acquisition"
      ],
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
      actionsTaken: [
        "Applied Green Value Stream Mapping and Mass Balance Analysis to integrate Nata de Soya production",
        "Evaluated strategic alternatives using the TOWS Matrix and Supply Chain Mapping",
        "Identified operational improvement and sustainability opportunities across the process"
      ],
      businessImpact: [
        "Achieved a ~44% waste recycling rate",
        "Recognized as Best Presenter at SEMNASTEK 2025"
      ],
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
      category: "Visualisasi",
      icon: "fa-chart-pie",
      description: "Dashboard interaktif yang memvisualisasikan pencapaian penjualan, distribusi coverage, dan billing rate per region secara real-time.",
      tools: "Looker Studio, Power BI, Google Sheets",
      demoUrl: ""
    },
    {
      title: "Automated Incentive Workbook",
      category: "Excel",
      icon: "fa-file-excel",
      description: "Template Excel dengan Pivot Table, OLAP, dan formula lanjutan untuk menghitung insentif ribuan sales secara otomatis dan akurat.",
      tools: "Advanced Excel, Pivot Tables, OLAP",
      demoUrl: ""
    },
    {
      title: "Automated Reporting Bot",
      category: "App Script",
      icon: "fa-code",
      description: "Google Apps Script yang menyusun & mengirim ringkasan laporan mingguan otomatis ke email tim setiap Senin pagi.",
      tools: "Google Apps Script, Gmail API, Google Sheets",
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
