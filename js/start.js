const cards = document.querySelectorAll('.card');
const startButton = document.getElementById('start__button');
const gameModeContainer = document.querySelector('.gameMode');
let selectedMode = null;

const msg = document.createElement('p');
msg.classList.add('message');
gameModeContainer.appendChild(msg);

cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedMode = card.getAttribute('data-mode');
    startButton.disabled = false;
    msg.textContent = `Mode sélectionné : ${card.querySelector('h2').textContent}`;
  });
});

startButton.addEventListener('click', () => {
  if (selectedMode) {
    msg.textContent = `Démarrage du ${selectedMode.toUpperCase()}...`;
    // window.location.href = `${selectedMode}.html`;
  }
});

const fallingContainer = document.getElementById('lettres__tombantes');

function createFallingLetter() {
  const letter = document.createElement('div');
  letter.classList.add('falling-letter');
  letter.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  letter.style.left = Math.random() * 100 + 'vw';
  letter.style.fontSize = (Math.random() * 15 + 15) + 'px';
  letter.style.animationDuration = (2 + Math.random() * 2) + 's';
  fallingContainer.appendChild(letter);

  setTimeout(() => {
    letter.remove();
  }, 4000);
}

setInterval(createFallingLetter, 300);
