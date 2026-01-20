const SUPPORTED_LOCALES = ['en', 'pt'];

let currentLocale = null;

function detectSystemLocale() {
  const lang = navigator.language || navigator.userLanguage || '';
  return lang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function getLocale() {
  if (currentLocale) return currentLocale;

  const stored = localStorage.getItem('locale');
  if (stored && SUPPORTED_LOCALES.includes(stored)) {
    currentLocale = stored;
    return currentLocale;
  }

  currentLocale = detectSystemLocale();
  return currentLocale;
}

export function setLocale(locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) return;

  currentLocale = locale;
  localStorage.setItem('locale', locale);

  window.dispatchEvent(new CustomEvent('localechange', { detail: { locale } }));
}
