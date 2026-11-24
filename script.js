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

  // ---- Peta konteks: Experience / Academic / Organization ----
  // Dipakai untuk menyambungkan Real Project ("madeAt" di config.js) ke
  // pengalaman tempat project itu dibuat, dan sebaliknya.
  const contexts = [];
  [['exp', 'experience', cfg.experience], ['acad', 'academic', cfg.academics], ['org', 'organization', cfg.organizations]]
    .forEach(([prefix, kind, list]) => (list || []).forEach((x, i) => {
      if (!x) return;
      contexts.push({
        id: `${prefix}-${i}`, kind,
        name: x.company || x.organization || x.institution || '',
        period: x.period || ''
      });
    }));
  const findCtx = (madeAt) => {
    const q = (madeAt || '').trim().toLowerCase();
    if (!q) return null;
    return contexts.find(c => c.name && c.name.toLowerCase().includes(q))
        || contexts.find(c => c.name && q.includes(c.name.toLowerCase()))
        || null;
  };
  const ctxIcon = { experience: 'fa-briefcase', academic: 'fa-graduation-cap', organization: 'fa-people-group' };
  // Lencana "Dibuat di ... · periode" (link ke timeline kalau konteksnya ketemu)
  const ctxBadgeHtml = (p) => {
    const name = (p.madeAt || '').trim();
    if (!name) return '';
    const ctx = findCtx(name);
    const period = (p.madeAtPeriod && p.madeAtPeriod.trim() !== '') ? p.madeAtPeriod : (ctx ? ctx.period : '');
    const inner = `<i class="fa-solid ${ctx ? ctxIcon[ctx.kind] : 'fa-location-dot'}"></i><span>Dibuat di ${name}${period ? ` <span class="ctx-period">· ${period}</span>` : ''}</span>${ctx ? '<i class="fa-solid fa-arrow-down text-[10px] opacity-60"></i>' : ''}`;
    return ctx
      ? `<a href="#ctx-${ctx.id}" data-ctx-link="${ctx.id}" class="ctx-badge" title="Lihat pengalamannya">${inner}</a>`
      : `<span class="ctx-badge">${inner}</span>`;
  };
  const gotoCtx = (id) => {
    if (typeof closeModal === 'function') closeModal();
    const el = document.getElementById('ctx-' + id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.remove('ctx-flash'); void el.offsetWidth; el.classList.add('ctx-flash');
  };
  const bindCtxLinks = (root) => root.querySelectorAll('[data-ctx-link]').forEach(a =>
    a.addEventListener('click', (ev) => { ev.preventDefault(); ev.stopPropagation(); gotoCtx(a.dataset.ctxLink); }));
  // Chip project di timeline -> buka detail project
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-project]');
    if (btn && typeof openModal === 'function') openModal(cfg.fallbackProjects[Number(btn.dataset.openProject)]);
  });

  // Timeline (dipakai untuk Experience kerja, Academic, dan Organization — semua dari config.js)
  const renderTimeline = (container, list, prefix = 'exp') => {
    if (!container || !list || !list.length) return false;
    const valid = (x) => x && (x.role || x.degree || x.company || x.organization || x.institution);
    if (!list.some(valid)) return false;
    container.innerHTML = list.map((exp, i) => {
      if (!valid(exp)) return '';
      exp = { ...exp };
      exp.role = exp.role || exp.degree || '';
      exp.company = exp.company || exp.organization || exp.institution || '';
      exp.description = exp.description || '';
      const ctxId = `${prefix}-${i}`;
      const descHtml = exp.description.trim() !== ''
        ? `<ul class="space-y-2 mt-2">${exp.description.split('\n').filter(l => l.trim() !== '').map((line, li) => `
            <li class="flex gap-2 text-gray-600 leading-relaxed" style="animation-delay:${0.3 + li * 0.12}s"><span class="text-indigo-500 mt-1">•</span><span>${line.trim()}</span></li>
          `).join('')}</ul>`
        : '';
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
      // Project yang dibuat di sini (otomatis dari "madeAt" tiap Real Project)
      const related = (cfg.fallbackProjects || [])
        .map((p, pi) => ({ p, pi }))
        .filter(({ p }) => { const c = findCtx(p.madeAt); return c && c.id === ctxId; });
      const relatedHtml = related.length ? `
        <div class="mt-5 flex flex-wrap items-center gap-2">
          <span class="text-xs font-bold uppercase tracking-widest text-gray-400">Project dari sini</span>
          ${related.map(({ p, pi }) => `<button type="button" class="attachment-chip" data-open-project="${pi}"><i class="fa-solid fa-folder-open"></i> ${p.title}</button>`).join('')}
        </div>` : '';
      return `
      <div id="ctx-${ctxId}" class="exp-item relative pl-10 pb-10">
        ${i < list.length - 1 ? '<span class="exp-line absolute left-[-1px] top-4 bottom-0 w-[2px] bg-gray-200 ml-2"></span>' : ''}
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
        ${relatedHtml}
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
    container.querySelectorAll('.exp-item').forEach(item => expObserver.observe(item));
    return true;
  };

  renderTimeline(document.getElementById('experience-container'), cfg.experience, 'exp');

  // Akademik: blok ini otomatis tersembunyi kalau cfg.academics kosong
  const acadBlock = document.getElementById('academic-block');
  if (acadBlock && renderTimeline(document.getElementById('academic-container'), cfg.academics, 'acad')) {
    acadBlock.classList.remove('hidden');
  }

  // Pengalaman organisasi: blok ini otomatis tersembunyi kalau cfg.organizations kosong
  const orgBlock = document.getElementById('organization-block');
  if (orgBlock) {
    if (renderTimeline(document.getElementById('organization-container'), cfg.organizations, 'org')) {
      orgBlock.classList.remove('hidden');
    }
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

  // Skills / Tools chips (dengan logo) + kelompok skill
  const SKILL_LOGOS = {"googlesheets": "<svg viewBox=\"0 0 24 24\" fill=\"#34A853\"><path d=\"M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z\"/></svg>", "googleappsscript": "<svg viewBox=\"0 0 24 24\" fill=\"#4285F4\"><path d=\"M12.363 2.54a3.136 3.136 0 0 0-.376.022 2.864 2.864 0 0 0-1.589.828c-.562.58-.82 1.115-.773 1.943-.01.264.193 1.023.272 1.274 1.115 3.546 2.09 6.75 3.26 10.279.08.246.168.486.267.72.02.047.035.046.048-.004.077-.297.174-.612.29-.945.894-2.576 1.772-5.14 2.633-7.696a.345.345 0 0 0 .004-.217 163.054 163.054 0 0 0-1.49-4.572 2.603 2.603 0 0 0-.704-.933c-.55-.46-1.166-.694-1.842-.7Zm9.078.117a2.734 2.734 0 0 0-2.878 1.828l-4.576 13.289a2.734 2.734 0 0 0 1.695 3.475l.12.04a2.734 2.734 0 0 0 3.475-1.694L23.85 6.307a2.734 2.734 0 0 0-1.695-3.476c-.233-.1-.506-.124-.716-.174ZM12.375 3.96a1.396 1.396 0 1 1 0 2.791 1.395 1.395 0 0 1 0-2.79zm8.809.07a1.402 1.402 0 1 1 0 2.803 1.402 1.402 0 0 1 0-2.803zM5.419 7.605a2.853 2.853 0 0 0-.468.052 2.683 2.683 0 0 0-1.337.627 2.62 2.62 0 0 0-.924 1.833 3.808 3.808 0 0 0 0 .648 2.52 2.52 0 0 0 .673 1.52c.221.238.465.454.732.648 3.043 2.21 6.08 4.43 9.108 6.664a.78.78 0 0 0 .158.089c.03-.043.032-.098.007-.167a17.409 17.409 0 0 0-.317-1.066 532.752 532.752 0 0 1-2.02-6.251 41.91 41.91 0 0 0-.497-1.477c-.967-.849-2.078-1.6-3.023-2.302A3.848 3.848 0 0 0 6.153 7.7a2.388 2.388 0 0 0-.734-.094Zm.02 1.424a1.398 1.398 0 1 1 0 2.796 1.398 1.398 0 0 1 0-2.796zm-2.458 6.792c-.733-.006-1.375.202-1.927.622a2.72 2.72 0 0 0-.95 1.45 2.78 2.78 0 0 0-.09 1.04 2.74 2.74 0 0 0 .695 1.583c.664.578 1.26.85 2 .945 1.42-.005 2.84-.012 4.262-.02h.418c2.277-.003 4.513-.002 6.706.003.148.005.28.003.392-.01.06-.005.091-.031.092-.077a10.656 10.656 0 0 0-.834-.653 488.746 488.746 0 0 1-6.57-4.815.236.236 0 0 0-.14-.047c-1.34-.003-2.691-.01-4.054-.02zm-.19 1.418a1.402 1.402 0 1 1 0 2.803 1.402 1.402 0 0 1 0-2.803zm13.874.002a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z\"/></svg>", "looker": "<svg viewBox=\"0 0 24 24\" fill=\"#4285F4\"><path d=\"M11.9475 0c-1.1598.0021-2.0982.944-2.096 2.1038a2.1 2.1 0 00.356 1.166l.895-.8959a.884.884 0 11.565.564l-.895.895c.9593.6478 2.2621.3953 2.91-.564.6478-.9593.3953-2.262-.564-2.91A2.096 2.096 0 0011.9475 0zm-.835 6.1128a3.2629 3.2629 0 00-.653-1.965l-1.164 1.162a1.667 1.667 0 01-.318 2.012l.632 1.5449a3.2819 3.2819 0 001.503-2.754zm-3.2499 1.666h-.03c-.9217.0009-1.6697-.7455-1.6707-1.6673-.001-.9217.7454-1.6697 1.6672-1.6707a1.669 1.669 0 01.9195.275l1.152-1.152c-1.4069-1.141-3.4724-.9257-4.6135.4811s-.9257 3.4723.481 4.6135a3.2799 3.2799 0 002.7275.6652l-.633-1.5439v-.001zm4.1279 1.3359c-.728 0-1.452.106-2.15.315l.922 2.2519c2.6872-.6819 5.4184.9438 6.1002 3.631.6818 2.6873-.9439 5.4184-3.6311 6.1002s-5.4184-.9439-6.1002-3.631c-.5682-2.2394.4655-4.5774 2.5041-5.6643l-.91-2.2449c-3.6908 1.808-5.2173 6.2657-3.4093 9.9567l.0005.001c1.808 3.6909 6.2657 5.2173 9.9567 3.4093l.001-.0005c3.6913-1.8071 5.2187-6.2645 3.4116-9.9558a7.4417 7.4417 0 00-6.6865-4.1696h-.008l-.001.001z\"/></svg>", "qgis": "<svg viewBox=\"0 0 24 24\" fill=\"#589632\"><path d=\"M12.879 13.006v3.65l-3.004-3.048v-3.495h3.582l2.852 2.893h-3.43zm10.886 7.606V24h-3.654l-5.73-5.9v-3.55h3.354l6.03 6.062zm-10.828-1.448l3.372 3.371c-1.309.442-2.557.726-4.325.726C5.136 23.26 0 18.243 0 11.565 0 4.92 5.136 0 11.984 0 18.864 0 24 4.952 24 11.565c0 2.12-.523 4.076-1.457 5.759l-3.625-3.725a8.393 8.393 0 0 0 .24-2.005c0-4.291-3.148-7.527-7.1-7.527-3.954 0-7.248 3.236-7.248 7.527s3.33 7.6 7.247 7.6c.548 0 .661.017.88-.03z\"/></svg>", "python": "<svg viewBox=\"0 0 24 24\" fill=\"#3776AB\"><path d=\"M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z\"/></svg>", "laravel": "<svg viewBox=\"0 0 24 24\" fill=\"#FF2D20\"><path d=\"M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z\"/></svg>", "github": "<svg viewBox=\"0 0 24 24\" fill=\"#181717\"><path d=\"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\"/></svg>", "gmail": "<svg viewBox=\"0 0 24 24\" fill=\"#EA4335\"><path d=\"M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z\"/></svg>", "mysql": "<svg viewBox=\"0 0 24 24\" fill=\"#4479A1\"><path d=\"M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z\"/></svg>", "sql": "<svg viewBox=\"0 0 24 24\" fill=\"#336791\"><path d=\"M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z\"/></svg>", "excel": "<svg viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"18\" rx=\"3\" fill=\"#217346\"/><path d=\"M7.5 8l4 8m0-8l-4 8\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/><rect x=\"14\" y=\"8\" width=\"5\" height=\"2\" fill=\"#fff\" opacity=\".8\"/><rect x=\"14\" y=\"11\" width=\"5\" height=\"2\" fill=\"#fff\" opacity=\".8\"/><rect x=\"14\" y=\"14\" width=\"5\" height=\"2\" fill=\"#fff\" opacity=\".8\"/></svg>", "powerbi": "<svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"12\" width=\"4.5\" height=\"9\" rx=\"1.2\" fill=\"#F2C811\"/><rect x=\"9.8\" y=\"7\" width=\"4.5\" height=\"14\" rx=\"1.2\" fill=\"#E8A800\"/><rect x=\"16.5\" y=\"2\" width=\"4.5\" height=\"19\" rx=\"1.2\" fill=\"#C98A00\"/></svg>", "pivot": "<svg viewBox=\"0 0 24 24\"><rect x=\"2.5\" y=\"3.5\" width=\"19\" height=\"17\" rx=\"2.5\" fill=\"#fff\" stroke=\"#6366F1\" stroke-width=\"1.6\"/><path d=\"M2.5 9h19M9 9v11.5\" stroke=\"#6366F1\" stroke-width=\"1.6\"/><rect x=\"2.5\" y=\"3.5\" width=\"19\" height=\"5.5\" rx=\"2\" fill=\"#6366F1\"/><circle cx=\"15.5\" cy=\"14.5\" r=\"2\" fill=\"#6366F1\"/></svg>"};
  const skillLogoHtml = (sk) => {
    const fa = `<i class="fa-solid ${esc(sk.icon || 'fa-circle-check')} text-indigo-600"></i>`;
    const l = (sk.logo || '').trim();
    if (!l) return fa;
    if (SKILL_LOGOS[l.toLowerCase()]) return SKILL_LOGOS[l.toLowerCase()];
    // link gambar sendiri; bila gagal dimuat -> ikon cadangan
    return `<img src="${esc(l)}" alt="" loading="lazy" onerror="this.outerHTML=this.dataset.fb" data-fb="${esc(fa)}">`;
  };
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer && Array.isArray(cfg.skills)) {
    skillsContainer.innerHTML = cfg.skills.map(sk => `
      <span class="skill-chip inline-flex items-center gap-2.5 bg-white border border-gray-200/60 px-4 py-2.5 rounded-full text-sm font-medium text-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
        <span class="skill-logo">${skillLogoHtml(sk)}</span>${esc(sk.name)}
      </span>
    `).join('');
  }
  const skillGroupsEl = document.getElementById('skill-groups');
  const sgList = (Array.isArray(cfg.skillGroups) ? cfg.skillGroups : []).filter(g => g && Array.isArray(g.items) && g.items.length);
  if (skillGroupsEl) {
    const wrap = document.getElementById('skill-groups-wrap');
    if (!sgList.length) { if (wrap) wrap.classList.add('hidden'); }
    else {
      skillGroupsEl.innerHTML = sgList.map(g => `
        <div class="skill-group-card">
          <h3 class="skill-group-title"><i class="fa-solid ${esc(g.icon || 'fa-star')}"></i> ${esc(g.title || '')}</h3>
          <ul class="skill-group-list">${g.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        </div>`).join('');
    }
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
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">${project.category}</span>
        ${ctxBadgeHtml(project)}
      </div>
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
    bindCtxLinks(modalBody);
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
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">${p.category}</span>
            ${ctxBadgeHtml(p)}
          </div>
          <h3 class="font-serif text-3xl font-bold text-slate-900">${p.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed line-clamp-3">${p.description}</p>
          ${metricsHtml}
          <div class="pt-4 border-t border-gray-200 flex flex-wrap gap-2 items-center">
            <span class="text-xs text-gray-400 font-semibold uppercase tracking-wider">Tools:</span>
            ${p.tools.split(',').map(tool => `<span class="text-xs bg-white text-gray-600 px-3 py-1 rounded-full border border-gray-200">${tool.trim()}</span>`).join('')}
          </div>
        </div>
      `;
      bindCtxLinks(card);
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
