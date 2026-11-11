document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 900, once: true, anchorPlacement: 'top-bottom' });

  const cfg = SITE_CONFIG;

  /* ============ HELPER: GAMBAR, EMBED, LIGHTBOX ============ */
  const esc = (v) => String(v == null ? '' : v).replace(/"/g, '&quot;');

  // Link Google Drive biasa (.../file/d/ID/view) otomatis diubah jadi link
  // gambar langsung, jadi kamu cukup tempel link share-nya saja.
  const imgUrl = (raw) => {
    const u = (raw || '').trim();
    const m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/) || u.match(/drive\.google\.com\/open\?id=([\w-]+)/);
    return m ? `https://lh3.googleusercontent.com/d/${m[1]}` : u;
  };
  const IMG_ONERROR = `onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 225%22><rect width=%22400%22 height=%22225%22 fill=%22%23e5e7eb%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2216%22 fill=%22%239ca3af%22>Preview belum tersedia</text></svg>';"`;

  // Daftar foto boleh berisi teks link, atau objek { url, caption }.
  // Entri kosong dibuang supaya tidak muncul kotak rusak.
  const normPhotos = (list) => (list || [])
    .map(p => typeof p === 'string' ? { url: p, caption: '' } : (p || {}))
    .filter(p => p.url && p.url.trim() !== '')
    .map(p => ({ url: imgUrl(p.url), caption: p.caption || '' }));

  // Ubah link biasa jadi link yang bisa ditampilkan di dalam halaman (iframe).
  // Mengembalikan '' kalau tidak bisa di-embed (pengunjung tetap dapat tombol "buka di tab baru").
  const toEmbedUrl = (raw) => {
    const url = (raw || '').trim();
    if (!url) return '';
    let m;
    if ((m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/)) || (m = url.match(/drive\.google\.com\/open\?id=([\w-]+)/))) {
      return `https://drive.google.com/file/d/${m[1]}/preview`;   // PDF, PPT, XLSX, gambar di Drive
    }
    if ((m = url.match(/docs\.google\.com\/(spreadsheets|document)\/d\/([\w-]+)/))) {
      return `https://docs.google.com/${m[1]}/d/${m[2]}/preview`;
    }
    if ((m = url.match(/docs\.google\.com\/presentation\/d\/([\w-]+)/))) {
      return `https://docs.google.com/presentation/d/${m[1]}/embed`;
    }
    if (/(lookerstudio|datastudio)\.google\.com\/reporting\//.test(url) && !/\/embed\//.test(url)) {
      return url.replace('/reporting/', '/embed/reporting/');       // Looker Studio interaktif
    }
    return embedFile(url);
  };

  // ---- File yang disimpan di repo GitHub kamu (PDF, PPTX, XLSX, DOCX) ----
  // Contoh isi config:  "docs/laporan.pdf"  atau  "files/churn.xlsx"
  //  - PDF            : ditampilkan langsung oleh browser (tanpa layanan pihak ketiga).
  //  - PPTX/XLSX/DOCX : ditampilkan lewat Microsoft Office Online Viewer. File harus
  //                     bisa diakses publik, jadi hanya jalan setelah website online
  //                     (GitHub Pages), bukan saat dibuka dari komputer sendiri.
  const FILE_RE = /\.(pdf|pptx?|xlsx?|docx?)(\?[^#]*)?(#.*)?$/i;
  const OFFICE_RE = /\.(pptx?|xlsx?|docx?)(\?[^#]*)?(#.*)?$/i;
  const absUrl = (u) => { try { return new URL(u, document.baseURI).href; } catch (e) { return u; } };
  const githubRaw = (u) => u.replace(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/(.+)$/i, 'https://raw.githubusercontent.com/$1/$2/$3');
  const embedFile = (raw) => {
    let url = githubRaw(raw);
    if (!FILE_RE.test(url)) return /^https?:\/\//i.test(url) ? url : '';   // embed lain (Looker, Power BI web, dsb.)
    const full = absUrl(url);
    if (OFFICE_RE.test(url)) {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(full)}`;
    }
    // PDF: link relatif / satu situs = langsung; PDF dari repo GitHub lain = lewat viewer PDF.js
    if (/^https?:\/\/raw\.githubusercontent\.com\//i.test(full)) {
      return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(full)}`;
    }
    return full;
  };


  // Lightbox sederhana: klik gambar apa pun yang punya atribut data-lightbox
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<button type="button" class="lightbox-close" aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button><img alt=""><p class="lightbox-caption"></p>';
  document.body.appendChild(lightbox);
  const lbImg = lightbox.querySelector('img');
  const lbCap = lightbox.querySelector('.lightbox-caption');
  const closeLightbox = () => { lightbox.classList.remove('is-open'); lbImg.removeAttribute('src'); };
  lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  document.addEventListener('click', (e) => {
    const t = e.target.closest && e.target.closest('[data-lightbox]');
    if (!t) return;
    lbImg.src = t.dataset.lightbox;
    lbCap.textContent = t.dataset.caption || '';
    lightbox.classList.add('is-open');
  });

  /* ============ RENDER KONTEN DARI CONFIG ============ */
  document.querySelectorAll('.js-name').forEach(el => el.textContent = cfg.name);
  document.querySelectorAll('.js-email').forEach(el => { el.textContent = cfg.email; el.href = `mailto:${cfg.email}`; });
  document.querySelectorAll('.js-linkedin').forEach(el => el.href = cfg.linkedin);
  document.querySelectorAll('.js-location').forEach(el => el.textContent = cfg.location);
  document.querySelectorAll('.js-location-flag').forEach(el => el.textContent = `${cfg.locationFlag} ${cfg.location}`);
  document.querySelectorAll('.js-role').forEach(el => el.textContent = cfg.role);
  document.querySelectorAll('.js-hero-subtext').forEach(el => el.textContent = cfg.heroSubtext);
  document.querySelectorAll('.js-footer-text').forEach(el => el.textContent = cfg.footerText);
  document.querySelectorAll('.js-footer-year').forEach(el => el.textContent = cfg.footerYear);

  const availBadge = document.getElementById('avail-badge');
  if (availBadge) {
    availBadge.style.display = cfg.available ? 'flex' : 'none';
  }

  // Workflow
  const workflowContainer = document.getElementById('workflow-container');
  if (workflowContainer) {
    workflowContainer.innerHTML = cfg.workflow.map((w, i) => `
      <div class="flex flex-col md:flex-row gap-6 md:gap-12 pb-12 ${i < cfg.workflow.length - 1 ? 'border-b border-gray-100' : ''}" data-aos="fade-up">
        <span class="text-slate-300 text-5xl font-serif font-bold">${w.number}</span>
        <div class="space-y-2">
          <h3 class="text-xl font-bold text-slate-900">${w.title}</h3>
          <p class="text-gray-600">${w.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Experience (timeline, gampang ditambah dari config.js)
  const experienceContainer = document.getElementById('experience-container');
  if (experienceContainer && cfg.experience) {
    experienceContainer.innerHTML = cfg.experience.map((exp, i) => {
      const descHtml = exp.description.includes('\n')
        ? `<ul class="space-y-2 mt-2">${exp.description.split('\n').filter(l => l.trim() !== '').map((line, li) => `
            <li class="flex gap-2 text-gray-600 leading-relaxed" style="animation-delay:${0.3 + li * 0.12}s"><span class="text-indigo-500 mt-1">•</span><span>${line.trim()}</span></li>
          `).join('')}</ul>`
        : `<p class="text-gray-600 leading-relaxed">${exp.description}</p>`;
      // Logo opsional; kalau kosong dipakai badge inisial supaya tidak polos.
      const initials = (exp.company || '').split(/\s+/)
        .filter(w => /^[A-Za-z]/.test(w) && !/^(PT|CV|Tbk)\.?$/i.test(w))
        .slice(0, 2).map(w => w[0]).join('').toUpperCase();
      const logoHtml = exp.logo && exp.logo.trim() !== ''
        ? `<img src="${esc(imgUrl(exp.logo))}" alt="${esc(exp.company)}" class="w-12 h-12 rounded-2xl object-cover border border-gray-200 bg-white shrink-0" onerror="this.style.display='none'">`
        : `<div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 font-serif font-bold text-lg flex items-center justify-center shrink-0">${initials}</div>`;
      // Foto kegiatan / kantor / bukti kerja — hanya tampil kalau diisi.
      const photos = normPhotos(exp.photos);
      const photosHtml = photos.length ? `
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
          ${photos.map(p => `
            <figure>
              <img class="exp-photo" src="${esc(p.url)}" alt="${esc(p.caption || exp.company)}" loading="lazy" data-lightbox="${esc(p.url)}" data-caption="${esc(p.caption)}" onerror="this.closest('figure').style.display='none'">
              ${p.caption ? `<figcaption class="exp-figcaption">${p.caption}</figcaption>` : ''}
            </figure>`).join('')}
        </div>` : '';
      return `
      <div class="exp-item relative pl-10 pb-10">
        ${i < cfg.experience.length - 1 ? '<span class="exp-line absolute left-[-1px] top-4 bottom-0 w-[2px] bg-gray-200 ml-2"></span>' : ''}
        <span class="exp-dot absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow ml-2"></span>
        <div class="flex items-center gap-4 mb-3">
          ${logoHtml}
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">${exp.period}</p>
            <h3 class="text-xl font-bold text-slate-900">${exp.role}</h3>
            <p class="text-gray-500 font-medium">${exp.company}</p>
          </div>
        </div>
        ${descHtml}
        ${photosHtml}
      </div>
    `;
    }).join('');

    // Scroll-reveal animasi untuk tiap item experience
    const expObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('exp-visible'), idx * 120);
          expObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('#experience-container .exp-item').forEach(item => expObserver.observe(item));
  }

  // Stats
  const statsContainer = document.getElementById('stats-container');
  if (statsContainer) {
    statsContainer.innerHTML = cfg.stats.map(s => {
      const isNumeric = !isNaN(parseFloat(s.value)) && isFinite(s.value);
      return `
      <div class="text-center" data-aos="fade-up">
        <p class="stat-number text-4xl md:text-6xl font-bold font-serif text-slate-900" data-target="${s.value}" data-suffix="${s.suffix || ''}" data-numeric="${isNumeric}">${isNumeric ? '0' : s.value}</p>
        <p class="text-gray-500 mt-2 text-sm uppercase tracking-widest font-semibold">${s.label}</p>
      </div>
    `;
    }).join('');
  }

  // Skills / Tools chips di section Skills
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer && cfg.skills) {
    skillsContainer.innerHTML = cfg.skills.map(sk => `
      <span class="inline-flex items-center gap-2 bg-white border border-gray-200/60 px-4 py-2.5 rounded-full text-sm font-medium text-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
        <i class="fa-solid ${sk.icon} text-indigo-600"></i> ${sk.name}
      </span>
    `).join('');
  }

  /* ============ TAB SECTION WORK (Case Studies / Lab) ============ */
  // Case Studies selalu jadi panel aktif pertama saat halaman dibuka.
  const workTabs = document.querySelectorAll('.work-tab');
  const workPanels = {
    case: document.getElementById('panel-case'),
    lab: document.getElementById('panel-lab')
  };
  if (workTabs.length) {
    workTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        workTabs.forEach(t => {
          const on = t === tab;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        Object.entries(workPanels).forEach(([key, panel]) => {
          if (panel) panel.classList.toggle('is-active', key === target);
        });
        AOS.refresh();
      });
    });
  }

  /* ============ DOCK AUTO-HIDE SAAT SCROLL KE BAWAH ============ */
  // Supaya dock tidak menutupi judul/tanggal di section seperti Experience.
  const dockWrap = document.getElementById('dock-wrap');
  if (dockWrap) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY;
      // Selalu tampil di bagian paling atas halaman
      if (y < 120) {
        dockWrap.classList.remove('dock-hidden');
      } else if (Math.abs(y - lastScrollY) > 6) {
        dockWrap.classList.toggle('dock-hidden', goingDown);
      }
      lastScrollY = y;
    }, { passive: true });
  }

  /* ============ LINK CV ============ */
  const cvLinks = document.querySelectorAll('.js-cv');
  if (cvLinks.length) {
    if (cfg.cvUrl && cfg.cvUrl.trim() !== '') {
      cvLinks.forEach(el => { el.href = cfg.cvUrl; });
    } else {
      // Kalau CV belum diisi, tombolnya disembunyikan — bukan ditampilkan mati.
      cvLinks.forEach(el => { el.style.display = 'none'; });
    }
  }

  /* ============ VIDEO HERO ============ */
  const heroVideo = document.getElementById('hero-video');
  const heroOverlay = document.getElementById('hero-overlay');
  if (heroVideo && cfg.heroVideo && cfg.heroVideo.enabled) {
    const source = document.createElement('source');
    source.src = cfg.heroVideo.src;
    source.type = 'video/mp4';
    heroVideo.appendChild(source);
    heroVideo.load();
    if (heroOverlay) heroOverlay.style.opacity = cfg.heroVideo.overlayOpacity ?? 0.5;
  } else if (heroVideo) {
    heroVideo.style.display = 'none';
  }

  /* ============ SUARA VIDEO HERO ============ */
  // Semua browser modern memblokir video yang autoplay langsung bersuara.
  // Jadi videonya tetap mulai dalam keadaan mute, lalu user bisa menyalakan
  // suaranya lewat tombol ini (satu kali klik = izin dari user).
  const soundToggle = document.getElementById('hero-sound-toggle');
  if (soundToggle && heroVideo && cfg.heroVideo && cfg.heroVideo.enabled) {
    soundToggle.classList.remove('hidden');

    const paintSoundBtn = () => {
      const on = !heroVideo.muted && heroVideo.volume > 0;
      soundToggle.classList.toggle('is-on', on);
      soundToggle.innerHTML = on
        ? '<i class="fa-solid fa-volume-high"></i><span class="hero-sound-label">Matikan suara</span>'
        : '<i class="fa-solid fa-volume-xmark"></i><span class="hero-sound-label">Nyalakan suara</span>';
      soundToggle.setAttribute('aria-label', on ? 'Matikan suara video' : 'Nyalakan suara video');
    };

    heroVideo.volume = cfg.heroVideo.volume ?? 0.6;
    paintSoundBtn();

    soundToggle.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      if (!heroVideo.muted) {
        heroVideo.volume = cfg.heroVideo.volume ?? 0.6;
        // play() dipanggil ulang karena klik user = izin sah untuk audio
        const p = heroVideo.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
      paintSoundBtn();
    });

    // Kalau user scroll jauh dari hero, suaranya otomatis di-mute lagi
    // supaya tidak mengganggu saat membaca section lain.
    window.addEventListener('scroll', () => {
      if (heroVideo.muted) return;
      if (window.scrollY > window.innerHeight * 0.85) {
        heroVideo.muted = true;
        paintSoundBtn();
      }
    });
  }

  /* ============ ANIMASI BUNGA MELAYANG ============ */
  const flowerField = document.getElementById('flower-field');
  if (flowerField && cfg.flowerAnimation && cfg.flowerAnimation.enabled) {
    const { emojis, count } = cfg.flowerAnimation;
    for (let i = 0; i < count; i++) {
      const flower = document.createElement('span');
      flower.className = 'flower';
      flower.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      flower.style.left = Math.random() * 100 + '%';
      flower.style.fontSize = (16 + Math.random() * 14) + 'px';
      flower.style.animationDuration = (10 + Math.random() * 10) + 's';
      flower.style.animationDelay = (Math.random() * 10) + 's';
      flowerField.appendChild(flower);
    }
  }

  /* ============ CUSTOM CURSOR ============ */
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(dot);

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .tilt-card, img').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  /* ============ SCROLL PROGRESS BAR ============ */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = pct + '%';

    // back to top visibility
    const btt = document.getElementById('back-to-top');
    if (btt) {
      btt.style.opacity = scrollTop > 500 ? '1' : '0';
      btt.style.pointerEvents = scrollTop > 500 ? 'auto' : 'none';
    }
  });

  /* ============ DARK MODE TOGGLE ============ */
  const darkToggle = document.getElementById('dark-toggle');
  const applyDarkPref = () => {
    const isDark = window.__darkMode === true;
    document.body.classList.toggle('dark', isDark);
    if (darkToggle) darkToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  };
  window.__darkMode = false;
  applyDarkPref();
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      window.__darkMode = !window.__darkMode;
      applyDarkPref();
    });
  }

  /* ============ BACK TO TOP ============ */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ============ TYPING EFFECT DI HERO ============ */
  const typingEl = document.getElementById('typing-word');
  if (typingEl && cfg.heroWords && cfg.heroWords.length) {
    let wordIndex = 0, charIndex = 0, deleting = false;
    const typeLoop = () => {
      const currentWord = cfg.heroWords[wordIndex];
      if (!deleting) {
        charIndex++;
        typingEl.textContent = currentWord.slice(0, charIndex);
        if (charIndex === currentWord.length) {
          deleting = true;
          setTimeout(typeLoop, 1600);
          return;
        }
      } else {
        charIndex--;
        typingEl.textContent = currentWord.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % cfg.heroWords.length;
        }
      }
      setTimeout(typeLoop, deleting ? 40 : 80);
    };
    typeLoop();
  }

  /* ============ COUNT-UP STATS ON SCROLL ============ */
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const isNumeric = el.dataset.numeric === 'true';
        if (!isNumeric) {
          // value bukan angka (misal "GPA 3.55/4.00"), tampilkan apa adanya tanpa animasi
          statObserver.unobserve(el);
          return;
        }
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 25);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

  /* ============ TILT EFFECT PADA CARD ============ */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(600px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* ============ PROJECT MODAL ============ */
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');

  // Ikon lampiran berdasarkan tipe file
  const attachmentIcon = (type) => {
    const map = {
      pdf: 'fa-file-pdf',
      doc: 'fa-file-word',
      docx: 'fa-file-word',
      sheet: 'fa-file-excel',
      xlsx: 'fa-file-excel',
      image: 'fa-file-image',
      ppt: 'fa-file-powerpoint',
      zip: 'fa-file-zipper'
    };
    return map[(type || '').toLowerCase()] || 'fa-file-lines';
  };

  const attachmentsHtml = (attachments, label = 'Lampiran') => {
    if (!attachments || !attachments.length) return '';
    // Lampiran yang URL-nya belum diisi TIDAK dirender sama sekali.
    // Tombol mati + tooltip internal bikin proyek terkesan belum selesai
    // dan membocorkan catatan developer ke pengunjung.
    const valid = attachments.filter(a => a && a.url && a.url.trim() !== '');
    if (!valid.length) return '';
    return `
      <div class="mb-6">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">${label}</p>
        <div class="flex flex-wrap gap-2.5">
          ${valid.map(a => `
            <a href="${a.url}" target="_blank" rel="noopener" class="attachment-chip">
              <i class="fa-solid ${attachmentIcon(a.type)}"></i> ${a.name}
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-60"></i>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  };

  // Daftar bullet point untuk "Action Taken" / "Business Impact" (dan daftar
  // sejenis lainnya) di dalam modal detail project. accentClass mengatur
  // warna titik bullet-nya (indigo untuk action, emerald untuk impact, dst).
  const bulletListHtml = (label, items, accentClass = 'text-indigo-500') => {
    if (!items || !items.length) return '';
    return `
      <div class="mb-6">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">${label}</p>
        <ul class="space-y-2">
          ${items.map(item => `
            <li class="flex gap-2 text-gray-600 leading-relaxed">
              <span class="${accentClass} mt-1">•</span><span>${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  };

  const openModal = (project) => {
    if (!modal || !modalBody) return;
    const hasDemo = project.demoUrl && project.demoUrl.trim() !== '';
    const metricsHtml = project.metrics && project.metrics.trim() !== ''
      ? `<div class="flex flex-wrap gap-2 mb-6">
          ${project.metrics.split('|').map(m => `<span class="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full">${m.trim()}</span>`).join('')}
        </div>`
      : '';
    const actionsHtml = bulletListHtml('Action Taken', project.actionsTaken, 'text-indigo-500');
    const impactHtml = bulletListHtml('Business Impact', project.businessImpact, 'text-emerald-500');
    modalBody.innerHTML = `
      <img src="${project.image}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 225%22><rect width=%22400%22 height=%22225%22 fill=%22%23e5e7eb%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2216%22 fill=%22%239ca3af%22>Preview belum tersedia</text></svg>';" class="w-full aspect-video object-cover rounded-2xl mb-6" alt="${project.title}">
      <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">${project.category}</span>
      <h3 class="font-serif text-3xl font-bold text-slate-900 mt-4 mb-3">${project.title}</h3>
      <p class="text-gray-600 leading-relaxed mb-6">${project.description}</p>
      ${actionsHtml}
      ${impactHtml}
      ${metricsHtml}
      <div class="flex flex-wrap gap-2 mb-6">
        ${project.tools.split(',').map(t => `<span class="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">${t.trim()}</span>`).join('')}
      </div>
      ${attachmentsHtml(project.attachments)}
      ${hasDemo ? `
        <a href="${project.demoUrl}" target="_blank" rel="noopener" class="btn-premium inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm mb-6">
          Buka Demo Langsung
          <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
        </a>
        <div class="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
          <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b border-gray-200 text-xs text-gray-500">
            <i class="fa-solid fa-eye"></i> Live Preview
          </div>
          <iframe src="${project.demoUrl}" class="w-full h-[420px]" loading="lazy" title="Demo ${project.title}"></iframe>
          <p class="text-xs text-gray-400 px-4 py-2 bg-gray-50">Kalau preview tidak muncul, situsnya kemungkinan memblokir tampilan embed — klik "Buka Demo Langsung" di atas.</p>
        </div>
      ` : ''}
    `;
    modal.classList.remove('hidden-modal');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.add('hidden-modal');
    document.body.style.overflow = '';
  };
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  /* ============ LOAD PROJECTS (Google Sheets atau fallback) ============ */
  const container = document.getElementById('project-container');
  const renderProjects = (projects) => {
    if (!container) return;
    container.innerHTML = '';
    projects.forEach((p, index) => {
      const card = document.createElement('div');
      card.className = 'bg-[#F8F9FA] border border-gray-200/60 rounded-[2rem] overflow-hidden p-6 space-y-6 tilt-card cursor-pointer';
      card.setAttribute('data-aos', 'fade-up');
      const metricsHtml = p.metrics && p.metrics.trim() !== ''
        ? `<div class="flex flex-wrap gap-2 pt-1">
            ${p.metrics.split('|').map(m => `<span class="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full">${m.trim()}</span>`).join('')}
          </div>`
        : '';
      card.innerHTML = `
        <div class="relative rounded-2xl overflow-hidden aspect-video bg-gray-100 group">
          <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 225%22><rect width=%22400%22 height=%22225%22 fill=%22%23e5e7eb%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2216%22 fill=%22%239ca3af%22>Preview belum tersedia</text></svg>';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          ${p.demoUrl && p.demoUrl.trim() !== '' ? `
            <span class="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Live Demo
            </span>
          ` : ''}
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="bg-white/90 text-black px-5 py-2.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">View Project</span>
          </div>
        </div>
        <div class="space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">${p.category}</span>
          <h3 class="font-serif text-3xl font-bold text-slate-900">${p.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed line-clamp-3">${p.description}</p>
          ${metricsHtml}
          <div class="pt-4 border-t border-gray-200 flex flex-wrap gap-2 items-center">
            <span class="text-xs text-gray-400 font-semibold uppercase tracking-wider">Tools:</span>
            ${p.tools.split(',').map(tool => `<span class="text-xs bg-white text-gray-600 px-3 py-1 rounded-full border border-gray-200">${tool.trim()}</span>`).join('')}
          </div>
        </div>
      `;
      card.addEventListener('click', () => openModal(p));
      container.appendChild(card);
    });
    AOS.refresh();
    // re-observe tilt on new cards
    container.querySelectorAll('.tilt-card').forEach(cardEl => {
      cardEl.addEventListener('mousemove', (e) => {
        const rect = cardEl.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        cardEl.style.transform = `perspective(600px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) translateY(-4px)`;
      });
      cardEl.addEventListener('mouseleave', () => {
        cardEl.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  };

  const useFallback = () => renderProjects(cfg.fallbackProjects);

  if (!cfg.spreadsheetId || cfg.spreadsheetId.includes('MASUKKAN')) {
    useFallback();
  } else {
    const jsonUrl = `https://docs.google.com/spreadsheets/d/${cfg.spreadsheetId}/gviz/tq?tqx=out:json`;
    fetch(jsonUrl)
      .then(res => res.text())
      .then(data => {
        const temp = data.substr(47).slice(0, -2);
        const json = JSON.parse(temp);
        const rows = json.table.rows;
        const projects = rows.map(row => ({
          title: row.c[0] ? row.c[0].v : 'Untitled Project',
          category: row.c[1] ? row.c[1].v : 'Development',
          description: row.c[2] ? row.c[2].v : '',
          tools: row.c[3] ? row.c[3].v : '',
          image: row.c[4] ? row.c[4].v : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
          demoUrl: row.c[5] ? row.c[5].v : '',
          metrics: row.c[6] ? row.c[6].v : ''
        }));
        renderProjects(projects.length ? projects : cfg.fallbackProjects);
      })
      .catch(err => {
        console.error(err);
        useFallback();
      });
  }

  /* ============ SERTIFIKAT KURSUS ============ */
  // Section #certificates tersembunyi (class "hidden") dan baru ditampilkan
  // kalau ada minimal satu sertifikat bertitle di config.js.
  const certSection = document.getElementById('certificates');
  const certContainer = document.getElementById('certificates-container');
  if (certSection && certContainer) {
    const certs = (cfg.certificates || []).filter(c => c && c.title && c.title.trim() !== '');
    if (certs.length) {
      certContainer.innerHTML = certs.map((c, i) => {
        const hasUrl = c.url && c.url.trim() !== '';
        const meta = [c.issuer, c.date].filter(v => v && String(v).trim() !== '').join(' · ');
        return `
          <div class="bg-[#F8F9FA] border border-gray-200/60 rounded-3xl p-7 flex flex-col gap-4" data-aos="fade-up" data-aos-delay="${(i % 2) * 100}">
            <div class="flex items-start gap-4">
              <div class="shrink-0 w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">
                <i class="fa-solid fa-award"></i>
              </div>
              <div class="min-w-0">
                <h3 class="font-serif text-xl font-bold text-slate-900 leading-snug">${c.title}</h3>
                ${meta ? `<p class="text-xs font-semibold uppercase tracking-wider text-indigo-600 mt-1">${meta}</p>` : ''}
              </div>
            </div>
            ${c.description && c.description.trim() !== '' ? `<p class="text-gray-600 text-sm leading-relaxed">${c.description}</p>` : ''}
            ${hasUrl ? `
              <div class="pt-1">
                <a href="${c.url}" target="_blank" rel="noopener" class="attachment-chip">
                  <i class="fa-solid fa-file-pdf"></i> Lihat Sertifikat
                  <i class="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-60"></i>
                </a>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
      certSection.classList.remove('hidden');
      AOS.refresh();
    }
  }

  /* ============ EMBED VIDEO UNTUK LAB ============ */
  // Mengubah link video biasa jadi pemutar yang bisa langsung ditonton di
  // dalam modal. Mengembalikan '' kalau link kosong, supaya bagian video
  // tidak tampil sama sekali.
  const labVideoHtml = (rawUrl, title) => {
    const url = (rawUrl || '').trim();
    if (!url) return '';
    const frame = (src) => `
      <div class="mb-6">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Video Pengerjaan</p>
        <div class="lab-video rounded-2xl overflow-hidden border border-gray-200 bg-black aspect-video">
          <iframe src="${src}" class="w-full h-full" title="Video ${title}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>
        </div>
      </div>`;
    let m;
    // YouTube (watch?v=, youtu.be, shorts, embed)
    if ((m = url.match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/))) {
      return frame(`https://www.youtube.com/embed/${m[1]}?rel=0`);
    }
    // Google Drive (.../file/d/ID/view -> .../preview)
    if ((m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/))) {
      return frame(`https://drive.google.com/file/d/${m[1]}/preview`);
    }
    // Loom
    if ((m = url.match(/loom\.com\/(?:share|embed)\/(\w+)/))) {
      return frame(`https://www.loom.com/embed/${m[1]}`);
    }
    // File video langsung (mis. "video/sql-demo.mp4" di repo)
    if (/\.(mp4|webm|ogv|mov)(\?.*)?$/i.test(url)) {
      return `
        <div class="mb-6">
          <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Video Pengerjaan</p>
          <div class="lab-video rounded-2xl overflow-hidden border border-gray-200 bg-black">
            <video src="${url}" class="w-full" controls preload="metadata" playsinline></video>
          </div>
        </div>`;
    }
    // Format lain: tampilkan sebagai tombol link biasa
    return `
      <div class="mb-6">
        <a href="${url}" target="_blank" rel="noopener" class="attachment-chip">
          <i class="fa-solid fa-circle-play"></i> Tonton Video Pengerjaan
          <i class="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-60"></i>
        </a>
      </div>`;
  };

  /* ============ CASE STUDY (data dari cfg.skillLab) ============ */
  // Kartu depan dibuat mirip kartu Real Project (gambar, kategori, judul,
  // metrik, tools). Isi lengkapnya muncul di modal: video, screenshot,
  // presentasi/PDF yang bisa langsung dibuka, dan tombol demo (boleh banyak).
  const csContainer = document.getElementById('casestudy-container');
  const labModal = document.getElementById('lab-modal');
  const labModalBody = document.getElementById('lab-modal-body');

  const validLinks = (list) => (list || [])
    .filter(x => x && typeof x.url === 'string' && x.url.trim() !== '');

  // Gabungkan field lama (demoUrl, pdfs) dengan field baru (demos, docs)
  // supaya config lama tetap jalan.
  const normalizeCase = (item) => {
    const demos = validLinks(item.demos);
    if (item.demoUrl && item.demoUrl.trim() !== '') {
      demos.push({ name: item.demoLabel && item.demoLabel.trim() !== '' ? item.demoLabel : 'Buka Demo / Repo', url: item.demoUrl });
    }
    const docs = [...validLinks(item.docs), ...validLinks(item.pdfs)];
    // Demo yang bisa ditampilkan langsung (Google Sheets/Slides/Docs, Looker Studio)
    // ikut masuk ke viewer di modal, jadi pengunjung bisa mencoba tanpa pindah tab.
    const liveRe = /docs\.google\.com\/(spreadsheets|presentation|document)|(lookerstudio|datastudio)\.google\.com\/reporting/;
    const seen = new Set(docs.map(d => d.url));
    const viewer = [...docs, ...demos.filter(d => (liveRe.test(d.url) || FILE_RE.test(d.url)) && !seen.has(d.url))];
    // Isi kartu depan: previewUrl (manual) -> dokumen pertama -> demo live pertama.
    const previewSrc = toEmbedUrl(item.previewUrl) || (viewer[0] ? toEmbedUrl(viewer[0].url) : '');
    return {
      ...item,
      demos,
      docs,
      viewer,
      previewSrc,
      group: (item.group && item.group.trim() !== '') ? item.group.trim() : ((item.category || '').trim() || 'Lainnya'),
      shots: normPhotos(item.screenshots),
      hasVideo: !!(item.videoUrl && item.videoUrl.trim() !== '')
    };
  };

  const docIcon = (d) => {
    const u = (d.url || '').toLowerCase();
    if (d.type === 'ppt' || /\.pptx?(\?|$)|presentation/.test(u)) return 'fa-file-powerpoint';
    if (d.type === 'sheet' || /\.xlsx?(\?|$)|spreadsheets/.test(u)) return 'fa-file-excel';
    if (/lookerstudio|datastudio|powerbi/.test(u)) return 'fa-chart-pie';
    return 'fa-file-pdf';
  };

  if (csContainer && cfg.skillLab && cfg.skillLab.length) {
    const cases = cfg.skillLab.filter(i => i && i.title && i.title.trim() !== '').map(normalizeCase);

    const openLabModal = (item) => {
      if (!labModal || !labModalBody) return;
      const toolsHtml = (item.tools || '').split(',').filter(t => t.trim() !== '')
        .map(t => `<span class="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">${t.trim()}</span>`).join('');
      const metricsHtml = item.metrics && item.metrics.trim() !== ''
        ? `<div class="flex flex-wrap gap-2 mb-6">${item.metrics.split('|').map(m => `<span class="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full">${m.trim()}</span>`).join('')}</div>`
        : '';
      const coverHtml = item.image && item.image.trim() !== ''
        ? `<img src="${esc(imgUrl(item.image))}" loading="lazy" ${IMG_ONERROR} class="w-full aspect-video object-cover rounded-2xl mb-6" alt="${esc(item.title)}">`
        : '';
      const shotsHtml = item.shots.length ? `
        <div class="mb-6">
          <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Tampilan Dashboard</p>
          <div class="shot-grid">
            ${item.shots.map(p => `<img src="${esc(p.url)}" alt="${esc(p.caption || item.title)}" loading="lazy" data-lightbox="${esc(p.url)}" data-caption="${esc(p.caption)}" onerror="this.style.display='none'">`).join('')}
          </div>
          <p class="text-xs text-gray-400 mt-2">Klik gambar untuk memperbesar.</p>
        </div>` : '';
      const docsHtml = item.viewer.length ? `
        <div class="mb-6" data-doc-viewer>
          <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Presentasi & Dokumen</p>
          ${item.viewer.length > 1 ? `
            <div class="flex flex-wrap gap-2 mb-3">
              ${item.viewer.map((d, i) => `<button type="button" class="attachment-chip" data-doc-idx="${i}"><i class="fa-solid ${docIcon(d)}"></i> ${d.name || 'Dokumen ' + (i + 1)}</button>`).join('')}
            </div>` : ''}
          <div class="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            <iframe data-doc-frame class="w-full h-[440px] md:h-[520px]" loading="lazy" title="Dokumen ${esc(item.title)}" allowfullscreen></iframe>
            <p data-doc-note class="hidden text-sm text-gray-500 p-6 text-center">Pratinjau tidak tersedia untuk file ini — gunakan tombol di bawah untuk membukanya.</p>
          </div>
          <div class="flex flex-wrap gap-2 mt-3">
            <a data-doc-open target="_blank" rel="noopener" class="attachment-chip">
              <i class="fa-solid fa-up-right-from-square"></i> Buka layar penuh di tab baru
            </a>
            <a data-doc-download download class="attachment-chip hidden">
              <i class="fa-solid fa-download"></i> Download file
            </a>
          </div>
        </div>` : '';
      const demosHtml = item.demos.length ? `
        <div class="mb-2">
          <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Demo</p>
          <div class="flex flex-wrap gap-3">
            ${item.demos.map((d, i) => `
              <a href="${esc(d.url)}" target="_blank" rel="noopener" class="${i === 0 ? 'btn-premium' : 'btn-secondary'} inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm">
                <i class="fa-solid ${docIcon(d)}"></i> ${d.name || 'Buka Demo'}
                <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </a>`).join('')}
          </div>
        </div>` : '';

      labModalBody.innerHTML = `
        ${coverHtml}
        <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">${item.category || ''}</span>
        <h3 class="font-serif text-3xl font-bold text-slate-900 mt-4 mb-3">${item.title}</h3>
        <p class="text-gray-600 leading-relaxed mb-6">${item.description || ''}</p>
        ${bulletListHtml('Action Taken', item.actionsTaken, 'text-indigo-500')}
        ${bulletListHtml('Business Impact', item.businessImpact, 'text-emerald-500')}
        ${metricsHtml}
        ${toolsHtml ? `<div class="flex flex-wrap gap-2 mb-6">${toolsHtml}</div>` : ''}
        ${labVideoHtml(item.videoUrl, item.title)}
        ${shotsHtml}
        ${docsHtml}
        ${demosHtml}
      `;

      // Viewer presentasi/PDF: ganti dokumen lewat chip, tampilkan di iframe
      const viewer = labModalBody.querySelector('[data-doc-viewer]');
      if (viewer) {
        const frame = viewer.querySelector('[data-doc-frame]');
        const note = viewer.querySelector('[data-doc-note]');
        const openLink = viewer.querySelector('[data-doc-open]');
        const dlLink = viewer.querySelector('[data-doc-download]');
        const chips = [...viewer.querySelectorAll('[data-doc-idx]')];
        const show = (i) => {
          const d = item.viewer[i];
          const embed = toEmbedUrl(d.url);
          chips.forEach((c, ci) => c.classList.toggle('is-active', ci === i));
          openLink.href = d.url;
          dlLink.href = githubRaw(d.url);
          dlLink.classList.toggle('hidden', !FILE_RE.test(d.url));
          if (embed) {
            frame.classList.remove('hidden'); note.classList.add('hidden'); frame.src = embed;
          } else {
            frame.classList.add('hidden'); frame.src = 'about:blank'; note.classList.remove('hidden');
          }
        };
        chips.forEach(c => c.addEventListener('click', () => show(Number(c.dataset.docIdx))));
        show(0);
      }

      labModal.querySelector('.modal-box').scrollTop = 0;
      labModal.classList.remove('hidden-modal');
      document.body.style.overflow = 'hidden';
    };

    const closeLabModal = () => {
      if (!labModal) return;
      labModal.classList.add('hidden-modal');
      document.body.style.overflow = '';
      // Hentikan video/dokumen supaya suaranya tidak lanjut setelah modal ditutup.
      if (labModalBody) {
        labModalBody.querySelectorAll('video').forEach(v => v.pause());
        labModalBody.querySelectorAll('iframe').forEach(f => { f.src = 'about:blank'; });
      }
    };
    document.getElementById('lab-modal-close')?.addEventListener('click', closeLabModal);
    labModal?.addEventListener('click', (e) => { if (e.target === labModal) closeLabModal(); });

    // Kartu depan — gaya sama dengan kartu Real Project
    cases.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'bg-[#F8F9FA] border border-gray-200/60 rounded-[2rem] overflow-hidden p-6 space-y-6 tilt-card cursor-pointer';
      card.setAttribute('data-aos', 'fade-up');
      card.dataset.group = item.group;
      const hasImage = item.image && item.image.trim() !== '';
      const badges = [
        item.demos.length ? '<span class="cs-badge is-live"><i class="fa-solid fa-bolt"></i> Live Demo</span>' : '',
        item.hasVideo ? '<span class="cs-badge"><i class="fa-solid fa-circle-play"></i> Video</span>' : '',
        item.docs.length ? '<span class="cs-badge"><i class="fa-solid fa-file-lines"></i> PDF / PPT</span>' : ''
      ].join('');
      const metricsHtml = item.metrics && item.metrics.trim() !== ''
        ? `<div class="flex flex-wrap gap-2 pt-1">${item.metrics.split('|').map(m => `<span class="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full">${m.trim()}</span>`).join('')}</div>`
        : '';
      const toolsHtml = (item.tools || '').split(',').filter(t => t.trim() !== '')
        .map(t => `<span class="text-xs bg-white text-gray-600 px-3 py-1 rounded-full border border-gray-200">${t.trim()}</span>`).join('');
      card.innerHTML = `
        <div class="relative rounded-2xl overflow-hidden aspect-video bg-gray-100 group">
          ${item.previewSrc
            ? `<div class="cs-preview"><iframe src="${esc(item.previewSrc)}" loading="lazy" tabindex="-1" scrolling="no" title="Preview ${esc(item.title)}"></iframe></div>`
            : hasImage
            ? `<img src="${esc(imgUrl(item.image))}" alt="${esc(item.title)}" loading="lazy" ${IMG_ONERROR} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">`
            : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-400 text-6xl group-hover:scale-105 transition-transform duration-500"><i class="fa-solid ${item.icon || 'fa-chart-simple'}"></i></div>`}
          ${badges ? `<div class="cs-badges">${badges}</div>` : ''}
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="bg-white/90 text-black px-5 py-2.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">View Case Study</span>
          </div>
        </div>
        <div class="space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">${item.category || ''}</span>
          <h3 class="font-serif text-3xl font-bold text-slate-900">${item.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed line-clamp-3">${item.description || ''}</p>
          ${metricsHtml}
          ${toolsHtml ? `<div class="pt-4 border-t border-gray-200 flex flex-wrap gap-2 items-center"><span class="text-xs text-gray-400 font-semibold uppercase tracking-wider">Tools:</span>${toolsHtml}</div>` : ''}
        </div>
      `;
      card.addEventListener('click', () => openLabModal(item));
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(600px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
      });
      csContainer.appendChild(card);
    });

    // Ajakan ke repo GitHub berisi file asli (dataset, .pbix, .xlsx, .pptx)
    const repoWrap = document.getElementById('casestudy-repo');
    const repo = cfg.caseStudyRepo || {};
    if (repoWrap) {
      if (repo.url && repo.url.trim() !== '') {
        repoWrap.innerHTML = `
          <a href="${esc(repo.url)}" target="_blank" rel="noopener" class="attachment-chip">
            <i class="fa-brands fa-github"></i> ${repo.label || 'Lihat semua file & dataset di GitHub'}
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-60"></i>
          </a>
          ${repo.note ? `<span class="text-xs text-gray-400">${repo.note}</span>` : ''}`;
      } else {
        repoWrap.remove();
      }
    }

    // Filter per kelompok tools (Excel, Power BI & Looker, App Script, SQL, ...).
    // Urutan tombol mengikuti cfg.caseStudyGroups; kelompok tanpa isi tidak ditampilkan.
    const filterWrap = document.getElementById('casestudy-filters');
    if (filterWrap) {
      const used = [...new Set(cases.map(c => c.group))];
      const order = (cfg.caseStudyGroups || []).filter(g => used.includes(g));
      const groups = [...order, ...used.filter(g => !order.includes(g))];
      if (groups.length > 1) {
        const cards = [...csContainer.children];
        const apply = (g) => {
          filterWrap.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('is-active', b.dataset.filter === g));
          cards.forEach(c => c.classList.toggle('hidden', g !== '*' && c.dataset.group !== g));
          AOS.refresh();
        };
        const count = (g) => cases.filter(c => c.group === g).length;
        filterWrap.innerHTML =
          `<button type="button" class="attachment-chip is-active" data-filter="*">Semua <span class="opacity-60">${cases.length}</span></button>` +
          groups.map(g => `<button type="button" class="attachment-chip" data-filter="${esc(g)}">${g} <span class="opacity-60">${count(g)}</span></button>`).join('');
        filterWrap.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => apply(b.dataset.filter)));
      } else {
        filterWrap.remove();
      }
    }
    AOS.refresh();
  }

  /* ============ FORM KONTAK (terkirim langsung ke email) ============ */
  // Memakai layanan gratis FormSubmit (formsubmit.co): pesan dikirim ke
  // email di config.js. Pertama kali ada pesan masuk, FormSubmit mengirim
  // email konfirmasi ke kamu — klik "Activate" sekali, setelahnya otomatis.
  const contactWrap = document.getElementById('contact-form-wrap');
  const contactForm = document.getElementById('contact-form');
  const cf = cfg.contactForm || {};
  const cfTo = (cf.to && cf.to.trim() !== '') ? cf.to.trim() : cfg.email;
  if (contactWrap && contactForm) {
    if (cf.enabled === false || !cfTo) {
      contactWrap.remove();
    } else {
      const statusEl = document.getElementById('contact-status');
      const btn = contactForm.querySelector('button[type="submit"]');
      const setStatus = (msg, ok) => {
        statusEl.textContent = msg;
        statusEl.className = 'text-sm mt-4 ' + (ok ? 'text-emerald-600' : 'text-red-500');
      };
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(contactForm);
        if (fd.get('_honey')) return;                       // bot: abaikan
        btn.disabled = true;
        const label = btn.innerHTML;
        btn.textContent = 'Mengirim...';
        try {
          const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(cfTo)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              name: fd.get('name'),
              email: fd.get('email'),
              message: fd.get('message'),
              _subject: cf.subject || 'Pesan baru dari portofolio',
              _template: 'table',
              _captcha: 'false'
            })
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok || data.success === 'false' || data.success === false) throw new Error(data.message || 'gagal');
          contactForm.reset();
          setStatus('Terima kasih! Pesanmu sudah terkirim — aku akan segera membalas.', true);
        } catch (err) {
          setStatus('Pesan belum terkirim. Coba lagi, atau kirim langsung ke ' + cfTo + '.', false);
        } finally {
          btn.disabled = false;
          btn.innerHTML = label;
        }
      });
    }
  }

  /* ============ MASKOT KUCING — IKUT ARAH KURSOR ============ */
  // Badan kucing sedikit berputar (tilt) mengikuti posisi kursor di layar,
  // dan bola matanya ikut melirik ke arah kursor seperti sedang menatap.
  const catMascotEl = document.getElementById('cat-mascot');
  const catRotateGroup = document.getElementById('cat-rotate-group');
  const catHeadTilt = document.getElementById('cat-head-tilt');
  const catPupils = document.querySelectorAll('.cat-pupil');

  if (catMascotEl && catRotateGroup && catPupils.length) {
    let lastMouseEvent = null;
    let catTicking = false;

    const updateCatLook = () => {
      catTicking = false;
      if (!lastMouseEvent) return;

      const rect = catMascotEl.getBoundingClientRect();
      // Kalau maskot lagi disembunyikan (misal di layar sempit), rect-nya 0 — skip.
      if (rect.width === 0 && rect.height === 0) return;

      const catCenterX = rect.left + rect.width / 2;
      const catCenterY = rect.top + rect.height * 0.35; // kira-kira posisi kepala
      const dx = lastMouseEvent.clientX - catCenterX;
      const dy = lastMouseEvent.clientY - catCenterY;

      // Badan berputar sedikit ke arah kursor, dibatasi supaya tetap lucu (tidak muter penuh)
      const tilt = Math.max(-14, Math.min(14, dx / 40));
      catRotateGroup.style.transform = `rotate(${tilt}deg)`;

      // Kepala menoleh lebih jauh dari badan + ikut naik-turun sedikit,
      // jadi terasa seperti kucing benaran yang memiringkan kepala penasaran.
      if (catHeadTilt) {
        const headTilt = Math.max(-18, Math.min(18, dx / 22));
        const headShiftY = Math.max(-5, Math.min(5, dy / 30));
        catHeadTilt.style.transform = `rotate(${headTilt}deg) translateY(${headShiftY}px)`;
      }

      // Bola mata melirik ke arah kursor di dalam kelopak matanya
      const dist = Math.hypot(dx, dy) || 1;
      const maxPupilShift = 4.5;
      const px = (dx / dist) * maxPupilShift;
      const py = (dy / dist) * maxPupilShift;
      catPupils.forEach(p => { p.style.transform = `translate(${px}px, ${py}px)`; });
    };

    window.addEventListener('mousemove', (e) => {
      lastMouseEvent = e;
      if (!catTicking) {
        catTicking = true;
        requestAnimationFrame(updateCatLook);
      }
    });
  }
});
