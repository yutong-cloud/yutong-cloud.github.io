document.querySelectorAll('[data-language-switch]').forEach(link => {
  link.addEventListener('click', () => {
    link.hash = window.location.hash;
  });
});
