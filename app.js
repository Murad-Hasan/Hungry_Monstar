const getMealData = meal => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealNames(data))
}
// search for Meal
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const inputMealName = document.getElementById('search-meal').value;
    getMealData(inputMealName)
    
})

const displayMealNames = mealsName => {
    const divContainer = document.getElementById('div-container'); 
    divContainer.innerHTML = '';
    mealsName.meals.forEach(singleMealName => {
        const mealDetailsDiv = document.createElement('div')
        mealDetailsDiv.id ='single-div-details'
        const mealInfo = `
        <img class = 'food-img' src='${singleMealName.strMealThumb}'>    
        <h4>${singleMealName.strMeal}</h4>
        <button id = 'submit-btn' onclick= "displayMealDetail('${singleMealName.idMeal}')" > Show Details </button>
        `
        document.getElementById('search-meal').value = '';
        mealDetailsDiv.innerHTML = mealInfo;
        divContainer.appendChild(mealDetailsDiv);
       
    })
};

// showing item ingredients
const displayMealDetail = idDetails =>{
    const idUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDetails}`
    fetch(idUrl)
        .then(res => res.json())
        .then(data => totalMealInfo(data.meals[0]))
}

const totalMealInfo = id => {
    const detailsDivContainer = document.getElementById('meals-details');
    detailsDivContainer.innerHTML = `
    <img class = 'food-img' src='${id.strMealThumb}'> 
    <h3 class= 'list-header'> ${id.strMeal}</h3>
    `
    let ingredients = "";
            for (let i = 1; i <= 10; i++) {
                ingredients += `<li>${id["strIngredient"+i]}</li>`;
            }
        const ul = document.createElement('ul')
        const ingredientsDetails = `
        <ul> <span class="ingredients-items">Ingredients</span>
        ${ingredients}</ul>
        `
        ul.innerHTML = ingredientsDetails
        detailsDivContainer.appendChild(ul)
}
