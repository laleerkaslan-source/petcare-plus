import { t } from '../i18n.js';
import { supabase } from '../supabase.js';
import { getState } from '../store.js';
import { navigate } from '../router.js';
import { showToast } from '../components/toast.js';

const SPECIES_LIST = ['dog', 'cat', 'bird', 'fish', 'rabbit', 'other'];
const GENDER_LIST = ['male', 'female', 'unknown'];
const HEALTH_LIST = ['healthy', 'chronic_condition', 'recovering', 'special_needs'];
const HEALTH_KEY_MAP = {
  healthy: 'healthy',
  chronic_condition: 'chronic',
  recovering: 'recovering',
  special_needs: 'special',
};

export default async function petProfilePage(params) {
  const isEdit = params?.id;
  let pet = null;

  if (isEdit) {
    const { data } = await supabase.from('pets').select('*').eq('id', params.id).single();
    pet = data;
  }

  const content = document.getElementById('page-content');
  content.innerHTML = `
    <div class="page-header">
      <button class="btn btn-sm btn-secondary" id="back-btn">${t('common.back')}</button>
      <h1 class="page-title">${isEdit ? t('pet.editTitle') : t('pet.addTitle')}</h1>
      <div style="width:60px"></div>
    </div>
    <form id="pet-form">
      <div class="form-group">
        <label class="form-label">${t('pet.name')} *</label>
        <input type="text" class="form-input" id="pet-name" value="${pet?.name || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">${t('pet.species')} *</label>
        <select class="form-select" id="pet-species" required>
          <option value="">--</option>
          ${SPECIES_LIST.map(s => `<option value="${s}" ${pet?.species === s ? 'selected' : ''}>${t('pet.species_' + s)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">${t('pet.breed')}</label>
        <input type="text" class="form-input" id="pet-breed" value="${pet?.breed || ''}">
      </div>
      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">${t('pet.birthDate')}</label>
          <input type="date" class="form-input" id="pet-birth" value="${pet?.birth_date || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">${t('pet.gender')}</label>
          <select class="form-select" id="pet-gender">
            <option value="">--</option>
            ${GENDER_LIST.map(g => `<option value="${g}" ${pet?.gender === g ? 'selected' : ''}>${t('pet.gender_' + g)}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">${t('pet.weight')}</label>
          <input type="number" step="0.1" class="form-input" id="pet-weight" value="${pet?.weight_kg || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">${t('pet.healthStatus')}</label>
          <select class="form-select" id="pet-health">
            ${HEALTH_LIST.map(h => `<option value="${h}" ${pet?.health_status === h ? 'selected' : ''}>${t('pet.health_' + HEALTH_KEY_MAP[h])}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">${t('pet.healthNotes')}</label>
        <textarea class="form-input" id="pet-notes" rows="3" style="resize:vertical">${pet?.health_notes || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">${t('pet.adoptedDate')}</label>
        <input type="date" class="form-input" id="pet-adopted" value="${pet?.adopted_date || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('pet.photo')}</label>
        <input type="file" class="form-input" id="pet-photo" accept="image/*">
        ${pet?.photo_url ? `<img src="${pet.photo_url}" class="mt-sm" style="width:80px;height:80px;border-radius:var(--radius-md);object-fit:cover">` : ''}
      </div>
      <button type="submit" class="btn btn-primary btn-full mt-md" id="save-btn">${t('pet.save')}</button>
      ${isEdit ? `<button type="button" class="btn btn-danger btn-full mt-sm" id="delete-btn">${t('pet.delete')}</button>` : ''}
    </form>
  `;

  document.getElementById('back-btn').addEventListener('click', () => {
    history.back();
  });

  document.getElementById('pet-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await savePet(isEdit ? params.id : null);
  });

  if (isEdit) {
    document.getElementById('delete-btn')?.addEventListener('click', async () => {
      if (confirm(t('pet.deleteConfirm'))) {
        await deletePet(params.id);
      }
    });
  }
}

async function savePet(petId) {
  const name = document.getElementById('pet-name').value.trim();
  const species = document.getElementById('pet-species').value;

  if (!name) { showToast(t('pet.nameRequired'), 'error'); return; }
  if (!species) { showToast(t('pet.speciesRequired'), 'error'); return; }

  const btn = document.getElementById('save-btn');
  btn.disabled = true;
  btn.textContent = t('common.loading');

  const { user } = getState();

  const petData = {
    user_id: user.id,
    name,
    species,
    breed: document.getElementById('pet-breed').value.trim() || null,
    birth_date: document.getElementById('pet-birth').value || null,
    gender: document.getElementById('pet-gender').value || null,
    weight_kg: parseFloat(document.getElementById('pet-weight').value) || null,
    health_status: document.getElementById('pet-health').value,
    health_notes: document.getElementById('pet-notes').value.trim() || null,
    adopted_date: document.getElementById('pet-adopted').value || null,
  };

  try {
    // Upload photo if selected
    const photoFile = document.getElementById('pet-photo').files[0];
    if (photoFile) {
      const ext = photoFile.name.split('.').pop();
      const path = `${user.id}/${petId || crypto.randomUUID()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('pet-photos')
        .upload(path, photoFile, { upsert: true });
      if (!uploadErr) {
        const { data: urlData } = supabase.storage.from('pet-photos').getPublicUrl(path);
        petData.photo_url = urlData.publicUrl;
      }
    }

    if (petId) {
      const { error } = await supabase.from('pets').update(petData).eq('id', petId);
      if (error) throw error;
      showToast(t('common.success'), 'success');
    } else {
      const { error } = await supabase.from('pets').insert(petData);
      if (error) throw error;
      showToast(t('common.success'), 'success');
    }
    navigate('/dashboard');
  } catch (err) {
    showToast(t('common.error'), 'error');
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.textContent = t('pet.save');
  }
}

async function deletePet(petId) {
  try {
    const { error } = await supabase
      .from('pets')
      .update({ is_active: false })
      .eq('id', petId);
    if (error) throw error;
    showToast(t('common.success'), 'success');
    navigate('/dashboard');
  } catch (err) {
    showToast(t('common.error'), 'error');
  }
}
