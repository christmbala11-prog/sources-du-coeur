// ═══════════════════════════════════════
// CONFIGURATION API
// ═══════════════════════════════════════
const API_URL = 'http://localhost:3000/api';

// ═══════════════════════════════════════
// UTILITAIRES
// ═══════════════════════════════════════
function showToast(title, message, type = 'success') {
  const toast = document.getElementById('toast-notif');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  if (!toast) return;
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toastIcon.className = `w-8 h-8 rounded-lg flex items-center justify-center ${type === 'success' ? 'bg-[#009e60]' : 'bg-red-500'}`;
  toastIcon.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>`;
  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 4000);
}

// ═══════════════════════════════════════
// FORMULAIRE BÉNÉFICIAIRE
// ═══════════════════════════════════════
async function submitBeneficiaryFile(event) {
  event.preventDefault();
  const btn = event.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Envoi en cours...';
  const data = {
    nom: document.getElementById('b-name').value,
    telephone: document.getElementById('b-phone').value,
    province: document.getElementById('b-province').value,
    bureau: document.getElementById('b-office').value,
    type: document.getElementById('b-type').value,
    description: document.getElementById('b-desc').value,
  };
  try {
    const res = await fetch(`${API_URL}/dossiers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      event.target.reset();
      document.getElementById('form-success')?.classList.remove('hidden');
      showToast('Dossier envoyé !', 'Votre dossier a bien été reçu. Nous vous contacterons sous 48h.');
    } else { throw new Error('Erreur serveur'); }
  } catch (err) {
    showToast('Erreur', "Impossible d'envoyer le dossier. Vérifiez votre connexion.", 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane mr-2"></i>Envoyer mon dossier';
  }
}

// ═══════════════════════════════════════
// FORMULAIRE BÉNÉVOLE / AIDANT
// ═══════════════════════════════════════
async function submitVolunteerForm(event) {
  event.preventDefault();
  const btn = event.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Envoi en cours...';
  const data = {
    nom: document.getElementById('v-name').value,
    type: document.getElementById('v-helper-type').value,
    email: document.getElementById('v-email').value,
    telephone: document.getElementById('v-phone').value,
    ville: document.getElementById('v-location').value,
    specialite: document.getElementById('v-specialty').value,
    motivation: document.getElementById('v-motivation').value,
  };
  try {
    const res = await fetch(`${API_URL}/benevoles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      event.target.reset();
      showToast('Candidature envoyée !', 'Votre profil sera examiné sous 48h. Merci pour votre engagement !');
    } else { throw new Error('Erreur serveur'); }
  } catch (err) {
    showToast('Erreur', "Impossible d'envoyer la candidature. Vérifiez votre connexion.", 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane mr-2"></i>Envoyer ma candidature';
  }
}

// ═══════════════════════════════════════
// FORMULAIRE SIGNALEMENT
// ═══════════════════════════════════════
async function submitIssueReport(event) {
  event.preventDefault();
  const data = {
    province: document.getElementById('issue-province').value,
    bureau: document.getElementById('issue-office')?.value || '',
    type: document.getElementById('issue-type').value,
    contact: document.getElementById('issue-contact')?.value || '',
    message: document.getElementById('issue-message').value,
  };
  try {
    const res = await fetch(`${API_URL}/signalements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      event.target.reset();
      showToast('Signalement envoyé !', "Votre signalement a été transmis à l'administration centrale.");
    } else { throw new Error(); }
  } catch { showToast('Erreur', "Impossible d'envoyer le signalement.", 'error'); }
}

