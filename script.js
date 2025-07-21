const recettes = [
  {
    nom: "9mm",
    prix: 87.5,
    ingredients: [
      { nom: "Douille", quantite: 1 },
      { nom: "Amorce", quantite: 1 },
      { nom: "Poudre", quantite: 1 }
    ]
  },
  {
    nom: "5.56",
    prix: 237.5,
    ingredients: [
      { nom: "Douille", quantite: 1 },
      { nom: "Amorce", quantite: 4 },
      { nom: "Poudre", quantite: 4 }
    ]
  },
  {
    nom: "7.62",
    prix: 237.5,
    ingredients: [
      { nom: "Douille", quantite: 1 },
      { nom: "Amorce", quantite: 4 },
      { nom: "Poudre", quantite: 4 }
    ]
  },
  {
    nom: "12",
    prix: 205,
    ingredients: [
      { nom: "Douille", quantite: 1 },
      { nom: "Amorce", quantite: 2 },
      { nom: "Poudre", quantite: 2 },
      { nom: "Plomb", quantite: 2 }
    ]
  },
  {
    nom: ".50AE",
    prix: 205,
    ingredients: [
      { nom: "Douille", quantite: 1 },
      { nom: "Amorce", quantite: 2 },
      { nom: "Poudre", quantite: 2 },
      { nom: "Plomb", quantite: 2 }
    ]
  }
];


const pastelColors = [
  'rgba(186, 222, 255, 0.55)', // bleu pastel
  'rgba(255, 223, 186, 0.55)', // orange pastel
  'rgba(186, 255, 201, 0.55)', // vert pastel
  'rgba(255, 186, 233, 0.55)', // rose pastel
  'rgba(255, 255, 186, 0.55)', // jaune pastel
  'rgba(222, 186, 255, 0.55)', // violet pastel
];

function creerCalculSection(recette) {
  const section = document.createElement('div');
  section.className = 'calcul-section';
  section.innerHTML = `
    <label for="qte-${recette.nom}">Quantité :</label>
    <input type="number" id="qte-${recette.nom}" min="1" value="1">
    <span id="resultat-${recette.nom}" class="calcul-resultat"></span>
  `;
  const input = section.querySelector('input');
  const resultat = section.querySelector('.calcul-resultat');

  function updateResult() {
    const qte = parseInt(input.value, 10) || 0;
    if (qte < 1) {
      resultat.textContent = '';
      return;
    }
    const composants = recette.ingredients.map(ing =>
      `${ing.nom} : <b>${ing.quantite * qte}</b>`
    ).join(' | ');
    const gain = recette.prix ? (recette.prix * qte).toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 'N/A';
    resultat.innerHTML = `Composants nécessaires : ${composants}<br>Gain total : <b>${gain}€</b>`;
  }
  input.addEventListener('input', updateResult);
  updateResult();
  return section;
}

function chargerRecettes() {
  const container = document.getElementById('recettes-container');
  container.innerHTML = '';
  container.className = 'munitions-section';
  recettes.forEach((recette) => {
    const carte = document.createElement('section');
    carte.className = 'munition-card';
    carte.innerHTML = `
      <div class="munition-badge">💰 Prix unitaire : <b>${recette.prix ? recette.prix + '€' : 'N/A'}</b></div>
      <div class="munition-title">${recette.nom}</div>
      <ul class="munition-description" style="margin-bottom: 16px;">
        ${recette.ingredients.map(ing => `
          <li>${ing.nom} <b>x${ing.quantite}</b></li>
        `).join('')}
      </ul>
    `;
    carte.appendChild(creerCalculSection(recette));
    container.appendChild(carte);
  });
}


const hierarchieData = [
  { grade: 'Pakhan', matricule: 5 },
  { grade: 'Pravaïa Ruka', matricule: 2 },
  { grade: 'Komandir', matricule: 1 },
  { grade: 'Kapitan', matricule: 4 },
  { grade: 'Kapitan', matricule: 15 },
  { grade: 'Kapitan', matricule: 9 },
  { grade: 'Boyets', matricule: 6 },
  { grade: 'Boyets', matricule: 14 },
  { grade: 'Boyets', matricule: 3 },
  { grade: 'Boyets', matricule: 17 },
  { grade: 'Boyets', matricule: 20 },
  { grade: 'Boyets', matricule: 99 },
  { grade: 'Boyets', matricule: 91 },
  { grade: 'Boyets', matricule: 7 },
  { grade: 'Novobranets', matricule: 'Aucun' }
];

const hierarchieOrder = [
  'Pakhan',
  'Pravaïa Ruka',
  'Komandir',
  'Kapitan',
  'Boyets',
  'Novobranets'
];

function setPageTitle(titre) {
  const titreDiv = document.getElementById('page-title');
  titreDiv.innerHTML = `<h1>${titre}</h1>`;
  titreDiv.style.textAlign = 'center';
  titreDiv.style.margin = '32px 0 18px 0';
  titreDiv.style.fontWeight = '700';
  titreDiv.style.letterSpacing = '1px';
}

function chargerHierarchie() {
  const section = document.getElementById('hierarchie-section');
  section.innerHTML = '';
  section.className = 'hierarchie-section';

  const grades = {};
  hierarchieData.forEach(item => {
    if (!grades[item.grade]) grades[item.grade] = [];
    grades[item.grade].push(item.matricule);
  });
  hierarchieOrder.forEach(grade => {
    if (!grades[grade]) return;

    const groupDiv = document.createElement('div');
    groupDiv.className = 'grade-group';
    const groupTitle = document.createElement('div');
    groupTitle.className = 'grade-group-title';
    groupTitle.textContent = grade;
    groupDiv.appendChild(groupTitle);

    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'grade-cards-wrapper';
    grades[grade].forEach((matricule, idx) => {
      const card = document.createElement('div');
      card.className = 'grade-card';

      let matriculeStr = matricule;
      if (matricule !== 'Aucun') matriculeStr = matricule.toString().padStart(2, '0');
      card.innerHTML = `
        <div class="grade-title">${grade}${grades[grade].length > 1 && grade !== 'Novobranets' ? ' #' + (idx+1) : ''}</div>
        <div class="grade-matricule-label">Matricule</div>
        <div class="grade-matricule-num">${matriculeStr}</div>
      `;
      cardsWrapper.appendChild(card);
    });
    groupDiv.appendChild(cardsWrapper);
    section.appendChild(groupDiv);
  });
}

function showSection(sectionToShow, sectionToHide) {

  sectionToHide.classList.remove('visible');

  setTimeout(() => {
    sectionToHide.style.display = 'none';
    sectionToHide.classList.remove('fade-section');
    sectionToShow.style.display = '';
    sectionToShow.classList.add('fade-section');
    void sectionToShow.offsetWidth;
    sectionToShow.classList.add('visible');
  }, 350);
}

