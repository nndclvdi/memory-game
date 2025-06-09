const board = document.getElementById("game-board");
const message = document.getElementById("message");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const flipSound = document.getElementById("sound-flip");
const matchSound = document.getElementById("sound-match");

const icons = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍉", "🍑"];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let seconds = 0;
let timerInterval;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `🕒 ${seconds} detik`;
  }, 1000);
}

function renderBoard() {
  board.innerHTML = "";
  cards = [...icons, ...icons];
  shuffle(cards);
  cards.forEach((icon, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.dataset.index = index;
    card.addEventListener("click", handleFlip);
    board.appendChild(card);
  });
}

function handleFlip(e) {
  const card = e.target;
  if (card.classList.contains("flipped") || flippedCards.length === 2) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.icon;
  flipSound.play();
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.icon === card2.dataset.icon) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchSound.play();
    matchedPairs++;
    score += 10;
  } else {
    card1.classList.remove("flipped");
    card1.textContent = "";
    card2.classList.remove("flipped");
    card2.textContent = "";
    score -= 2;
  }

  scoreDisplay.textContent = `🎯 Skor: ${score}`;
  flippedCards = [];

  if (matchedPairs === icons.length) {
    clearInterval(timerInterval);
    message.textContent = `🎉 Kamu Menang! Waktu: ${seconds} detik, Skor: ${score}`;
  }
}

function restartGame() {
  matchedPairs = 0;
  score = 0;
  message.textContent = "";
  scoreDisplay.textContent = `🎯 Skor: ${score}`;
  renderBoard();
  startTimer();
}

restartGame();
