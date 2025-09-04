// Mobile menu toggle + a11y state
const btn = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');

if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close menu when a nav link is clicked (mobile)
  nav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Dynamic year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll for internal links (progressive enhancement)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Simple project filter
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');

function setActiveChip(target) {
  chips.forEach(c => c.classList.remove('is-active'));
  target.classList.add('is-active');
  chips.forEach(c => c.setAttribute('aria-pressed', c === target ? 'true' : 'false'));
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter; // e.g., "javascript", "python", "java", "all"
    setActiveChip(chip);

    cards.forEach(card => {
      const tags = card.dataset.tags || '';
      const visible = filter === 'all' ? true : tags.toLowerCase().includes(filter);
      card.style.display = visible ? '' : 'none';
    });
  });
});

// Fade-in on scroll (nice touch, no lib)
const observer = ('IntersectionObserver' in window)
  ? new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 })
  : null;

if (observer) {
  document.querySelectorAll('.card').forEach(el => {
    el.style.transform = 'translateY(10px)';
    el.style.opacity = '0';
    el.style.transition = 'opacity .4s ease, transform .4s ease';
    observer.observe(el);
  });
}
