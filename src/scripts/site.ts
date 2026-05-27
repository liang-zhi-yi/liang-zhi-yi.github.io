const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initTheme() {
  const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  if (!button) return;

  // 创建或获取屏幕阅读器通知区域
  let themeStatus = document.getElementById('theme-status');
  if (!themeStatus) {
    themeStatus = document.createElement('div');
    themeStatus.id = 'theme-status';
    themeStatus.className = 'sr-only';
    themeStatus.setAttribute('aria-live', 'polite');
    themeStatus.setAttribute('aria-atomic', 'true');
    themeStatus.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
    document.body.appendChild(themeStatus);
  }

  const syncPressed = () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    button.setAttribute('aria-pressed', String(isDark));
  };

  syncPressed();
  button.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    syncPressed();
    // 通知屏幕阅读器主题已切换
    if (themeStatus) {
      themeStatus.textContent = next === 'dark' ? '已切换到深色模式' : '已切换到浅色模式';
    }
  });
}

function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const nav = document.querySelector<HTMLElement>('[data-site-nav]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');

  const setMenuOpen = (open: boolean) => {
    if (!toggle || !nav) return;
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => setMenuOpen(!nav.classList.contains('open')));
    nav.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.closest('a')) setMenuOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        setMenuOpen(false);
        toggle.focus();
      }
    });
  }

  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initBackToTop() {
  const button = document.querySelector<HTMLButtonElement>('[data-back-to-top]');
  if (!button) return;
  const update = () => {
    const visible = window.scrollY > 420;
    button.classList.toggle('show', visible);
    button.tabIndex = visible ? 0 : -1;
    button.setAttribute('aria-hidden', String(!visible));
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
}

function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
  if (!items.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        window.setTimeout(() => entry.target.classList.add('is-visible'), index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

function initReadingProgress() {
  const bar = document.querySelector<HTMLElement>('[data-reading-progress]');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${percent}%`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initScrollTargets() {
  const triggers = document.querySelectorAll<HTMLElement>('[data-scroll-target]');
  if (!triggers.length) return;
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const selector = trigger.dataset.scrollTarget;
      if (!selector) return;
      const target = document.querySelector<HTMLElement>(selector);
      target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });
}

function initClickParticles() {
  if (reduceMotion || window.matchMedia('(max-width: 768px)').matches) return;
  const colors = ['#f7c948', '#ffe8a3', '#ffd6df', '#cfe8b8', '#cdefff'];
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button, input, textarea, select')) return;
    for (let i = 0; i < 10; i += 1) {
      const dot = document.createElement('span');
      dot.setAttribute('aria-hidden', 'true');
      dot.style.cssText = `position:fixed;left:${event.clientX}px;top:${event.clientY}px;width:7px;height:7px;border-radius:50%;pointer-events:none;z-index:9999;background:${colors[Math.floor(Math.random() * colors.length)]};box-shadow:0 0 10px rgba(247,201,72,.35);`;
      document.body.appendChild(dot);
      const angle = (Math.PI * 2 * i) / 10;
      const distance = 24 + Math.random() * 34;
      requestAnimationFrame(() => {
        dot.style.transition = 'transform .62s ease-out, opacity .62s ease-out';
        dot.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
        dot.style.opacity = '0';
      });
      window.setTimeout(() => dot.remove(), 700);
    }
  });
}

function initPageShutter() {
  if (reduceMotion) return;

  const root = document.documentElement;
  root.classList.add('is-entering');
  window.setTimeout(() => root.classList.remove('is-entering'), 220);

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank' || link.hasAttribute('download')) return;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || url.href === window.location.href) return;

    event.preventDefault();
    root.classList.add('is-shuttering');
    
    // 页面转场动画后跳转
    window.setTimeout(() => {
      window.location.href = url.href;
    }, 170);
  });
}

initPageShutter();
initTheme();
initHeader();
initBackToTop();
initReveal();
initReadingProgress();
initScrollTargets();
initClickParticles();
