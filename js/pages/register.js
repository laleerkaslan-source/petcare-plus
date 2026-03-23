import { t } from '../i18n.js';
import { signUp } from '../auth.js';
import { navigate } from '../router.js';
import { showToast } from '../components/toast.js';

export default async function registerPage() {
  const content = document.getElementById('page-content');
  content.innerHTML = `
    <div class="auth-page">
      <div class="auth-logo">
        <div style="font-size: 64px;">🐾</div>
        <h1>${t('app.name')}</h1>
        <p>${t('auth.subtitle')}</p>
      </div>
      <form class="auth-form" id="register-form">
        <div class="form-group">
          <label class="form-label">${t('auth.name')}</label>
          <input type="text" class="form-input" id="reg-name" placeholder="${t('auth.name')}" required>
        </div>
        <div class="form-group">
          <label class="form-label">${t('auth.email')}</label>
          <input type="email" class="form-input" id="reg-email" placeholder="${t('auth.email')}" required autocomplete="email">
        </div>
        <div class="form-group">
          <label class="form-label">${t('auth.password')}</label>
          <input type="password" class="form-input" id="reg-password" placeholder="${t('auth.password')}" required autocomplete="new-password" minlength="6">
        </div>
        <button type="submit" class="btn btn-primary btn-full mt-md" id="reg-btn">
          ${t('auth.registerBtn')}
        </button>
      </form>
      <div class="auth-footer">
        <p>${t('auth.hasAccount')} <a href="#/login">${t('auth.login')}</a></p>
      </div>
    </div>
  `;

  const form = document.getElementById('register-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const btn = document.getElementById('reg-btn');

    if (!name) { showToast(t('auth.nameRequired'), 'error'); return; }
    if (!email) { showToast(t('auth.emailRequired'), 'error'); return; }
    if (password.length < 6) { showToast(t('auth.passwordMin'), 'error'); return; }

    btn.disabled = true;
    btn.textContent = t('common.loading');

    try {
      await signUp(email, password, name);
      showToast(t('auth.registerSuccess'), 'success');
      navigate('/login');
    } catch (err) {
      showToast(t('auth.registerError'), 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = t('auth.registerBtn');
    }
  });
}
