const loginPage__button = document.getElementById('button');
const usernameInput = document.getElementById('username');
const message = document.getElementById('loginPage--message');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginPage__button.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email) {
        message.textContent = "Veuillez entrer votre email.";
        message.classList.add('show');
        return;
    }

    if (!username) {
        message.textContent = "Veuillez entrer votre nom d'utilisateur.";
        message.classList.add('show');
        return;
    }

    if (!password) {
        message.textContent = "Veuillez entrer votre mots de passe.";
        message.classList.add('show');
        return;
    }
    
    loginPage__button.disabled = true;
    loginPage__button.style.opacity = '0.6';
    loginPage__button.style.cursor = 'not-allowed';

    
    message.textContent = "Connexion en cours...";
    message.classList.add('show');

    
    setTimeout(() => {
        message.textContent = `Bienvenue, ${username} !`;
        message.classList.add('show');
        window.location.href = "../html/start.html"
        
    }, 2000);
});
