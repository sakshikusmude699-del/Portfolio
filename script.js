// ===== NAV =====
const nav = document.getElementById('nav');
if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));

// hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// active nav
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage || (currentPage === '' && a.getAttribute('href') === 'index.html')) a.classList.add('active');
});

// ===== SCROLL ANIMATIONS =====
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 70); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// ===== PARTICLES (only on index) =====
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  function resizeCanvas() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  resizeCanvas(); window.addEventListener('resize', resizeCanvas);
  const N = 65;
  const pts = Array.from({length: N}, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35,
    r: Math.random()*1.4+.4, a: Math.random()*.5+.15
  }));
  (function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(0,200,255,${p.a})`; ctx.fill();
    });
    for (let i = 0; i < N; i++) for (let j = i+1; j < N; j++) {
      const d = Math.hypot(pts[i].x-pts[j].x, pts[i].y-pts[j].y);
      if (d < 115) { ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle=`rgba(0,200,255,${.07*(1-d/115)})`; ctx.lineWidth=.5; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  })();
}

// ===== TYPING EFFECT =====
const roleEl = document.getElementById('typed-role');
if (roleEl) {
  const roles = ['Data Engineer','Data Scientist','ETL Developer','ML Enthusiast','UI/UX Designer'];
  let ri=0,ci=0,del=false;
  function type() {
    const cur = roles[ri];
    del ? ci-- : ci++;
    roleEl.textContent = cur.substring(0,ci);
    let sp = del ? 55 : 85;
    if (!del && ci===cur.length) { sp=2200; del=true; }
    else if (del && ci===0) { del=false; ri=(ri+1)%roles.length; sp=350; }
    setTimeout(type, sp);
  }
  setTimeout(type, 1600);
}

// ===== PROJECT FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = f === 'all' || card.dataset.category === f;
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

// ===== GALLERY UPLOAD =====
const uploadInput = document.getElementById('galleryUpload');
const galleryGrid = document.getElementById('galleryGrid');
if (uploadInput && galleryGrid) {
  document.getElementById('uploadZone').addEventListener('click', () => uploadInput.click());
  uploadInput.addEventListener('change', e => {
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${ev.target.result}" alt="${file.name}">
          <div class="gallery-overlay"><span class="gallery-caption">${file.name}</span></div>`;
        galleryGrid.prepend(item);
        item.classList.add('fade-up');
        setTimeout(() => item.classList.add('visible'), 50);
        io.observe(item);
      };
      reader.readAsDataURL(file);
    });
  });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type=submit]');
    btn.textContent = 'Message Sent';
    btn.style.background = 'var(--accent2)';
    btn.style.color = 'var(--bg)';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background=''; btn.style.color=''; contactForm.reset(); }, 3000);
  });
}
