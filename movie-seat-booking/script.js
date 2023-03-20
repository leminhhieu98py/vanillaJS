const seatPerRow = 8;
const totalSeatRow = 6;

const countElement = document.getElementById('count');
const totalElement = document.getElementById('total');
const moviePriceDropdown = document.getElementById('movie');

let selectedSeatArray =
  JSON.parse(localStorage.getItem('selectedSeatArray')) || [];
const occupiedSeatArray = [11, 12, 22, 23, 35, 36, 44, 45, 46];
const seatElements = document.querySelectorAll('.container .seat');

const renderOccupiedSeats = () => {
  occupiedSeatArray.forEach((occupiedIndex) => {
    seatElements[occupiedIndex].classList.add('occupied');
  });
};

const renderSelectedSeats = () => {
  selectedSeatArray.forEach((selectedIndex) => {
    seatElements[selectedIndex].classList.add('selected');
  });
};

const handleSelectSeat = (seatIndex) => {
  seatElements[seatIndex].classList.toggle('selected');

  const selectedSeats = document.querySelectorAll('.container .seat.selected');
  selectedSeatArray = [...selectedSeats].map((seat) =>
    [...seatElements].indexOf(seat)
  );

  localStorage.setItem('selectedSeatArray', JSON.stringify(selectedSeatArray));

  renderCountText();
  renderTotalText();
};

const renderCountText = () => {
  countElement.innerText = selectedSeatArray.length;
};

const renderTotalText = () => {
  totalElement.innerText = moviePriceDropdown.value * selectedSeatArray.length;
};

const addEventListener = () => {
  seatElements.forEach((seat, seatIndex) => {
    if (!seat.classList.contains('occupied')) {
      seat.addEventListener('click', () => handleSelectSeat(seatIndex));
    }
  });

  moviePriceDropdown.addEventListener('change', renderTotalText);
};

const init = () => {
  renderOccupiedSeats();
  renderSelectedSeats();
  addEventListener();
};

init();
