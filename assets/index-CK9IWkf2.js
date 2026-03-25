import{C as e,E as t,S as n,T as r,_ as i,a,b as o,c as s,d as c,f as l,g as u,h as d,i as f,l as p,m,o as h,p as g,r as _,s as v,t as y,u as b,v as ee,w as x,x as S,y as C}from"./settings-Ubd8CGJM.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function w(){if(!(!(`Notification`in window)||!(`serviceWorker`in navigator)))try{let e=await navigator.serviceWorker.register(`/petcare-plus/sw.js`);console.log(`SW registered:`,e.scope)}catch(e){console.warn(`SW registration failed:`,e)}}async function te(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="auth-page">
      <div class="auth-logo">
        <div style="font-size: 64px;">🐾</div>
        <h1>${v(`app.name`)}</h1>
        <p>${v(`auth.subtitle`)}</p>
      </div>
      <form class="auth-form" id="login-form">
        <div class="form-group">
          <label class="form-label">${v(`auth.email`)}</label>
          <input type="email" class="form-input" id="login-email" placeholder="${v(`auth.email`)}" required autocomplete="email">
        </div>
        <div class="form-group">
          <label class="form-label">${v(`auth.password`)}</label>
          <input type="password" class="form-input" id="login-password" placeholder="${v(`auth.password`)}" required autocomplete="current-password">
        </div>
        <button type="submit" class="btn btn-primary btn-full mt-md" id="login-btn">
          ${v(`auth.loginBtn`)}
        </button>
      </form>
      <div class="auth-footer">
        <p>${v(`auth.noAccount`)} <a href="#/register">${v(`auth.register`)}</a></p>
      </div>
    </div>
  `,d(),document.getElementById(`login-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`login-email`).value.trim(),n=document.getElementById(`login-password`).value,r=document.getElementById(`login-btn`);if(!t||!n){_(v(`auth.emailRequired`),`error`);return}i(r),r.disabled=!0,r.textContent=v(`common.loading`);try{await p(t,n),l(`/dashboard`)}catch{_(v(`auth.loginError`),`error`)}finally{r.disabled=!1,r.textContent=v(`auth.loginBtn`)}})}async function ne(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="auth-page">
      <div class="auth-logo">
        <div style="font-size: 64px;">🐾</div>
        <h1>${v(`app.name`)}</h1>
        <p>${v(`auth.subtitle`)}</p>
      </div>
      <form class="auth-form" id="register-form">
        <div class="form-group">
          <label class="form-label">${v(`auth.name`)}</label>
          <input type="text" class="form-input" id="reg-name" placeholder="${v(`auth.name`)}" required>
        </div>
        <div class="form-group">
          <label class="form-label">${v(`auth.email`)}</label>
          <input type="email" class="form-input" id="reg-email" placeholder="${v(`auth.email`)}" required autocomplete="email">
        </div>
        <div class="form-group">
          <label class="form-label">${v(`auth.password`)}</label>
          <input type="password" class="form-input" id="reg-password" placeholder="${v(`auth.password`)}" required autocomplete="new-password" minlength="6">
        </div>
        <button type="submit" class="btn btn-primary btn-full mt-md" id="reg-btn">
          ${v(`auth.registerBtn`)}
        </button>
      </form>
      <div class="auth-footer">
        <p>${v(`auth.hasAccount`)} <a href="#/login">${v(`auth.login`)}</a></p>
      </div>
    </div>
  `,d(),document.getElementById(`register-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`reg-name`).value.trim(),n=document.getElementById(`reg-email`).value.trim(),r=document.getElementById(`reg-password`).value,a=document.getElementById(`reg-btn`);if(!t){_(v(`auth.nameRequired`),`error`);return}if(!n){_(v(`auth.emailRequired`),`error`);return}if(r.length<6){_(v(`auth.passwordMin`),`error`);return}i(a),a.disabled=!0,a.textContent=v(`common.loading`);try{await b(n,r,t),_(v(`auth.registerSuccess`),`success`),l(`/login`)}catch{_(v(`auth.registerError`),`error`)}finally{a.disabled=!1,a.textContent=v(`auth.registerBtn`)}})}var re={dog:`🐕`,cat:`🐱`,bird:`🐦`,fish:`🐟`,rabbit:`🐰`,other:`🐾`};async function T(){let{profile:t}=e(),n=t?.display_name||``,r=document.getElementById(`page-content`);r.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="dashboard-greeting">${v(`dashboard.greeting`).replace(`{name}`,n)}</h1>
        <p class="dashboard-subtitle">${v(`dashboard.subtitle`)}</p>
      </div>
    </div>
    <div class="flex items-center justify-between mb-md">
      <h2>${v(`dashboard.myPets`)}</h2>
      <button class="btn btn-primary btn-sm" id="add-pet-btn">+ ${v(`dashboard.addPet`)}</button>
    </div>
    <div class="pets-grid" id="pets-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
  `,document.getElementById(`add-pet-btn`).addEventListener(`click`,()=>{l(`/pet/new`)}),S(r.querySelector(`.dashboard-greeting`)),await E()}async function E(){let{user:n}=e(),{data:i,error:a}=await t.from(`pets`).select(`*`).eq(`user_id`,n.id).eq(`is_active`,!0).order(`created_at`,{ascending:!1});if(a){console.error(`Error loading pets:`,a);return}r(`pets`,i||[]),D(i||[])}function D(e){let t=document.getElementById(`pets-list`);if(t){if(e.length===0){t.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">🐾</div>
        <h3 class="empty-state-title">${v(`dashboard.noPets`)}</h3>
        <p>${v(`dashboard.noPetsDesc`)}</p>
        <button class="btn btn-primary mt-lg" onclick="location.hash='#/pet/new'">
          + ${v(`dashboard.addPet`)}
        </button>
      </div>
    `;return}t.innerHTML=e.map(e=>{let t=re[e.species]||`🐾`,n=e.birth_date?O(e.birth_date):``;return`
      <div class="card pet-card" data-pet-id="${e.id}">
        ${e.photo_url?`<img class="avatar" src="${e.photo_url}" alt="${e.name}">`:`<div class="avatar">${t}</div>`}
        <div class="pet-card-info">
          <div class="pet-card-name">${e.name}</div>
          <div class="pet-card-breed">${v(`pet.species_`+e.species)}${e.breed?` - `+e.breed:``}</div>
          <div class="pet-card-badges">
            ${n?`<span class="badge badge-info">${n}</span>`:``}
            <span class="badge badge-${e.health_status===`healthy`?`success`:`warning`}">${v(`pet.health_`+(e.health_status===`chronic_condition`?`chronic`:e.health_status===`special_needs`?`special`:e.health_status))}</span>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    `}).join(``),C(`.pet-card`),m(`.pet-card`),u(`.badge`),t.querySelectorAll(`.avatar`).forEach(e=>n(e)),t.querySelectorAll(`.pet-card`).forEach(e=>{e.addEventListener(`click`,()=>{l(`/pet/`+e.dataset.petId)})})}}function O(e){let t=new Date(e),n=new Date,r=(n.getFullYear()-t.getFullYear())*12+(n.getMonth()-t.getMonth());return r>=12?`${Math.floor(r/12)} ${v(`pet.years`)}`:`${r} ${v(`pet.months`)}`}var k=[`dog`,`cat`,`bird`,`fish`,`rabbit`,`other`],A=[`male`,`female`,`unknown`],j=[`healthy`,`chronic_condition`,`recovering`,`special_needs`],M={healthy:`healthy`,chronic_condition:`chronic`,recovering:`recovering`,special_needs:`special`};async function N(e){let n=e?.id,r=null;if(n){let{data:n}=await t.from(`pets`).select(`*`).eq(`id`,e.id).single();r=n}let i=document.getElementById(`page-content`);i.innerHTML=`
    <div class="page-header">
      <button class="btn btn-sm btn-secondary" id="back-btn">${v(`common.back`)}</button>
      <h1 class="page-title">${v(n?`pet.editTitle`:`pet.addTitle`)}</h1>
      <div style="width:60px"></div>
    </div>
    <form id="pet-form">
      <div class="form-group">
        <label class="form-label">${v(`pet.name`)} *</label>
        <input type="text" class="form-input" id="pet-name" value="${r?.name||``}" required>
      </div>
      <div class="form-group">
        <label class="form-label">${v(`pet.species`)} *</label>
        <select class="form-select" id="pet-species" required>
          <option value="">--</option>
          ${k.map(e=>`<option value="${e}" ${r?.species===e?`selected`:``}>${v(`pet.species_`+e)}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">${v(`pet.breed`)}</label>
        <input type="text" class="form-input" id="pet-breed" value="${r?.breed||``}">
      </div>
      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">${v(`pet.birthDate`)}</label>
          <input type="date" class="form-input" id="pet-birth" value="${r?.birth_date||``}">
        </div>
        <div class="form-group">
          <label class="form-label">${v(`pet.gender`)}</label>
          <select class="form-select" id="pet-gender">
            <option value="">--</option>
            ${A.map(e=>`<option value="${e}" ${r?.gender===e?`selected`:``}>${v(`pet.gender_`+e)}</option>`).join(``)}
          </select>
        </div>
      </div>
      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">${v(`pet.weight`)}</label>
          <input type="number" step="0.1" class="form-input" id="pet-weight" value="${r?.weight_kg||``}">
        </div>
        <div class="form-group">
          <label class="form-label">${v(`pet.healthStatus`)}</label>
          <select class="form-select" id="pet-health">
            ${j.map(e=>`<option value="${e}" ${r?.health_status===e?`selected`:``}>${v(`pet.health_`+M[e])}</option>`).join(``)}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">${v(`pet.healthNotes`)}</label>
        <textarea class="form-input" id="pet-notes" rows="3" style="resize:vertical">${r?.health_notes||``}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">${v(`pet.adoptedDate`)}</label>
        <input type="date" class="form-input" id="pet-adopted" value="${r?.adopted_date||``}">
      </div>
      <div class="form-group">
        <label class="form-label">${v(`pet.photo`)}</label>
        <input type="file" class="form-input" id="pet-photo" accept="image/*">
        ${r?.photo_url?`<img src="${r.photo_url}" class="mt-sm" style="width:80px;height:80px;border-radius:var(--radius-md);object-fit:cover">`:``}
      </div>
      <button type="submit" class="btn btn-primary btn-full mt-md" id="save-btn">${v(`pet.save`)}</button>
      ${n?`<button type="button" class="btn btn-danger btn-full mt-sm" id="delete-btn">${v(`pet.delete`)}</button>`:``}
    </form>
  `,document.getElementById(`back-btn`).addEventListener(`click`,()=>{history.back()}),document.getElementById(`pet-form`).addEventListener(`submit`,async t=>{t.preventDefault(),await P(n?e.id:null)}),n&&document.getElementById(`delete-btn`)?.addEventListener(`click`,async()=>{confirm(v(`pet.deleteConfirm`))&&await F(e.id)})}async function P(n){let r=document.getElementById(`pet-name`).value.trim(),i=document.getElementById(`pet-species`).value;if(!r){_(v(`pet.nameRequired`),`error`);return}if(!i){_(v(`pet.speciesRequired`),`error`);return}let a=document.getElementById(`save-btn`);a.disabled=!0,a.textContent=v(`common.loading`);let{user:o}=e(),s={user_id:o.id,name:r,species:i,breed:document.getElementById(`pet-breed`).value.trim()||null,birth_date:document.getElementById(`pet-birth`).value||null,gender:document.getElementById(`pet-gender`).value||null,weight_kg:parseFloat(document.getElementById(`pet-weight`).value)||null,health_status:document.getElementById(`pet-health`).value,health_notes:document.getElementById(`pet-notes`).value.trim()||null,adopted_date:document.getElementById(`pet-adopted`).value||null};try{let e=document.getElementById(`pet-photo`).files[0];if(e){let r=e.name.split(`.`).pop(),i=`${o.id}/${n||crypto.randomUUID()}.${r}`,{error:a}=await t.storage.from(`pet-photos`).upload(i,e,{upsert:!0});if(!a){let{data:e}=t.storage.from(`pet-photos`).getPublicUrl(i);s.photo_url=e.publicUrl}}if(n){let{error:e}=await t.from(`pets`).update(s).eq(`id`,n);if(e)throw e;_(v(`common.success`),`success`)}else{let{error:e}=await t.from(`pets`).insert(s);if(e)throw e;_(v(`common.success`),`success`)}l(`/dashboard`)}catch(e){_(v(`common.error`),`error`),console.error(e)}finally{a.disabled=!1,a.textContent=v(`pet.save`)}}async function F(e){try{let{error:n}=await t.from(`pets`).update({is_active:!1}).eq(`id`,e);if(n)throw n;_(v(`common.success`),`success`),l(`/dashboard`)}catch{_(v(`common.error`),`error`)}}var I={dog:`🐕`,cat:`🐱`,bird:`🐦`,fish:`🐟`,rabbit:`🐰`,other:`🐾`};async function L(e){let n=document.getElementById(`page-content`);n.innerHTML=`<div class="page-loader"><div class="loader"></div></div>`;let{data:r}=await t.from(`pets`).select(`*`).eq(`id`,e.id).single();if(!r){l(`/dashboard`);return}let{data:i}=await t.from(`vaccines`).select(`*`).eq(`pet_id`,r.id).order(`next_due_date`,{ascending:!0}),a=I[r.species]||`🐾`,o=r.birth_date?z(r.birth_date):`-`,s=r.adopted_date?z(r.adopted_date):`-`,c=r.health_status===`chronic_condition`?`chronic`:r.health_status===`special_needs`?`special`:r.health_status;n.innerHTML=`
    <div class="page-header">
      <button class="btn btn-sm btn-secondary" id="back-btn">${v(`common.back`)}</button>
      <h1 class="page-title">${r.name}</h1>
      <button class="btn btn-sm btn-secondary" id="edit-btn">${v(`common.edit`)}</button>
    </div>

    <div class="card pet-detail-header">
      ${r.photo_url?`<img class="avatar avatar-lg" src="${r.photo_url}" alt="${r.name}" style="margin:0 auto">`:`<div class="avatar avatar-lg" style="margin:0 auto">${a}</div>`}
      <h2 class="mt-sm">${r.name}</h2>
      <p class="text-secondary">${v(`pet.species_`+r.species)}${r.breed?` - `+r.breed:``}</p>
      <span class="badge badge-${r.health_status===`healthy`?`success`:`warning`} mt-sm">
        ${v(`pet.health_`+c)}
      </span>

      <div class="pet-detail-stats">
        <div class="stat-item">
          <div class="stat-value">${o}</div>
          <div class="stat-label">${v(`pet.age`)}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${r.weight_kg?r.weight_kg+` kg`:`-`}</div>
          <div class="stat-label">${v(`pet.weight`)}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${s}</div>
          <div class="stat-label">${v(`pet.adoptedDate`)}</div>
        </div>
      </div>
    </div>

    ${r.health_notes?`
      <div class="card mt-md">
        <h3 class="text-sm" style="color:var(--text-secondary);margin-bottom:var(--sp-xs)">${v(`pet.healthNotes`)}</h3>
        <p>${r.health_notes}</p>
      </div>
    `:``}

    <div class="flex items-center justify-between mt-lg mb-md">
      <h3>${v(`pet.vaccines`)}</h3>
      <button class="btn btn-primary btn-sm" id="add-vaccine-btn">+ ${v(`vaccine.add`)}</button>
    </div>

    <div class="vaccine-list" id="vaccine-list">
      ${R(i||[])}
    </div>
  `,document.getElementById(`back-btn`).addEventListener(`click`,()=>l(`/dashboard`)),document.getElementById(`edit-btn`).addEventListener(`click`,()=>l(`/pet/`+r.id+`/edit`)),document.getElementById(`add-vaccine-btn`).addEventListener(`click`,()=>l(`/vaccines`))}function R(e){if(e.length===0)return`<div class="empty-state"><p class="text-secondary">${v(`vaccine.noVaccines`)}</p></div>`;let t=new Date().toISOString().split(`T`)[0];return e.map(e=>{let n=`done`;return e.is_completed||(n=e.next_due_date&&e.next_due_date<t?`overdue`:`upcoming`),`
      <div class="card vaccine-item">
        <div class="vaccine-status ${n}"></div>
        <div class="vaccine-info">
          <div class="vaccine-name">${e.vaccine_name}</div>
          <div class="vaccine-date">
            ${e.administered_date||`-`} → ${e.next_due_date||`-`}
          </div>
        </div>
        <span class="badge badge-${n===`done`?`success`:n===`overdue`?`danger`:`warning`}">
          ${v(`vaccine.`+n)}
        </span>
      </div>
    `}).join(``)}function z(e){let t=new Date(e),n=new Date,r=(n.getFullYear()-t.getFullYear())*12+(n.getMonth()-t.getMonth());return r>=12?Math.floor(r/12)+` `+v(`pet.years`):r+` `+v(`pet.months`)}var B=new Date().getMonth(),V=new Date().getFullYear(),H=[];async function U(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">${v(`vaccine.title`)}</h1>
      <button class="btn btn-primary btn-sm" id="add-vaccine-btn">+ ${v(`vaccine.add`)}</button>
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
    <h3 class="mb-sm">${v(`vaccine.upcoming`)}</h3>
    <div class="vaccine-list" id="vaccine-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
    <div id="vaccine-modal"></div>
  `,document.getElementById(`prev-month`).addEventListener(`click`,()=>{B--,B<0&&(B=11,V--),G()}),document.getElementById(`next-month`).addEventListener(`click`,()=>{B++,B>11&&(B=0,V++),G()}),document.getElementById(`add-vaccine-btn`).addEventListener(`click`,Y),await W(),G()}async function W(){let{user:n}=e(),{data:r}=await t.from(`vaccines`).select(`*, pets(name, species)`).eq(`user_id`,n.id).order(`next_due_date`,{ascending:!0});H=r||[],K()}function G(){let t={tr:[`Ocak`,`Subat`,`Mart`,`Nisan`,`Mayis`,`Haziran`,`Temmuz`,`Agustos`,`Eylul`,`Ekim`,`Kasim`,`Aralik`],en:[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`]},n={tr:[`Pzt`,`Sal`,`Car`,`Per`,`Cum`,`Cmt`,`Paz`],en:[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`]},r=e().language;document.getElementById(`month-label`).textContent=`${t[r][B]} ${V}`;let i=new Date(V,B,1),a=new Date(V,B+1,0),o=(i.getDay()+6)%7,s=new Date().toISOString().split(`T`)[0],c=n[r].map(e=>`<div class="calendar-day-name">${e}</div>`).join(``);for(let e=0;e<o;e++)c+=`<div class="calendar-day other-month"></div>`;for(let e=1;e<=a.getDate();e++){let t=`${V}-${String(B+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,n=t===s,r=H.filter(e=>e.next_due_date===t||e.administered_date===t),i=r.some(e=>!e.is_completed&&e.next_due_date&&e.next_due_date<s),a=`calendar-day`;n&&(a+=` today`),r.length>0&&(a+=i?` has-overdue`:` has-vaccine`),c+=`<div class="${a}" data-date="${t}">${e}</div>`}document.getElementById(`calendar-grid`).innerHTML=c,ee(`.calendar-day`)}function K(){let e=document.getElementById(`vaccine-list`);if(!e)return;let t=new Date().toISOString().split(`T`)[0],n=H.filter(e=>!e.is_completed);if(n.length===0){e.innerHTML=`
      <div class="empty-state">
        <p class="text-secondary">${v(`vaccine.noVaccines`)}</p>
        <p class="text-sm text-secondary">${v(`vaccine.noVaccinesDesc`)}</p>
      </div>
    `;return}e.innerHTML=n.map(e=>{let n=e.next_due_date&&e.next_due_date<t?`overdue`:`upcoming`,r=e.pets?.name||``;return`
      <div class="card vaccine-item" data-vaccine-id="${e.id}">
        <div class="vaccine-status ${n}"></div>
        <div class="vaccine-info">
          <div class="vaccine-name">${e.vaccine_name}</div>
          <div class="vaccine-date">${e.next_due_date||`-`}</div>
          <div class="vaccine-pet">${r}</div>
        </div>
        <div class="flex gap-xs">
          <button class="btn btn-sm btn-secondary mark-done-btn" data-id="${e.id}" title="${v(`vaccine.markDone`)}">✓</button>
          <button class="btn btn-sm btn-secondary delete-vaccine-btn" data-id="${e.id}" title="${v(`vaccine.delete`)}">✕</button>
        </div>
      </div>
    `}).join(``),C(`.vaccine-item`),m(`.vaccine-item`),e.querySelectorAll(`.mark-done-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation(),await q(e.dataset.id)})}),e.querySelectorAll(`.delete-vaccine-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation(),await J(e.dataset.id)})})}async function q(e){let{error:n}=await t.from(`vaccines`).update({is_completed:!0,administered_date:new Date().toISOString().split(`T`)[0]}).eq(`id`,e);if(n){_(v(`common.error`),`error`);return}_(v(`common.success`),`success`),await W(),G()}async function J(e){if(!confirm(v(`vaccine.delete`)+`?`))return;let{error:n}=await t.from(`vaccines`).delete().eq(`id`,e);if(n){_(v(`common.error`),`error`);return}_(v(`common.success`),`success`),await W(),G()}function Y(){let{pets:n}=e(),r=document.getElementById(`modal-overlay`);r.classList.remove(`hidden`),r.innerHTML=`
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">${v(`vaccine.add`)}</h2>
        <button class="btn btn-icon" id="close-modal">✕</button>
      </div>
      <form id="vaccine-form">
        <div class="form-group">
          <label class="form-label">${v(`vaccine.pet`)} *</label>
          <select class="form-select" id="vaccine-pet" required>
            <option value="">--</option>
            ${n.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">${v(`vaccine.name`)} *</label>
          <input type="text" class="form-input" id="vaccine-name" required>
        </div>
        <div class="form-group">
          <label class="form-label">${v(`vaccine.date`)}</label>
          <input type="date" class="form-input" id="vaccine-date">
        </div>
        <div class="form-group">
          <label class="form-label">${v(`vaccine.nextDate`)}</label>
          <input type="date" class="form-input" id="vaccine-next-date">
        </div>
        <div class="form-group">
          <label class="form-label">${v(`vaccine.notes`)}</label>
          <textarea class="form-input" id="vaccine-notes" rows="2"></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-full">${v(`vaccine.save`)}</button>
      </form>
    </div>
  `,document.getElementById(`close-modal`).addEventListener(`click`,X),r.addEventListener(`click`,e=>{e.target===r&&X()}),document.getElementById(`vaccine-form`).addEventListener(`submit`,async n=>{n.preventDefault();let r=document.getElementById(`vaccine-pet`).value,i=document.getElementById(`vaccine-name`).value.trim();if(!r){_(v(`vaccine.petRequired`),`error`);return}if(!i){_(v(`vaccine.nameRequired`),`error`);return}let{user:a}=e(),{error:o}=await t.from(`vaccines`).insert({pet_id:r,user_id:a.id,vaccine_name:i,administered_date:document.getElementById(`vaccine-date`).value||null,next_due_date:document.getElementById(`vaccine-next-date`).value||null,notes:document.getElementById(`vaccine-notes`).value.trim()||null,is_completed:!!document.getElementById(`vaccine-date`).value});if(o){_(v(`common.error`),`error`);return}_(v(`common.success`),`success`),X(),await W(),G()})}function X(){let e=document.getElementById(`modal-overlay`);e.classList.add(`hidden`),e.innerHTML=``}var ie=[`all`,`nutrition`,`exercise`,`grooming`,`health`,`behavior`],Z=`all`;async function ae(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">${v(`tips.title`)}</h1>
    </div>
    <div class="tips-categories" id="category-tabs">
      ${ie.map(e=>`
        <button class="category-chip ${e===Z?`active`:``}" data-category="${e}">
          ${v(`tips.`+e)}
        </button>
      `).join(``)}
    </div>
    <div id="tips-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
  `,document.getElementById(`category-tabs`).addEventListener(`click`,e=>{let t=e.target.closest(`.category-chip`);t&&(Z=t.dataset.category,document.querySelectorAll(`.category-chip`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),Q())}),o(`.category-chip`),await Q()}async function Q(){let{pets:n,profile:r}=e(),i=a(),o=[...new Set(n.map(e=>e.species))],s=r?.is_premium,c=t.from(`health_tips`).select(`*`);o.length>0&&(c=c.in(`species`,o)),Z!==`all`&&(c=c.eq(`category`,Z));let{data:l}=await c.order(`created_at`,{ascending:!1});oe(l||[],i,s)}function oe(e,t,n){let r=document.getElementById(`tips-list`);if(r){if(e.length===0){r.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">💡</div>
        <p class="text-secondary">${v(`tips.noTips`)}</p>
      </div>
    `;return}r.innerHTML=e.map(e=>{let r=t===`tr`?e.title_tr:e.title_en,i=t===`tr`?e.content_tr:e.content_en,a=e.is_premium&&!n;return`
      <div class="card tip-card ${a?`premium-lock`:``} mb-md">
        ${a?`<div class="premium-lock-badge"><span class="badge badge-premium">${v(`tips.premium`)}</span></div>`:``}
        ${e.image_url?`<img class="tip-card-image" src="${e.image_url}" alt="${r}">`:``}
        <div class="tip-card-body">
          <span class="badge badge-info mb-sm">${v(`tips.`+e.category)}</span>
          <h3 class="tip-card-title">${r}</h3>
          <p class="tip-card-excerpt">${i}</p>
        </div>
      </div>
    `}).join(``),C(`.tip-card`),m(`.tip-card`)}}var se={dog:`🎾`,cat:`🧶`,bird:`🪶`,fish:`🫧`,rabbit:`🥕`,other:`🎯`};async function ce(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">${v(`activities.title`)}</h1>
    </div>
    <div id="activities-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
  `,await le()}async function le(){let{pets:n,profile:r}=e(),i=a(),o=[...new Set(n.map(e=>e.species))],s=r?.is_premium,c=t.from(`activities`).select(`*`);o.length>0&&(c=c.in(`species`,o));let{data:l}=await c.order(`difficulty`,{ascending:!0});$(l||[],i,s)}function $(e,t,r){let i=document.getElementById(`activities-list`);if(i){if(e.length===0){i.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">🎮</div>
        <p class="text-secondary">${v(`activities.noActivities`)}</p>
      </div>
    `;return}i.innerHTML=e.map(e=>{let n=t===`tr`?e.title_tr:e.title_en,i=t===`tr`?e.description_tr:e.description_en,a=e.is_premium&&!r,o=se[e.species]||`🎯`;return`
      <div class="card activity-card ${a?`premium-lock`:``} mb-sm">
        ${a?`<div class="premium-lock-badge"><span class="badge badge-premium">${v(`activities.premium`)}</span></div>`:``}
        <div class="activity-icon">${o}</div>
        <div class="activity-info">
          <div class="activity-title">${n}</div>
          <p class="activity-desc">${i}</p>
          <div class="activity-meta">
            <span class="badge badge-${{easy:`success`,medium:`warning`,hard:`danger`}[e.difficulty]}">${v(`activities.`+e.difficulty)}</span>
            ${e.duration_minutes?`<span class="badge badge-info">${e.duration_minutes} ${v(`activities.minutes`)}</span>`:``}
          </div>
        </div>
      </div>
    `}).join(``),C(`.activity-card`),m(`.activity-card`),u(`.activity-meta .badge`),i.querySelectorAll(`.activity-icon`).forEach(e=>n(e))}}async function ue(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="page-header">
      <button class="btn btn-sm btn-secondary" id="back-btn">${v(`common.back`)}</button>
      <h1 class="page-title">${v(`premium.title`)}</h1>
      <div style="width:60px"></div>
    </div>

    <div class="premium-hero">
      <div style="font-size:48px">⭐</div>
      <h2>${v(`premium.title`)}</h2>
      <p>${v(`premium.subtitle`)}</p>
    </div>

    <div class="card mb-md">
      <div class="premium-feature">
        <div class="premium-feature-icon">🐾</div>
        <div>
          <strong>${v(`premium.feature1`)}</strong>
          <p class="text-sm text-secondary">${v(`premium.feature1Desc`)}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="premium-feature">
        <div class="premium-feature-icon">💊</div>
        <div>
          <strong>${v(`premium.feature2`)}</strong>
          <p class="text-sm text-secondary">${v(`premium.feature2Desc`)}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="premium-feature">
        <div class="premium-feature-icon">🔔</div>
        <div>
          <strong>${v(`premium.feature3`)}</strong>
          <p class="text-sm text-secondary">${v(`premium.feature3Desc`)}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="premium-feature">
        <div class="premium-feature-icon">🎮</div>
        <div>
          <strong>${v(`premium.feature4`)}</strong>
          <p class="text-sm text-secondary">${v(`premium.feature4Desc`)}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-2 mb-lg">
      <div class="card text-center" style="cursor:pointer;border:2px solid var(--border)" id="monthly-plan">
        <p class="text-sm text-secondary mb-sm">${v(`premium.subscribe`)}</p>
        <p style="font-size:var(--fs-xl);font-weight:var(--fw-bold)">${v(`premium.monthlyPrice`)}</p>
      </div>
      <div class="card text-center" style="cursor:pointer;border:2px solid var(--primary);position:relative" id="yearly-plan">
        <span class="badge badge-premium" style="position:absolute;top:-8px;right:-8px">${v(`premium.bestValue`)}</span>
        <p class="text-sm text-secondary mb-sm">${v(`premium.subscribe`)}</p>
        <p style="font-size:var(--fs-xl);font-weight:var(--fw-bold)">${v(`premium.yearlyPrice`)}</p>
      </div>
    </div>

    <button class="btn btn-primary btn-full" id="subscribe-btn">${v(`premium.subscribe`)}</button>
  `,document.getElementById(`back-btn`).addEventListener(`click`,()=>l(`/settings`)),document.getElementById(`subscribe-btn`).addEventListener(`click`,()=>{_(`Premium abonelik yakinda aktif olacak!`,`info`)}),document.querySelectorAll(`#monthly-plan, #yearly-plan`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`#monthly-plan, #yearly-plan`).forEach(e=>{e.style.borderColor=`var(--border)`}),e.style.borderColor=`var(--primary)`})})}async function de(){if(await h(),g(`/login`,te),g(`/register`,ne),g(`/dashboard`,T),g(`/pet/new`,N),g(`/pet/:id`,e=>L(e)),g(`/pet/:id/edit`,e=>N(e)),g(`/vaccines`,U),g(`/tips`,ae),g(`/activities`,ce),g(`/settings`,y),g(`/premium`,ue),await s(),f(),x(`language`,()=>f()),w(),c(),!window.location.hash){let{user:t}=e();l(t?`/dashboard`:`/login`)}}de();