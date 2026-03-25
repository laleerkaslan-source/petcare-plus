import { t, setLanguage, getCurrentLang } from '../i18n.js';
import { getState } from '../store.js';
import { signOut, updateProfile } from '../auth.js';
import { navigate } from '../router.js';
import { showToast } from '../components/toast.js';
import { renderNavbar } from '../components/navbar.js';
import { animateListItems } from '../animations.js';

export default async function settingsPage() {
  const { profile } = getState();
  const lang = getCurrentLang();

  const content = document.getElementById('page-content');
  content.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">${t('settings.title')}</h1>
    </div>

    <div class="settings-section">
      <div class="settings-title">${t('settings.account')}</div>
      <div class="card">
        <div class="flex items-center gap-md">
          <div class="avatar">${(profile?.display_name || '?')[0].toUpperCase()}</div>
          <div>
            <div style="font-weight:var(--fw-bold)">${profile?.display_name || ''}</div>
            <div class="text-sm text-secondary">${getState().user?.email || ''}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-title">${t('settings.language')}</div>
      <div class="settings-item" id="lang-tr">
        <span class="settings-item-label">🇹🇷 ${t('settings.turkish')}</span>
        ${lang === 'tr' ? '<span class="badge badge-success">✓</span>' : ''}
      </div>
      <div class="settings-item" id="lang-en">
        <span class="settings-item-label">🇬🇧 ${t('settings.english')}</span>
        ${lang === 'en' ? '<span class="badge badge-success">✓</span>' : ''}
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-title">${t('settings.premium')}</div>
      <div class="settings-item" id="premium-btn">
        <span class="settings-item-label">⭐ ${profile?.is_premium ? t('settings.premiumActive') : t('settings.upgradePremium')}</span>
        ${profile?.is_premium ? '<span class="badge badge-premium">PRO</span>' : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>'}
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-title">${t('settings.about')}</div>
      <div class="settings-item">
        <span class="settings-item-label">${t('settings.version')}</span>
        <span class="text-secondary">1.0.0</span>
      </div>
    </div>

    <button class="btn btn-danger btn-full mt-lg" id="logout-btn">${t('settings.logout')}</button>
  `;

  animateListItems('.settings-item');

  document.getElementById('lang-tr').addEventListener('click', async () => {
    await switchLang('tr');
  });
  document.getElementById('lang-en').addEventListener('click', async () => {
    await switchLang('en');
  });
  document.getElementById('premium-btn').addEventListener('click', () => {
    if (!profile?.is_premium) navigate('/premium');
  });
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await signOut();
  });
}

async function switchLang(lang) {
  await setLanguage(lang);
  const { profile } = getState();
  if (profile) {
    await updateProfile({ id: profile.id, language: lang });
  }
  renderNavbar();
  // Re-render settings page
  const settingsModule = await import('./settings.js');
  settingsModule.default();
}
