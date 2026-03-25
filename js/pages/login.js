import { t } from '../i18n.js';
import { signIn } from '../auth.js';
import { navigate } from '../router.js';
import { showToast } from '../components/toast.js';
import { animateAuthPage, animateButtonClick } from '../animations.js';

export default async function loginPage() {
  const content = document.getElementById('page-content');
  content.innerHTML = `
    <div class="auth-page">
      <div class="auth-logo">
        <div style="font-size: 64px;">🐾</div>
        <h1>${t('app.name')}</h1>
        <p>${t('auth.subtitle')}</p>
      </div>
      <form class="auth-form" id="login-form">
        <div class="form-group">
          <label class="form-label">${t('auth.email')}</label>
          <input type="email" class="form-input" id="login-email" placeholder="${t('auth.email')}" required autocomplete="email">
        </div>
        <div class="form-group">
          <label class="form-label">${t('auth.password')}</label>
          <input type="password" class="form-input" id="login-password" placeholder="${t('auth.password')}" required autocomplete="current-password">
        </div>
        <button type="submit" class="btn btn-primary btn-full mt-md" id="login-btn">
          ${t('auth.loginBtn')}
        </button>
      </form>
      <div class="auth-footer">
        <p>${t('auth.noAccount')} <a href="#/register">${t('auth.register')}</a></p>
      </div>
    </div>
  `;

  // Animate auth page entrance
  animateAuthPage();

  const form = document.getElementById('login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');

    if (!email || !password) {
      showToast(t('auth.emailRequired'), 'error');
      return;
    }

    animateButtonClick(btn);
    btn.disabled = true;
    btn.textContent = t('common.loading');

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      showToast(t('auth.loginError'), 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = t('auth.loginBtn');
    }
  });
}
