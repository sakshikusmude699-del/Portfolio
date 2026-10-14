// ==========================================================================
// Sakshi Kusmude Portfolio — Core JavaScript
// Features: Theme Switcher, Interactive DAG Pipeline Simulator,
// Floating CLI Developer Terminal, Adaptive Particle Canvas, Confetti Engine
// ==========================================================================

// ===== 1. THEME SWITCHER (LIGHT & DARK MODE) =====
const THEME_KEY = 'portfolio-theme';

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    if (theme === 'light') {
      // Moon icon to switch to dark
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
      btn.setAttribute('title', 'Switch to Dark Mode');
      btn.setAttribute('aria-label', 'Switch to Dark Mode');
    } else {
      // Sun icon to switch to light
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
      btn.setAttribute('title', 'Switch to Light Mode');
      btn.setAttribute('aria-label', 'Switch to Light Mode');
    }
  });
}

// Initialize theme immediately
const currentTheme = getPreferredTheme();
applyTheme(currentTheme);

document.addEventListener('DOMContentLoaded', () => {
  // Bind all theme toggle buttons
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = active === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });

  // ===== 2. NAVIGATION & HAMBURGER =====
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Active page link detection
  const curPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === curPage || (curPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ===== 3. SCROLL ANIMATIONS (FADE-UP) =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), idx * 60);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Animate progress bars when scrolled into view
  const progObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.progress-bar');
        bars.forEach(b => {
          const targetW = b.getAttribute('data-width');
          if (targetW) b.style.width = targetW;
        });
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.learning-section, .learning-grid, .certs-wrap').forEach(el => progObserver.observe(el));

  // ===== 4. TYPING EFFECT (INDEX PAGE) =====
  const roleEl = document.getElementById('typed-role');
  if (roleEl) {
    const roles = [
      'Data Engineer',
      'ETL / ELT Pipeline Developer',
      'Apache Airflow & Snowflake Builder',
      'Cloud & PySpark Enthusiast'
    ];
    let rIdx = 0, cIdx = 0, isDeleting = false;
    function typeLoop() {
      const cur = roles[rIdx];
      if (isDeleting) {
        cIdx--;
      } else {
        cIdx++;
      }
      roleEl.textContent = cur.substring(0, cIdx);

      let speed = isDeleting ? 45 : 85;
      if (!isDeleting && cIdx === cur.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && cIdx === 0) {
        isDeleting = false;
        rIdx = (rIdx + 1) % roles.length;
        speed = 400;
      }
      setTimeout(typeLoop, speed);
    }
    setTimeout(typeLoop, 1200);
  }

  // ===== 5. PARTICLE CANVAS (INDEX PAGE) =====
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const N = 55;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.6,
      a: Math.random() * 0.5 + 0.2
    }));

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const particleColor = isLight ? 'rgba(37, 99, 235,' : 'rgba(91, 140, 255,';

      pts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}${p.a})`;
        ctx.fill();
      });

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `${particleColor}${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  // ===== 6. PROJECT FILTERS (PROJECTS PAGE) =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
          const match = filterVal === 'all' || card.dataset.category === filterVal;
          card.style.display = match ? 'flex' : 'none';
        });
      });
    });
  }

  // ===== 7. GALLERY LIGHTBOX (GALLERY PAGE) =====
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        if (img) {
          lightboxImg.src = img.src;
          lightboxCaption.textContent = caption ? caption.textContent : img.alt;
          lightbox.classList.add('open');
        }
      });
    });

    const closeLightbox = () => lightbox.classList.remove('open');
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }

  // ===== 8. CONTACT FORM HANDLING =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.innerHTML = `Sending...`;
        setTimeout(() => {
          btn.innerHTML = `✓ Message Sent!`;
          launchConfetti();
        }, 600);
      }
    });
  }

  // Initialize surprise components
  initPipelineSimulator();
  initDeveloperTerminal();
});

