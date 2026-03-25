import { t, getCurrentLang } from '../i18n.js';
import { supabase } from '../supabase.js';
import { getState } from '../store.js';
import { animateChips, animateCards, addCardHoverEffects } from '../animations.js';

const CATEGORIES = ['all', 'nutrition', 'exercise', 'grooming', 'health', 'behavior'];
let currentCategory = 'all';

export default async function healthTipsPage() {
  const content = document.getElementById('page-content');
  content.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">${t('tips.title')}</h1>
    </div>
    <div class="tips-categories" id="category-tabs">
      ${CATEGORIES.map(c => `
        <button class="category-chip ${c === currentCategory ? 'active' : ''}" data-category="${c}">
          ${t('tips.' + c)}
        </button>
      `).join('')}
    </div>
    <div id="tips-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
  `;

  document.getElementById('category-tabs').addEventListener('click', (e) => {
    const chip = e.target.closest('.category-chip');
    if (!chip) return;
    currentCategory = chip.dataset.category;
    document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    loadTips();
  });

  animateChips('.category-chip');
  await loadTips();
}

async function loadTips() {
  const { pets, profile } = getState();
  const lang = getCurrentLang();
  const species = [...new Set(pets.map(p => p.species))];
  const isPremium = profile?.is_premium;

  let query = supabase.from('health_tips').select('*');

  if (species.length > 0) {
    query = query.in('species', species);
  }
  if (currentCategory !== 'all') {
    query = query.eq('category', currentCategory);
  }

  const { data: tips } = await query.order('created_at', { ascending: false });
  renderTips(tips || [], lang, isPremium);
}

function renderTips(tips, lang, isPremium) {
  const container = document.getElementById('tips-list');
  if (!container) return;

  if (tips.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">💡</div>
        <p class="text-secondary">${t('tips.noTips')}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = tips.map(tip => {
    const title = lang === 'tr' ? tip.title_tr : tip.title_en;
    const content = lang === 'tr' ? tip.content_tr : tip.content_en;
    const locked = tip.is_premium && !isPremium;

    return `
      <div class="card tip-card ${locked ? 'premium-lock' : ''} mb-md">
        ${locked ? `<div class="premium-lock-badge"><span class="badge badge-premium">${t('tips.premium')}</span></div>` : ''}
        ${tip.image_url ? `<img class="tip-card-image" src="${tip.image_url}" alt="${title}">` : ''}
        <div class="tip-card-body">
          <span class="badge badge-info mb-sm">${t('tips.' + tip.category)}</span>
          <h3 class="tip-card-title">${title}</h3>
          <p class="tip-card-excerpt">${content}</p>
        </div>
      </div>
    `;
  }).join('');

  animateCards('.tip-card');
  addCardHoverEffects('.tip-card');
}
