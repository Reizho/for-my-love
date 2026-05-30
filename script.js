// ══════════════════════════════
//   GIFT BOX — open & flowers
// ══════════════════════════════

function openBox() {
  const wrap = document.getElementById('giftWrap');

  // Prevent opening twice
  if (wrap.classList.contains('opened')) return;

  wrap.classList.add('opened');
  launchFlowers();

  // Show scroll hint after flowers start
  setTimeout(() => {
    document.getElementById('scrollHint').classList.add('visible');
  }, 1200);
}

// ══════════════════════════════
//   FLOWER / EMOJI RAIN
// ══════════════════════════════

function launchFlowers() {
  const emojis = ['🌸','🌺','🌼','💐','🌷','💕','💗','❤️','✨','🦋','🍀','🌹'];
  const count  = 80;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('span');

      // Pick random emoji, position, size & speed
      const emoji   = emojis[Math.floor(Math.random() * emojis.length)];
      const leftPos = Math.random() * 100;
      const dur     = 2.5 + Math.random() * 3;
      const size    = 1.2 + Math.random() * 1.6;

      el.textContent = emoji;
      el.style.cssText = `
        position: fixed;
        left: ${leftPos}vw;
        top: -80px;
        font-size: ${size}rem;
        pointer-events: none;
        z-index: 99999;
        animation: fall ${dur}s linear forwards;
      `;

      document.body.appendChild(el);

      // Remove element after animation ends
      setTimeout(() => el.remove(), (dur + 0.3) * 1000);

    }, i * 50); // stagger each flower by 50ms
  }
}

// ══════════════════════════════
//   SCROLL FADE-IN
// ══════════════════════════════

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // stop watching once visible
    }
  });
}, { threshold: 0.15 });

// Apply observer to all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
