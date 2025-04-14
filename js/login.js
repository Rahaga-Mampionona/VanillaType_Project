const loginPage__button = document.getElementById('button');
const usernameInput = document.getElementById('username');
const message = document.getElementById('loginPage--message');

loginPage__button.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    if (!username) {
        message.textContent = "Veuillez entrer votre nom d'utilisateur.";
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
