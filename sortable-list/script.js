const draggableList = document.getElementById('draggable-list');
const checkButton = document.getElementById('check');
const peopleListElements = [];
let startIndex = null;

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

const getSuffleRichestPeople = () => {
  const cloneRichestPeople = [...richestPeople];
  const richestPeopleWithRandomSort = cloneRichestPeople.map((personName) => ({
    name: personName,
    sort: Math.random()
  }));
  const suffleRichestPeople = richestPeopleWithRandomSort.sort(
    (person1, person2) => person1.sort - person2.sort
  );

  return suffleRichestPeople;
};

function handleDragStart() {
  startIndex = this.closest('li').getAttribute('data-index');
}

function handleDragDrop() {
  const dropIndex = this.closest('li').getAttribute('data-index');

  swapItems(startIndex, dropIndex);
}

function swapItems(fromIndex, toIndex) {
  const itemOne = peopleListElements[fromIndex].querySelector('.draggable');
  const itemTwo = peopleListElements[toIndex].querySelector('.draggable');

  peopleListElements[fromIndex].appendChild(itemTwo);
  peopleListElements[toIndex].appendChild(itemOne);
}

const checkOrder = () => {
    peopleListElements.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
};

const addEventsToPeopleListElement = () => {
  const draggableElements = document.querySelectorAll('.draggable');
  const draggableListElements = document.querySelectorAll('.draggable-list li');

  draggableElements.forEach((draggableElement) => {
    draggableElement.addEventListener('dragstart', handleDragStart);
  });

  draggableListElements.forEach((draggableListElement) => {
    draggableListElement.addEventListener('dragover', (e) =>
      e.preventDefault()
    );
    draggableListElement.addEventListener('dragenter', function () {
      this.classList.add('over');
    });
    draggableListElement.addEventListener('dragleave', function () {
      this.classList.remove('over');
    });
    draggableListElement.addEventListener('drop', handleDragDrop);
  });
};

const renderRichPeople = () => {
  const suffleRichestPeople = getSuffleRichestPeople();

  suffleRichestPeople.forEach((person, index) => {
    const peopleListElement = document.createElement('li');
    peopleListElement.setAttribute('data-index', index);
    peopleListElement.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
        <p class="person-name">${person.name}</p>
        <i class="fas fa-grip-lines"></i>
    </div>
    `;

    draggableList.appendChild(peopleListElement);
    peopleListElements.push(peopleListElement);
  });
};

const init = () => {
  renderRichPeople();
  addEventsToPeopleListElement();
  checkButton.addEventListener('click', checkOrder);
};

init();
