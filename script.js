document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 900, once: true, anchorPlacement: 'top-bottom' });

  const cfg = SITE_CONFIG;

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

  // Services
  const servicesContainer = document.getElementById('services-container');
  if (servicesContainer) {
    servicesContainer.innerHTML = cfg.services.map((s, i) => `
      <div class="bg-white p-10 rounded-3xl border border-gray-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow tilt-card" data-aos="fade-up" data-aos-delay="${i * 100}">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">
            <i class="fa-solid ${s.icon}"></i>
          </div>
          <h3 class="text-2xl font-bold font-serif text-slate-900">${s.title}</h3>
          <p class="text-gray-600 leading-relaxed">${s.description}</p>
        </div>
      </div>
    `).join('');
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
      return `
      <div class="exp-item relative pl-10 pb-10">
        ${i < cfg.experience.length - 1 ? '<span class="exp-line absolute left-[-1px] top-4 bottom-0 w-[2px] bg-gray-200 ml-2"></span>' : ''}
        <span class="exp-dot absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow ml-2"></span>
        <p class="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">${exp.period}</p>
        <h3 class="text-xl font-bold text-slate-900">${exp.role}</h3>
        <p class="text-gray-500 font-medium mb-2">${exp.company}</p>
        ${descHtml}
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

  // Skills / Tools chips di section Services
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer && cfg.skills) {
    skillsContainer.innerHTML = cfg.skills.map(sk => `
      <span class="inline-flex items-center gap-2 bg-white border border-gray-200/60 px-4 py-2.5 rounded-full text-sm font-medium text-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
        <i class="fa-solid ${sk.icon} text-indigo-600"></i> ${sk.name}
      </span>
    `).join('');
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
  const openModal = (project) => {
    if (!modal || !modalBody) return;
    const hasDemo = project.demoUrl && project.demoUrl.trim() !== '';
    const metricsHtml = project.metrics && project.metrics.trim() !== ''
      ? `<div class="flex flex-wrap gap-2 mb-6">
          ${project.metrics.split('|').map(m => `<span class="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full">${m.trim()}</span>`).join('')}
        </div>`
      : '';
    modalBody.innerHTML = `
      <img src="${project.image}" class="w-full aspect-video object-cover rounded-2xl mb-6" alt="${project.title}">
      <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">${project.category}</span>
      <h3 class="font-serif text-3xl font-bold text-slate-900 mt-4 mb-3">${project.title}</h3>
      <p class="text-gray-600 leading-relaxed mb-4">${project.description}</p>
      ${metricsHtml}
      <div class="flex flex-wrap gap-2 mb-6">
        ${project.tools.split(',').map(t => `<span class="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">${t.trim()}</span>`).join('')}
      </div>
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
      ` : `
        <p class="text-sm text-gray-400 italic">Demo belum tersedia untuk project ini.</p>
      `}
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
          <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
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
});
