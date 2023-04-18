const micButton = document.getElementById('micButton');
const msgContainer = document.getElementById('msg');

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const handleStartRecog = () => {
  recognition.start();
  recognition.continuous = false;
  recognition.lang = 'en-US';
};

const handleOnResult = (event) => {
  const recognitionTranscript = event.results[0][0].transcript;
  renderMessage(recognitionTranscript);
};

const renderMessage = (recognitionTranscript) => {
  msgContainer.innerHTML = `
    <div>You said:</div>
    <span class="box">${recognitionTranscript}</span>
    `;
};

const init = () => {
  micButton.addEventListener('click', handleStartRecog);
  recognition.onresult = handleOnResult;
};

init();
