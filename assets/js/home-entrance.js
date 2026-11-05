(() => {
  'use strict';

  const initialize = () => {
    const root = document.documentElement;
    const dialog = document.getElementById('home-entrance');
    const storageKey = 'yutong-entrance-entered';
    let phase = 'idle';
    let frame = 0;
    let keyboardInteraction = false;
    const timers = new Set();
    const listeners = [];
    let context = null;
    let canvas = null;
    let width = 0;
    let height = 0;
    let particles = [];

    const listen = (element, type, handler, options) => {
      element.addEventListener(type, handler, options);
      listeners.push(() => element.removeEventListener(type, handler, options));
    };

    const cleanup = () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      timers.clear();
      listeners.splice(0).forEach(remove => remove());
      particles = [];
      if (context) context.clearRect(0, 0, width, height);
      document.body.classList.remove('entrance-is-open');
      root.classList.remove('entrance-pending');
    };

    const focusContent = hash => {
      let target = null;
      if (hash) {
        try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (_) { /* Use the main content below. */ }
        if (window.location.hash !== hash) window.location.hash = hash;
      }
      target = target || document.getElementById('main');
      if (!target) return;
      const hadTabIndex = target.hasAttribute('tabindex');
      if (!hadTabIndex) target.setAttribute('tabindex', '-1');
      if (!keyboardInteraction) target.classList.add('entrance-focus-target');
      target.focus({ preventScroll: true });
      if (hash) target.scrollIntoView({ block: 'start', behavior: 'instant' });
      target.addEventListener('blur', () => {
        if (!hadTabIndex) target.removeAttribute('tabindex');
        target.classList.remove('entrance-focus-target');
      }, { once: true });
    };

    const finish = (hash = '', remember = true) => {
      if (phase === 'closed') return;
      phase = 'closed';
      cleanup();
      if (dialog) {
        dialog.classList.remove('is-shaking', 'is-leaving');
        if (dialog.open) dialog.close();
      }
      if (remember) {
        try { sessionStorage.setItem(storageKey, '1'); } catch (_) { /* Entrance also works when storage is unavailable. */ }
      }
      focusContent(hash);
    };

    try {
      let entered = false;
      try { entered = sessionStorage.getItem(storageKey) === '1'; } catch (_) { /* No persisted preference. */ }
      if (!dialog || typeof dialog.showModal !== 'function' || window.location.hash || entered) return;

      const tree = dialog.querySelector('.home-entrance__tree');
      const image = dialog.querySelector('.home-entrance__tree-image');
      const status = document.getElementById('home-entrance-status');
      if (!tree || !image || (image.complete && image.naturalWidth === 0)) return;

      canvas = dialog.querySelector('.home-entrance__snow');
      context = canvas ? canvas.getContext('2d') : null;
      let canopy = { x: 0, y: 0, width: 0, height: 0 };
      const resize = () => {
        if (!canvas || !context) return;
        const bounds = canvas.getBoundingClientRect();
        const treeBounds = image.getBoundingClientRect();
        width = bounds.width;
        height = bounds.height;
        const scale = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(width * scale));
        canvas.height = Math.max(1, Math.round(height * scale));
        context.setTransform(scale, 0, 0, scale, 0, 0);
        canopy = {
          x: treeBounds.left - bounds.left + treeBounds.width * 0.12,
          y: treeBounds.top - bounds.top + treeBounds.height * 0.08,
          width: treeBounds.width * 0.76,
          height: treeBounds.height * 0.46
        };
      };

      const spawn = count => {
        if (!context || width === 0 || height === 0) return;
        for (let index = 0; index < count && particles.length < 260; index++) {
          particles.push({
            x: canopy.x + Math.random() * canopy.width,
            y: canopy.y + Math.random() * canopy.height,
            speed: 95 + Math.random() * 155,
            drift: (Math.random() - 0.5) * 48,
            radius: 0.9 + Math.random() * 1.5,
            star: Math.random() < 0.2,
            white: Math.random() < 0.3,
            wave: Math.random() * Math.PI * 2,
            age: 0
          });
        }
      };

      const later = (callback, delay) => {
        const timer = setTimeout(() => {
          timers.delete(timer);
          callback();
        }, delay);
        timers.add(timer);
      };

      const start = () => {
        if (phase !== 'idle') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          finish();
          return;
        }
        phase = 'animating';
        dialog.classList.add('is-shaking');
        tree.setAttribute('aria-disabled', 'true');
        if (status) status.textContent = 'Welcome. Opening the homepage.';
        resize();
        spawn(72);
        const started = performance.now();
        let previous = started;
        let spawnRemainder = 0;

        const draw = now => {
          if (phase === 'closed') return;
          const delta = Math.min((now - previous) / 1000, 0.06);
          previous = now;
          if (context) {
            context.clearRect(0, 0, width, height);
            if (now - started < 1700) {
              spawnRemainder += delta * 76;
              const count = Math.floor(spawnRemainder);
              spawn(count);
              spawnRemainder -= count;
            }
            particles = particles.filter(particle => particle.y < height + 8);
            for (const particle of particles) {
              particle.age += delta;
              particle.x += (particle.drift + Math.sin(particle.age * 3 + particle.wave) * 20) * delta;
              particle.y += particle.speed * delta;
              particle.speed += 15 * delta;
              if (particle.star) {
                const reach = particle.radius * 1.7;
                const rotation = particle.wave + particle.age * 0.24;
                context.beginPath();
                for (let arm = 0; arm < 6; arm++) {
                  const angle = rotation + arm * Math.PI / 3;
                  context.moveTo(particle.x, particle.y);
                  context.lineTo(particle.x + Math.cos(angle) * reach, particle.y + Math.sin(angle) * reach);
                }
                context.strokeStyle = 'rgba(148, 155, 152, 0.78)';
                context.lineWidth = 0.5;
                context.stroke();
                context.beginPath();
                context.arc(particle.x, particle.y, particle.radius * 0.38, 0, Math.PI * 2);
                context.fillStyle = 'rgba(255, 255, 255, 0.96)';
                context.fill();
              } else {
                context.beginPath();
                context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                context.fillStyle = particle.white ? 'rgba(255, 255, 255, 0.94)' : 'rgba(196, 201, 198, 0.82)';
                context.fill();
              }
            }
          }
          frame = requestAnimationFrame(draw);
        };
        frame = requestAnimationFrame(draw);
        later(() => {
          phase = 'leaving';
          dialog.classList.add('is-leaving');
        }, 2200);
        later(() => finish(), 2600);
      };

      listen(dialog, 'keydown', () => {
        keyboardInteraction = true;
        dialog.classList.add('has-keyboard-focus');
      });
      listen(dialog, 'pointerdown', () => {
        keyboardInteraction = false;
        dialog.classList.remove('has-keyboard-focus');
      });
      listen(tree, 'click', start);
      dialog.querySelectorAll('[data-entrance-target], .home-entrance__skip').forEach(link => {
        listen(link, 'click', event => {
          event.preventDefault();
          finish(link.hash || '#main');
        });
      });
      listen(dialog, 'cancel', event => {
        event.preventDefault();
        finish();
      });
      listen(dialog, 'close', () => finish());
      listen(image, 'error', () => finish('', false));
      listen(image, 'load', resize);
      listen(window, 'resize', resize);
      listen(window, 'hashchange', () => {
        if (window.location.hash) finish(window.location.hash);
      });
      listen(document, 'visibilitychange', () => {
        if (document.hidden && dialog.open && (phase === 'animating' || phase === 'leaving')) finish();
      });
      dialog.showModal();
      document.body.classList.add('entrance-is-open');
      resize();
      tree.focus({ preventScroll: true });
    } catch (_) {
      // Any enhancement failure leaves the original homepage usable.
      finish('', false);
    } finally {
      root.classList.remove('entrance-pending');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
