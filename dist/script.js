const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

const setMenuState = (isOpen) => {
  menuToggle?.classList.toggle('is-open', isOpen);
  menuToggle?.setAttribute('aria-expanded', String(isOpen));
  primaryNav?.classList.toggle('is-open', isOpen);
};

menuToggle?.addEventListener('click', () => {
  setMenuState(!primaryNav.classList.contains('is-open'));
});

primaryNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 20);
}, { passive: true });

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const filterButtons = document.querySelectorAll('[data-filter]');
const scheduleRows = document.querySelectorAll('.schedule-row');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    scheduleRows.forEach((row) => row.classList.toggle('is-hidden', filter !== 'all' && row.dataset.day !== filter));
  });
});

document.querySelector('[data-contact-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = event.currentTarget.querySelector('.form-status');
  status.textContent = 'Mensagem pronta — conecte este formulário ao canal de atendimento da academia.';
  event.currentTarget.reset();
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
