import{_ as e,a as t,c as n,d as r,f as i,g as a,h as o,i as s,l as c,m as l,o as u,p as d,r as f,s as p,t as m,u as h}from"./settings-BxmJ3JIJ.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function g(){if(!(!(`Notification`in window)||!(`serviceWorker`in navigator)))try{let e=await navigator.serviceWorker.register(`/sw.js`);console.log(`SW registered:`,e.scope)}catch(e){console.warn(`SW registration failed:`,e)}}async function ee(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="auth-page">
      <div class="auth-logo">
        <div style="font-size: 64px;">🐾</div>
        <h1>${p(`app.name`)}</h1>
        <p>${p(`auth.subtitle`)}</p>
      </div>
      <form class="auth-form" id="login-form">
        <div class="form-group">
          <label class="form-label">${p(`auth.email`)}</label>
          <input type="email" class="form-input" id="login-email" placeholder="${p(`auth.email`)}" required autocomplete="email">
        </div>
        <div class="form-group">
          <label class="form-label">${p(`auth.password`)}</label>
          <input type="password" class="form-input" id="login-password" placeholder="${p(`auth.password`)}" required autocomplete="current-password">
        </div>
        <button type="submit" class="btn btn-primary btn-full mt-md" id="login-btn">
          ${p(`auth.loginBtn`)}
        </button>
      </form>
      <div class="auth-footer">
        <p>${p(`auth.noAccount`)} <a href="#/register">${p(`auth.register`)}</a></p>
      </div>
    </div>
  `,document.getElementById(`login-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`login-email`).value.trim(),n=document.getElementById(`login-password`).value,r=document.getElementById(`login-btn`);if(!t||!n){f(p(`auth.emailRequired`),`error`);return}r.disabled=!0,r.textContent=p(`common.loading`);try{await c(t,n),i(`/dashboard`)}catch{f(p(`auth.loginError`),`error`)}finally{r.disabled=!1,r.textContent=p(`auth.loginBtn`)}})}async function _(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="auth-page">
      <div class="auth-logo">
        <div style="font-size: 64px;">🐾</div>
        <h1>${p(`app.name`)}</h1>
        <p>${p(`auth.subtitle`)}</p>
      </div>
      <form class="auth-form" id="register-form">
        <div class="form-group">
          <label class="form-label">${p(`auth.name`)}</label>
          <input type="text" class="form-input" id="reg-name" placeholder="${p(`auth.name`)}" required>
        </div>
        <div class="form-group">
          <label class="form-label">${p(`auth.email`)}</label>
          <input type="email" class="form-input" id="reg-email" placeholder="${p(`auth.email`)}" required autocomplete="email">
        </div>
        <div class="form-group">
          <label class="form-label">${p(`auth.password`)}</label>
          <input type="password" class="form-input" id="reg-password" placeholder="${p(`auth.password`)}" required autocomplete="new-password" minlength="6">
        </div>
        <button type="submit" class="btn btn-primary btn-full mt-md" id="reg-btn">
          ${p(`auth.registerBtn`)}
        </button>
      </form>
      <div class="auth-footer">
        <p>${p(`auth.hasAccount`)} <a href="#/login">${p(`auth.login`)}</a></p>
      </div>
    </div>
  `,document.getElementById(`register-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`reg-name`).value.trim(),n=document.getElementById(`reg-email`).value.trim(),r=document.getElementById(`reg-password`).value,a=document.getElementById(`reg-btn`);if(!t){f(p(`auth.nameRequired`),`error`);return}if(!n){f(p(`auth.emailRequired`),`error`);return}if(r.length<6){f(p(`auth.passwordMin`),`error`);return}a.disabled=!0,a.textContent=p(`common.loading`);try{await h(n,r,t),f(p(`auth.registerSuccess`),`success`),i(`/login`)}catch{f(p(`auth.registerError`),`error`)}finally{a.disabled=!1,a.textContent=p(`auth.registerBtn`)}})}var v={dog:`🐕`,cat:`🐱`,bird:`🐦`,fish:`🐟`,rabbit:`🐰`,other:`🐾`};async function y(){let{profile:e}=l(),t=e?.display_name||``,n=document.getElementById(`page-content`);n.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="dashboard-greeting">${p(`dashboard.greeting`).replace(`{name}`,t)}</h1>
        <p class="dashboard-subtitle">${p(`dashboard.subtitle`)}</p>
      </div>
    </div>
    <div class="flex items-center justify-between mb-md">
      <h2>${p(`dashboard.myPets`)}</h2>
      <button class="btn btn-primary btn-sm" id="add-pet-btn">+ ${p(`dashboard.addPet`)}</button>
    </div>
    <div class="pets-grid" id="pets-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
  `,document.getElementById(`add-pet-btn`).addEventListener(`click`,()=>{i(`/pet/new`)}),await b()}async function b(){let{user:t}=l(),{data:n,error:r}=await e.from(`pets`).select(`*`).eq(`user_id`,t.id).eq(`is_active`,!0).order(`created_at`,{ascending:!1});if(r){console.error(`Error loading pets:`,r);return}a(`pets`,n||[]),x(n||[])}function x(e){let t=document.getElementById(`pets-list`);if(t){if(e.length===0){t.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">🐾</div>
        <h3 class="empty-state-title">${p(`dashboard.noPets`)}</h3>
        <p>${p(`dashboard.noPetsDesc`)}</p>
        <button class="btn btn-primary mt-lg" onclick="location.hash='#/pet/new'">
          + ${p(`dashboard.addPet`)}
        </button>
      </div>
    `;return}t.innerHTML=e.map(e=>{let t=v[e.species]||`🐾`,n=e.birth_date?S(e.birth_date):``;return`
      <div class="card pet-card" data-pet-id="${e.id}">
        ${e.photo_url?`<img class="avatar" src="${e.photo_url}" alt="${e.name}">`:`<div class="avatar">${t}</div>`}
        <div class="pet-card-info">
          <div class="pet-card-name">${e.name}</div>
          <div class="pet-card-breed">${p(`pet.species_`+e.species)}${e.breed?` - `+e.breed:``}</div>
          <div class="pet-card-badges">
            ${n?`<span class="badge badge-info">${n}</span>`:``}
            <span class="badge badge-${e.health_status===`healthy`?`success`:`warning`}">${p(`pet.health_`+(e.health_status===`chronic_condition`?`chronic`:e.health_status===`special_needs`?`special`:e.health_status))}</span>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    `}).join(``),t.querySelectorAll(`.pet-card`).forEach(e=>{e.addEventListener(`click`,()=>{i(`/pet/`+e.dataset.petId)})})}}function S(e){let t=new Date(e),n=new Date,r=(n.getFullYear()-t.getFullYear())*12+(n.getMonth()-t.getMonth());return r>=12?`${Math.floor(r/12)} ${p(`pet.years`)}`:`${r} ${p(`pet.months`)}`}var C=[`dog`,`cat`,`bird`,`fish`,`rabbit`,`other`],w=[`male`,`female`,`unknown`],T=[`healthy`,`chronic_condition`,`recovering`,`special_needs`],E={healthy:`healthy`,chronic_condition:`chronic`,recovering:`recovering`,special_needs:`special`};async function D(t){let n=t?.id,r=null;if(n){let{data:n}=await e.from(`pets`).select(`*`).eq(`id`,t.id).single();r=n}let i=document.getElementById(`page-content`);i.innerHTML=`
    <div class="page-header">
      <button class="btn btn-sm btn-secondary" id="back-btn">${p(`common.back`)}</button>
      <h1 class="page-title">${p(n?`pet.editTitle`:`pet.addTitle`)}</h1>
      <div style="width:60px"></div>
    </div>
    <form id="pet-form">
      <div class="form-group">
        <label class="form-label">${p(`pet.name`)} *</label>
        <input type="text" class="form-input" id="pet-name" value="${r?.name||``}" required>
      </div>
      <div class="form-group">
        <label class="form-label">${p(`pet.species`)} *</label>
        <select class="form-select" id="pet-species" required>
          <option value="">--</option>
          ${C.map(e=>`<option value="${e}" ${r?.species===e?`selected`:``}>${p(`pet.species_`+e)}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">${p(`pet.breed`)}</label>
        <input type="text" class="form-input" id="pet-breed" value="${r?.breed||``}">
      </div>
      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">${p(`pet.birthDate`)}</label>
          <input type="date" class="form-input" id="pet-birth" value="${r?.birth_date||``}">
        </div>
        <div class="form-group">
          <label class="form-label">${p(`pet.gender`)}</label>
          <select class="form-select" id="pet-gender">
            <option value="">--</option>
            ${w.map(e=>`<option value="${e}" ${r?.gender===e?`selected`:``}>${p(`pet.gender_`+e)}</option>`).join(``)}
          </select>
        </div>
      </div>
      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">${p(`pet.weight`)}</label>
          <input type="number" step="0.1" class="form-input" id="pet-weight" value="${r?.weight_kg||``}">
        </div>
        <div class="form-group">
          <label class="form-label">${p(`pet.healthStatus`)}</label>
          <select class="form-select" id="pet-health">
            ${T.map(e=>`<option value="${e}" ${r?.health_status===e?`selected`:``}>${p(`pet.health_`+E[e])}</option>`).join(``)}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">${p(`pet.healthNotes`)}</label>
        <textarea class="form-input" id="pet-notes" rows="3" style="resize:vertical">${r?.health_notes||``}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">${p(`pet.adoptedDate`)}</label>
        <input type="date" class="form-input" id="pet-adopted" value="${r?.adopted_date||``}">
      </div>
      <div class="form-group">
        <label class="form-label">${p(`pet.photo`)}</label>
        <input type="file" class="form-input" id="pet-photo" accept="image/*">
        ${r?.photo_url?`<img src="${r.photo_url}" class="mt-sm" style="width:80px;height:80px;border-radius:var(--radius-md);object-fit:cover">`:``}
      </div>
      <button type="submit" class="btn btn-primary btn-full mt-md" id="save-btn">${p(`pet.save`)}</button>
      ${n?`<button type="button" class="btn btn-danger btn-full mt-sm" id="delete-btn">${p(`pet.delete`)}</button>`:``}
    </form>
  `,document.getElementById(`back-btn`).addEventListener(`click`,()=>{history.back()}),document.getElementById(`pet-form`).addEventListener(`submit`,async e=>{e.preventDefault(),await O(n?t.id:null)}),n&&document.getElementById(`delete-btn`)?.addEventListener(`click`,async()=>{confirm(p(`pet.deleteConfirm`))&&await k(t.id)})}async function O(t){let n=document.getElementById(`pet-name`).value.trim(),r=document.getElementById(`pet-species`).value;if(!n){f(p(`pet.nameRequired`),`error`);return}if(!r){f(p(`pet.speciesRequired`),`error`);return}let a=document.getElementById(`save-btn`);a.disabled=!0,a.textContent=p(`common.loading`);let{user:o}=l(),s={user_id:o.id,name:n,species:r,breed:document.getElementById(`pet-breed`).value.trim()||null,birth_date:document.getElementById(`pet-birth`).value||null,gender:document.getElementById(`pet-gender`).value||null,weight_kg:parseFloat(document.getElementById(`pet-weight`).value)||null,health_status:document.getElementById(`pet-health`).value,health_notes:document.getElementById(`pet-notes`).value.trim()||null,adopted_date:document.getElementById(`pet-adopted`).value||null};try{let n=document.getElementById(`pet-photo`).files[0];if(n){let r=n.name.split(`.`).pop(),i=`${o.id}/${t||crypto.randomUUID()}.${r}`,{error:a}=await e.storage.from(`pet-photos`).upload(i,n,{upsert:!0});if(!a){let{data:t}=e.storage.from(`pet-photos`).getPublicUrl(i);s.photo_url=t.publicUrl}}if(t){let{error:n}=await e.from(`pets`).update(s).eq(`id`,t);if(n)throw n;f(p(`common.success`),`success`)}else{let{error:t}=await e.from(`pets`).insert(s);if(t)throw t;f(p(`common.success`),`success`)}i(`/dashboard`)}catch(e){f(p(`common.error`),`error`),console.error(e)}finally{a.disabled=!1,a.textContent=p(`pet.save`)}}async function k(t){try{let{error:n}=await e.from(`pets`).update({is_active:!1}).eq(`id`,t);if(n)throw n;f(p(`common.success`),`success`),i(`/dashboard`)}catch{f(p(`common.error`),`error`)}}var A={dog:`🐕`,cat:`🐱`,bird:`🐦`,fish:`🐟`,rabbit:`🐰`,other:`🐾`};async function j(t){let n=document.getElementById(`page-content`);n.innerHTML=`<div class="page-loader"><div class="loader"></div></div>`;let{data:r}=await e.from(`pets`).select(`*`).eq(`id`,t.id).single();if(!r){i(`/dashboard`);return}let{data:a}=await e.from(`vaccines`).select(`*`).eq(`pet_id`,r.id).order(`next_due_date`,{ascending:!0}),o=A[r.species]||`🐾`,s=r.birth_date?N(r.birth_date):`-`,c=r.adopted_date?N(r.adopted_date):`-`,l=r.health_status===`chronic_condition`?`chronic`:r.health_status===`special_needs`?`special`:r.health_status;n.innerHTML=`
    <div class="page-header">
      <button class="btn btn-sm btn-secondary" id="back-btn">${p(`common.back`)}</button>
      <h1 class="page-title">${r.name}</h1>
      <button class="btn btn-sm btn-secondary" id="edit-btn">${p(`common.edit`)}</button>
    </div>

    <div class="card pet-detail-header">
      ${r.photo_url?`<img class="avatar avatar-lg" src="${r.photo_url}" alt="${r.name}" style="margin:0 auto">`:`<div class="avatar avatar-lg" style="margin:0 auto">${o}</div>`}
      <h2 class="mt-sm">${r.name}</h2>
      <p class="text-secondary">${p(`pet.species_`+r.species)}${r.breed?` - `+r.breed:``}</p>
      <span class="badge badge-${r.health_status===`healthy`?`success`:`warning`} mt-sm">
        ${p(`pet.health_`+l)}
      </span>

      <div class="pet-detail-stats">
        <div class="stat-item">
          <div class="stat-value">${s}</div>
          <div class="stat-label">${p(`pet.age`)}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${r.weight_kg?r.weight_kg+` kg`:`-`}</div>
          <div class="stat-label">${p(`pet.weight`)}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${c}</div>
          <div class="stat-label">${p(`pet.adoptedDate`)}</div>
        </div>
      </div>
    </div>

    ${r.health_notes?`
      <div class="card mt-md">
        <h3 class="text-sm" style="color:var(--text-secondary);margin-bottom:var(--sp-xs)">${p(`pet.healthNotes`)}</h3>
        <p>${r.health_notes}</p>
      </div>
    `:``}

    <div class="flex items-center justify-between mt-lg mb-md">
      <h3>${p(`pet.vaccines`)}</h3>
      <button class="btn btn-primary btn-sm" id="add-vaccine-btn">+ ${p(`vaccine.add`)}</button>
    </div>

    <div class="vaccine-list" id="vaccine-list">
      ${M(a||[])}
    </div>
  `,document.getElementById(`back-btn`).addEventListener(`click`,()=>i(`/dashboard`)),document.getElementById(`edit-btn`).addEventListener(`click`,()=>i(`/pet/`+r.id+`/edit`)),document.getElementById(`add-vaccine-btn`).addEventListener(`click`,()=>i(`/vaccines`))}function M(e){if(e.length===0)return`<div class="empty-state"><p class="text-secondary">${p(`vaccine.noVaccines`)}</p></div>`;let t=new Date().toISOString().split(`T`)[0];return e.map(e=>{let n=`done`;return e.is_completed||(n=e.next_due_date&&e.next_due_date<t?`overdue`:`upcoming`),`
      <div class="card vaccine-item">
        <div class="vaccine-status ${n}"></div>
        <div class="vaccine-info">
          <div class="vaccine-name">${e.vaccine_name}</div>
          <div class="vaccine-date">
            ${e.administered_date||`-`} → ${e.next_due_date||`-`}
          </div>
        </div>
        <span class="badge badge-${n===`done`?`success`:n===`overdue`?`danger`:`warning`}">
          ${p(`vaccine.`+n)}
        </span>
      </div>
    `}).join(``)}function N(e){let t=new Date(e),n=new Date,r=(n.getFullYear()-t.getFullYear())*12+(n.getMonth()-t.getMonth());return r>=12?Math.floor(r/12)+` `+p(`pet.years`):r+` `+p(`pet.months`)}var P=new Date().getMonth(),F=new Date().getFullYear(),I=[];async function L(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">${p(`vaccine.title`)}</h1>
      <button class="btn btn-primary btn-sm" id="add-vaccine-btn">+ ${p(`vaccine.add`)}</button>
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
    <h3 class="mb-sm">${p(`vaccine.upcoming`)}</h3>
    <div class="vaccine-list" id="vaccine-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
    <div id="vaccine-modal"></div>
  `,document.getElementById(`prev-month`).addEventListener(`click`,()=>{P--,P<0&&(P=11,F--),z()}),document.getElementById(`next-month`).addEventListener(`click`,()=>{P++,P>11&&(P=0,F++),z()}),document.getElementById(`add-vaccine-btn`).addEventListener(`click`,U),await R(),z()}async function R(){let{user:t}=l(),{data:n}=await e.from(`vaccines`).select(`*, pets(name, species)`).eq(`user_id`,t.id).order(`next_due_date`,{ascending:!0});I=n||[],B()}function z(){let e={tr:[`Ocak`,`Subat`,`Mart`,`Nisan`,`Mayis`,`Haziran`,`Temmuz`,`Agustos`,`Eylul`,`Ekim`,`Kasim`,`Aralik`],en:[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`]},t={tr:[`Pzt`,`Sal`,`Car`,`Per`,`Cum`,`Cmt`,`Paz`],en:[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`]},n=l().language;document.getElementById(`month-label`).textContent=`${e[n][P]} ${F}`;let r=new Date(F,P,1),i=new Date(F,P+1,0),a=(r.getDay()+6)%7,o=new Date().toISOString().split(`T`)[0],s=t[n].map(e=>`<div class="calendar-day-name">${e}</div>`).join(``);for(let e=0;e<a;e++)s+=`<div class="calendar-day other-month"></div>`;for(let e=1;e<=i.getDate();e++){let t=`${F}-${String(P+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,n=t===o,r=I.filter(e=>e.next_due_date===t||e.administered_date===t),i=r.some(e=>!e.is_completed&&e.next_due_date&&e.next_due_date<o),a=`calendar-day`;n&&(a+=` today`),r.length>0&&(a+=i?` has-overdue`:` has-vaccine`),s+=`<div class="${a}" data-date="${t}">${e}</div>`}document.getElementById(`calendar-grid`).innerHTML=s}function B(){let e=document.getElementById(`vaccine-list`);if(!e)return;let t=new Date().toISOString().split(`T`)[0],n=I.filter(e=>!e.is_completed);if(n.length===0){e.innerHTML=`
      <div class="empty-state">
        <p class="text-secondary">${p(`vaccine.noVaccines`)}</p>
        <p class="text-sm text-secondary">${p(`vaccine.noVaccinesDesc`)}</p>
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
          <button class="btn btn-sm btn-secondary mark-done-btn" data-id="${e.id}" title="${p(`vaccine.markDone`)}">✓</button>
          <button class="btn btn-sm btn-secondary delete-vaccine-btn" data-id="${e.id}" title="${p(`vaccine.delete`)}">✕</button>
        </div>
      </div>
    `}).join(``),e.querySelectorAll(`.mark-done-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation(),await V(e.dataset.id)})}),e.querySelectorAll(`.delete-vaccine-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation(),await H(e.dataset.id)})})}async function V(t){let{error:n}=await e.from(`vaccines`).update({is_completed:!0,administered_date:new Date().toISOString().split(`T`)[0]}).eq(`id`,t);if(n){f(p(`common.error`),`error`);return}f(p(`common.success`),`success`),await R(),z()}async function H(t){if(!confirm(p(`vaccine.delete`)+`?`))return;let{error:n}=await e.from(`vaccines`).delete().eq(`id`,t);if(n){f(p(`common.error`),`error`);return}f(p(`common.success`),`success`),await R(),z()}function U(){let{pets:t}=l(),n=document.getElementById(`modal-overlay`);n.classList.remove(`hidden`),n.innerHTML=`
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">${p(`vaccine.add`)}</h2>
        <button class="btn btn-icon" id="close-modal">✕</button>
      </div>
      <form id="vaccine-form">
        <div class="form-group">
          <label class="form-label">${p(`vaccine.pet`)} *</label>
          <select class="form-select" id="vaccine-pet" required>
            <option value="">--</option>
            ${t.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">${p(`vaccine.name`)} *</label>
          <input type="text" class="form-input" id="vaccine-name" required>
        </div>
        <div class="form-group">
          <label class="form-label">${p(`vaccine.date`)}</label>
          <input type="date" class="form-input" id="vaccine-date">
        </div>
        <div class="form-group">
          <label class="form-label">${p(`vaccine.nextDate`)}</label>
          <input type="date" class="form-input" id="vaccine-next-date">
        </div>
        <div class="form-group">
          <label class="form-label">${p(`vaccine.notes`)}</label>
          <textarea class="form-input" id="vaccine-notes" rows="2"></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-full">${p(`vaccine.save`)}</button>
      </form>
    </div>
  `,document.getElementById(`close-modal`).addEventListener(`click`,W),n.addEventListener(`click`,e=>{e.target===n&&W()}),document.getElementById(`vaccine-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`vaccine-pet`).value,r=document.getElementById(`vaccine-name`).value.trim();if(!n){f(p(`vaccine.petRequired`),`error`);return}if(!r){f(p(`vaccine.nameRequired`),`error`);return}let{user:i}=l(),{error:a}=await e.from(`vaccines`).insert({pet_id:n,user_id:i.id,vaccine_name:r,administered_date:document.getElementById(`vaccine-date`).value||null,next_due_date:document.getElementById(`vaccine-next-date`).value||null,notes:document.getElementById(`vaccine-notes`).value.trim()||null,is_completed:!!document.getElementById(`vaccine-date`).value});if(a){f(p(`common.error`),`error`);return}f(p(`common.success`),`success`),W(),await R(),z()})}function W(){let e=document.getElementById(`modal-overlay`);e.classList.add(`hidden`),e.innerHTML=``}var G=[`all`,`nutrition`,`exercise`,`grooming`,`health`,`behavior`],K=`all`;async function q(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">${p(`tips.title`)}</h1>
    </div>
    <div class="tips-categories" id="category-tabs">
      ${G.map(e=>`
        <button class="category-chip ${e===K?`active`:``}" data-category="${e}">
          ${p(`tips.`+e)}
        </button>
      `).join(``)}
    </div>
    <div id="tips-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
  `,document.getElementById(`category-tabs`).addEventListener(`click`,e=>{let t=e.target.closest(`.category-chip`);t&&(K=t.dataset.category,document.querySelectorAll(`.category-chip`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),J())}),await J()}async function J(){let{pets:n,profile:r}=l(),i=t(),a=[...new Set(n.map(e=>e.species))],o=r?.is_premium,s=e.from(`health_tips`).select(`*`);a.length>0&&(s=s.in(`species`,a)),K!==`all`&&(s=s.eq(`category`,K));let{data:c}=await s.order(`created_at`,{ascending:!1});Y(c||[],i,o)}function Y(e,t,n){let r=document.getElementById(`tips-list`);if(r){if(e.length===0){r.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">💡</div>
        <p class="text-secondary">${p(`tips.noTips`)}</p>
      </div>
    `;return}r.innerHTML=e.map(e=>{let r=t===`tr`?e.title_tr:e.title_en,i=t===`tr`?e.content_tr:e.content_en,a=e.is_premium&&!n;return`
      <div class="card tip-card ${a?`premium-lock`:``} mb-md">
        ${a?`<div class="premium-lock-badge"><span class="badge badge-premium">${p(`tips.premium`)}</span></div>`:``}
        ${e.image_url?`<img class="tip-card-image" src="${e.image_url}" alt="${r}">`:``}
        <div class="tip-card-body">
          <span class="badge badge-info mb-sm">${p(`tips.`+e.category)}</span>
          <h3 class="tip-card-title">${r}</h3>
          <p class="tip-card-excerpt">${i}</p>
        </div>
      </div>
    `}).join(``)}}var X={dog:`🎾`,cat:`🧶`,bird:`🪶`,fish:`🫧`,rabbit:`🥕`,other:`🎯`};async function Z(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">${p(`activities.title`)}</h1>
    </div>
    <div id="activities-list">
      <div class="page-loader"><div class="loader"></div></div>
    </div>
  `,await Q()}async function Q(){let{pets:n,profile:r}=l(),i=t(),a=[...new Set(n.map(e=>e.species))],o=r?.is_premium,s=e.from(`activities`).select(`*`);a.length>0&&(s=s.in(`species`,a));let{data:c}=await s.order(`difficulty`,{ascending:!0});$(c||[],i,o)}function $(e,t,n){let r=document.getElementById(`activities-list`);if(r){if(e.length===0){r.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">🎮</div>
        <p class="text-secondary">${p(`activities.noActivities`)}</p>
      </div>
    `;return}r.innerHTML=e.map(e=>{let r=t===`tr`?e.title_tr:e.title_en,i=t===`tr`?e.description_tr:e.description_en,a=e.is_premium&&!n,o=X[e.species]||`🎯`;return`
      <div class="card activity-card ${a?`premium-lock`:``} mb-sm">
        ${a?`<div class="premium-lock-badge"><span class="badge badge-premium">${p(`activities.premium`)}</span></div>`:``}
        <div class="activity-icon">${o}</div>
        <div class="activity-info">
          <div class="activity-title">${r}</div>
          <p class="activity-desc">${i}</p>
          <div class="activity-meta">
            <span class="badge badge-${{easy:`success`,medium:`warning`,hard:`danger`}[e.difficulty]}">${p(`activities.`+e.difficulty)}</span>
            ${e.duration_minutes?`<span class="badge badge-info">${e.duration_minutes} ${p(`activities.minutes`)}</span>`:``}
          </div>
        </div>
      </div>
    `}).join(``)}}async function te(){let e=document.getElementById(`page-content`);e.innerHTML=`
    <div class="page-header">
      <button class="btn btn-sm btn-secondary" id="back-btn">${p(`common.back`)}</button>
      <h1 class="page-title">${p(`premium.title`)}</h1>
      <div style="width:60px"></div>
    </div>

    <div class="premium-hero">
      <div style="font-size:48px">⭐</div>
      <h2>${p(`premium.title`)}</h2>
      <p>${p(`premium.subtitle`)}</p>
    </div>

    <div class="card mb-md">
      <div class="premium-feature">
        <div class="premium-feature-icon">🐾</div>
        <div>
          <strong>${p(`premium.feature1`)}</strong>
          <p class="text-sm text-secondary">${p(`premium.feature1Desc`)}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="premium-feature">
        <div class="premium-feature-icon">💊</div>
        <div>
          <strong>${p(`premium.feature2`)}</strong>
          <p class="text-sm text-secondary">${p(`premium.feature2Desc`)}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="premium-feature">
        <div class="premium-feature-icon">🔔</div>
        <div>
          <strong>${p(`premium.feature3`)}</strong>
          <p class="text-sm text-secondary">${p(`premium.feature3Desc`)}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="premium-feature">
        <div class="premium-feature-icon">🎮</div>
        <div>
          <strong>${p(`premium.feature4`)}</strong>
          <p class="text-sm text-secondary">${p(`premium.feature4Desc`)}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-2 mb-lg">
      <div class="card text-center" style="cursor:pointer;border:2px solid var(--border)" id="monthly-plan">
        <p class="text-sm text-secondary mb-sm">${p(`premium.subscribe`)}</p>
        <p style="font-size:var(--fs-xl);font-weight:var(--fw-bold)">${p(`premium.monthlyPrice`)}</p>
      </div>
      <div class="card text-center" style="cursor:pointer;border:2px solid var(--primary);position:relative" id="yearly-plan">
        <span class="badge badge-premium" style="position:absolute;top:-8px;right:-8px">${p(`premium.bestValue`)}</span>
        <p class="text-sm text-secondary mb-sm">${p(`premium.subscribe`)}</p>
        <p style="font-size:var(--fs-xl);font-weight:var(--fw-bold)">${p(`premium.yearlyPrice`)}</p>
      </div>
    </div>

    <button class="btn btn-primary btn-full" id="subscribe-btn">${p(`premium.subscribe`)}</button>
  `,document.getElementById(`back-btn`).addEventListener(`click`,()=>i(`/settings`)),document.getElementById(`subscribe-btn`).addEventListener(`click`,()=>{f(`Premium abonelik yakinda aktif olacak!`,`info`)}),document.querySelectorAll(`#monthly-plan, #yearly-plan`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`#monthly-plan, #yearly-plan`).forEach(e=>{e.style.borderColor=`var(--border)`}),e.style.borderColor=`var(--primary)`})})}async function ne(){if(await u(),d(`/login`,ee),d(`/register`,_),d(`/dashboard`,y),d(`/pet/new`,D),d(`/pet/:id`,e=>j(e)),d(`/pet/:id/edit`,e=>D(e)),d(`/vaccines`,L),d(`/tips`,q),d(`/activities`,Z),d(`/settings`,m),d(`/premium`,te),await n(),s(),o(`language`,()=>s()),g(),r(),!window.location.hash){let{user:e}=l();i(e?`/dashboard`:`/login`)}}ne();