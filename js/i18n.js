import { getState, setState, on } from './store.js';

let translations = {};

export async function initI18n() {
  const lang = getState().language;
  await loadLocale(lang);
}

async function loadLocale(lang) {
  try {
    const base = import.meta.env.BASE_URL || '/';
    const res = await fetch(`${base}locales/${lang}.json`);
    translations = await res.json();
  } catch {
    console.warn(`Failed to load locale: ${lang}`);
    translations = {};
  }
}

export function t(key) {
  const keys = key.split('.');
  let value = translations;
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }
  return value || key;
}

export async function setLanguage(lang) {
  await loadLocale(lang);
  setState('language', lang);
}

export function getCurrentLang() {
  return getState().language;
}