(function() {
  const canvas = document.getElementById('bubble-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);

  const bubbleCount = 30;
  const bubbles = [];
  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 10 + Math.random() * 30,
      speed: 0.5 + Math.random() * 1.5,
      dx: (Math.random() - 0.5) * 0.5,
      opacity: 0.2 + Math.random() * 0.3
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const b of bubbles) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(173, 216, 230, ${b.opacity})`;
      ctx.fill();
    }
  }

  function update() {
    for (const b of bubbles) {
      b.y -= b.speed;
      b.x += b.dx;
      if (b.y + b.r < 0) {
        b.y = height + b.r;
        b.x = Math.random() * width;
      }
      if (b.x - b.r > width) b.x = -b.r;
      if (b.x + b.r < 0) b.x = width + b.r;
    }
  }

  function animate() {
    draw();
    update();
    requestAnimationFrame(animate);
  }
  animate();
})();

const joursSemaine = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
];

function setupAuthUI(onAuthStateChanged) {
  const authContainer = document.getElementById('auth-container');
  if (!authContainer) return;
  renderLoginForm();

  function renderLoginForm() {
    authContainer.innerHTML = '';
    const form = document.createElement('form');
    form.id = 'login-form';
    form.innerHTML = `
      <div class="auth-form-group">
        <input type="email" id="auth-email" placeholder="Email" required>
        <input type="password" id="auth-password" placeholder="Mot de passe" required>
      </div>
      <div class="auth-form-actions">
        <button type="submit">Connexion</button>
        <button type="button" id="show-register" class="register-btn">Créer un compte</button>
      </div>
      <div id="auth-msg" class="auth-msg" style="display: none;"></div>
    `;
    authContainer.appendChild(form);
    addAuthStyles();

    function updateUI(user) {
      const emailInput = form.querySelector('#auth-email');
      const passInput = form.querySelector('#auth-password');
      const loginBtn = form.querySelector('button[type="submit"]');
      if (user) {
        emailInput.style.display = 'none';
        passInput.style.display = 'none';
        loginBtn.style.display = 'none';
        form.querySelector('#show-register').style.display = 'none';
        const msgElement = form.querySelector('#auth-msg');
        msgElement.textContent = `Connecté : ${user.email}`;
        msgElement.className = 'auth-msg success';
        msgElement.style.display = 'block';

        if (!form.querySelector('#logout-btn')) {
          const logoutBtn = document.createElement('button');
          logoutBtn.type = 'button';
          logoutBtn.id = 'logout-btn';
          logoutBtn.textContent = 'Déconnexion';
          logoutBtn.style.marginLeft = '10px';
          logoutBtn.onclick = () => window.firebaseSignOut(window.firebaseAuth);
          form.querySelector('.auth-form-actions').appendChild(logoutBtn);
        }
      } else {
        emailInput.style.display = '';
        passInput.style.display = '';
        loginBtn.style.display = '';
        form.querySelector('#show-register').style.display = '';
        const msgElement = form.querySelector('#auth-msg');
        msgElement.textContent = '';
        msgElement.style.display = 'none';
        const logoutBtn = form.querySelector('#logout-btn');
        if (logoutBtn) logoutBtn.remove();
      }
      if (onAuthStateChanged) onAuthStateChanged(user);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('#auth-email').value;
      const password = form.querySelector('#auth-password').value;
      window.firebaseSignIn(window.firebaseAuth, email, password)
        .catch(err => {
          let errorMessage = 'Erreur inconnue';

          switch(err.code) {
            case 'auth/user-not-found':
              errorMessage = 'Aucun compte trouvé avec cette adresse email';
              break;
            case 'auth/wrong-password':
              errorMessage = 'Mot de passe incorrect';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Adresse email invalide';
              break;
            case 'auth/user-disabled':
              errorMessage = 'Ce compte a été désactivé';
              break;
            case 'auth/too-many-requests':
              errorMessage = 'Trop de tentatives. Réessayez plus tard';
              break;
            case 'auth/network-request-failed':
              errorMessage = 'Erreur de connexion réseau';
              break;
            default:
              errorMessage = 'Erreur : ' + err.message;
          }
          
          const msgElement = form.querySelector('#auth-msg');
          msgElement.textContent = errorMessage;
          msgElement.style.display = 'block';
        });
    });

    form.querySelector('#show-register').addEventListener('click', (e) => {
      e.preventDefault();
      renderRegisterForm();
    });
    window.firebaseOnAuthStateChanged(window.firebaseAuth, updateUI);
  }

  function renderRegisterForm() {
    authContainer.innerHTML = '';
    const regForm = document.createElement('form');
    regForm.id = 'register-form';
    regForm.innerHTML = `
      <div class="auth-form-group">
        <input type="email" id="register-email" placeholder="Email" required>
        <input type="password" id="register-password" placeholder="Mot de passe" required>
      </div>
      <div class="auth-form-actions">
        <button type="submit">Valider l'inscription</button>
        <button type="button" id="cancel-register">Annuler</button>
      </div>
      <div id="register-msg" class="auth-msg" style="display: none;"></div>
      <div class="auth-switch">Déjà inscrit ? <a href="#" id="switch-login">Se connecter</a></div>
    `;
    authContainer.appendChild(regForm);
    addAuthStyles();
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = regForm.querySelector('#register-email').value;
      const password = regForm.querySelector('#register-password').value;
      
      const msgElement = regForm.querySelector('#register-msg');
      msgElement.textContent = 'Création du compte en cours...';
      msgElement.className = 'auth-msg info';
      msgElement.style.display = 'block';
      
      window.firebaseCreateUser(window.firebaseAuth, email, password)
        .then((userCredential) => {
          const msgElement = regForm.querySelector('#register-msg');
          msgElement.textContent = 'Compte créé ! Connexion automatique...';
          msgElement.className = 'auth-msg info';
          msgElement.style.display = 'block';

          if (!userCredential.user) {
            return window.firebaseSignIn(window.firebaseAuth, email, password);
          }
          return userCredential;
        })
        .then(() => {
          const msgElement = regForm.querySelector('#register-msg');
          msgElement.textContent = 'Compte créé et connecté avec succès !';
          msgElement.className = 'auth-msg success';
          msgElement.style.display = 'block';
        })
        .catch(err => {
          let errorMessage = 'Erreur inconnue';
          

          switch(err.code) {
            case 'auth/email-already-in-use':
              errorMessage = 'Cette adresse email est déjà utilisée';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Adresse email invalide';
              break;
            case 'auth/weak-password':
              errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
              break;
            case 'auth/operation-not-allowed':
              errorMessage = 'La création de compte est désactivée';
              break;
            case 'auth/network-request-failed':
              errorMessage = 'Erreur de connexion réseau';
              break;
            default:
              errorMessage = 'Erreur : ' + err.message;
          }
          
          const msgElement = regForm.querySelector('#register-msg');
          msgElement.textContent = errorMessage;
          msgElement.className = 'auth-msg';
          msgElement.style.display = 'block';
        });
    });
    regForm.querySelector('#cancel-register').addEventListener('click', (e) => {
      e.preventDefault();
      renderLoginForm();
    });
    regForm.querySelector('#switch-login').addEventListener('click', (e) => {
      e.preventDefault();
      renderLoginForm();
    });
  }

  function addAuthStyles() {
    if (document.getElementById('auth-style')) return;
    const style = document.createElement('style');
    style.id = 'auth-style';
    style.textContent = `
      .auth-form-group {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 8px;
        justify-content: center;
      }
      .auth-form-actions {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-bottom: 8px;
      }
      #login-form input[type="email"], #login-form input[type="password"],
      #register-form input[type="email"], #register-form input[type="password"] {
        padding: 8px 14px;
        border-radius: 10px;
        border: 1.5px solid #bfc9d9;
        font-size: 1.08rem;
        background: #f5f5f7;
        box-shadow: 0 1px 4px #e0e7ff22;
        transition: border 0.15s;
        outline: none;
      }
      #login-form input:focus, #register-form input:focus {
        border: 1.5px solid #7c8aff;
        background: #fff;
      }
      #login-form button, #register-form button {
        padding: 8px 18px;
        border-radius: 10px;
        border: none;
        background: linear-gradient(90deg, #e0eaff, #ffe0e0);
        color: #222;
        font-size: 1.08rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.18s, color 0.18s;
        box-shadow: 0 2px 8px #b3cfff33;
      }
      #login-form button:hover, #register-form button:hover {
        background: #e0eaff;
        color: #222;
      }
      .auth-msg {
        text-align: center;
        color: #c00;
        font-size: 0.98em;
        min-height: 18px;
        margin-bottom: 8px;
        padding: 8px 12px;
        border-radius: 8px;
        background: rgba(255, 0, 0, 0.1);
        border: 1px solid rgba(255, 0, 0, 0.2);
        font-weight: 500;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }
      .auth-msg.success {
        color: #0a0;
        background: rgba(0, 255, 0, 0.1);
        border: 1px solid rgba(0, 255, 0, 0.2);
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }
      .auth-msg.info {
        color: #0066cc;
        background: rgba(0, 102, 204, 0.1);
        border: 1px solid rgba(0, 102, 204, 0.2);
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }
      .auth-switch {
        text-align: center;
        margin-top: 6px;
        font-size: 0.98em;
      }
      .auth-switch a {
        color: #7c8aff;
        text-decoration: underline;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }
}


const ADMIN_EMAILS = ["adrienroose7@gmail.com", "zyrexiw.dev@gmail.com"];

