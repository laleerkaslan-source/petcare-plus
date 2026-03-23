import { t, getCurrentLang } from '../i18n.js';
import { supabase } from '../supabase.js';
import { getState } from '../store.js';

const ACTIVITY_ICONS = {
  dog: '🎾', cat: '🧶', bird: '🪶', fish: '🫧', rabbit: '🥕', other: '🎯'
};

export default async function activitiesPage() {
  const content = document.getElementById('page-content');
  content.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">${t('activities.title')}</h1>
    </div>
    <div id="activities-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
  `;

  await loadActivities();
}

async function loadActivities() {
  const { pets, profile } = getState();
  const lang = getCurrentLang();
  const species = [...new Set(pets.map(p => p.species))];
  const isPremium = profile?.is_premium;

  let query = supabase.from('activities').select('*');
  if (species.length > 0) {
    query = query.in('species', species);
  }

  const { data: activities } = await query.order('difficulty', { ascending: true });
  renderActivities(activities || [], lang, isPremium);
}

function renderActivities(activities, lang, isPremium) {
  const container = document.getElementById('activities-list');
  if (!container) return;

  if (activities.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎮</div>
        <p class="text-secondary">${t('activities.noActivities')}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = activities.map(act => {
    const title = lang === 'tr' ? act.title_tr : act.title_en;
    const desc = lang === 'tr' ? act.description_tr : act.description_en;
    const locked = act.is_premium && !isPremium;
    const icon = ACTIVITY_ICONS[act.species] || '🎯';
    const difficultyColors = { easy: 'success', medium: 'warning', hard: 'danger' };

    return `
      <div class="card activity-card ${locked ? 'premium-lock' : ''} mb-sm">
        ${locked ? `<div class="premium-lock-badge"><span class="badge badge-premium">${t('activities.premium')}</span></div>` : ''}
        <div class="activity-icon">${icon}</div>
        <div class="activity-info">
          <div class="activity-title">${title}</div>
          <p class="activity-desc">${desc}</p>
          <div class="activity-meta">
            <span class="badge badge-${difficultyColors[act.difficulty]}">${t('activities.' + act.difficulty)}</span>
            ${act.duration_minutes ? `<span class="badge badge-info">${act.duration_minutes} ${t('activities.minutes')}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}
