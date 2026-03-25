import { t } from '../i18n.js';
import { getState } from '../store.js';
import { supabase } from '../supabase.js';
import { setState } from '../store.js';
import { navigate } from '../router.js';
import { animateGreeting, animateCards, addCardHoverEffects, bounceEmoji, animateBadges } from '../animations.js';

const SPECIES_EMOJI = {
  dog: '🐕', cat: '🐱', bird: '🐦', fish: '🐟', rabbit: '🐰', other: '🐾'
};

export default async function dashboardPage() {
  const { profile } = getState();
  const displayName = profile?.display_name || '';

  const content = document.getElementById('page-content');
  content.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="dashboard-greeting">${t('dashboard.greeting').replace('{name}', displayName)}</h1>
        <p class="dashboard-subtitle">${t('dashboard.subtitle')}</p>
      </div>
    </div>
    <div class="flex items-center justify-between mb-md">
      <h2>${t('dashboard.myPets')}</h2>
      <button class="btn btn-primary btn-sm" id="add-pet-btn">+ ${t('dashboard.addPet')}</button>
    </div>
    <div class="pets-grid" id="pets-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
  `;

  document.getElementById('add-pet-btn').addEventListener('click', () => {
    navigate('/pet/new');
  });

  // Animate greeting
  animateGreeting(content.querySelector('.dashboard-greeting'));

  await loadPets();
}

async function loadPets() {
  const { user } = getState();
  const { data: pets, error } = await supabase
    .from('pets')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading pets:', error);
    return;
  }

  setState('pets', pets || []);
  renderPets(pets || []);
}

function renderPets(pets) {
  const container = document.getElementById('pets-list');
  if (!container) return;

  if (pets.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🐾</div>
        <h3 class="empty-state-title">${t('dashboard.noPets')}</h3>
        <p>${t('dashboard.noPetsDesc')}</p>
        <button class="btn btn-primary mt-lg" onclick="location.hash='#/pet/new'">
          + ${t('dashboard.addPet')}
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = pets.map(pet => {
    const emoji = SPECIES_EMOJI[pet.species] || '🐾';
    const age = pet.birth_date ? calculateAge(pet.birth_date) : '';
    return `
      <div class="card pet-card" data-pet-id="${pet.id}">
        ${pet.photo_url
          ? `<img class="avatar" src="${pet.photo_url}" alt="${pet.name}">`
          : `<div class="avatar">${emoji}</div>`
        }
        <div class="pet-card-info">
          <div class="pet-card-name">${pet.name}</div>
          <div class="pet-card-breed">${t('pet.species_' + pet.species)}${pet.breed ? ' - ' + pet.breed : ''}</div>
          <div class="pet-card-badges">
            ${age ? `<span class="badge badge-info">${age}</span>` : ''}
            <span class="badge badge-${pet.health_status === 'healthy' ? 'success' : 'warning'}">${t('pet.health_' + (pet.health_status === 'chronic_condition' ? 'chronic' : pet.health_status === 'special_needs' ? 'special' : pet.health_status))}</span>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    `;
  }).join('');

  // Animate pet cards entrance
  animateCards('.pet-card');
  addCardHoverEffects('.pet-card');
  animateBadges('.badge');

  // Bounce emoji avatars
  container.querySelectorAll('.avatar').forEach(a => bounceEmoji(a));

  container.querySelectorAll('.pet-card').forEach(card => {
    card.addEventListener('click', () => {
      navigate('/pet/' + card.dataset.petId);
    });
  });
}

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (months >= 12) {
    const years = Math.floor(months / 12);
    return `${years} ${t('pet.years')}`;
  }
  return `${months} ${t('pet.months')}`;
}
