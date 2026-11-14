const root = document.documentElement;
const language = root.lang;
const storage = {
  read(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  write(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Preferences still work for this visit. */ }
  },
};

const url = new URL(location.href);
const explicitEnglish = url.searchParams.get('lang') === 'en';
if (explicitEnglish || language === 'es') {
  storage.write('portfolio-language', language);
}
if (explicitEnglish) {
  url.searchParams.delete('lang');
  history.replaceState(null, '', url);
} else if (url.pathname === '/' && storage.read('portfolio-language') === 'es') {
  location.replace('/es/' + url.hash);
}

root.dataset.theme = storage.read('portfolio-theme') === 'dark' ? 'dark' : 'light';

document.addEventListener('DOMContentLoaded', () => {
  const languageLink = document.getElementById('language');
  const themeButton = document.getElementById('theme');
  languageLink.addEventListener('click', () => {
    languageLink.hash = location.hash;
  });

  const updateTheme = () => {
    themeButton.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
  };

  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    storage.write('portfolio-theme', root.dataset.theme);
    updateTheme();
  });
  updateTheme();
  themeButton.hidden = false;
});
