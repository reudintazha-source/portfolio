/* ==========================================================================
   CONFIG.JS — SEMUA KONTEN WEBSITE ADA DI SINI
   --------------------------------------------------------------------------
   Kamu cukup mengedit file ini. TIDAK PERLU menyentuh index.html / script.js.

   DAFTAR ISI (cari dengan Ctrl+F pada judul bagian):
     1. IDENTITAS            nama, role, email, CV
     2. HERO                 teks berganti, video latar, animasi bunga
     3. EXPERIENCE           riwayat kerja
     4. STATS                angka ringkas
     5. REAL PROJECT         proyek kerja nyata (tab "Real Project")
     6. CASE STUDY           analisis mandiri: SQL, Power BI, Excel, App Script
                             (tab "Case Study")
     7. CERTIFICATES         sertifikat kursus online
     8. SKILLS / WORKFLOW / FOOTER

   ATURAN EMAS
   - Teks selalu di dalam tanda kutip "seperti ini".
   - Setiap baris/item dipisah KOMA di akhir, kecuali item paling terakhir.
   - Field OPSIONAL yang dikosongkan ("" atau []) TIDAK akan ditampilkan
     di website. Jadi tidak ada tombol mati atau tulisan "belum tersedia".

   TENTANG LINK
   - Link Google Drive harus diset "Anyone with the link".
   - Link file (PDF, lampiran, dokumen): pakai link share biasa
       https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   - Link GAMBAR dari Drive: pakai format
       https://lh3.googleusercontent.com/d/FILE_ID
     Kalau masih tidak muncul, cara paling stabil adalah menaruh gambar
     di folder "images/" di repo GitHub, lalu tulis: image: "images/nama.png"
   - File di repo GitHub (video, PDF, xlsx) cukup ditulis path-nya,
     contoh: "video/sql-demo.mp4". Batas GitHub 100 MB per file.
   ========================================================================== */

