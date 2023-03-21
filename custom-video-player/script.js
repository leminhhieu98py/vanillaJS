const videoPlayer = document.getElementById('video');
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const progressBar = document.getElementById('progress');
const timestampElement = document.getElementById('timestamp');

const handleClickPlayButton = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playButton.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  } else {
    videoPlayer.pause();
    playButton.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  }
};

const handleClickStopButton = () => {
  if (!videoPlayer.paused) {
    videoPlayer.pause();
    playButton.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  }
};

const padStart = (input, expectLength, padCharacter = ' ') => {
  const inputString = input.toString();
  if (inputString.length >= expectLength) {
    return inputString;
  }

  const padString = padCharacter.repeat(expectLength - inputString.length);
  return `${padString}${inputString}`;
};

const getMinuteFromSeconds = (seconds) => {
  return padStart(Math.floor(seconds / 60), 2, '0');
};

const getSecondFromSeconds = (seconds) => {
  return padStart(Math.floor(seconds) % 60, 2, '0');
};

const handleChangeTimestamp = () => {
  const videoCurrentTime = videoPlayer.currentTime;
  const videoDuration = videoPlayer.duration;
  const progressBarValue = (videoCurrentTime / videoDuration) * 100;
  progressBar.value = progressBarValue;
  timestampElement.innerText = `${getMinuteFromSeconds(
    videoCurrentTime
  )}:${getSecondFromSeconds(videoCurrentTime)}`;
};

const handleChangeProgressBar = () => {
  const videoDuration = videoPlayer.duration;
  const videoCurrentTime = (progressBar.value * videoDuration) / 100;
  videoPlayer.currentTime = videoCurrentTime;
};

const initialAddEventListener = () => {
  playButton.addEventListener('click', handleClickPlayButton);
  stopButton.addEventListener('click', handleClickStopButton);
  progressBar.addEventListener('change', handleChangeProgressBar);
  videoPlayer.addEventListener('timeupdate', handleChangeTimestamp);
};

const init = () => {
  initialAddEventListener();
};

init();
