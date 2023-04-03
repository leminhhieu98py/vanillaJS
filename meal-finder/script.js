const baseURL = 'https://www.themealdb.com/api/json/v1/1';
const resultHeadingElement = document.getElementById('result-heading');
const mealsContainer = document.getElementById('meals');
const formElement = document.getElementById('form');
const mealDetailContainer = document.getElementById('single-meal');
const randomButton = document.getElementById('random');
const searchInput = document.getElementById('search');

let mealData = [];

const handleCatchError = (e) => {
  console.log('Send some log error', e);
};

const handleFetchData = async (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch(handleCatchError);
};

const handleClickMealInfo = (id) => {
  const meal = mealData.find((item) => Number(item.idMeal) === id);
  if (!meal) return;

  handleRenderMealDetailInfo(meal);
};

const handleRenderMealDetailInfo = (meal) => {
  const ingredients = [];
  const ingredientKeyword = 'strIngredient';
  for (key in meal) {
    if (key.includes(ingredientKeyword)) {
      const index = Number(key.slice(ingredientKeyword.length));
      const ingredientMeasure = `strMeasure${index}`;
      if (meal[key] && meal[ingredientMeasure]) {
        ingredients.push(`${meal[key]}: ${meal[ingredientMeasure]}`);
      }
    }
  }

  mealDetailContainer.innerHTML = `<div class="single-meal">
<h1>${meal.strMeal}</h1>
<img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
<div class="single-meal-info">
  ${
    meal.strCategory
      ? `
  <p>${meal.strCategory}</p>
  `
      : ''
  } ${
    meal.strArea
      ? `
  <p>${meal.strArea}</p>
  `
      : ''
  }
</div>
<div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
    ${ingredients
      .map(
        (ing) => `
    <li>${ing}</li>
    `
      )
      .join('')}
  </ul>
</div>
</div>`;
};

const handleRenderMeals = (data) => {
  mealData = data.meals;
  if (!mealData) return;

  if (mealData.length === 0) {
    resultHeadingElement.innerHTML =
      '<p>There are no search results. Try again!</p>';
    return;
  }

  const searchTerm = searchInput.value;
  resultHeadingElement.innerHTML = `<h2>Search results for '${searchTerm}':</h2>`;
  mealsContainer.innerHTML = '';
  mealData.forEach((meal) => {
    mealsContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="meal" onClick="handleClickMealInfo(${meal.idMeal})">
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="meal-info">
      <h3>${meal.strMeal}</h3>
    </div>
  </div>`
    );
  });
};

const getMealsByTerm = (searchTerm) => {
  if (!searchTerm || typeof searchTerm != 'string') {
    console.log('Invalid search term');
    return;
  }

  handleFetchData(`${baseURL}/search.php?s=${searchTerm}`).then((response) =>
    handleRenderMeals(response)
  );
};

const getRandomMeal = () => {
  handleFetchData(`${baseURL}/random.php`).then((response) => {
    const meals = response.meals;
    if (!meals) return;

    searchInput.value = '';
    handleRenderMeals(response);
    handleRenderMealDetailInfo(meals[0]);
  });
};

const handleSearchMeals = (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  getMealsByTerm(searchTerm);
};

const init = () => {
  formElement.addEventListener('submit', handleSearchMeals);
  randomButton.addEventListener('click', getRandomMeal);
};

init();