// ==========================================================================
// SURPRISE ELEMENT 1: INTERACTIVE DATA PIPELINE SIMULATOR
// ==========================================================================
function initPipelineSimulator() {
  const triggerBtn = document.getElementById('simTriggerBtn');
  const resetBtn = document.getElementById('simResetBtn');
  if (!triggerBtn) return;

  const nodes = [
    document.getElementById('dag-node-1'),
    document.getElementById('dag-node-2'),
    document.getElementById('dag-node-3'),
    document.getElementById('dag-node-4'),
    document.getElementById('dag-node-5')
  ];

  const logBox = document.getElementById('pipelineLogs');
  const statusIndicator = document.getElementById('simStatusIndicator');
  const statusText = document.getElementById('simStatusText');
  const metricRows = document.getElementById('metricRows');
  const metricLatency = document.getElementById('metricLatency');
  const metricStatus = document.getElementById('metricStatus');

  let isRunning = false;

  function appendLog(msg, type = 'info') {
    if (!logBox) return;
    const now = new Date().toTimeString().split(' ')[0];
    const line = document.createElement('div');
    line.className = 'log-line';
    line.innerHTML = `<span class="log-time">[${now}]</span> <span class="log-msg ${type}">${msg}</span>`;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  }

  function resetDAG() {
    nodes.forEach(n => {
      if (n) {
        n.classList.remove('active', 'done');
        const st = n.querySelector('.dag-node-status');
        if (st) st.textContent = 'READY';
      }
    });
    if (statusIndicator) {
      statusIndicator.className = 'status-indicator';
      statusText.textContent = 'DAG Standby';
    }
    if (metricStatus) metricStatus.textContent = 'Idle';
    if (metricRows) metricRows.textContent = '0';
    if (metricLatency) metricLatency.textContent = '0ms';
  }

  function runPipeline() {
    if (isRunning) return;
    isRunning = true;
    triggerBtn.disabled = true;
    triggerBtn.style.opacity = '0.6';
    resetDAG();

    if (statusIndicator) {
      statusIndicator.className = 'status-indicator running';
      statusText.textContent = 'DAG Running';
    }
    if (metricStatus) metricStatus.textContent = 'Active (4 Tasks)';
    appendLog('Airflow Scheduler triggered DAG: enterprise_sales_daily_etl', 'info');

    // Step 1: Data Sources Ingestion
    setTimeout(() => {
      if (nodes[0]) {
        nodes[0].classList.add('active');
        nodes[0].querySelector('.dag-node-status').textContent = 'EXTRACTING...';
      }
      appendLog('Task [extract_sources]: Fetching records from PostgreSQL & REST API...', 'info');
      if (metricRows) metricRows.textContent = '350,200';
    }, 400);

    // Step 2: Airflow Orchestration & Partitioning
    setTimeout(() => {
      if (nodes[0]) {
        nodes[0].classList.remove('active');
        nodes[0].classList.add('done');
        nodes[0].querySelector('.dag-node-status').textContent = 'DONE ✓';
      }
      if (nodes[1]) {
        nodes[1].classList.add('active');
        nodes[1].querySelector('.dag-node-status').textContent = 'SCHEDULING...';
      }
      appendLog('Task [airflow_dag]: Generating execution graph & dynamic task partitions', 'info');
      if (metricRows) metricRows.textContent = '890,400';
      if (metricLatency) metricLatency.textContent = '120ms';
    }, 1600);

    // Step 3: Spark & DBT Transformation
    setTimeout(() => {
      if (nodes[1]) {
        nodes[1].classList.remove('active');
        nodes[1].classList.add('done');
        nodes[1].querySelector('.dag-node-status').textContent = 'DONE ✓';
      }
      if (nodes[2]) {
        nodes[2].classList.add('active');
        nodes[2].querySelector('.dag-node-status').textContent = 'TRANSFORMING...';
      }
      appendLog('Task [pyspark_dbt_transform]: Running PySpark schema casts & dbt star-schema model', 'warn');
      if (metricRows) metricRows.textContent = '1,420,500';
      if (metricLatency) metricLatency.textContent = '210ms';
    }, 3000);

    // Step 4: Quality Checks (Great Expectations)
    setTimeout(() => {
      if (nodes[2]) {
        nodes[2].classList.remove('active');
        nodes[2].classList.add('done');
        nodes[2].querySelector('.dag-node-status').textContent = 'DONE ✓';
      }
      if (nodes[3]) {
        nodes[3].classList.add('active');
        nodes[3].querySelector('.dag-node-status').textContent = 'VALIDATING...';
      }
      appendLog('Task [data_quality_gate]: Validating null checks, uniqueness & foreign keys (100% Passed)', 'info');
    }, 4400);

    // Step 5: Snowflake Lakehouse Load
    setTimeout(() => {
      if (nodes[3]) {
        nodes[3].classList.remove('active');
        nodes[3].classList.add('done');
        nodes[3].querySelector('.dag-node-status').textContent = 'DONE ✓';
      }
      if (nodes[4]) {
        nodes[4].classList.add('active');
        nodes[4].querySelector('.dag-node-status').textContent = 'LOADING...';
      }
      appendLog('Task [snowflake_load]: COPY INTO analytics.sales_fact (Cluster autocommit)', 'info');
      if (metricLatency) metricLatency.textContent = '248ms';
    }, 5800);

    // Completion
    setTimeout(() => {
      if (nodes[4]) {
        nodes[4].classList.remove('active');
        nodes[4].classList.add('done');
        nodes[4].querySelector('.dag-node-status').textContent = 'LOADED ✓';
      }
      if (statusIndicator) {
        statusIndicator.className = 'status-indicator success';
        statusText.textContent = 'Pipeline Succeeded';
      }
      if (metricStatus) metricStatus.textContent = 'Success (0 Errors)';
      appendLog('✓ DAG Run enterprise_sales_daily_etl finished with state SUCCESS in 2.8s', 'success');
      launchConfetti();

      isRunning = false;
      triggerBtn.disabled = false;
      triggerBtn.style.opacity = '1';
    }, 7200);
  }

  triggerBtn.addEventListener('click', runPipeline);
  if (resetBtn) resetBtn.addEventListener('click', resetDAG);
}

