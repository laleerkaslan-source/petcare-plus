import { t } from '../i18n.js';
import { navigate } from '../router.js';
import { showToast } from '../components/toast.js';

export default async function premiumPage() {
  const content = document.getElementById('page-content');
  content.innerHTML = `
    <div class="page-header">
      <button class="btn btn-sm btn-secondary" id="back-btn">${t('common.back')}</button>
      <h1 class="page-title">${t('premium.title')}</h1>
      <div style="width:60px"></div>
    </div>

    <div class="premium-hero">
      <div style="font-size:48px">⭐</div>
      <h2>${t('premium.title')}</h2>
      <p>${t('premium.subtitle')}</p>
    </div>

    <div class="card mb-md">
      <div class="premium-feature">
        <div class="premium-feature-icon">🐾</div>
        <div>
          <strong>${t('premium.feature1')}</strong>
          <p class="text-sm text-secondary">${t('premium.feature1Desc')}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="premium-feature">
        <div class="premium-feature-icon">💊</div>
        <div>
          <strong>${t('premium.feature2')}</strong>
          <p class="text-sm text-secondary">${t('premium.feature2Desc')}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="premium-feature">
        <div class="premium-feature-icon">🔔</div>
        <div>
          <strong>${t('premium.feature3')}</strong>
          <p class="text-sm text-secondary">${t('premium.feature3Desc')}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="premium-feature">
        <div class="premium-feature-icon">🎮</div>
        <div>
          <strong>${t('premium.feature4')}</strong>
          <p class="text-sm text-secondary">${t('premium.feature4Desc')}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-2 mb-lg">
      <div class="card text-center" style="cursor:pointer;border:2px solid var(--border)" id="monthly-plan">
        <p class="text-sm text-secondary mb-sm">${t('premium.subscribe')}</p>
        <p style="font-size:var(--fs-xl);font-weight:var(--fw-bold)">${t('premium.monthlyPrice')}</p>
      </div>
      <div class="card text-center" style="cursor:pointer;border:2px solid var(--primary);position:relative" id="yearly-plan">
        <span class="badge badge-premium" style="position:absolute;top:-8px;right:-8px">${t('premium.bestValue')}</span>
        <p class="text-sm text-secondary mb-sm">${t('premium.subscribe')}</p>
        <p style="font-size:var(--fs-xl);font-weight:var(--fw-bold)">${t('premium.yearlyPrice')}</p>
      </div>
    </div>

    <button class="btn btn-primary btn-full" id="subscribe-btn">${t('premium.subscribe')}</button>
  `;

  document.getElementById('back-btn').addEventListener('click', () => navigate('/settings'));

  document.getElementById('subscribe-btn').addEventListener('click', () => {
    showToast('Premium abonelik yakinda aktif olacak!', 'info');
  });

  // Plan selection visual
  document.querySelectorAll('#monthly-plan, #yearly-plan').forEach(plan => {
    plan.addEventListener('click', () => {
      document.querySelectorAll('#monthly-plan, #yearly-plan').forEach(p => {
        p.style.borderColor = 'var(--border)';
      });
      plan.style.borderColor = 'var(--primary)';
    });
  });
}
