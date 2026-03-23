import { t } from '../i18n.js';
import { supabase } from '../supabase.js';
import { navigate } from '../router.js';

const SPECIES_EMOJI = {
  dog: '🐕', cat: '🐱', bird: '🐦', fish: '🐟', rabbit: '🐰', other: '🐾'
};

export default async function petDetailPage(params) {
  const content = document.getElementById('page-content');
  content.innerHTML = '<div class="page-loader"><div class="loader"></div></div>';

  const { data: pet } = await supabase.from('pets').select('*').eq('id', params.id).single();
  if (!pet) { navigate('/dashboard'); return; }

  const { data: vaccines } = await supabase
    .from('vaccines')
    .select('*')
    .eq('pet_id', pet.id)
    .order('next_due_date', { ascending: true });

  const emoji = SPECIES_EMOJI[pet.species] || '🐾';
  const age = pet.birth_date ? calculateAge(pet.birth_date) : '-';
  const adoptedDuration = pet.adopted_date ? calculateAge(pet.adopted_date) : '-';
  const healthKey = pet.health_status === 'chronic_condition' ? 'chronic' : pet.health_status === 'special_needs' ? 'special' : pet.health_status;

  content.innerHTML = `
    <div class="page-header">
      <button class="btn btn-sm btn-secondary" id="back-btn">${t('common.back')}</button>
      <h1 class="page-title">${pet.name}</h1>
      <button class="btn btn-sm btn-secondary" id="edit-btn">${t('common.edit')}</button>
    </div>

    <div class="card pet-detail-header">
      ${pet.photo_url
        ? `<img class="avatar avatar-lg" src="${pet.photo_url}" alt="${pet.name}" style="margin:0 auto">`
        : `<div class="avatar avatar-lg" style="margin:0 auto">${emoji}</div>`
      }
      <h2 class="mt-sm">${pet.name}</h2>
      <p class="text-secondary">${t('pet.species_' + pet.species)}${pet.breed ? ' - ' + pet.breed : ''}</p>
      <span class="badge badge-${pet.health_status === 'healthy' ? 'success' : 'warning'} mt-sm">
        ${t('pet.health_' + healthKey)}
      </span>

      <div class="pet-detail-stats">
        <div class="stat-item">
          <div class="stat-value">${age}</div>
          <div class="stat-label">${t('pet.age')}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${pet.weight_kg ? pet.weight_kg + ' kg' : '-'}</div>
          <div class="stat-label">${t('pet.weight')}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${adoptedDuration}</div>
          <div class="stat-label">${t('pet.adoptedDate')}</div>
        </div>
      </div>
    </div>

    ${pet.health_notes ? `
      <div class="card mt-md">
        <h3 class="text-sm" style="color:var(--text-secondary);margin-bottom:var(--sp-xs)">${t('pet.healthNotes')}</h3>
        <p>${pet.health_notes}</p>
      </div>
    ` : ''}

    <div class="flex items-center justify-between mt-lg mb-md">
      <h3>${t('pet.vaccines')}</h3>
      <button class="btn btn-primary btn-sm" id="add-vaccine-btn">+ ${t('vaccine.add')}</button>
    </div>

    <div class="vaccine-list" id="vaccine-list">
      ${renderVaccineList(vaccines || [])}
    </div>
  `;

  document.getElementById('back-btn').addEventListener('click', () => navigate('/dashboard'));
  document.getElementById('edit-btn').addEventListener('click', () => navigate('/pet/' + pet.id + '/edit'));
  document.getElementById('add-vaccine-btn').addEventListener('click', () => navigate('/vaccines'));
}

function renderVaccineList(vaccines) {
  if (vaccines.length === 0) {
    return `<div class="empty-state"><p class="text-secondary">${t('vaccine.noVaccines')}</p></div>`;
  }

  const today = new Date().toISOString().split('T')[0];

  return vaccines.map(v => {
    let status = 'done';
    if (!v.is_completed) {
      status = v.next_due_date && v.next_due_date < today ? 'overdue' : 'upcoming';
    }
    return `
      <div class="card vaccine-item">
        <div class="vaccine-status ${status}"></div>
        <div class="vaccine-info">
          <div class="vaccine-name">${v.vaccine_name}</div>
          <div class="vaccine-date">
            ${v.administered_date || '-'} → ${v.next_due_date || '-'}
          </div>
        </div>
        <span class="badge badge-${status === 'done' ? 'success' : status === 'overdue' ? 'danger' : 'warning'}">
          ${t('vaccine.' + status)}
        </span>
      </div>
    `;
  }).join('');
}

function calculateAge(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
  if (months >= 12) {
    return Math.floor(months / 12) + ' ' + t('pet.years');
  }
  return months + ' ' + t('pet.months');
}
