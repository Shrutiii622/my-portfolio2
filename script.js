/* =========================================
   PIYUSH RAJ PORTFOLIO — script.js
   Baby Pink & White Theme
   ========================================= */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    triggerHeroAnimations();
  }, 2000);
});
document.body.style.overflow = 'hidden';

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .pill, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.width = '56px';
    follower.style.height = '56px';
    follower.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.opacity = '0.6';
  });
});

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

navToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = navToggle.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuOpen = false;
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===== TYPEWRITER =====
const roles = ['Data Analyst', 'Full Stack Developer', 'Problem Solver', 'BCA Student'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typeEl = document.getElementById('typeText');

function typeWriter() {
  if (!typeEl) return;
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typeEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === currentRole.length) {
    setTimeout(() => { isDeleting = true; }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  const speed = isDeleting ? 60 : 100;
  setTimeout(typeWriter, speed);
}
typeWriter();

// ===== HERO REVEAL =====
function triggerHeroAnimations() {
  const heroEls = document.querySelectorAll('.hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 150);
  });
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, i * 120);
      });
      staggerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  if (el.closest('.hero')) return;
  const parent = el.parentElement;
  const isGrid = parent.classList.contains('skills-grid') ||
                 parent.classList.contains('projects-grid') ||
                 parent.classList.contains('about-grid') ||
                 parent.classList.contains('contact-grid') ||
                 parent.classList.contains('contact-links');
  if (isGrid) {
    staggerObserver.observe(el);
  } else {
    revealObserver.observe(el);
  }
});

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cat = card.dataset.cat;
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInCard 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      formSuccess.style.display = 'block';
      contactForm.reset();
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
      setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    }, 1500);
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== PILL HOVER =====
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    pill.style.transform = 'scale(0.9)';
    setTimeout(() => { pill.style.transform = ''; }, 150);
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});

// ===== CARD TILT EFFECT =====
document.querySelectorAll('.project-card, .skill-group, .edu-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / rect.height) * 5;
    const rotY = (x / rect.width) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== PARTICLE PETALS (Canvas BG) =====
(function() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 0;
    opacity: 0.5;
  `;
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Pink floating petal dots
  const petals = Array.from({ length: 60 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.4 + 0.1,
    speed: Math.random() * 0.4 + 0.05,
    drift: (Math.random() - 0.5) * 0.3,
    hue: Math.random() > 0.5 ? '232,120,154' : '244,167,187'
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue}, ${p.opacity})`;
      ctx.fill();
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
      if (p.x < -5 || p.x > canvas.width + 5) { p.x = Math.random() * canvas.width; }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

console.log('%c Piyush Raj Portfolio 🌸', 'color: #e8789a; font-size: 18px; font-weight: bold;');
console.log('%c Built with love 💕', 'color: #f4a7bb; font-size: 13px;');