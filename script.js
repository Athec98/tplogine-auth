// ===== FONCTION GLOBALE POUR TOGGLE PASSWORD =====
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (!passwordInput) return;
    
    const toggleButton = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        if (toggleButton && toggleButton.classList.contains('password-toggle')) {
            toggleButton.textContent = '🔒';
        }
    } else {
        passwordInput.type = 'password';
        if (toggleButton && toggleButton.classList.contains('password-toggle')) {
            toggleButton.textContent = '👁️';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // ==========================================================
    // ---------------    GESTION CONNEXION    ------------------
    // ==========================================================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const loginEmail = document.getElementById('login_email');
        const loginPassword = document.getElementById('login_password');
        const toggleLoginPasswordButton = document.getElementById('toggleLoginPassword');

        const loginEmailError = document.getElementById('loginEmailError');
        const loginPasswordError = document.getElementById('loginPasswordError');
        const loginGeneralError = document.getElementById('loginGeneralError');
        const loginSuccessMessage = document.getElementById('loginSuccessMessage');
        const loader = document.getElementById('loader');

        const defaultEmail = "admin@example.com";
        const defaultPassword = "admin123";

        // Fonction de validation email
        function validateEmail(email) {
            if (email.indexOf('@') === -1) return "L'email doit contenir un @";
            const parts = email.split('@');
            if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
                return "Format d'email invalide";
            }
            if (email.indexOf(' ') !== -1) return "L'email ne doit pas contenir d'espaces";
            return null;
        }

        // Fonction de validation mot de passe
        function validatePassword(password) {
            if (password.length < 6) return "Le mot de passe doit contenir au moins 6 caractères";
            return null;
        }

        // Toggle mot de passe
        toggleLoginPasswordButton.addEventListener('click', function () {
            if (loginPassword.type === 'password') {
                loginPassword.type = 'text';
                toggleLoginPasswordButton.textContent = '🔒';
            } else {
                loginPassword.type = 'password';
                toggleLoginPasswordButton.textContent = '👁️';
            }
        });

        // Validation en temps réel
        loginEmail.addEventListener('input', function () {
            const error = validateEmail(loginEmail.value);
            if (error) {
                loginEmailError.textContent = error;
                loginEmailError.style.display = 'block';
            } else {
                loginEmailError.style.display = 'none';
            }
        });

        loginPassword.addEventListener('input', function () {
            const error = validatePassword(loginPassword.value);
            if (error) {
                loginPasswordError.textContent = error;
                loginPasswordError.style.display = 'block';
            } else {
                loginPasswordError.style.display = 'none';
            }
        });

        // Soumission formulaire login
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            loginGeneralError.style.display = 'none';
            loginSuccessMessage.style.display = 'none';
            loader.style.display = 'none';

            const emailError = validateEmail(loginEmail.value);
            const passwordError = validatePassword(loginPassword.value);

            if (emailError) {
                loginEmailError.textContent = emailError;
                loginEmailError.style.display = 'block';
                return;
            }
            if (passwordError) {
                loginPasswordError.textContent = passwordError;
                loginPasswordError.style.display = 'block';
                return;
            }

            if (loginEmail.value !== defaultEmail || loginPassword.value !== defaultPassword) {
                loginGeneralError.textContent = "Email ou mot de passe incorrect";
                loginGeneralError.style.display = 'block';
                return;
            }

            loginSuccessMessage.style.display = 'block';
            loader.style.display = 'block';

            setTimeout(() => {
                window.location.href = 'Accueil.html';
            }, 2000);
        });
    }

    // ==========================================================
    // -------------   GESTION AJOUT DE MEMBRES   ---------------
    // ==========================================================
    const memberForm = document.getElementById('memberForm');
    if (memberForm) {
        const membersList = document.getElementById('membersList');
        let members = [];

        // Charger depuis localStorage
        if (localStorage.getItem('members')) {
            members = JSON.parse(localStorage.getItem('members'));
            renderMembers();
        }

        // Validation du formulaire membre
        function validateMemberForm() {
            let isValid = true;

            const nomComplet = document.getElementById('register_nom_complet').value.trim();

            // Vérification obligatoire
            if (nomComplet === '') {
                showError('nom_complet_error', 'Le nom complet est obligatoire');
                isValid = false;
            }
            // Vérification longueur minimale
            else if (nomComplet.length < 3) {
                showError('nom_complet_error', 'Veuillez entrer un nom complet valide (au moins 3 caractères)');
                isValid = false;
            }
            // Vérification uniquement lettres et espaces
            else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nomComplet)) {
                showError('nom_complet_error', 'Le nom complet ne doit contenir que des lettres et des espaces');
                isValid = false;
            }
            else {
                hideError('nom_complet_error');
            }

            const email = document.getElementById('register_email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('email_error', 'Veuillez entrer une adresse email valide');
                isValid = false;
            } else hideError('email_error');

            const password = document.getElementById('register_password').value;
            if (password.length < 6) {
                showError('password_error', 'Le mot de passe doit contenir au moins 6 caractères');
                isValid = false;
            } else hideError('password_error');

            const confirmPassword = document.getElementById('register_confirm_password').value;
            if (password !== confirmPassword) {
                showError('confirm_password_error', 'Les mots de passe ne correspondent pas');
                isValid = false;
            } else hideError('confirm_password_error');

            return isValid;
        }

        function showError(id, message) {
            const el = document.getElementById(id);
            el.textContent = message;
            el.style.display = 'block';
        }

        function hideError(id) {
            const el = document.getElementById(id);
            el.style.display = 'none';
        }

        // Ajouter membre
        function addMember() {
            const nomComplet = document.getElementById('register_nom_complet').value.trim();
            const email = document.getElementById('register_email').value.trim();
            const password = document.getElementById('register_password').value;
            const creationDate = new Date().toLocaleString('fr-FR');

            const newMember = {
                id: Date.now(),
                nom_complet: nomComplet,
                email: email,
                password: password, // ⚠️ en prod : à hasher
                creation_date: creationDate,
                statut: true
            };

            members.push(newMember);
            saveMembers();
            renderMembers();
            alert(`Membre ${nomComplet} ajouté avec succès !`);
        }

        function saveMembers() {
            localStorage.setItem('members', JSON.stringify(members));
        }

        function renderMembers() {
            if (members.length === 0) {
                membersList.innerHTML = '<tr><td colspan="5" class="no-members">Aucun membre ajouté</td></tr>';
                return;
            }

            membersList.innerHTML = '';
            members.forEach(member => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${member.nom_complet}</td>
                    <td>${member.email}</td>
                    <td>${member.creation_date}</td>
                    <td>
                        <span class="${member.statut ? 'status-active' : 'status-inactive'}">
                            ${member.statut ? 'Actif' : 'Inactif'}
                        </span>
                        <input type="checkbox" ${member.statut ? 'checked' : ''} 
                            class="status-checkbox" 
                            data-id="${member.id}"
                            onchange="toggleStatus(${member.id})">
                    </td>
                    <td>
                        <button class="action-btn" onclick="deleteMember(${member.id})">Supprimer</button>
                    </td>
                `;
                membersList.appendChild(row);
            });
        }

        // Soumission formulaire
        memberForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateMemberForm()) {
                addMember();
                memberForm.reset();
            }
        });

        // Fonctions globales
        window.toggleStatus = function (id) {
            members = members.map(m => m.id === id ? { ...m, statut: !m.statut } : m);
            saveMembers();
            renderMembers();
            const member = members.find(m => m.id === id);
            alert(`Statut de ${member.nom_complet} ${member.statut ? 'activé' : 'désactivé'} avec succès !`);
        };

        window.deleteMember = function (id) {
            if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
                const index = members.findIndex(m => m.id === id);
                const name = members[index].nom_complet;
                members.splice(index, 1);
                saveMembers();
                renderMembers();
                alert(`Membre ${name} supprimé avec succès !`);
            }
        };
    }
});