// ==========================================================================
// SURPRISE ELEMENT 2: FLOATING DEVELOPER TERMINAL (CLI EASTER EGG)
// ==========================================================================
function initDeveloperTerminal() {
  const launcher = document.getElementById('terminalLauncher');
  const modal = document.getElementById('terminalModal');
  const closeBtn = document.getElementById('termCloseBtn');
  const input = document.getElementById('termInput');
  const body = document.getElementById('terminalBody');

  if (!launcher || !modal || !input) return;

  function openTerminal() {
    modal.classList.add('open');
    setTimeout(() => input.focus(), 150);
  }

  function closeTerminal() {
    modal.classList.remove('open');
  }

  launcher.addEventListener('click', openTerminal);
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeTerminal();
  });

  // Keyboard shortcut: Press ` (backtick) or Ctrl+K to toggle
  document.addEventListener('keydown', e => {
    if ((e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) ||
        (e.ctrlKey && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      modal.classList.contains('open') ? closeTerminal() : openTerminal();
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeTerminal();
    }
  });

  function printLine(text, className = '') {
    const div = document.createElement('div');
    div.className = `term-line ${className}`;
    div.innerHTML = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  const COMMANDS = {
    help: () => `
<span class="term-accent">Available Commands:</span>
  <span class="term-green">help</span>           - Display this list of commands
  <span class="term-green">whoami</span>         - Display summary about Sakshi Kusmude
  <span class="term-green">skills</span>         - List core technical stack & tools
  <span class="term-green">learning</span>       - Show current learning progress (Spark, Databricks, GenAI)
  <span class="term-green">experience</span>     - Show internships & professional history
  <span class="term-green">projects</span>       - View featured projects & architecture
  <span class="term-green">pipeline</span>       - Trigger live Airflow pipeline simulator
  <span class="term-green">contact</span>        - Show contact details & LinkedIn
  <span class="term-green">theme</span>          - Toggle between Dark & Light themes
  <span class="term-green">confetti</span>       - Trigger celebratory celebration burst!
  <span class="term-green">clear</span>          - Clear terminal output
  <span class="term-green">exit</span>           - Close terminal
`,
    whoami: () => `
<span class="term-accent">Sakshi Kusmude</span> — Data Engineer & B.Tech IT student at VIIT, Pune (CGPA: 8.48).
Former Data Engineer Intern at <span class="term-green">Colgate Global Business Services</span> and Data Science Intern at <span class="term-green">JAASN Consultants</span>.
Passionate about building resilient ELT pipelines, cloud lakehouses, and high-throughput data architectures.
`,
    skills: () => `
<span class="term-accent">=== CORE TECHNICAL STACK ===</span>
• <span class="term-green">Languages:</span> Python, SQL, Java, C++
• <span class="term-green">Data Engineering:</span> Apache Airflow, Snowflake, MySQL, PostgreSQL, GCP, ETL/ELT, DBT, Docker
• <span class="term-green">Frameworks & Tools:</span> Flask, Streamlit, Git/GitHub, VS Code, Postman, Jupyter
• <span class="term-green">Certifications:</span> AWS Cloud Foundations, AWS ML Foundations, IBM Web Development
`,
    learning: () => `
<span class="term-gold">=== CURRENTLY LEARNING & EXPANDING HORIZONS ===</span>
[████████░░░░░░░░░░░░] 40% - <span class="term-accent">Apache Spark</span> (PySpark, RDDs, DataFrames, Memory Optimization)
[████████████░░░░░░░░] 60% - <span class="term-green">Databricks</span> (Delta Lake, Lakehouse Architecture, Unity Catalog)
[██████░░░░░░░░░░░░░░] 30% - <span class="term-gold">Generative AI & LLMs</span> (RAG Pipelines, Embeddings, LangChain)
`,
    experience: () => `
<span class="term-accent">1. Colgate Global Business Services Pvt. Ltd.</span> (July 2025 – Jan 2026)
   Role: Data Engineer Intern (Mumbai, India)
   • Built ELT pipelines using Python, SQL, Snowflake, DBT, and GCP.
   • Automated production manual workflows, saving recurring weekend effort.
   • Orchestrated and monitored Apache Airflow DAGs with Git and Jira.

<span class="term-accent">2. JAASN Consultants LLC</span> (Aug 2024 – Jan 2025)
   Role: Data Science Intern (Pune, India)
   • Developed Python backend scripts to process, clean, and visualize business data.
`,
    projects: () => `
<span class="term-green">1. Enterprise Sales Data Pipeline</span> [Airflow, Python, SQL, Docker, PostgreSQL]
   End-to-end automated ETL pipeline processing sales, customer, and product datasets with logging and validation.

<span class="term-green">2. AI Resume Analyzer & ATS Checker</span> [Python, NLP, Streamlit]
   TF-IDF and cosine similarity engine calculating ATS compatibility scores against job postings.

<span class="term-green">3. SunoX — Real-Time Sound Amplifier</span> [Kotlin, Jetpack Compose, Firebase, C++/Oboe]
   Low-latency native Android audio processing application.
`,
    pipeline: () => {
      const triggerBtn = document.getElementById('simTriggerBtn');
      if (triggerBtn) {
        triggerBtn.click();
        return `<span class="term-green">Triggering Enterprise Sales ETL DAG simulator in the background... Watch the pipeline section!</span>`;
      }
      return `<span class="term-accent">Pipeline simulator is running on the Home page!</span>`;
    },
    contact: () => `
<span class="term-accent">Get in Touch with Sakshi:</span>
• Email: <a href="mailto:sakshikusmude699@gmail.com" style="color:var(--accent);">sakshikusmude699@gmail.com</a>
• Phone: +91-8080613066
• LinkedIn: <a href="https://www.linkedin.com/in/sakshi-kusmude/" target="_blank" style="color:var(--accent2);">linkedin.com/in/sakshi-kusmude/</a>
• GitHub: <a href="https://github.com/sakshikusmude699-del" target="_blank" style="color:var(--accent3);">github.com/sakshikusmude699-del</a>
`,
    theme: () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = active === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return `<span class="term-green">Theme switched to: ${next.toUpperCase()}</span>`;
    },
    confetti: () => {
      launchConfetti();
      return `<span class="term-gold">🎉 Confetti celebration launched!</span>`;
    },
    clear: () => {
      body.innerHTML = '';
      return '';
    },
    sudo: () => `<span class="term-gold">Permission granted: You have full sudo access to invite Sakshi for an interview!</span>`,
    exit: () => {
      closeTerminal();
      return '';
    }
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      input.value = '';
      if (!raw) return;

      printLine(`<span class="term-prompt">sakshi@cloud-shell:~$</span> ${raw}`);
      const cmd = raw.toLowerCase().split(' ')[0];

      if (COMMANDS[cmd]) {
        const out = COMMANDS[cmd]();
        if (out) printLine(out);
      } else {
        printLine(`Command not found: "${raw}". Type <span class="term-green">help</span> to view available commands.`, 'term-muted');
      }
    }
  });
}

// ==========================================================================
// PURE VANILLA JS CONFETTI ENGINE (ZERO DEPENDENCIES)
// ==========================================================================
function launchConfetti() {
  let confettiCanvas = document.getElementById('confettiCanvas');
  if (!confettiCanvas) {
    confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confettiCanvas';
    document.body.appendChild(confettiCanvas);
  }
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const count = 120;
  const colors = ['#5b8cff', '#2dd4bf', '#a78bfa', '#f59e0b', '#ec4899', '#10b981'];
  const pieces = Array.from({ length: count }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * -confettiCanvas.height * 0.5,
    w: Math.random() * 9 + 5,
    h: Math.random() * 5 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    vy: Math.random() * 3 + 2,
    vx: (Math.random() - 0.5) * 2,
    rot: Math.random() * 360,
    vrot: (Math.random() - 0.5) * 8
  }));

  let frame = 0;
  function updateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.vrot;

      if (p.y < confettiCanvas.height) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    frame++;
    if (alive && frame < 180) {
      requestAnimationFrame(updateConfetti);
    } else {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }
  updateConfetti();
}