function chargerDisponibilites() {
  const section = document.getElementById('dispos-section');


  if (window.firebaseAuth) {
    window.firebaseOnAuthStateChanged(window.firebaseAuth, (user) => {
      renderDisposTable(!!user, user);
    });
  }

  function renderDisposTable(isConnected, user) {
    section.querySelectorAll('#reset-dispos-btn').forEach(btn => btn.remove());

    const oldTable = section.querySelector('table.dispos-table');
    if (oldTable) oldTable.remove();


    const oldStatusMsgs = section.querySelectorAll('.status-msg');
    oldStatusMsgs.forEach(msg => msg.remove());

    if (!isConnected) {
      const statusMsg = document.createElement('div');
      statusMsg.className = 'status-msg';
      statusMsg.style.cssText = `
        background: #f39c12;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        margin-bottom: 24px;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        box-shadow: 0 4px 16px rgba(243, 156, 18, 0.3);
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        z-index: 10;
      `;
      statusMsg.innerHTML = '👁️ Mode consultation - Connectez-vous pour modifier les disponibilités';
      section.appendChild(statusMsg);
    }

    const table = document.createElement('table');
    table.className = 'dispos-table';
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.innerHTML = '<th>Grade</th><th>Matricule</th>' +
      joursSemaine.map(j => `<th>${j}</th>`).join('');
    thead.appendChild(headRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    const checkboxMap = {};
    hierarchieOrder.forEach(grade => {
      hierarchieData.filter(item => item.grade === grade).forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${grade}</td><td>${item.matricule}</td>`;
        joursSemaine.forEach(jour => {
          const td = document.createElement('td');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.disabled = !isConnected;
          const key = `${grade}_${item.matricule}_${jour}`;
          checkboxMap[key] = checkbox;
          if (isConnected) {
            checkbox.addEventListener('change', () => {
              if (window.firebaseDB && window.firebaseSet && window.firebaseRef) {
                window.firebaseSet(
                  window.firebaseRef(window.firebaseDB, `dispos/${grade}/${item.matricule}/${jour}`),
                  checkbox.checked
                );
              }
            });
          }
          td.appendChild(checkbox);
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
    });
    table.appendChild(tbody);
    section.appendChild(table);

    if (window.firebaseDB && window.firebaseOnValue && window.firebaseRef) {
      window.firebaseOnValue(
        window.firebaseRef(window.firebaseDB, 'dispos'),
        (snapshot) => {
          const data = snapshot.val() || {};
          Object.keys(checkboxMap).forEach(key => {
            const [grade, matricule, jour] = key.split('_');
            const checked = !!(data[grade] && data[grade][matricule] && data[grade][matricule][jour]);
            checkboxMap[key].checked = checked;
          });
        }
      );
    }

    if (user && ADMIN_EMAILS.includes(user.email)) {
      const resetBtn = document.createElement('button');
      resetBtn.id = 'reset-dispos-btn';
      resetBtn.textContent = 'Réinitialiser toutes les cases';
      resetBtn.style.margin = '18px auto 0 auto';
      resetBtn.style.display = 'block';
      resetBtn.style.background = 'linear-gradient(90deg, #e0eaff, #ffe0e0)';
      resetBtn.style.color = '#222';
      resetBtn.style.fontWeight = 'bold';
      resetBtn.style.fontSize = '1.08rem';
      resetBtn.style.padding = '10px 28px';
      resetBtn.style.borderRadius = '12px';
      resetBtn.style.border = 'none';
      resetBtn.style.cursor = 'pointer';
      resetBtn.style.boxShadow = '0 2px 8px #b3cfff33';
      resetBtn.onclick = () => {
        if (window.firebaseDB && window.firebaseRef && window.firebaseSet) {
          if (confirm('Voulez-vous vraiment réinitialiser toutes les disponibilités ?')) {
            window.firebaseSet(window.firebaseRef(window.firebaseDB, 'dispos'), null);
          }
        }
      };
      section.appendChild(resetBtn);
    }
  }
}



const QUOTA_LOCKED = false; 

function chargerQuota() {
  const section = document.getElementById('quota-section');
  section.className = 'quota-section';
  
  if (QUOTA_LOCKED) {
    section.innerHTML = `
      <div id="quota-notif-bar" style="
        background: #c0392b;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        margin: 20px auto;
        max-width: 500px;
        text-align: center;
        font-weight: 500;
        box-shadow: 0 4px 16px rgba(192, 57, 43, 0.3);
        animation: slideIn 0.3s ease-out;
      ">
        🔒 Cette page est temporairement verrouillée
      </div>
    `;
    return;
  }

  if (window.firebaseAuth) {
    window.firebaseOnAuthStateChanged(window.firebaseAuth, (user) => {
      renderQuotaTable(!!user, user);
    });
  }

  function setupQuotaAuthUI(onAuthStateChanged) {
    const authContainer = document.getElementById('quota-auth-container');
    
    function renderQuotaLoginForm() {
      authContainer.innerHTML = '';
      const form = document.createElement('form');
      form.id = 'quota-login-form';
      form.innerHTML = `
        <div class="auth-form-group">
          <input type="email" id="quota-auth-email" placeholder="Email" required>
          <input type="password" id="quota-auth-password" placeholder="Mot de passe" required>
        </div>
        <div class="auth-form-actions">
          <button type="submit">Connexion</button>
          <button type="button" id="quota-show-register" class="register-btn">Créer un compte</button>
        </div>
        <div id="quota-auth-msg" class="auth-msg" style="display: none;"></div>
      `;
      authContainer.appendChild(form);
      addQuotaAuthStyles();

      function updateUI(user) {
        const emailInput = form.querySelector('#quota-auth-email');
        const passInput = form.querySelector('#quota-auth-password');
        const loginBtn = form.querySelector('button[type="submit"]');
        if (user) {
          emailInput.style.display = 'none';
          passInput.style.display = 'none';
          loginBtn.style.display = 'none';
          form.querySelector('#quota-show-register').style.display = 'none';
          const msgElement = form.querySelector('#quota-auth-msg');
          msgElement.textContent = `Connecté : ${user.email}`;
          msgElement.className = 'auth-msg success';
          msgElement.style.display = 'block';

          if (!form.querySelector('#quota-logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.type = 'button';
            logoutBtn.id = 'quota-logout-btn';
            logoutBtn.textContent = 'Déconnexion';
            logoutBtn.style.marginLeft = '10px';
            logoutBtn.onclick = () => window.firebaseSignOut(window.firebaseAuth);
            form.querySelector('.auth-form-actions').appendChild(logoutBtn);
          }
          

          renderQuotaTable(true, user);
        } else {
          emailInput.style.display = '';
          passInput.style.display = '';
          loginBtn.style.display = '';
          form.querySelector('#quota-show-register').style.display = '';
          const msgElement = form.querySelector('#quota-auth-msg');
          msgElement.textContent = '';
          msgElement.style.display = 'none';
          const logoutBtn = form.querySelector('#quota-logout-btn');
          if (logoutBtn) logoutBtn.remove();
          

          const oldContainer = section.querySelector('.quota-container');
          if (oldContainer) oldContainer.remove();
        }
        if (onAuthStateChanged) onAuthStateChanged(user);
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('#quota-auth-email').value;
        const password = form.querySelector('#quota-auth-password').value;
        window.firebaseSignIn(window.firebaseAuth, email, password)
          .catch(err => {
            let errorMessage = 'Erreur inconnue';
            
            switch(err.code) {
              case 'auth/user-not-found':
                errorMessage = 'Aucun compte trouvé avec cette adresse email';
                break;
              case 'auth/wrong-password':
                errorMessage = 'Mot de passe incorrect';
                break;
              case 'auth/invalid-email':
                errorMessage = 'Adresse email invalide';
                break;
              case 'auth/user-disabled':
                errorMessage = 'Ce compte a été désactivé';
                break;
              case 'auth/too-many-requests':
                errorMessage = 'Trop de tentatives. Réessayez plus tard';
                break;
              case 'auth/network-request-failed':
                errorMessage = 'Erreur de connexion réseau';
                break;
              default:
                errorMessage = 'Erreur : ' + err.message;
            }
            
            const msgElement = form.querySelector('#quota-auth-msg');
            msgElement.textContent = errorMessage;
            msgElement.style.display = 'block';
          });
      });

      form.querySelector('#quota-show-register').addEventListener('click', (e) => {
        e.preventDefault();
        renderQuotaRegisterForm();
      });
      window.firebaseOnAuthStateChanged(window.firebaseAuth, updateUI);
    }

    function renderQuotaRegisterForm() {
      authContainer.innerHTML = '';
      const regForm = document.createElement('form');
      regForm.id = 'quota-register-form';
      regForm.innerHTML = `
        <div class="auth-form-group">
          <input type="email" id="quota-register-email" placeholder="Email" required>
          <input type="password" id="quota-register-password" placeholder="Mot de passe" required>
        </div>
        <div class="auth-form-actions">
          <button type="submit">Valider l'inscription</button>
          <button type="button" id="quota-cancel-register">Annuler</button>
        </div>
        <div id="quota-register-msg" class="auth-msg" style="display: none;"></div>
        <div class="auth-switch">Déjà inscrit ? <a href="#" id="quota-switch-login">Se connecter</a></div>
      `;
      authContainer.appendChild(regForm);
      addQuotaAuthStyles();
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = regForm.querySelector('#quota-register-email').value;
        const password = regForm.querySelector('#quota-register-password').value;
        
        const msgElement = regForm.querySelector('#quota-register-msg');
        msgElement.textContent = 'Création du compte en cours...';
        msgElement.className = 'auth-msg info';
        msgElement.style.display = 'block';
        
        window.firebaseCreateUser(window.firebaseAuth, email, password)
          .then((userCredential) => {
            const msgElement = regForm.querySelector('#quota-register-msg');
            msgElement.textContent = 'Compte créé ! Connexion automatique...';
            msgElement.className = 'auth-msg info';
            msgElement.style.display = 'block';

            if (!userCredential.user) {
              return window.firebaseSignIn(window.firebaseAuth, email, password);
            }
            return userCredential;
          })
          .then(() => {
            const msgElement = regForm.querySelector('#quota-register-msg');
            msgElement.textContent = 'Compte créé et connecté avec succès !';
            msgElement.className = 'auth-msg success';
            msgElement.style.display = 'block';
          })
          .catch(err => {
            let errorMessage = 'Erreur inconnue';
            
            switch(err.code) {
              case 'auth/email-already-in-use':
                errorMessage = 'Cette adresse email est déjà utilisée';
                break;
              case 'auth/invalid-email':
                errorMessage = 'Adresse email invalide';
                break;
              case 'auth/weak-password':
                errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
                break;
              case 'auth/operation-not-allowed':
                errorMessage = 'La création de compte est désactivée';
                break;
              case 'auth/network-request-failed':
                errorMessage = 'Erreur de connexion réseau';
                break;
              default:
                errorMessage = 'Erreur : ' + err.message;
            }
            
            const msgElement = regForm.querySelector('#quota-register-msg');
            msgElement.textContent = errorMessage;
            msgElement.className = 'auth-msg';
            msgElement.style.display = 'block';
          });
      });
      regForm.querySelector('#quota-cancel-register').addEventListener('click', (e) => {
        e.preventDefault();
        renderQuotaLoginForm();
      });
      regForm.querySelector('#quota-switch-login').addEventListener('click', (e) => {
        e.preventDefault();
        renderQuotaLoginForm();
      });
    }

    function addQuotaAuthStyles() {
      if (document.getElementById('quota-auth-style')) return;
      const style = document.createElement('style');
      style.id = 'quota-auth-style';
      style.textContent = `
        .auth-form-group {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 8px;
          justify-content: center;
        }
        .auth-form-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 8px;
        }
        #quota-login-form input[type="email"], #quota-login-form input[type="password"],
        #quota-register-form input[type="email"], #quota-register-form input[type="password"] {
          padding: 8px 14px;
          border-radius: 10px;
          border: 1.5px solid #bfc9d9;
          font-size: 1.08rem;
          background: #f5f5f7;
          box-shadow: 0 1px 4px #e0e7ff22;
          transition: border 0.15s;
          outline: none;
        }
        #quota-login-form input:focus, #quota-register-form input:focus {
          border: 1.5px solid #7c8aff;
          background: #fff;
        }
        #quota-login-form button, #quota-register-form button {
          padding: 8px 18px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(90deg, #e0eaff, #ffe0e0);
          color: #222;
          font-size: 1.08rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          box-shadow: 0 2px 8px #b3cfff33;
        }
        #quota-login-form button:hover, #quota-register-form button:hover {
          background: #e0eaff;
          color: #222;
        }
        .auth-msg {
          text-align: center;
          color: #c00;
          font-size: 0.98em;
          min-height: 18px;
          margin-bottom: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.2);
          font-weight: 500;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        .auth-msg.success {
          color: #0a0;
          background: rgba(0, 255, 0, 0.1);
          border: 1px solid rgba(0, 255, 0, 0.2);
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        .auth-msg.info {
          color: #0066cc;
          background: rgba(0, 102, 204, 0.1);
          border: 1px solid rgba(0, 102, 204, 0.2);
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        .auth-switch {
          text-align: center;
          margin-top: 6px;
          font-size: 0.98em;
        }
        .auth-switch a {
          color: #7c8aff;
          text-decoration: underline;
          cursor: pointer;
        }
      `;
      document.head.appendChild(style);
    }

    renderQuotaLoginForm();
  }

  function renderQuotaTable(isConnected, user) {
    const authContainer = document.getElementById('quota-auth-container');
    if (authContainer) authContainer.style.display = 'block';
    
    const prixRevente = {
        'SNS': 50000, 'SNS MK2': 65000, 'Pistolet': 95000, 'Pistolet Céramique': 110000,
        'Revolver': 205000, 'Revolver double action': 205000, 'Pistolet MK2': 180000,
        'CALIBRE 50': 220000, 'Pistolet Vintage': 350000, 'Pistolet mitrailleur (uzi)': 310000,
        'Fusil à pompe double action': 200000, 'POMPE CANON SCIÉ': 310000, 'POMPE REMINGHON': 380000,
        'AK COMPACTE': 700000, 'AK 47': 1200000, 'Pistolet mitrailleur': 1100000
    };
    const section = document.getElementById('quota-section');
    const oldContainer = section.querySelector('.quota-container');
    if (oldContainer) oldContainer.remove();
    const oldStatusMsgs = section.querySelectorAll('.status-msg');
    oldStatusMsgs.forEach(msg => msg.remove());

    const container = document.createElement('div');
    container.className = 'quota-container';

    if (!isConnected) {
        const statusMsg = document.createElement('div');
        statusMsg.className = 'status-msg';
        statusMsg.style.cssText = `background: #f39c12; color: white; padding: 16px 24px; border-radius: 12px; margin-bottom: 24px; text-align: center; font-weight: 600; font-size: 1rem; box-shadow: 0 4px 16px rgba(243, 156, 18, 0.3); max-width: 500px; margin-left: auto; margin-right: auto; position: relative; z-index: 10;`;
        statusMsg.innerHTML = '👁️ Mode consultation - Connectez-vous pour modifier les quotas';
        section.appendChild(statusMsg);
    }

    const mainTable = document.createElement('div');
    mainTable.className = 'quota-main-table';
    const table = document.createElement('table');
    table.className = 'quota-table';
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.innerHTML = `
      <th>Matricule :</th>
      <th>Quota :</th>
      <th>Quantité :</th>
      <th>Prix de vente :</th>
      <th>Commission :</th>
      <th>Quota Arme :</th>
      <th>Quota Argent :</th>
      <th>Quota Munitions</th>
    `;
    thead.appendChild(headRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    const inputMap = {};
    const matricules = hierarchieData.filter(item => item.matricule !== 'Aucun').map(item => item.matricule);
    const armes = [
        'SNS', 'SNS MK2', 'Pistolet', 'Pistolet Céramique', 'Revolver', 'Revolver double action',
        'Pistolet MK2', 'CALIBRE 50', 'Pistolet Vintage', 'Pistolet mitrailleur (uzi)',
        'Fusil à pompe double action', 'POMPE CANON SCIÉ', 'POMPE REMINGHON', 'AK COMPACTE', 'AK 47'
    ];


    const globalMsg = document.createElement('div');
    globalMsg.className = 'status-msg';
    globalMsg.style.display = 'none';
    container.appendChild(globalMsg);

    function showMsg(msg, color = '#c0392b') {
        globalMsg.textContent = msg;
        globalMsg.style.display = 'block';
        globalMsg.style.background = color;
        setTimeout(() => { globalMsg.style.display = 'none'; }, 3000);
    }

    function saveToFirebase(path, value) {
        if (window.firebaseDB && window.firebaseSet && window.firebaseRef) {
            window.firebaseSet(window.firebaseRef(window.firebaseDB, path), value)
                .catch(() => showMsg('Erreur de sauvegarde !'));
        }
    }

    matricules.forEach(matricule => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${matricule}</td>`;

        const quotaTd = document.createElement('td');
        const quotaSelect = document.createElement('select');
        quotaSelect.disabled = !isConnected;
        quotaSelect.innerHTML = `<option value="">Sélectionner...</option>` + armes.map(arme => `<option value="${arme}">${arme}</option>`).join('');
        quotaTd.appendChild(quotaSelect);
        row.appendChild(quotaTd);
        inputMap[`quota_${matricule}`] = quotaSelect;

        const quantiteTd = document.createElement('td');
        const quantiteSelect = document.createElement('select');
        quantiteSelect.disabled = !isConnected;
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            quantiteSelect.appendChild(option);
        }
        quantiteTd.appendChild(quantiteSelect);
        row.appendChild(quantiteTd);
        inputMap[`quantite_${matricule}`] = quantiteSelect;

        const prixTd = document.createElement('td');
        const prixInput = document.createElement('input');
        prixInput.type = 'number';
        prixInput.placeholder = '€';
        prixInput.disabled = true;
        prixTd.appendChild(prixInput);
        row.appendChild(prixTd);
        inputMap[`prix_${matricule}`] = prixInput;

        const commissionTd = document.createElement('td');
        const commissionInput = document.createElement('input');
        commissionInput.type = 'text';
        commissionInput.disabled = true;
        commissionTd.appendChild(commissionInput);
        row.appendChild(commissionTd);
        inputMap[`commission_${matricule}`] = commissionInput;

        const quotaArmeTd = document.createElement('td');
        const quotaArmeCheckbox = document.createElement('input');
        quotaArmeCheckbox.type = 'checkbox';
        quotaArmeCheckbox.disabled = !isConnected;
        quotaArmeTd.appendChild(quotaArmeCheckbox);
        row.appendChild(quotaArmeTd);
        inputMap[`quotaArme_${matricule}`] = quotaArmeCheckbox;

        const quotaArgentTd = document.createElement('td');
        const quotaArgentCheckbox = document.createElement('input');
        quotaArgentCheckbox.type = 'checkbox';
        quotaArgentCheckbox.disabled = !isConnected;
        quotaArgentTd.appendChild(quotaArgentCheckbox);
        row.appendChild(quotaArgentTd);
        inputMap[`quotaArgent_${matricule}`] = quotaArgentCheckbox;

        // Nouvelle colonne : Quota Munitions
        const quotaMunitionsTd = document.createElement('td');
        const quotaMunitionsCheckbox = document.createElement('input');
        quotaMunitionsCheckbox.type = 'checkbox';
        quotaMunitionsCheckbox.disabled = !isConnected;
        quotaMunitionsTd.appendChild(quotaMunitionsCheckbox);
        row.appendChild(quotaMunitionsTd);
        inputMap[`quotaMunitions_${matricule}`] = quotaMunitionsCheckbox;
        tbody.appendChild(row);

        if (isConnected) {
            quotaSelect.addEventListener('change', () => {
                saveToFirebase(`quota/${matricule}/quota`, quotaSelect.value);
                updatePrixEtCommission();
            });
            quantiteSelect.addEventListener('change', () => {
                saveToFirebase(`quota/${matricule}/quantite`, quantiteSelect.value);
                updatePrixEtCommission();
            });
            quotaArmeCheckbox.addEventListener('change', () => {
                saveToFirebase(`quota/${matricule}/quotaArme`, quotaArmeCheckbox.checked);
            });
            quotaArgentCheckbox.addEventListener('change', () => {
                saveToFirebase(`quota/${matricule}/quotaArgent`, quotaArgentCheckbox.checked);
            });
            quotaMunitionsCheckbox.addEventListener('change', () => {
                saveToFirebase(`quota/${matricule}/quotaMunitions`, quotaMunitionsCheckbox.checked);
            });
        }

        function updatePrixEtCommission() {
            const arme = quotaSelect.value;
            const quantite = parseInt(quantiteSelect.value) || 1;
            if (arme && prixRevente[arme]) {
                const prixVente = prixRevente[arme] * quantite;
                prixInput.value = prixVente;
                commissionInput.value = Math.round(prixVente * 0.3);
                if (isConnected) {
                    saveToFirebase(`quota/${matricule}/prix`, prixVente);
                    saveToFirebase(`quota/${matricule}/commission`, Math.round(prixVente * 0.3));
                }
            } else {
                prixInput.value = '';
                commissionInput.value = '';
                if (isConnected) {
                    saveToFirebase(`quota/${matricule}/prix`, '');
                    saveToFirebase(`quota/${matricule}/commission`, '');
                }
            }
        }
    });
    table.appendChild(tbody);
    mainTable.appendChild(table);
    container.appendChild(mainTable);
    // Autre quota
    const otherQuota = document.createElement('div');
    otherQuota.className = 'quota-other';
    otherQuota.innerHTML = `
      <h3>Autre Quota :</h3>
      <div class="quota-other-item"><span class="quota-other-label">Munition :</span><span class="quota-other-value">75 munition<br>de chaque type</span></div>
      <div class="quota-other-item"><span class="quota-other-label">Argent sale :</span><span class="quota-other-value">75 000€</span></div>
    `;
    container.appendChild(otherQuota);
    section.appendChild(container);
    // Synchronisation temps réel
    if (window.firebaseDB && window.firebaseOnValue && window.firebaseRef) {
        window.firebaseOnValue(
            window.firebaseRef(window.firebaseDB, 'quota'),
            (snapshot) => {
                const data = snapshot.val() || {};
                matricules.forEach(matricule => {
                    const d = data[matricule] || {};
                    // Quota
                    if (inputMap[`quota_${matricule}`].value !== (d.quota || ''))
                        inputMap[`quota_${matricule}`].value = d.quota || '';
                    // Quantité
                    if (inputMap[`quantite_${matricule}`].value !== (d.quantite || '1'))
                        inputMap[`quantite_${matricule}`].value = d.quantite || '1';
                    // Prix
                    if (inputMap[`prix_${matricule}`].value != (d.prix || ''))
                        inputMap[`prix_${matricule}`].value = d.prix || '';
                    // Commission
                    if (inputMap[`commission_${matricule}`].value != (d.commission || ''))
                        inputMap[`commission_${matricule}`].value = d.commission || '';
                    // Quota Arme
                    if (inputMap[`quotaArme_${matricule}`].checked !== !!d.quotaArme)
                        inputMap[`quotaArme_${matricule}`].checked = !!d.quotaArme;
                    // Quota Argent
                    if (inputMap[`quotaArgent_${matricule}`].checked !== !!d.quotaArgent)
                        inputMap[`quotaArgent_${matricule}`].checked = !!d.quotaArgent;
                    // Quota Munitions
                    if (inputMap[`quotaMunitions_${matricule}`].checked !== !!d.quotaMunitions)
                        inputMap[`quotaMunitions_${matricule}`].checked = !!d.quotaMunitions;
                });
            }
        );
    }
    // Bouton reset admin
    if (user && ADMIN_EMAILS.includes(user.email)) {
        const oldResetBtn = document.getElementById('reset-quota-btn');
        if (oldResetBtn) oldResetBtn.remove();
        const resetBtn = document.createElement('button');
        resetBtn.id = 'reset-quota-btn';
        resetBtn.textContent = 'Réinitialiser tous les quotas';
        resetBtn.style.margin = '18px auto 0 auto';
        resetBtn.style.display = 'block';
        resetBtn.style.background = 'linear-gradient(90deg, #e0eaff, #ffe0e0)';
        resetBtn.style.color = '#222';
        resetBtn.style.fontWeight = 'bold';
        resetBtn.style.fontSize = '1.08rem';
        resetBtn.style.padding = '10px 28px';
        resetBtn.style.borderRadius = '12px';
        resetBtn.style.border = 'none';
        resetBtn.style.cursor = 'pointer';
        resetBtn.style.boxShadow = '0 2px 8px #b3cfff33';
        resetBtn.onclick = () => {
            if (window.firebaseDB && window.firebaseRef && window.firebaseSet) {
                if (confirm('Voulez-vous vraiment réinitialiser tous les quotas ?')) {
                    window.firebaseSet(window.firebaseRef(window.firebaseDB, 'quota'), null)
                        .catch(() => showMsg('Erreur lors de la réinitialisation !'));
                }
            }
        };
        section.appendChild(resetBtn);
    }
  }
}


const DISPOS_LOCKED = false; 

// --- AJOUT BLANCHIMENT ---
function chargerBlanchiment() {
  const section = document.getElementById('blanchiment-section');
  section.innerHTML = '';
  section.className = 'blanchiment-section';

  // Titre
  setPageTitle('Blanchiment');

  // Message d'information (sera affiché si non connecté)
  let statusMsg = null;

  // Fonction d'affichage principale
  function renderBlanchiment(isConnected) {
    section.innerHTML = '';
    if (!isConnected) {
      statusMsg = document.createElement('div');
      statusMsg.className = 'status-msg';
      statusMsg.style.cssText = `background: #f39c12; color: #23272f; padding: 16px 24px; border-radius: 12px; margin-bottom: 24px; text-align: center; font-weight: 600; font-size: 1rem; box-shadow: 0 4px 16px rgba(243, 156, 18, 0.3); max-width: 500px; margin-left: auto; margin-right: auto; position: relative; z-index: 10;`;
      statusMsg.innerHTML = '👁️ Mode consultation – Connectez-vous pour modifier le blanchiment';
      section.appendChild(statusMsg);
    }

    // Récupérer tous les matricules sauf 'Aucun'
    const matricules = hierarchieData.filter(item => item.matricule !== 'Aucun').map(item => item.matricule);

    // Conteneur principal
    const container = document.createElement('div');
    container.className = 'blanchiment-container';

    // Map pour stocker les inputs
    const inputMap = {};

    // Affichage des champs
    matricules.forEach(matricule => {
      const row = document.createElement('div');
      row.className = 'blanchiment-row';
      row.innerHTML = `<span class="blanchiment-matricule">Matricule : <b>${matricule}</b></span>`;
      const input = document.createElement('input');
      input.type = 'number';
      input.placeholder = 'Somme en €';
      input.className = 'blanchiment-input';
      input.min = 0;
      input.disabled = !isConnected;
      inputMap[matricule] = input;
      row.appendChild(input);
      container.appendChild(row);

      // Sauvegarde en temps réel
      input.addEventListener('input', () => {
        if (window.firebaseDB && window.firebaseSet && window.firebaseRef && isConnected) {
          window.firebaseSet(
            window.firebaseRef(window.firebaseDB, `blanchiment/${matricule}`),
            input.value ? parseFloat(input.value) : 0
          );
        }
      });
    });

    // Carte somme totale
    const totalCard = document.createElement('div');
    totalCard.className = 'blanchiment-total-card';
    totalCard.innerHTML = 'Total : <b id="blanchiment-total">0 €</b>';
    container.appendChild(totalCard);

    section.appendChild(container);

    // Synchronisation temps réel
    if (window.firebaseDB && window.firebaseOnValue && window.firebaseRef) {
      window.firebaseOnValue(
        window.firebaseRef(window.firebaseDB, 'blanchiment'),
        (snapshot) => {
          const data = snapshot.val() || {};
          let total = 0;
          matricules.forEach(matricule => {
            const val = data[matricule] || 0;
            inputMap[matricule].value = val;
            total += parseFloat(val) || 0;
          });
          document.getElementById('blanchiment-total').innerHTML = total.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' €';
        }
      );
    }
  }

  // Détection connexion
  if (window.firebaseAuth && window.firebaseOnAuthStateChanged) {
    window.firebaseOnAuthStateChanged(window.firebaseAuth, (user) => {
      renderBlanchiment(!!user);
    });
  } else {
    renderBlanchiment(false);
  }
}
// --- FIN AJOUT BLANCHIMENT ---

window.addEventListener('DOMContentLoaded', () => {
  chargerRecettes();
  chargerHierarchie();
  setPageTitle('Recettes de Munitions');
  
  setupGlobalAuth();
  
  const navMunitions = document.getElementById('nav-munitions');
  const navHierarchie = document.getElementById('nav-hierarchie');
  const navDispos = document.getElementById('nav-dispos');
  const navQuota = document.getElementById('nav-quota');
  const navBlanchiment = document.getElementById('nav-blanchiment');
  const navMap = document.getElementById('nav-map');
  const recettesContainer = document.getElementById('recettes-container');
  const hierarchieSection = document.getElementById('hierarchie-section');
  const disposSection = document.getElementById('dispos-section');
  const quotaSection = document.getElementById('quota-section');
  const blanchimentSection = document.getElementById('blanchiment-section');
  const mapSection = document.getElementById('map-section');


  function clearActiveStates() {
    navMunitions.classList.remove('active');
    navHierarchie.classList.remove('active');
    navDispos.classList.remove('active');
    navQuota.classList.remove('active');
    navBlanchiment.classList.remove('active');
    navMap.classList.remove('active');
  }


  function hideAllSections() {
    recettesContainer.style.display = 'none';
    hierarchieSection.style.display = 'none';
    disposSection.style.display = 'none';
    quotaSection.style.display = 'none';
    blanchimentSection.style.display = 'none';
    mapSection.style.display = 'none';
  }


  navMunitions.addEventListener('click', (e) => {
    e.preventDefault();
    clearActiveStates();
    navMunitions.classList.add('active');
    setPageTitle('Recettes de Munitions');
    hideAllSections();
    recettesContainer.style.display = '';
    recettesContainer.classList.add('fade-section');
    void recettesContainer.offsetWidth;
    recettesContainer.classList.add('visible');
  });


  navHierarchie.addEventListener('click', (e) => {
    e.preventDefault();
    clearActiveStates();
    navHierarchie.classList.add('active');
    setPageTitle('Hiérarchie');
    hideAllSections();
    hierarchieSection.style.display = '';
    hierarchieSection.classList.add('fade-section');
    void hierarchieSection.offsetWidth;
    hierarchieSection.classList.add('visible');
  });


  navDispos.addEventListener('click', (e) => {
    e.preventDefault();
    clearActiveStates();
    navDispos.classList.add('active');
    setPageTitle('Disponibilités');
    hideAllSections();
    disposSection.style.display = '';
    disposSection.classList.add('fade-section');
    void disposSection.offsetWidth;
    disposSection.classList.add('visible');
    chargerDisponibilites();
  });


  navQuota.addEventListener('click', (e) => {
    e.preventDefault();
    clearActiveStates();
    navQuota.classList.add('active');
    setPageTitle('Quota');
    hideAllSections();
    quotaSection.style.display = '';
    quotaSection.classList.add('fade-section');
    void quotaSection.offsetWidth;
    quotaSection.classList.add('visible');
    chargerQuota();
  });

  navBlanchiment.addEventListener('click', (e) => {
    e.preventDefault();
    clearActiveStates();
    navBlanchiment.classList.add('active');
    setPageTitle('Blanchiment');
    hideAllSections();
    blanchimentSection.style.display = '';
    blanchimentSection.classList.add('fade-section');
    void blanchimentSection.offsetWidth;
    blanchimentSection.classList.add('visible');
    chargerBlanchiment();
  });

  navMap.addEventListener('click', (e) => {
    e.preventDefault();
    clearActiveStates();
    navMap.classList.add('active');
    setPageTitle('Map');
    hideAllSections();
    mapSection.style.display = '';
    mapSection.classList.add('fade-section');
    void mapSection.offsetWidth;
    mapSection.classList.add('visible');
    chargerMap();
  });

  const darkSwitch = document.getElementById('darkmode-toggle');
  if (localStorage.getItem('darkmode') === '1') {
    document.body.classList.add('darkmode');
    if (darkSwitch) darkSwitch.checked = true;
  }
  if (darkSwitch) {
    darkSwitch.onchange = () => {
      document.body.classList.toggle('darkmode');
      const isDark = document.body.classList.contains('darkmode');
      localStorage.setItem('darkmode', isDark ? '1' : '0');
    };
  }

  // Correction cadenas navigation
  function updateLockIcons() {
    // Disponibilités
    let dispoLock = navDispos.querySelector('.lock-icon');
    if (DISPOS_LOCKED) {
      if (!dispoLock) {
        dispoLock = document.createElement('span');
        dispoLock.className = 'lock-icon';
        dispoLock.style.color = '#c00';
        dispoLock.style.fontSize = '1.1em';
        dispoLock.style.verticalAlign = 'middle';
        dispoLock.innerHTML = '&#128274;';
        navDispos.appendChild(dispoLock);
      }
    } else {
      if (dispoLock) dispoLock.remove();
    }
    // Quota
    let quotaLock = navQuota.querySelector('.lock-icon');
    if (QUOTA_LOCKED) {
      if (!quotaLock) {
        quotaLock = document.createElement('span');
        quotaLock.className = 'lock-icon';
        quotaLock.style.color = '#c00';
        quotaLock.style.fontSize = '1.1em';
        quotaLock.style.verticalAlign = 'middle';
        quotaLock.innerHTML = '&#128274;';
        navQuota.appendChild(quotaLock);
      }
    } else {
      if (quotaLock) quotaLock.remove();
    }
  }
  updateLockIcons();

  // --- PARAMÈTRES UTILISATEUR ---
  const settingsBtn = document.getElementById('settings-btn');
  const settingsPopup = document.getElementById('settings-popup');
  const settingsPopupClose = document.querySelector('.settings-popup-close');
  const userSettingsForm = document.getElementById('user-settings-form');
  const usernameInput = document.getElementById('username-input');
  const emailDisplay = document.getElementById('email-display');

  let currentUser = null;
  let currentUsername = null;

  // Ouvre la popup paramètres
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      if (settingsPopup) settingsPopup.style.display = 'flex';
      chargerInfosUtilisateur();
    });
  }
  // Ferme la popup paramètres
  if (settingsPopupClose) {
    settingsPopupClose.addEventListener('click', () => {
      if (settingsPopup) settingsPopup.style.display = 'none';
    });
  }
  if (settingsPopup) {
    settingsPopup.addEventListener('click', (e) => {
      if (e.target === settingsPopup) settingsPopup.style.display = 'none';
    });
  }

  // Charger infos utilisateur (nom d'utilisateur/email)
  function chargerInfosUtilisateur() {
    if (window.firebaseAuth && window.firebaseOnAuthStateChanged) {
      window.firebaseOnAuthStateChanged(window.firebaseAuth, (user) => {
        currentUser = user;
        if (user) {
          emailDisplay.value = user.email;
          // Récupérer le nom d'utilisateur depuis la DB
          if (window.firebaseDB && window.firebaseRef && window.firebaseOnValue) {
            const userRef = window.firebaseRef(window.firebaseDB, `users/${user.uid}/username`);
            window.firebaseOnValue(userRef, (snapshot) => {
              currentUsername = snapshot.val() || '';
              usernameInput.value = currentUsername;
            }, { onlyOnce: true });
          } else {
            usernameInput.value = '';
          }
        } else {
          emailDisplay.value = '';
          usernameInput.value = '';
        }
      });
    }
  }

  // Sauvegarder le nom d'utilisateur
  if (userSettingsForm) {
    userSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!currentUser) return;
      const newUsername = usernameInput.value.trim();
      if (window.firebaseDB && window.firebaseSet && window.firebaseRef) {
        const userRef = window.firebaseRef(window.firebaseDB, `users/${currentUser.uid}/username`);
        window.firebaseSet(userRef, newUsername)
          .then(() => {
            currentUsername = newUsername;
            settingsPopup.style.display = 'none';
            majAffichageNomUtilisateur();
          });
      }
    });
  }

  // Afficher le nom d'utilisateur dans la navbar (à la place de l'email)
  function majAffichageNomUtilisateur() {
    const authStatus = document.getElementById('auth-status');
    if (currentUser) {
      let affichage = currentUsername ? currentUsername : currentUser.email;
      authStatus.innerHTML = `
        <div class="user-info">
          <span>Connecté en tant que: <span class="user-email">${affichage}</span></span>
          <button class="auth-btn logout" onclick="logoutUser()">Déconnexion</button>
        </div>
      `;
    } else {
      authStatus.innerHTML = `
        <button id="login-btn" class="auth-btn" onclick="showAuthPopup()">Se connecter</button>
      `;
    }
  }

  // Mettre à jour le nom d'utilisateur à chaque changement d'état
  if (window.firebaseOnAuthStateChanged && window.firebaseAuth) {
    window.firebaseOnAuthStateChanged(window.firebaseAuth, (user) => {
      currentUser = user;
      if (user && window.firebaseDB && window.firebaseRef && window.firebaseOnValue) {
        const userRef = window.firebaseRef(window.firebaseDB, `users/${user.uid}/username`);
        window.firebaseOnValue(userRef, (snapshot) => {
          currentUsername = snapshot.val() || '';
          majAffichageNomUtilisateur();
        }, { onlyOnce: true });
      } else {
        currentUsername = null;
        majAffichageNomUtilisateur();
      }
    });
  }

  // Masquer le footer sur mobile après 5 secondes
  setTimeout(() => {
    if (window.innerWidth <= 600) {
      const footer = document.querySelector('.footer-card');
      if (footer) footer.classList.add('hide-on-mobile');
    }
  }, 5000);
});

