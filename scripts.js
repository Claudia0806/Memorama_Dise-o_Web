// Obtiene todas las tarjetas
const cards = document.querySelectorAll('#memorama > div > div');
let revealedCards = []; // guarda las cartas encontradas
let lockBoard = false;
let flippedCards = 0;

function checkForMatch() {
  const [carta1, carta2] = revealedCards;// obitene las dos cartas reveladas
  const img1 = carta1.querySelector('img');
  const img2 = carta2.querySelector('img');

  if (img1.src === img2.src) { // Si las imágenes son iguales, se retiran los eventos de clic
    carta1.removeEventListener('click', flipCard);
    carta2.removeEventListener('click', flipCard);
  } else {
    lockBoard = true;
    // Bloquea el tablero para evitar que se volteen más cartas
    setTimeout(() => {
      carta1.classList.remove('open');
      carta2.classList.remove('open');
      lockBoard = false;
    }, 1000);
  }
 // Limpia el array de cartas reveladas
  revealedCards = [];
}

function flipCard() {
  if (lockBoard || flippedCards >= 2) return; // Si el tablero está bloqueado o ya se voltiaron 2 cartas, no hacer nada

  this.classList.add('open'); // Muestra la imagen de la carta al agregar la clase 'open'
  revealedCards.push(this); // Agrega la carta al array de cartas reveladas
  flippedCards++; // Incrementa el contador de cartas volteadas

  if (flippedCards === 2) { // Si se han volteado 2 cartas
    checkForMatch(); // Comprueba si las cartas coinciden
    flippedCards = 0; // Reinicia el contador de cartas volteadas
    lockBoard = true; // Bloquea el tablero para evitar que se volteen más cartas
    setTimeout(() => {
      lockBoard = false; // Desbloquea el tablero después de 1 segundo
    }, 1000);
  }
}
cards.forEach(card => {
  card.addEventListener('click', flipCard);
});
