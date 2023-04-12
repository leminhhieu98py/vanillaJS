const mainContainer = document.getElementById('main');
const toggleBtn = document.getElementById('toggle');
const textBoxContainer = document.getElementById('text-box');
const closeBtn = document.getElementById('close');
const textToReadInput = document.getElementById('text');
const readBtn = document.getElementById('read');
const voiceSelect = document.getElementById('voices');
let voices = [];

const data = [
  { image: './img/angry.jpg', text: "I'm angry" },
  { image: './img/drink.jpg', text: "I'm thirsty" },
  { image: './img/food.jpg', text: "I'm hungry" },
  { image: './img/grandma.jpg', text: 'This is my grandma' }
];

const debounce = (callback, debouceTime = 500) => {
  let timeout;

  return (arguments) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(arguments), debouceTime);
  };
};

const readTheText = (text, voice) => {
  const speechText = new SpeechSynthesisUtterance(text);

  if (voice) {
    speechText.voice = voice;
  }
  speechSynthesis.speak(speechText);
};

function populateVoiceList() {
  voices = speechSynthesis.getVoices();

  for (const voice of voices) {
    const option = document.createElement('option');
    option.textContent = voice.lang;
    if (voice.default) {
      option.textContent += ' (default)';
    }
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  }
}

const renderDataBox = () => {
  const dataBoxElementString = data
    .map((item) => {
      const { image, text } = item;
      return `<div class="box">
<img src="${image}" alt="${text}" />
<p class="info">${text}</p>
</div>`;
    })
    .join('\n');
  mainContainer.innerHTML = dataBoxElementString;
  addSpeechReaderToDataBox();
};

const addSpeechReaderToDataBox = () => {
  const dataBoxElements = document.getElementsByClassName('box');
  for (const dataBoxElement of dataBoxElements) {
    dataBoxElement.addEventListener(
      'click',
      debounce(() => {
        const dataBoxText = dataBoxElement.innerText;
        dataBoxElement.classList.add('active');
        readTheText(dataBoxText);
        setTimeout(() => dataBoxElement.classList.remove('active'), 1000);
      })
    );
  }
};

const handleToggleTextBox = () => {
  textBoxContainer.classList.toggle('show');
};

const handleReadText = () => {
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute('data-name');
  const voice = voices.find((voiceItem) => voiceItem.name === selectedOption);

  const textToRead = textToReadInput.value;
  readTheText(textToRead, voice);
};

const init = () => {
  renderDataBox();
  populateVoiceList();
  toggleBtn.addEventListener('click', handleToggleTextBox);
  closeBtn.addEventListener('click', handleToggleTextBox);
  readBtn.addEventListener('click', handleReadText);
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
};

init();