// ═══════════════════════════════════════
// FORMULAIRE TÉMOIGNAGE
// ═══════════════════════════════════════
async function submitTestimonial(event) {
  event.preventDefault();
  const data = {
    auteur: document.getElementById('t-author').value,
    province: document.getElementById('t-province').value,
    role: document.getElementById('t-role').value,
    note: parseInt(document.getElementById('t-rating').value),
    texte: document.getElementById('t-text').value,
  };
  try {
    const res = await fetch(`${API_URL}/temoignages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      event.target.reset();
      document.getElementById('testimonial-form-card')?.classList.add('hidden');
      showToast('Témoignage envoyé !', 'Il sera publié après modération sous 48h. Merci !');
    } else { throw new Error(); }
  } catch { showToast('Erreur', "Impossible d'envoyer le témoignage.", 'error'); }
}

// ═══════════════════════════════════════
// ÉTOILES DE NOTATION
// ═══════════════════════════════════════
function setStarRating(value) {
  document.getElementById('t-rating').value = value;
  const stars = document.querySelectorAll('#star-rating i');
  stars.forEach((s, i) => {
    s.className = i < value
      ? 'fa-solid fa-star text-[#fcd116] text-2xl cursor-pointer transition hover:scale-110'
      : 'fa-regular fa-star text-slate-300 text-2xl cursor-pointer transition hover:scale-110';
  });
}

// ═══════════════════════════════════════
// DONNÉES — TOUS LES BUREAUX DU GABON
// 50 bureaux dans les 9 provinces
// ═══════════════════════════════════════
const DB = {
  selectedProvince: 'Estuaire',
  offices: [
    // ── ESTUAIRE (8 bureaux) ──
    { province: 'Estuaire', name: 'Bureau Libreville Centre', city: 'Libreville', phone: '+241 01 72 00 01', hours: 'Lun–Ven 8h–17h' },
    { province: 'Estuaire', name: 'Bureau Libreville Nord', city: 'Libreville', phone: '+241 01 72 00 02', hours: 'Lun–Ven 8h–17h' },
    { province: 'Estuaire', name: 'Bureau Akanda', city: 'Akanda', phone: '+241 01 72 00 03', hours: 'Lun–Ven 8h–17h' },
    { province: 'Estuaire', name: 'Bureau Owendo', city: 'Owendo', phone: '+241 01 72 00 04', hours: 'Lun–Ven 8h–17h' },
    { province: 'Estuaire', name: 'Bureau Ntoum', city: 'Ntoum', phone: '+241 01 72 00 05', hours: 'Lun–Ven 8h–16h' },
    { province: 'Estuaire', name: 'Bureau Komo-Mondah', city: 'Kougouleu', phone: '+241 01 72 00 06', hours: 'Lun–Ven 8h–16h' },
    { province: 'Estuaire', name: 'Bureau Komo-Kango', city: 'Kango', phone: '+241 01 72 00 07', hours: 'Lun–Sam 8h–15h' },
    { province: 'Estuaire', name: 'Bureau Mbé', city: 'Mbé', phone: '+241 01 72 00 08', hours: 'Lun–Sam 8h–15h' },

    // ── HAUT-OGOOUÉ (7 bureaux) ──
    { province: 'Haut-Ogooué', name: 'Bureau Franceville', city: 'Franceville', phone: '+241 02 72 00 01', hours: 'Lun–Ven 8h–17h' },
    { province: 'Haut-Ogooué', name: 'Bureau Moanda', city: 'Moanda', phone: '+241 02 72 00 02', hours: 'Lun–Ven 8h–17h' },
    { province: 'Haut-Ogooué', name: 'Bureau Mouanda', city: 'Mouanda', phone: '+241 02 72 00 03', hours: 'Lun–Ven 8h–16h' },
    { province: 'Haut-Ogooué', name: 'Bureau Bongoville', city: 'Bongoville', phone: '+241 02 72 00 04', hours: 'Lun–Sam 8h–15h' },
    { province: 'Haut-Ogooué', name: 'Bureau Okondja', city: 'Okondja', phone: '+241 02 72 00 05', hours: 'Lun–Ven 8h–16h' },
    { province: 'Haut-Ogooué', name: 'Bureau Lékoumou', city: 'Léconi', phone: '+241 02 72 00 06', hours: 'Lun–Sam 8h–15h' },
    { province: 'Haut-Ogooué', name: 'Bureau Bakoumba', city: 'Bakoumba', phone: '+241 02 72 00 07', hours: 'Lun–Sam 8h–14h' },

    // ── MOYEN-OGOOUÉ (4 bureaux) ──
    { province: 'Moyen-Ogooué', name: 'Bureau Lambaréné', city: 'Lambaréné', phone: '+241 03 72 00 01', hours: 'Lun–Ven 8h–17h' },
    { province: 'Moyen-Ogooué', name: 'Bureau Ndjolé', city: 'Ndjolé', phone: '+241 03 72 00 02', hours: 'Lun–Ven 8h–16h' },
    { province: 'Moyen-Ogooué', name: 'Bureau Abanga-Bigné', city: 'Bifoun', phone: '+241 03 72 00 03', hours: 'Lun–Sam 8h–15h' },
    { province: 'Moyen-Ogooué', name: 'Bureau Ogooué-et-Lacs', city: 'Mbigou', phone: '+241 03 72 00 04', hours: 'Lun–Sam 8h–14h' },

    // ── NGOUNIÉ (7 bureaux) ──
    { province: 'Ngounié', name: 'Bureau Mouila', city: 'Mouila', phone: '+241 04 72 00 01', hours: 'Lun–Ven 8h–17h' },
    { province: 'Ngounié', name: 'Bureau Fougamou', city: 'Fougamou', phone: '+241 04 72 00 02', hours: 'Lun–Ven 8h–16h' },
    { province: 'Ngounié', name: 'Bureau Ndendé', city: 'Ndendé', phone: '+241 04 72 00 03', hours: 'Lun–Sam 8h–15h' },
    { province: 'Ngounié', name: 'Bureau Mbigou', city: 'Mbigou', phone: '+241 04 72 00 04', hours: 'Lun–Sam 8h–15h' },
    { province: 'Ngounié', name: 'Bureau Mimongo', city: 'Mimongo', phone: '+241 04 72 00 05', hours: 'Lun–Sam 8h–14h' },
    { province: 'Ngounié', name: 'Bureau Lebamba', city: 'Lebamba', phone: '+241 04 72 00 06', hours: 'Lun–Sam 8h–15h' },
    { province: 'Ngounié', name: 'Bureau Malinga', city: 'Malinga', phone: '+241 04 72 00 07', hours: 'Lun–Sam 8h–14h' },

    // ── NYANGA (5 bureaux) ──
    { province: 'Nyanga', name: 'Bureau Tchibanga', city: 'Tchibanga', phone: '+241 05 72 00 01', hours: 'Lun–Ven 8h–17h' },
    { province: 'Nyanga', name: 'Bureau Moabi', city: 'Moabi', phone: '+241 05 72 00 02', hours: 'Lun–Ven 8h–16h' },
    { province: 'Nyanga', name: 'Bureau Mayumba', city: 'Mayumba', phone: '+241 05 72 00 03', hours: 'Lun–Ven 8h–16h' },
    { province: 'Nyanga', name: 'Bureau Moulengui-Binza', city: 'Gamba', phone: '+241 05 72 00 04', hours: 'Lun–Sam 8h–15h' },
    { province: 'Nyanga', name: 'Bureau Basse-Banio', city: 'Ndindi', phone: '+241 05 72 00 05', hours: 'Lun–Sam 8h–14h' },

    // ── OGOOUÉ-IVINDO (5 bureaux) ──
    { province: 'Ogooué-Ivindo', name: 'Bureau Makokou', city: 'Makokou', phone: '+241 06 72 00 01', hours: 'Lun–Ven 8h–17h' },
    { province: 'Ogooué-Ivindo', name: 'Bureau Booué', city: 'Booué', phone: '+241 06 72 00 02', hours: 'Lun–Ven 8h–16h' },
    { province: 'Ogooué-Ivindo', name: 'Bureau Mékambo', city: 'Mékambo', phone: '+241 06 72 00 03', hours: 'Lun–Sam 8h–15h' },
    { province: 'Ogooué-Ivindo', name: 'Bureau Ovan', city: 'Ovan', phone: '+241 06 72 00 04', hours: 'Lun–Sam 8h–14h' },
    { province: 'Ogooué-Ivindo', name: 'Bureau Lopé', city: 'Lopé', phone: '+241 06 72 00 05', hours: 'Lun–Sam 8h–14h' },

    // ── OGOOUÉ-LOLO (4 bureaux) ──
    { province: 'Ogooué-Lolo', name: 'Bureau Koulamoutou', city: 'Koulamoutou', phone: '+241 07 72 00 01', hours: 'Lun–Ven 8h–17h' },
    { province: 'Ogooué-Lolo', name: 'Bureau Lastoursville', city: 'Lastoursville', phone: '+241 07 72 00 02', hours: 'Lun–Ven 8h–16h' },
    { province: 'Ogooué-Lolo', name: 'Bureau Pana', city: 'Pana', phone: '+241 07 72 00 03', hours: 'Lun–Sam 8h–15h' },
    { province: 'Ogooué-Lolo', name: 'Bureau Mulundu', city: 'Mulundu', phone: '+241 07 72 00 04', hours: 'Lun–Sam 8h–14h' },

    // ── OGOOUÉ-MARITIME (5 bureaux) ──
    { province: 'Ogooué-Maritime', name: 'Bureau Port-Gentil', city: 'Port-Gentil', phone: '+241 08 72 00 01', hours: 'Lun–Ven 8h–17h' },
    { province: 'Ogooué-Maritime', name: 'Bureau Omboué', city: 'Omboué', phone: '+241 08 72 00 02', hours: 'Lun–Ven 8h–16h' },
    { province: 'Ogooué-Maritime', name: 'Bureau Gamba', city: 'Gamba', phone: '+241 08 72 00 03', hours: 'Lun–Ven 8h–16h' },
    { province: 'Ogooué-Maritime', name: 'Bureau Mandji', city: 'Mandji', phone: '+241 08 72 00 04', hours: 'Lun–Sam 8h–15h' },
    { province: 'Ogooué-Maritime', name: 'Bureau Etimboué', city: 'Etimboué', phone: '+241 08 72 00 05', hours: 'Lun–Sam 8h–14h' },

    // ── WOLEU-NTEM (7 bureaux) ──
    { province: 'Woleu-Ntem', name: 'Bureau Oyem', city: 'Oyem', phone: '+241 09 72 00 01', hours: 'Lun–Ven 8h–17h' },
    { province: 'Woleu-Ntem', name: 'Bureau Bitam', city: 'Bitam', phone: '+241 09 72 00 02', hours: 'Lun–Ven 8h–17h' },
    { province: 'Woleu-Ntem', name: 'Bureau Mitzic', city: 'Mitzic', phone: '+241 09 72 00 03', hours: 'Lun–Sam 8h–15h' },
    { province: 'Woleu-Ntem', name: 'Bureau Minvoul', city: 'Minvoul', phone: '+241 09 72 00 04', hours: 'Lun–Sam 8h–15h' },
    { province: 'Woleu-Ntem', name: 'Bureau Médouneu', city: 'Médouneu', phone: '+241 09 72 00 05', hours: 'Lun–Sam 8h–15h' },
    { province: 'Woleu-Ntem', name: 'Bureau Ntem', city: 'Eboro', phone: '+241 09 72 00 06', hours: 'Lun–Sam 8h–14h' },
    { province: 'Woleu-Ntem', name: 'Bureau Woleu', city: 'Aboumezok', phone: '+241 09 72 00 07', hours: 'Lun–Sam 8h–14h' },
  ],

  testimonials: [
    { auteur: 'Jean-Marc O.', province: 'Woleu-Ntem', role: 'Porteur de projet', note: 5, texte: "Grâce aux Sources du Cœur, mon projet maraîcher a pu démarrer. Le bureau d'Oyem m'a orienté vers un aidant qui m'a fourni les semences et le matériel nécessaire." },
    { auteur: 'Sarah M.', province: 'Haut-Ogooué', role: 'Bénéficiaire', note: 5, texte: "Mon dossier de bourse pour étudier au Maroc a été monté en moins d'une semaine avec l'aide d'un mentor. Je n'aurais pas pu le faire seule." },
    { auteur: 'Claire N.', province: 'Diaspora', role: 'Aidante validée', note: 4, texte: "En tant qu'aidante, j'ai pu financer l'équipement de pêche de trois familles de Port-Gentil. Le suivi par le bureau local était professionnel et transparent." },
    { auteur: 'Paul E.', province: 'Estuaire', role: 'Bénéficiaire', note: 5, texte: "J'avais perdu espoir pour mon projet de commerce. L'association m'a mis en relation avec un mentor qui m'a aidé à structurer mon business plan." },
    { auteur: 'Marie-Claire B.', province: 'Ngounié', role: 'Bénévole', note: 5, texte: "Être bénévole aux Sources du Cœur est une expérience enrichissante. On voit vraiment l'impact concret sur les familles de notre province." },
    { auteur: 'Didier A.', province: 'Ogooué-Maritime', role: 'Porteur de projet', note: 4, texte: "Le bureau de Port-Gentil m'a aidé à obtenir du matériel de pêche. Processus clair, sans demande d'argent, exactement comme promis." },
  ]
};

// ═══════════════════════════════════════
// AFFICHAGE BUREAUX
// ═══════════════════════════════════════
function renderOfficesGrid() {
  const grid = document.getElementById('offices-grid');
  if (!grid) return;
  const filtered = DB.offices.filter(o => o.province === DB.selectedProvince);
  const count = document.getElementById('office-count');
  if (count) count.textContent = `${filtered.length} bureau${filtered.length > 1 ? 'x' : ''}`;
  grid.innerHTML = filtered.map(o => `
    <div class="office-card bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div class="flex items-start justify-between">
        <div class="w-11 h-11 rounded-xl bg-[#e6f7ef] text-[#009e60] flex items-center justify-center text-xl">
          <i class="fa-solid fa-building"></i>
        </div>
        <span class="text-xs font-bold text-[#009e60] bg-[#e6f7ef] px-2.5 py-1 rounded-full">Actif</span>
      </div>
      <div>
        <h4 class="font-bold text-slate-900">${o.name}</h4>
        <p class="text-sm text-slate-500 mt-1"><i class="fa-solid fa-map-pin text-[#009e60] mr-1.5"></i>${o.city}</p>
      </div>
      <div class="space-y-2 text-xs text-slate-500">
        <div class="flex items-center gap-2"><i class="fa-solid fa-phone text-[#009e60] w-4"></i>${o.phone}</div>
        <div class="flex items-center gap-2"><i class="fa-solid fa-clock text-[#009e60] w-4"></i>${o.hours}</div>
      </div>
      <a href="rejoindre.html" class="block w-full text-center py-2.5 bg-[#009e60] hover:bg-[#006e40] text-white rounded-xl text-sm font-bold transition">
        Déposer un dossier
      </a>
    </div>
  `).join('');
}

function onProvinceChange() {
  const sel = document.getElementById('province-selector');
  if (sel) { DB.selectedProvince = sel.value; renderOfficesGrid(); }
}

function selectProvince(province, btn) {
  document.querySelectorAll('.province-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const sel = document.getElementById('province-selector');
  if (sel) sel.value = province;
  DB.selectedProvince = province;
  const title = document.getElementById('selected-province-title');
  if (title) {
    const vowels = ['A','E','I','O','U','Â','É','È','Ê','Î','Ô','Û'];
    const article = vowels.includes(province.charAt(0).toUpperCase()) ? "de l'" : "du ";
    title.textContent = `Bureaux de la Province ${article}${province}`;
  }
  renderOfficesGrid();
}

function onBeneficiaryProvinceChange() {
  const provinceEl = document.getElementById('b-province');
  const officeSelect = document.getElementById('b-office');
  if (!officeSelect || !provinceEl) return;
  const province = provinceEl.value;
  if (!province) return;
  const offices = DB.offices.filter(o => o.province === province);
  officeSelect.innerHTML = offices.length
    ? offices.map(o => `<option value="${o.name}">${o.name}</option>`).join('')
    : '<option>Aucun bureau disponible</option>';
}

// ═══════════════════════════════════════
// AFFICHAGE TÉMOIGNAGES
// ═══════════════════════════════════════
function renderTestimonialsList() {
  const grid = document.getElementById('testimonials-list-grid');
  if (!grid) return;
  const colors = ['bg-[#e6f7ef]', 'bg-[#fcd116]/10', ''];
  const avatarColors = ['bg-[#009e60]', 'bg-[#fcd116] text-slate-900', 'bg-[#3a75c4]'];
  grid.innerHTML = DB.testimonials.map((t, i) => `
    <div class="rounded-2xl p-6 space-y-4 ${colors[i % 3]}" style="${i % 3 === 2 ? 'background:rgba(58,117,196,0.08)' : ''}">
      <div class="flex text-[#fcd116] gap-0.5 text-sm">
        ${'<i class="fa-solid fa-star"></i>'.repeat(t.note)}${'<i class="fa-regular fa-star text-slate-300"></i>'.repeat(5 - t.note)}
      </div>
      <p class="text-slate-700 text-sm italic leading-relaxed">"${t.texte}"</p>
      <div class="flex items-center gap-3 pt-2 border-t border-black/5">
        <div class="w-10 h-10 rounded-full ${avatarColors[i % 3]} text-white flex items-center justify-center font-bold text-sm">
          ${t.auteur.charAt(0)}
        </div>
        <div>
          <p class="font-bold text-sm text-slate-900">${t.auteur}</p>
          <p class="text-xs text-slate-500">${t.province} · ${t.role}</p>
        </div>
      </div>
    </div>
  `).join('');
  const countEl = document.getElementById('testimonials-count');
  if (countEl) {
    let n = 0;
    const timer = setInterval(() => {
      n = Math.min(n + 1, DB.testimonials.length);
      countEl.textContent = n;
      if (n >= DB.testimonials.length) clearInterval(timer);
    }, 200);
  }
}

function updateHomeStats() {}

// ═══════════════════════════════════════
// LOGIN ADMIN SÉCURISÉ
// ═══════════════════════════════════════
async function handleAdminLogin(event) {
  event.preventDefault();
  const btn = event.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Connexion...';

  const email = document.getElementById('admin-email').value;
  const password = document.getElementById('admin-password').value;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_email', data.user.email);
      document.getElementById('admin-login-modal')?.classList.add('hidden');
      document.getElementById('admin-dashboard')?.classList.remove('hidden');
      document.getElementById('admin-user-email').textContent = data.user.email;
      showToast('Connecté !', "Bienvenue dans l'espace administration.");
      if(typeof loadDossiers === 'function') loadDossiers();
    } else {
      showToast('Erreur', data.error || 'Identifiants incorrects.', 'error');
    }
  } catch (err) {
    showToast('Erreur', 'Impossible de contacter le serveur.', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-lock mr-2"></i>Se connecter';
  }
}
