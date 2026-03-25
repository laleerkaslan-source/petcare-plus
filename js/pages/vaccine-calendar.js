import { t } from '../i18n.js';
import { supabase } from '../supabase.js';
import { getState } from '../store.js';
import { showToast } from '../components/toast.js';
import { animateCalendarGrid, animateCards, addCardHoverEffects } from '../animations.js';

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let vaccines = [];

export default async function vaccineCalendarPage() {
  const content = document.getElementById('page-content');
  content.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">${t('vaccine.title')}</h1>
      <button class="btn btn-primary btn-sm" id="add-vaccine-btn">+ ${t('vaccine.add')}</button>
    </div>
    <div class="card mb-md">
      <div class="calendar-header">
        <button class="btn btn-icon btn-secondary" id="prev-month">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="calendar-month" id="month-label"></span>
        <button class="btn btn-icon btn-secondary" id="next-month">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      <div class="calendar-grid" id="calendar-grid"></div>
    </div>
    <h3 class="mb-sm">${t('vaccine.upcoming')}</h3>
    <div class="vaccine-list" id="vaccine-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
    <div id="vaccine-modal"></div>
  `;

  document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  });
  document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  });
  document.getElementById('add-vaccine-btn').addEventListener('click', showAddVaccineModal);

  await loadVaccines();
  renderCalendar();
}

async function loadVaccines() {
  const { user } = getState();
  const { data } = await supabase
    .from('vaccines')
    .select('*, pets(name, species)')
    .eq('user_id', user.id)
    .order('next_due_date', { ascending: true });
  vaccines = data || [];
  renderVaccineList();
}

function renderCalendar() {
  const monthNames = {
    tr: ['Ocak','Subat','Mart','Nisan','Mayis','Haziran','Temmuz','Agustos','Eylul','Ekim','Kasim','Aralik'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December']
  };
  const dayNames = {
    tr: ['Pzt','Sal','Car','Per','Cum','Cmt','Paz'],
    en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  };

  const lang = getState().language;
  document.getElementById('month-label').textContent = `${monthNames[lang][currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const startDay = (firstDay.getDay() + 6) % 7; // Monday start

  const today = new Date().toISOString().split('T')[0];

  let html = dayNames[lang].map(d => `<div class="calendar-day-name">${d}</div>`).join('');

  // Empty cells before first day
  for (let i = 0; i < startDay; i++) {
    html += '<div class="calendar-day other-month"></div>';
  }

  // Days of month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = dateStr === today;
    const dayVaccines = vaccines.filter(v => v.next_due_date === dateStr || v.administered_date === dateStr);
    const hasOverdue = dayVaccines.some(v => !v.is_completed && v.next_due_date && v.next_due_date < today);

    let classes = 'calendar-day';
    if (isToday) classes += ' today';
    if (dayVaccines.length > 0) classes += hasOverdue ? ' has-overdue' : ' has-vaccine';

    html += `<div class="${classes}" data-date="${dateStr}">${day}</div>`;
  }

  document.getElementById('calendar-grid').innerHTML = html;
  animateCalendarGrid('.calendar-day');
}

function renderVaccineList() {
  const container = document.getElementById('vaccine-list');
  if (!container) return;

  const today = new Date().toISOString().split('T')[0];
  const upcoming = vaccines.filter(v => !v.is_completed);

  if (upcoming.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p class="text-secondary">${t('vaccine.noVaccines')}</p>
        <p class="text-sm text-secondary">${t('vaccine.noVaccinesDesc')}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = upcoming.map(v => {
    const isOverdue = v.next_due_date && v.next_due_date < today;
    const status = isOverdue ? 'overdue' : 'upcoming';
    const petName = v.pets?.name || '';

    return `
      <div class="card vaccine-item" data-vaccine-id="${v.id}">
        <div class="vaccine-status ${status}"></div>
        <div class="vaccine-info">
          <div class="vaccine-name">${v.vaccine_name}</div>
          <div class="vaccine-date">${v.next_due_date || '-'}</div>
          <div class="vaccine-pet">${petName}</div>
        </div>
        <div class="flex gap-xs">
          <button class="btn btn-sm btn-secondary mark-done-btn" data-id="${v.id}" title="${t('vaccine.markDone')}">✓</button>
          <button class="btn btn-sm btn-secondary delete-vaccine-btn" data-id="${v.id}" title="${t('vaccine.delete')}">✕</button>
        </div>
      </div>
    `;
  }).join('');

  animateCards('.vaccine-item');
  addCardHoverEffects('.vaccine-item');

  container.querySelectorAll('.mark-done-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await markVaccineDone(btn.dataset.id);
    });
  });

  container.querySelectorAll('.delete-vaccine-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await deleteVaccine(btn.dataset.id);
    });
  });
}

async function markVaccineDone(id) {
  const { error } = await supabase
    .from('vaccines')
    .update({ is_completed: true, administered_date: new Date().toISOString().split('T')[0] })
    .eq('id', id);
  if (error) { showToast(t('common.error'), 'error'); return; }
  showToast(t('common.success'), 'success');
  await loadVaccines();
  renderCalendar();
}

async function deleteVaccine(id) {
  if (!confirm(t('vaccine.delete') + '?')) return;
  const { error } = await supabase.from('vaccines').delete().eq('id', id);
  if (error) { showToast(t('common.error'), 'error'); return; }
  showToast(t('common.success'), 'success');
  await loadVaccines();
  renderCalendar();
}

function showAddVaccineModal() {
  const { pets } = getState();
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('hidden');
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">${t('vaccine.add')}</h2>
        <button class="btn btn-icon" id="close-modal">✕</button>
      </div>
      <form id="vaccine-form">
        <div class="form-group">
          <label class="form-label">${t('vaccine.pet')} *</label>
          <select class="form-select" id="vaccine-pet" required>
            <option value="">--</option>
            ${pets.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">${t('vaccine.name')} *</label>
          <input type="text" class="form-input" id="vaccine-name" required>
        </div>
        <div class="form-group">
          <label class="form-label">${t('vaccine.date')}</label>
          <input type="date" class="form-input" id="vaccine-date">
        </div>
        <div class="form-group">
          <label class="form-label">${t('vaccine.nextDate')}</label>
          <input type="date" class="form-input" id="vaccine-next-date">
        </div>
        <div class="form-group">
          <label class="form-label">${t('vaccine.notes')}</label>
          <textarea class="form-input" id="vaccine-notes" rows="2"></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-full">${t('vaccine.save')}</button>
      </form>
    </div>
  `;

  document.getElementById('close-modal').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

  document.getElementById('vaccine-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const petId = document.getElementById('vaccine-pet').value;
    const name = document.getElementById('vaccine-name').value.trim();

    if (!petId) { showToast(t('vaccine.petRequired'), 'error'); return; }
    if (!name) { showToast(t('vaccine.nameRequired'), 'error'); return; }

    const { user } = getState();
    const { error } = await supabase.from('vaccines').insert({
      pet_id: petId,
      user_id: user.id,
      vaccine_name: name,
      administered_date: document.getElementById('vaccine-date').value || null,
      next_due_date: document.getElementById('vaccine-next-date').value || null,
      notes: document.getElementById('vaccine-notes').value.trim() || null,
      is_completed: !!document.getElementById('vaccine-date').value,
    });

    if (error) { showToast(t('common.error'), 'error'); return; }
    showToast(t('common.success'), 'success');
    closeModal();
    await loadVaccines();
    renderCalendar();
  });
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('hidden');
  overlay.innerHTML = '';
}
