document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const generalError = document.getElementById('generalError');
    const successMessage = document.getElementById('successMessage');
    const btnLogin = document.getElementById('loginButton');
    const loader = document.getElementById('loader');

    // Compte par défaut (non affiché sur la page)
    const defaultEmail = "admin@example.com";
    const defaultPassword = "admin123";

    // Fonction de validation de l'email
    function validateEmail(email) {
        // Vérifie la présence d'un @
        if (email.indexOf('@') === -1) {
            return "L'email doit contenir un @";
        }

        // Vérifie le format "chainedecaractere@chainedecaractere"
        const parts = email.split('@');
        if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
            return "Format d'email invalide";
        }

        // Vérifie qu'il n'y a pas d'espaces
        if (email.indexOf(' ') !== -1) {
            return "L'email ne doit pas contenir d'espaces";
        }

        return null; // Aucune erreur
    }

    // Fonction de validation du mot de passe
    function validatePassword(password) {
        if (password.length < 6) {
            return "Le mot de passe doit contenir au moins 6 caractères";
        }
        return null; // Aucune erreur
    }

    // Validation en temps réel de l'email
    emailInput.addEventListener('input', function () {
        const error = validateEmail(emailInput.value);
        if (error) {
            emailInput.classList.add('error');
            emailError.textContent = error;
            emailError.style.display = 'block';
        } else {
            emailInput.classList.remove('error');
            emailError.style.display = 'none';
        }
    });

    // Validation en temps réel du mot de passe
    passwordInput.addEventListener('input', function () {
        const error = validatePassword(passwordInput.value);
        if (error) {
            passwordInput.classList.add('error');
            passwordError.textContent = error;
            passwordError.style.display = 'block';
        } else {
            passwordInput.classList.remove('error');
            passwordError.style.display = 'none';
        }
    });

    // Gestion de la soumission du formulaire
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Cacher les messages précédents
        generalError.style.display = 'none';
        successMessage.style.display = 'none';
        loader.style.display = 'none';

        // Valider l'email
        const emailErrorMsg = validateEmail(emailInput.value);
        if (emailErrorMsg) {
            emailInput.classList.add('error');
            emailError.textContent = emailErrorMsg;
            emailError.style.display = 'block';
            return;
        }

        // Valider le mot de passe
        const passwordErrorMsg = validatePassword(passwordInput.value);
        if (passwordErrorMsg) {
            passwordInput.classList.add('error');
            passwordError.textContent = passwordErrorMsg;
            passwordError.style.display = 'block';
            return;
        }

        // Vérifier les identifiants
        if (emailInput.value !== defaultEmail || passwordInput.value !== defaultPassword) {
            generalError.textContent = "Email ou mot de passe incorrect";
            generalError.style.display = 'block';
            return;
        }

        // Redirection vers la page d'accueil
        setTimeout(function(){
            window.location.href = 'Accueil.html';
        },0);
    });
});