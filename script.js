
const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipeContainer');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const recipeDetails = document.querySelector('.recipeDetails');


//This function fetch data from server
const fetchRecipes =  async (query) => {
      recipeContainer.innerHTML = "<h2>Fetching Recipies...</h2>";
      try {
           const data = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
           const response = await data.json();
 
           recipeContainer.innerHTML = "";
           response.meals.forEach(meal => {
                 const recipeDiv = document.createElement('div');
                 recipeDiv.classList.add('recipe');
                  recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}">
                     <h3>${meal.strMeal}</h3>
                  <p><span>${meal.strArea}</span> Dish</p>
           <p>Belongs to <span>${meal.strCategory} Category</span></p>
         `
         const button = document.createElement('button');
         button.textContent = "View Recipe";
         recipeDiv.appendChild(button);

         //Add EventListener to add button
          button.addEventListener('click',()=>{
              openRecipePopup(meal);
            });
            recipeContainer.appendChild(recipeDiv);
          }); 
        } catch (error) {
               recipeContainer.innerHTML = "<h2>Please check speling of recipeis this recipe is not found  Plese Type again !!</h2>";
      }     
}


// Function to fetfh ingredients and measurments
 const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(i=1; i<= 20; i++){
        const ingredients = meal[`strIngredient${i}`];
        if(ingredients){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredients}</li>`
        }else{
            break
        }
    }
    return ingredientsList;
 }


// This fuction display popup for view Recipe button
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
       <h2 class="recipeName">${meal.strMeal}</h2>
       <h3>Ingredents:</h3>
       <ul class="ingredientList">${fetchIngredients(meal)}</ul>
       <div class="instructions">
          <h3>Instructions:</h3>
          <p>${meal.strInstructions}</p>
       </div>
    `
    
    recipeDetailsContent.parentElement.style.display = 'block'
}

// This function close the popup
recipeCloseBtn.addEventListener('click', () => {
      recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click',(e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Plese Type Your Favourite recipe...</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});