function setupGlobalAuth() {
  const authStatus = document.getElementById('auth-status');
  const authPopup = document.getElementById('auth-popup');
  const authPopupContainer = document.getElementById('auth-popup-container');
  const authPopupClose = document.querySelector('.auth-popup-close');
  const loginBtn = document.getElementById('login-btn');
  
  let currentUser = null;

  if (window.firebaseOnAuthStateChanged && window.firebaseAuth) {
    window.firebaseOnAuthStateChanged(window.firebaseAuth, (user) => {
      currentUser = user;
      updateAuthUI(user);
    });
  }
  
  function updateAuthUI(user) {
    if (user) {

      authStatus.innerHTML = `
        <div class="user-info">
          <span>Connecté en tant que: <span class="user-email">${user.email}</span></span>
          <button class="auth-btn logout" onclick="logoutUser()">Déconnexion</button>
        </div>
      `;
    } else {

      authStatus.innerHTML = `
        <button id="login-btn" class="auth-btn" onclick="showAuthPopup()">Se connecter</button>
      `;
    }
  }
  

  window.showAuthPopup = function() {
    renderAuthForm();
    authPopup.style.display = 'flex';
    authPopup.style.alignItems = 'center';
    authPopup.style.justifyContent = 'center';
    authPopup.style.position = 'fixed';
    authPopup.style.top = '0';
    authPopup.style.left = '0';
    authPopup.style.width = '100%';
    authPopup.style.height = '100%';
    authPopup.style.zIndex = '9999';
    authPopup.classList.add('show');
  };
  

  function closeAuthPopup() {
    authPopup.classList.remove('show');
    authPopup.style.display = 'none';
  }
  
  window.logoutUser = function() {
    if (window.firebaseSignOut && window.firebaseAuth) {
      window.firebaseSignOut(window.firebaseAuth).then(() => {
        console.log('Utilisateur déconnecté');
      }).catch((error) => {
        console.error('Erreur de déconnexion:', error);
      });
    }
  };

  authPopupClose.addEventListener('click', closeAuthPopup);
  authPopup.addEventListener('click', (e) => {
    if (e.target === authPopup) {
      closeAuthPopup();
    }
  });
  

  function renderAuthForm() {
    authPopupContainer.innerHTML = `
      <div class="auth-form">
        <h2 style="text-align: center; margin-bottom: 24px; color: #333; font-weight: 600;">Connexion / Inscription</h2>
        <div class="auth-tabs">
          <button class="auth-tab active" onclick="switchAuthTab('login')">Connexion</button>
          <button class="auth-tab" onclick="switchAuthTab('register')">Inscription</button>
        </div>
        <div id="auth-form-content">
          ${renderLoginForm()}
        </div>
      </div>
    `;
    addAuthPopupStyles();
  }
  
  function renderLoginForm() {
    return `
      <form id="login-form" onsubmit="handleLogin(event)">
        <div class="auth-form-group">
          <label for="login-email">Email:</label>
          <input type="email" id="login-email" required>
        </div>
        <div class="auth-form-group">
          <label for="login-password">Mot de passe:</label>
          <input type="password" id="login-password" required>
        </div>
        <button type="submit" class="auth-submit-btn">Se connecter</button>
        <div id="login-msg" class="auth-msg"></div>
      </form>
    `;
  }
  
  function renderRegisterForm() {
    return `
      <form id="register-form" onsubmit="handleRegister(event)">
        <div class="auth-form-group">
          <label for="register-email">Email:</label>
          <input type="email" id="register-email" required>
        </div>
        <div class="auth-form-group">
          <label for="register-password">Mot de passe:</label>
          <input type="password" id="register-password" required minlength="6">
        </div>
        <div class="auth-form-group">
          <label for="register-confirm">Confirmer le mot de passe:</label>
          <input type="password" id="register-confirm" required minlength="6">
        </div>
        <button type="submit" class="auth-submit-btn">Créer un compte</button>
        <div id="register-msg" class="auth-msg"></div>
      </form>
    `;
  }
  

  window.switchAuthTab = function(tab) {
    const tabs = document.querySelectorAll('.auth-tab');
    const content = document.getElementById('auth-form-content');
    
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'login') {
      content.innerHTML = renderLoginForm();
    } else {
      content.innerHTML = renderRegisterForm();
    }
  };

  window.handleLogin = function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const msgDiv = document.getElementById('login-msg');
    
    if (window.firebaseSignIn && window.firebaseAuth) {
      window.firebaseSignIn(window.firebaseAuth, email, password)
        .then((userCredential) => {
          msgDiv.textContent = 'Connexion réussie !';
          msgDiv.className = 'auth-msg success';
          setTimeout(() => {
            closeAuthPopup();
          }, 1500);
        })
        .catch((error) => {
          let errorMessage = 'Erreur de connexion';
          if (error.code === 'auth/user-not-found') {
            errorMessage = 'Aucun compte trouvé avec cet email';
          } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Mot de passe incorrect';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Email invalide';
          }
          msgDiv.textContent = errorMessage;
          msgDiv.className = 'auth-msg error';
        });
    }
  };
  

  window.handleRegister = function(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    const msgDiv = document.getElementById('register-msg');
    
    if (password !== confirm) {
      msgDiv.textContent = 'Les mots de passe ne correspondent pas';
      msgDiv.className = 'auth-msg error';
      return;
    }
    
    if (window.firebaseCreateUser && window.firebaseAuth) {
      window.firebaseCreateUser(window.firebaseAuth, email, password)
        .then((userCredential) => {
          msgDiv.textContent = 'Compte créé avec succès !';
          msgDiv.className = 'auth-msg success';
          setTimeout(() => {
            closeAuthPopup();
          }, 1500);
        })
        .catch((error) => {
          let errorMessage = 'Erreur lors de la création du compte';
          if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Un compte existe déjà avec cet email';
          } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Email invalide';
          }
          msgDiv.textContent = errorMessage;
          msgDiv.className = 'auth-msg error';
        });
    }
  };
  
  function addAuthPopupStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .auth-form {
        width: 100%;
      }
      
      .auth-tabs {
        display: flex;
        margin-bottom: 24px;
        border-bottom: 2px solid #e0e0e0;
      }
      
      .auth-tab {
        flex: 1;
        padding: 12px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        color: #666;
        transition: all 0.3s ease;
      }
      
      .auth-tab.active {
        color: #667eea;
        border-bottom: 2px solid #667eea;
      }
      
      .auth-form-group {
        margin-bottom: 20px;
      }
      
      .auth-form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
      }
      
      .auth-form-group input {
        width: 100%;
        padding: 12px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
        box-sizing: border-box;
      }
      
      .auth-form-group input:focus {
        outline: none;
        border-color: #667eea;
      }
      
      .auth-submit-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 16px;
      }
      
      .auth-submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }
      
      .auth-msg {
        padding: 12px;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
      }
      
      .auth-msg.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }
      
      .auth-msg.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }
      
      /* Mode sombre */
      body.darkmode .auth-tab {
        color: #ccc;
      }
      
      body.darkmode .auth-tab.active {
        color: #667eea;
      }
      
      body.darkmode .auth-form-group label {
        color: #fff;
      }
      
      body.darkmode .auth-form-group input {
        background: #3a3a3a;
        color: #fff;
        border-color: #555;
      }
      
      body.darkmode .auth-form-group input:focus {
        border-color: #667eea;
      }
      
      body.darkmode .auth-msg.success {
        background: #1e4d2b;
        color: #d4edda;
        border-color: #2d5a3d;
      }
      
      body.darkmode .auth-msg.error {
        background: #4d1e1e;
        color: #f8d7da;
        border-color: #5a2d2d;
      }
    `;
    document.head.appendChild(style);
  }
}


function chargerMap() {
  const section = document.getElementById('map-section');
  section.innerHTML = '';
  section.className = 'map-section';


  const imgW = 650;
  const imgH = 682;
  const caseSize = 40; 
  const cols = Math.floor(imgW / caseSize);
  const rows = Math.floor(imgH / caseSize);
  const caseColor = 'rgba(255,140,0,0.55)'; 


  let casesState = {}; // {"r_c": 0|1}


  let zoom = 1;
  let offsetX = 0;
  let offsetY = 0;


  const mapContainer = document.createElement('div');
  mapContainer.style.position = 'relative';
  mapContainer.style.display = 'inline-block';
  mapContainer.style.width = imgW + 'px';
  mapContainer.style.height = imgH + 'px';
  mapContainer.style.maxWidth = '100vw';
  mapContainer.style.overflow = 'hidden';
  mapContainer.style.transition = 'transform 0.2s';
  mapContainer.style.transformOrigin = '0 0';
  section.appendChild(mapContainer);


  const mapImg = document.createElement('img');
  mapImg.src = 'map.png';
  mapImg.alt = 'Map';
  mapImg.style.width = imgW + 'px';
  mapImg.style.height = imgH + 'px';
  mapImg.style.display = 'block';
  mapImg.style.borderRadius = '12px';
  mapImg.style.boxShadow = '0 2px 16px #0002';
  mapImg.style.position = 'relative';
  mapContainer.appendChild(mapImg);


  const gridOverlay = document.createElement('div');
  gridOverlay.style.position = 'absolute';
  gridOverlay.style.top = '0';
  gridOverlay.style.left = '0';
  gridOverlay.style.width = imgW + 'px';
  gridOverlay.style.height = imgH + 'px';
  gridOverlay.style.pointerEvents = 'none';
  gridOverlay.style.zIndex = '2';
  gridOverlay.className = 'map-grid-overlay';
  mapContainer.appendChild(gridOverlay);

  function renderGrid() {
    gridOverlay.innerHTML = '';
    let num = 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.className = 'map-cell';
        cell.style.position = 'absolute';
        cell.style.left = (c * caseSize) + 'px';
        cell.style.top = (r * caseSize) + 'px';
        cell.style.width = caseSize + 'px';
        cell.style.height = caseSize + 'px';
        cell.style.background = casesState[`${r}_${c}`] ? caseColor : 'transparent';
        cell.style.cursor = 'pointer';
        cell.style.transition = 'background 0.2s';
        cell.style.pointerEvents = 'auto';
        cell.dataset.active = casesState[`${r}_${c}`] ? '1' : '0';

        const numDiv = document.createElement('div');
        numDiv.textContent = num;
        numDiv.style.position = 'absolute';
        numDiv.style.left = '50%';
        numDiv.style.top = '50%';
        numDiv.style.transform = 'translate(-50%,-50%)';
        numDiv.style.fontSize = '0.85em';
        numDiv.style.color = '#7c8aff';
        numDiv.style.fontWeight = 'bold';
        numDiv.style.opacity = '0.7';
        numDiv.style.userSelect = 'none';
        cell.appendChild(numDiv);

        cell.addEventListener('click', function(e) {
          e.stopPropagation();
          const key = `${r}_${c}`;
          if (casesState[key]) {
            cell.style.background = 'transparent';
            cell.dataset.active = '0';
            casesState[key] = 0;
          } else {
            cell.style.background = caseColor;
            cell.dataset.active = '1';
            casesState[key] = 1;
          }
          syncCasesToFirebase();
        });
        gridOverlay.appendChild(cell);
        num++;
      }
    }
  }


  mapContainer.addEventListener('wheel', function(e) {
    e.preventDefault();
    const rect = mapContainer.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - offsetX) / zoom;
    const mouseY = (e.clientY - rect.top - offsetY) / zoom;
    const delta = Math.sign(e.deltaY);
    let newZoom = zoom;
    if (delta < 0) {
      newZoom = Math.min(zoom * 1.15, 3);
    } else {
      newZoom = Math.max(zoom / 1.15, 0.4);
    }

    offsetX = (offsetX - mouseX) * (newZoom / zoom) + mouseX;
    offsetY = (offsetY - mouseY) * (newZoom / zoom) + mouseY;
    zoom = newZoom;
    mapContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`;
    renderGrid();
  }, { passive: false });
  mapContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`;


  function syncCasesToFirebase() {
    if (window.firebaseDB && window.firebaseSet && window.firebaseRef) {
      window.firebaseSet(window.firebaseRef(window.firebaseDB, 'map/cases'), casesState);
    }
    renderGrid();
  }

  if (window.firebaseDB && window.firebaseOnValue && window.firebaseRef) {
    window.firebaseOnValue(window.firebaseRef(window.firebaseDB, 'map/cases'), (snap) => {
      casesState = snap.val() || {};
      renderGrid();
    });
  } else {
    renderGrid();
  }
}
