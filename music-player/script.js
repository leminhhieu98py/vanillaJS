const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const audioElement = document.getElementById('audio');
const musicContainerElement = document.getElementById('music-container');
const titleElement = document.getElementById('title');
const progressElement = document.getElementById('progress');
const progressContainerElement = document.getElementById('progress-container');
const coverImage = document.getElementById('cover');

const filenameList = ['hey', 'summer', 'ukulele'];

const MUSIC_PLAY_TYPES = {
  previousSong: 'previous',
  nextSong: 'next'
};

const getMusicSrc = (filename) => `music/${filename}.mp3`;
const getImageSrc = (filename) => `images/${filename}.jpg`;

const getTargetSongName = (type) => {
  const currentSongSrc = audioElement.getAttribute('src');
  const currentSongIndex = filenameList.findIndex(
    (filename) => currentSongSrc === getMusicSrc(filename)
  );
  let targetSongIndex;

  switch (type) {
    case MUSIC_PLAY_TYPES.nextSong:
      targetSongIndex =
        currentSongIndex + 1 < filenameList.length ? currentSongIndex + 1 : 0;
      break;

    case MUSIC_PLAY_TYPES.previousSong:
      targetSongIndex =
        currentSongIndex === 0 ? filenameList.length - 1 : currentSongIndex - 1;
      break;

    default:
      throw new Error('Invalid MUSIC_PLAY_TYPES');
  }

  const targetSongName = filenameList[targetSongIndex];
  const targetSongSrc = getMusicSrc(targetSongName);

  return [targetSongName, targetSongSrc];
};

const handleChangeSong = (type) => {
  const [targetSongName, targetSongSrc] = getTargetSongName(type);
  titleElement.innerText = targetSongName;
  audioElement.src = targetSongSrc;
  coverImage.src = getImageSrc(targetSongName);
  progressElement.style.width = '0%';
  audioElement.play();
};

const handlePlayPauseMusic = () => {
  if (audioElement.paused) {
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    musicContainerElement.classList.add('play');
    audioElement.play();
  } else {
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    audioElement.pause();
    musicContainerElement.classList.remove('play');
  }
};

const handleChangeAudioDuration = () => {
  progressElement.style.width = `${
    (audioElement.currentTime / audioElement.duration) * 100
  }%`;
};

const handleUserSeek = function (e) {
  const progressContainerWidth = this.clientWidth;
  const offsetX = e.offsetX;
  const seekPercent = offsetX / progressContainerWidth;

  progressElement.style.width = `${seekPercent * 100}%`;
  audioElement.currentTime = seekPercent * audioElement.duration;
};

const init = () => {
  playButton.addEventListener('click', handlePlayPauseMusic);
  prevButton.addEventListener('click', () =>
    handleChangeSong(MUSIC_PLAY_TYPES.previousSong)
  );
  nextButton.addEventListener('click', () =>
    handleChangeSong(MUSIC_PLAY_TYPES.nextSong)
  );
  progressContainerElement.addEventListener('click', handleUserSeek);
  audioElement.addEventListener('timeupdate', handleChangeAudioDuration);
  audioElement.addEventListener('ended', () =>
    handleChangeSong(MUSIC_PLAY_TYPES.nextSong)
  );
};

init();