const SITE_CONFIG = {

  /* ======================================================================
     1. IDENTITAS
     ====================================================================== */
  name: "Reudinta Zesha",
  location: "Tangerang",
  locationFlag: "🇮🇩",
  role: "📊 Supply Chain & Analyst",
  email: "reudintazha@gmail.com",
  linkedin: "https://linkedin.com/in/reudinta-zesha/",

  // Form kontak di bagian bawah: pesan terkirim langsung ke email.
  //   enabled : false = form disembunyikan
  //   to      : kosongkan = pakai "email" di atas
  //   subject : judul email yang kamu terima
  // CATATAN: layanan gratis FormSubmit. Saat pesan PERTAMA masuk, kamu
  // dapat email konfirmasi dari FormSubmit — klik "Activate Form" sekali,
  // setelah itu semua pesan masuk otomatis ke inbox (cek juga folder Spam).
  contactForm: {
    enabled: true,
    to: "",
    subject: "Pesan baru dari portofolio"
  },

  // Link CV untuk tombol "Download CV". Kosong = tombol disembunyikan.
  cvUrl: "",

  // true = tampil status "Available for work"
  available: true,


  /* ======================================================================
     2. HERO (halaman paling atas)
     ====================================================================== */
  heroWords: ["operational data", "messy spreadsheets", "raw logistics data"],
  heroSubtext: "I specialize in creating thoughtful and impactful systems, optimizing supply chain workflows, and translating raw data into robust business execution.",

  heroVideo: {
    enabled: true,
    src: "video/intro.mp4",   // file harus benar-benar ada di repo
    overlayOpacity: 0.5,      // 0 = terang, 1 = gelap
    volume: 0.6,              // 0 = diam, 1 = paling keras
    // Video selalu mulai mute (aturan browser). Pengunjung menyalakan
    // suara lewat tombol di pojok kanan bawah hero.
  },

  flowerAnimation: {
    enabled: true,
    emojis: ["🌸", "🌼", "🌺"],
    count: 10,
  },


  /* ======================================================================
     3. EXPERIENCE
     ----------------------------------------------------------------------
     description : satu kalimat = satu elemen array (tampil sebagai bullet).

     Supaya bagian ini tidak polos, tiap pengalaman boleh punya:
       logo   : gambar logo perusahaan (kotak kecil di samping judul).
                Kosong = otomatis dibuat badge inisial perusahaan.
       photos : foto kegiatan / kantor / gudang / bukti kerja (boleh banyak).
                Format: [{ url: "...", caption: "keterangan singkat" }]
                caption boleh dihapus. Klik foto = diperbesar.
                Kosong ([]) = tidak ada galeri foto.

     Link foto/logo boleh link Drive biasa (.../file/d/ID/view) — otomatis
     diubah jadi gambar. Paling stabil: taruh di folder "images/" di repo,
     contoh: "images/spx-gudang.jpg".
     ====================================================================== */
  experience: [
    {
      role: "Inventory Analyst",
      company: "SPX Express",
      period: "April 2026 — July 2026",
      logo: "",
      photos: [
        // { url: "images/spx-1.jpg", caption: "Monitoring pergerakan aset" },
        // { url: "images/spx-2.jpg", caption: "Dashboard tracking di tim" },
      ],
      description: [
        "Managed IT asset movements across 3,000+ operational sites, coordinating with logistics vendors and warehouse head to monitor operational performance, resolve shipment discrepancies, and support efficient asset availability.",
        "Processed and verified 50+ daily asset movements, identifying shipment discrepancies and supporting timely operational resolution.",
        "Developed a web-based IT asset request system using Google Apps Script and Google Sheets, streamlining asset allocation workflows and reducing duplicate records.",
        "Developed an operational dashboard to monitor 500+ IT asset movements, improving asset visibility and supporting operational performance monitoring."
      ].join("\n")
    },
    {
      role: "Intern Support Distribution Development",
      company: "PT Garudafood Putra Putri Jaya Tbk",
      period: "July 2025 — January 2026",
      logo: "",
      photos: [
        // { url: "images/garudafood-1.jpg", caption: "Presentasi KPI dashboard" },
      ],
      description: [
        "Maintained and enhanced KPI dashboards for divisional management and 4 regional heads, enabling consistent monitoring of Sales Achievement, Distribution Coverage, Billing Rate, and Target Realization.",
        "Built automated incentive calculation templates with Advanced Excel, Pivot Tables, and OLAP for 2,000+ sales employees across 5 incentive schemes, significantly improving reporting efficiency and payout accuracy.",
        "Conducted QGIS-based geospatial analysis of regional sales coverage outside Java, supporting territory expansion and distribution planning initiatives.",
        "Generated weekly and monthly sales performance reports at both individual and regional levels to support operational decision-making."
      ].join("\n")
    }
  ],


  /* ======================================================================
     4. STATS
     ====================================================================== */
  stats: [
    { label: "Bachelor of Industrial Engineering", value: "GPA 3.55/4.00", suffix: "" },
    { label: "Automation Scripts",                 value: 4,              suffix: "+" },
    { label: "Hours Saved / Month",                value: 40,             suffix: "h" },
  ],

  spreadsheetId: "MASUKKAN_SPREADSHEET_ID_ANDA_DISINI",


  /* ======================================================================
     5. REAL PROJECT (tab "Real Project")
     ----------------------------------------------------------------------
     Template satu project (salin lalu isi):

       {
         title: "",
         category: "",
         description: "",
         tools: "Tool 1, Tool 2",        // dipisah koma -> jadi chip
         image: "",                      // lihat aturan link gambar di atas
         demoUrl: "",                    // kosong = tombol demo tidak tampil
         metrics: "Angka 1 | Angka 2",   // dipisah tanda |
         actionsTaken:   ["bullet 1", "bullet 2"],   // "Action Taken"
         businessImpact: ["bullet 1", "bullet 2"],   // "Business Impact"
         attachments: [                  // lampiran PDF/dokumen (opsional)
           { name: "Nama tampil", type: "pdf", url: "https://..." }
         ]
       },

     type lampiran: pdf, doc, sheet, image, ppt, zip.
     Lampiran dengan url "" otomatis tidak ditampilkan.
     ====================================================================== */
  fallbackProjects: [

    // ---------- Project 1 ----------
    {
      title: "IT Asset Tracking Dashboard",
      category: "Automation",
      description: "A centralized digital ecosystem built to track IT assets in motion, enabling real-time status updates and ensuring zero shipment anomalies fall through the cracks.",
      tools: "Google Apps Script, Google Sheets, JavaScript",
      image: "https://lh3.googleusercontent.com/d/1QqNjHmNDAMNPQHofgZgg0cHCfedguYTN",
      demoUrl: "https://script.google.com/macros/s/AKfycbyVKn6KCRlxw5StXsXAaaR3ogn_Czy6wFAtThEsfxdkKpnGmbCvwevszVdt1Nar1E774w/exec",
      metrics: "500+ Assets Tracked | 58% Pending Status Reduction | Enhanced Real-Time Visibility",
      actionsTaken: [
        "Built a centralized digital ecosystem to track IT assets in motion across 3,000+ operational sites",
        "Designed real-time status update workflows to catch shipment discrepancies before they became bottlenecks",
        "Integrated Google Apps Script with Google Sheets for live data synchronization and automated alerts"
      ],
      businessImpact: [
        "Tracked 500+ IT assets with full end-to-end visibility",
        "Reduced pending shipment status backlog by 58%",
        "Gave warehouse and logistics teams enhanced real-time visibility into asset movement"
      ],
      attachments: [
        { name: "Flowchart Proses Tracking",  type: "pdf", url: "" },
        { name: "Handbook / SOP Penggunaan",  type: "pdf", url: "" }
      ]
    },

    // ---------- Project 2 ----------
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
        "Replaced manual paper-based request forms with a standardized, validated digital workflow",
        "Added input validation rules to catch duplicate and incomplete submissions before they entered the queue"
      ],
      businessImpact: [
        "Cut duplicate entries by 60%",
        "Increased processing capacity by 25%",
        "Saved the team 50% of the time previously spent on manual processing"
      ],
      attachments: [
        { name: "UML Sistem Web Request", type: "image", url: "https://drive.google.com/file/d/1WJ0fcVOwK0X1GxlDOahV2ZH_JUu3MJdh/view?usp=sharing" }
      ]
    },

    // ---------- Project 3 ----------
    {
      title: "Summary Tracker",
      category: "Automation Report",
      description: "An automated cross-functional monitoring tool generated to report overall asset performance instantly—without anyone needing to touch a spreadsheet manually.",
      tools: "Google Apps Script, HTML, CSS",
      image: "https://lh3.googleusercontent.com/d/1x0egIBulg4WIMMO3SivxGkWz44DXnhga",
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

    // ---------- Project 4 ----------
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

    // ---------- Project 5 ----------
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

    // ---------- Project 6 ----------
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
        { name: "Green VSM Flowchart",  type: "pdf", url: "" },
        { name: "Paper SEMNASTEK 2025", type: "pdf", url: "" }
      ]
    }
  ],


  /* ======================================================================
     6. CASE STUDY (tab "Case Study") — analisis mandiri
     ----------------------------------------------------------------------
     Kartu di halaman depan tampil seperti kartu Real Project (gambar,
     kategori, judul, metrik, tools). Klik kartu -> jendela detail berisi
     video, screenshot, presentasi/PDF yang langsung terbuka di halaman,
     dan tombol demo.

     Template satu case study (salin lalu isi). SEMUA field selain title
     bersifat opsional — yang kosong ("" atau []) TIDAK tampil sama sekali.

       {
         title: "",
         category: "",                // label kecil, mis. "SQL", "Power BI"
         icon: "fa-database",         // ikon cadangan kalau "image" kosong
         image: "",                   // gambar sampul (dipakai kalau tidak ada preview live)
         previewUrl: "",              // opsional: link yang tampil LANGSUNG di kartu depan
                                      // (kosong = otomatis dari docs / demo Google Sheets,
                                      //  Slides, Looker Studio pertama)
         description: "",
         tools: "Tool 1, Tool 2",     // dipisah koma
         metrics: "Angka 1 | Angka 2",// dipisah tanda |
         actionsTaken:   ["bullet 1", "bullet 2"],
         businessImpact: ["bullet 1", "bullet 2"],

         videoUrl: "",                // video pengerjaan / walkthrough
         screenshots: [],             // galeri gambar, klik = diperbesar
         docs: [],                    // PPT / PDF -> langsung terbuka di halaman
         demos: []                    // tombol demo, BOLEH LEBIH DARI SATU
       },

     videoUrl yang didukung:
       - YouTube (watch / youtu.be / shorts)  -> paling disarankan, set "Unlisted"
       - Google Drive  .../file/d/FILE_ID/view...   (Anyone with the link)
       - Loom          https://www.loom.com/share/...
       - File langsung "video/sql-demo.mp4"  (maks 100 MB di GitHub)

     screenshots, contoh:
       screenshots: [
         { url: "images/churn-1.png", caption: "Halaman Overview" },
         { url: "images/churn-2.png", caption: "Halaman Detail Kontrak" }
       ],

     docs  (presentasi / PDF yang bisa dibuka langsung oleh pengunjung)
       Boleh LEBIH DARI SATU; pengunjung memilih lewat tombol kecil.
       Link Drive (PDF, PPT/PPTX, XLSX) otomatis ditampilkan lewat viewer.
       docs: [
         { name: "Slide Presentasi", type: "ppt", url: "https://drive.google.com/file/d/ID/view?usp=sharing" },
         { name: "Laporan Lengkap",  type: "pdf", url: "https://drive.google.com/file/d/ID/view?usp=sharing" }
       ],
       type: pdf | ppt | sheet (menentukan ikon saja).

     demos (tombol yang membuka tab baru — BOLEH BANYAK)
       Cocok untuk file Excel / Google Sheets (pengunjung bisa utak-atik
       langsung), repo GitHub, Looker Studio, Apps Script web app, dsb.
       demos: [
         { name: "Buka Excel Interaktif", url: "https://docs.google.com/spreadsheets/d/ID/edit?usp=sharing" },
         { name: "Versi Looker Studio",   url: "https://lookerstudio.google.com/reporting/ID" },
         { name: "Download .pbix",        url: "https://drive.google.com/file/d/ID/view?usp=sharing" }
       ]
       Tombol pertama tampil menonjol, sisanya gaya sekunder.
       Tips Excel: upload ke Google Drive, buka dengan Google Sheets, lalu
       Share -> "Anyone with the link" (Viewer) supaya orang tidak mengubah
       file aslimu.

     ----------------------------------------------------------------------
     REKOMENDASI UNTUK POWER BI VERSI GRATIS
     Power BI gratis tidak bisa "Publish to web", jadi dashboard tidak bisa
     dibuka interaktif di website. Kombinasi terbaik untuk tetap memamerkannya:
       1. Screenshot tiap halaman report (Win + Shift + S) -> "screenshots",
          pilih yang terbaik jadi "image" (sampul kartu).
       2. Rekam layar 1-3 menit saat kamu klik slicer/filter/drill-down
          (Xbox Game Bar: Win + G, atau OBS) -> upload YouTube Unlisted ->
          "videoUrl". Ini yang paling mirip demo interaktif.
       3. Export PDF: di Power BI Desktop, File -> Export -> Export to PDF
          -> taruh di Drive -> "docs". Pengunjung bisa scroll tiap halaman.
       4. Slide storytelling (PPT/PDF): halaman dashboard + insight +
          rekomendasi bisnis -> "docs". Rekruter suka bagian ini.
       5. File .pbix di Drive -> "demos" ("Download .pbix") untuk yang punya
          Power BI Desktop (gratis).
       6. Versi Looker Studio dari dashboard yang sama: link report-nya
          ditempel di "docs" akan tampil INTERAKTIF langsung di halaman
          (Looker Studio: Share -> Anyone with the link -> Viewer).
     ====================================================================== */
  skillLab: [

    // ---------- Case Study 1 ----------
    {
      title: "SQL Sales Query Playground",
      category: "SQL",
      icon: "fa-database",
      image: "",
      description: "Kumpulan query SQL (window functions, CTE, join bertingkat) untuk menjawab pertanyaan bisnis seperti top customer per region dan tren penjualan bulanan.",
      tools: "PostgreSQL, CTE, Window Functions",
      metrics: "",
      actionsTaken: [],
      businessImpact: [],
      videoUrl: "",
      screenshots: [],
      docs: [],
      demos: []
    },

    // ---------- Case Study 2 ----------
    {
      title: "Telecommunication Monthly vs Annual Churn Dashboard — Power BI",
      category: "Power BI",
      icon: "fa-chart-pie",
      image: "https://drive.google.com/file/d/1v6cErG4DZL0QqFXZxczw_wUgHMewDjMM/view?usp=sharing",
      description: "Dashboard menganalisis pengaruh jenis kontrak langganan (bulanan vs tahunan) terhadap tingkat churn.",
      tools: "Power BI, CSV",
      metrics: "",
      actionsTaken: [Kembangkan strategi untuk mendorong pelanggan dengan skema pembayaran bulanan agar beralih ke paket berlangganan jangka panjang, melalui penawaran menarik, insentif, atau keuntungan tambahan dari langganan tersebut.],
      businessImpact: [1\. Monthly contract memiliki tingkat churn tertinggi sebesar 23%, jauh lebih tinggi dibandingkan annual contract yang hanya sekitar 3%.

2\. Semakin panjang durasi kontrak, semakin rendah tingkat churn. Kontrak 2 tahun memiliki churn terendah sebesar 0,68%.

3\. Monthly contract mendominasi kontribusi churn customer dengan churn share mencapai 89%.

4\. Customer yang churn memiliki rata-rata charge sebesar 4.078, atau 23% lebih tinggi dibandingkan customer yang bertahan.],
      videoUrl: "",
      screenshots: [https://drive.google.com/file/d/1v6cErG4DZL0QqFXZxczw_wUgHMewDjMM/view?usp=sharing],
      docs: [],
      demos: [
        { name: "Buka File Dashboard", url: "https://drive.google.com/file/d/1IMI1_2sdafz5xRkisLutxY8vEkCawx8G/view?usp=sharing" }
      ]
    },

    // ---------- Case Study 3 ----------
    {
      title: "Telecommunication Monthly vs Annual Churn Dashboard — Excel",
      category: "Excel",
      icon: "fa-file-excel",
      image: "",
      description: "Dashboard menganalisis pengaruh jenis kontrak langganan (bulanan vs tahunan) terhadap tingkat churn.",
      tools: "Advanced Excel, Pivot Tables, CSV",
      metrics: "",
      actionsTaken: [],
      businessImpact: [],
      videoUrl: "",
      screenshots: [],
      docs: [],
      demos: [
        { name: "Buka Excel Interaktif", url: "https://docs.google.com/spreadsheets/d/1DROvsHS1Kj56gOho3KvCfK_5JL0o5g5s/edit?usp=sharing&ouid=104429577954838799593&rtpof=true&sd=true" }
      ]
    },

    // ---------- Case Study 4 ----------
    {
      title: "Automated Reporting Bot",
      category: "App Script",
      icon: "fa-code",
      image: "",
      description: "Google Apps Script yang menyusun & mengirim ringkasan laporan mingguan otomatis ke email tim setiap Senin pagi.",
      tools: "Google Apps Script, Gmail API, Google Sheets",
      metrics: "",
      actionsTaken: [],
      businessImpact: [],
      videoUrl: "",
      screenshots: [],
      docs: [],
      demos: []
    }
  ],


  /* ======================================================================
     7. CERTIFICATES (sertifikat kursus online)
     ----------------------------------------------------------------------
     Selama array ini kosong, section "Certificates" TIDAK muncul di website.
     Begitu ada minimal satu sertifikat, section otomatis tampil.

     Template satu sertifikat (hapus // lalu isi, taruh di dalam [ ]):

       {
         title: "Nama Sertifikat",                  // WAJIB
         issuer: "Penyelenggara",                   // opsional
         date: "Agustus 2026",                      // opsional
         description: "Apa yang dipelajari.",       // opsional
         url: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
              // link PDF sertifikat. Kosong = kartu tanpa tombol.
              // Boleh path di repo: "certificates/nama-file.pdf"
       },
     ====================================================================== */
  certificates: [
    {
      title: "CSCMP Supply Chain Foundations:The Essentials Professional Certificate",
      issuer: "the Council of Supply Chain Management Professionals",
      date: "October 2026",
      description: "the Council of Supply Chain Management Professionals (CSCMP) a number of certifications and foundational exams.  CSCMP supply chain foundation exam on LinkedIn",
      url: "https://drive.google.com/file/d/1gkjPny7_cWtGQs-wMzRAS-X8IWuZQDGg/view?usp=sharing"
    },
    {
      title: "Business Analysis: Essential Tools and Techniques 2021",
      issuer: "IIBA International Institute of Business Analysis",
      date: "October 2026",
      description: "Business Analysis course with IIBA (Global association defines standards for the business analysis profession. It certifies individuals at all career stages and provides resources for teams, academics, and trainers)",
      url: "https://www.linkedin.com/learning/certificates/1fd5ab0f235eb0b007f44365b950766bf087e89f5bf419742a15ecea774889ed?trk=share_certificate"
    }
  ],


  /* ======================================================================
     8. SKILLS · WORKFLOW · FOOTER
     ====================================================================== */
  skills: [
    { name: "Google Apps Script",  icon: "fa-code" },
    { name: "Google Sheets",       icon: "fa-table" },
    { name: "Excel",               icon: "fa-file-excel" },
    { name: "SQL",                 icon: "fa-database" },
    { name: "QGIS",                icon: "fa-map-location-dot" },
    { name: "Power BI",            icon: "fa-chart-pie" },
    { name: "Looker Studio",       icon: "fa-chart-column" },
    { name: "Pivot Tables & OLAP", icon: "fa-layer-group" }
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
