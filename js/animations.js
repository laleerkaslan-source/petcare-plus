import gsap from 'gsap';

// Global defaults
gsap.defaults({ duration: 0.5, ease: 'power2.out' });

// Page transition - fade in and slide up
export function animatePageIn(container) {
  if (!container) return;
  gsap.fromTo(container,
    { autoAlpha: 0, y: 30 },
    { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }
  );
}

// Dashboard greeting bounce
export function animateGreeting(el) {
  if (!el) return;
  const tl = gsap.timeline();
  tl.from(el, { scale: 0.3, autoAlpha: 0, duration: 0.6, ease: 'back.out(1.7)' })
    .from(el.nextElementSibling, { autoAlpha: 0, y: 10, duration: 0.3 }, '-=0.2');
  return tl;
}

// Staggered card reveal
export function animateCards(selector) {
  const cards = document.querySelectorAll(selector);
  if (!cards.length) return;
  gsap.from(cards, {
    autoAlpha: 0,
    y: 40,
    scale: 0.9,
    duration: 0.5,
    stagger: 0.12,
    ease: 'back.out(1.4)',
  });
}

// Pet card hover bounce
export function addCardHoverEffects(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale: 1.03, y: -4, duration: 0.25, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
}

// Navbar entrance
export function animateNavbar() {
  const items = document.querySelectorAll('.nav-item');
  if (!items.length) return;
  gsap.from(items, {
    y: 30,
    autoAlpha: 0,
    duration: 0.4,
    stagger: 0.06,
    ease: 'power3.out',
  });
}

// Active nav icon pop
export function popNavIcon(el) {
  if (!el) return;
  gsap.fromTo(el,
    { scale: 1.3 },
    { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' }
  );
}

// Login page entrance
export function animateAuthPage() {
  const logo = document.querySelector('.auth-logo');
  const form = document.querySelector('.auth-form');
  const footer = document.querySelector('.auth-footer');
  if (!logo) return;

  const tl = gsap.timeline();
  tl.from(logo, { scale: 0, rotation: -15, autoAlpha: 0, duration: 0.7, ease: 'back.out(1.7)' })
    .from(logo.querySelector('h1'), { y: 20, autoAlpha: 0, duration: 0.3 }, '-=0.3')
    .from(logo.querySelector('p'), { y: 20, autoAlpha: 0, duration: 0.3 }, '-=0.15');

  if (form) {
    const inputs = form.querySelectorAll('.form-group');
    const btn = form.querySelector('.btn');
    tl.from(inputs, { x: -30, autoAlpha: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      .from(btn, { scale: 0.8, autoAlpha: 0, duration: 0.3, ease: 'back.out(1.5)' }, '-=0.1');
  }
  if (footer) {
    tl.from(footer, { autoAlpha: 0, y: 10, duration: 0.3 }, '-=0.1');
  }
  return tl;
}

// Button click ripple
export function animateButtonClick(btn) {
  if (!btn) return;
  gsap.fromTo(btn,
    { scale: 0.92 },
    { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }
  );
}

// Emoji bounce (for pet avatars, empty states)
export function bounceEmoji(el) {
  if (!el) return;
  gsap.fromTo(el,
    { scale: 0, rotation: -30 },
    { scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }
  );
}

// Category chips stagger
export function animateChips(selector) {
  const chips = document.querySelectorAll(selector);
  if (!chips.length) return;
  gsap.from(chips, {
    scale: 0,
    autoAlpha: 0,
    duration: 0.3,
    stagger: 0.05,
    ease: 'back.out(2)',
  });
}

// Calendar grid cells stagger
export function animateCalendarGrid(selector) {
  const cells = document.querySelectorAll(selector);
  if (!cells.length) return;
  gsap.from(cells, {
    scale: 0.5,
    autoAlpha: 0,
    duration: 0.02,
    stagger: { amount: 0.4, from: 'start' },
    ease: 'power1.out',
  });
}

// Toast entrance
export function animateToastIn(el) {
  if (!el) return;
  gsap.fromTo(el,
    { y: 50, autoAlpha: 0, scale: 0.8 },
    { y: 0, autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }
  );
}

// Toast exit
export function animateToastOut(el) {
  if (!el) return;
  return gsap.to(el, {
    y: -30, autoAlpha: 0, scale: 0.8,
    duration: 0.3, ease: 'power2.in',
    onComplete: () => el.remove()
  });
}

// Settings items stagger
export function animateListItems(selector) {
  const items = document.querySelectorAll(selector);
  if (!items.length) return;
  gsap.from(items, {
    x: -20,
    autoAlpha: 0,
    duration: 0.35,
    stagger: 0.06,
    ease: 'power2.out',
  });
}

// Paw print walking animation for loading
export function animatePawLoader(el) {
  if (!el) return;
  return gsap.to(el, {
    rotation: 20,
    yoyo: true,
    repeat: -1,
    duration: 0.3,
    ease: 'power1.inOut',
  });
}

// Badge pop
export function animateBadges(selector) {
  const badges = document.querySelectorAll(selector);
  if (!badges.length) return;
  gsap.from(badges, {
    scale: 0,
    duration: 0.3,
    stagger: 0.08,
    ease: 'back.out(2)',
    delay: 0.3,
  });
}
