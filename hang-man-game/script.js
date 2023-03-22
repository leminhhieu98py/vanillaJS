const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const popupElement = document.getElementById('popup-container');
const finalMessageElement = document.getElementById('final-message');
const finalMessageRevealWordElement = document.getElementById(
  'final-message-reveal-word'
);
const playAgainButton = document.getElementById('play-button');

const wordList = ['Otis', 'Tine', 'Henry', 'Rose'];
let gameWord = wordList[Math.floor(Math.random() * wordList.length)];
let gameWordCharacters = gameWord.toLowerCase().split('');
let pressKeys = [];

const renderCorrectCharacter = (key) => {
  const letterElements = document.getElementsByClassName('letter');
  const keyIndexes = gameWordCharacters
    .map((character, index) => {
      if (character === key) return index;
      return null;
    })
    .filter((index) => index !== null);

  keyIndexes.forEach((keyIndex) => {
    const letterElement = letterElements[keyIndex];
    letterElement.innerText = key.toUpperCase();
    letterElement.classList.add('correct-letter');
  });

  const correcLetterElements =
    document.getElementsByClassName('correct-letter');

  if (correcLetterElements.length === gameWordCharacters.length) {
    handleWinGame();
  }
};

const renderIncorrectCharacter = (key) => {
  wrongLettersElement.insertAdjacentHTML(
    'beforeend',
    `<p>${key.toUpperCase()}</p>`
  );
};

const handleWinGame = () => {
  finalMessageElement.innerText = 'You win !!!';
  finalMessageRevealWordElement.innerText = gameWord;
  popupElement.classList.remove('d-none');
};

const handlePlayAgain = () => {
  popupElement.classList.add('d-none');
  gameWord = wordList[Math.floor(Math.random() * wordList.length)];
  gameWordCharacters = gameWord.toLowerCase().split('');
  pressKeys = [];
  wrongLettersElement.innerHTML = '';
  const figurePartElements = document.querySelectorAll(
    '.figure-part:not(.d-none)'
  );
  [...figurePartElements].forEach((figurePartElement) =>
    figurePartElement.classList.add('d-none')
  );
  wordElement.innerHTML = '';
  renderGameWordLetters();
  window.addEventListener('keyup', handleKeyUp);
};

const handleLoseGame = () => {
  window.removeEventListener('keyup', handleKeyUp);
  finalMessageElement.innerText = 'You lose T.T';
  finalMessageRevealWordElement.innerText = gameWord;
  popupElement.classList.remove('d-none');
  console.log('handleLoseGame', popupElement);
};

const handleDrawFigure = () => {
  const figurePartElements = document.querySelectorAll('.figure-part.d-none');
  console.log(figurePartElements.length);
  if (figurePartElements.length === 1) {
    handleLoseGame();
  } else {
    figurePartElements[0].classList.remove('d-none');
  }
};

const handleKeyUp = (e) => {
  const key = e.key;
  if (pressKeys.includes(key) || e.which < 65 || e.which > 90) return;

  pressKeys.push(key);

  if (gameWordCharacters.includes(key)) {
    renderCorrectCharacter(key);
  } else {
    renderIncorrectCharacter(key);
    handleDrawFigure();
  }
};

const renderGameWordLetters = () => {
  for (let i = 0; i < gameWordCharacters.length; i++) {
    wordElement.insertAdjacentHTML(
      'beforeend',
      '<span class="letter"> </span>'
    );
  }
};

const init = () => {
  window.addEventListener('keyup', handleKeyUp);
  playAgainButton.addEventListener('click', handlePlayAgain);
  renderGameWordLetters();
};

init();
