import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Buttons from '../components/Buttons';

export default function RecipeInProgress() {
  const history = useHistory();
  // const saveInLS = 52771
  const location = useLocation();
  const [shownRecipe, setShowRecipe] = useState([]);

  const id = () => {
    const { location: { pathname } } = history;
    const idForSearch = pathname.replace(/\D/g, '');
    return `${idForSearch}`;
  };

  // fetch realizado nesse componente para passar nos testes. é possível entrar nessa página passando a receita como props
  const rightFetch = useCallback(() => {
    if (/meals/.test(location.pathname)) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${(location.pathname.replace(/\D/g, ''))}`)
        .then((response) => response.json())
        .then((data) => setShowRecipe([data.meals[0]]));
    } else if (/drink/.test(location.pathname)) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${(location.pathname.replace(/\D/g, ''))}`)
        .then((response) => response.json())
        .then((data) => setShowRecipe([data.drinks[0]]));
    }
  }, [location.pathname]);
  // console.log(shownRecipe);

  const getAllIngredients = () => {
    let index = 1;
    const ingredients = [];
    if (shownRecipe.length < 1) {
      return [];
    }
    // enquanto não chega à strIngredient20, o código abaixo roda, colocando os ingredientes no array, para fazermos o map deles futuramente
    while (shownRecipe[0][`strIngredient${index}`] !== ''
    && shownRecipe[0][`strIngredient${index}`] !== null) {
      ingredients.push(`${shownRecipe[0][`strIngredient${index}`]} 
      - ${shownRecipe[0][`strMeasure${index}`]}`);
      const limit = 19;
      if (index > limit) {
        break;
      }
      index += 1;
    }
    return ingredients;
  };

  // const ingredientsObject = [];
  // getAllIngredients().forEach((ingredient) => ingredientsObject.push({
  //   name: ingredient,
  //   status: false,
  // }));

  // const setIngredientsInLS = () => {
  //   const key = localStorage.getItem('inProgressRecipes');
  //   const JSONKey = JSON.parse(key) || [];
  //   console.log(JSONKey);
  //   if (/meals/.test(location.pathname)) {
  //   } else if (/drink/.test(location.pathname)) {
  //   }
  //   // vamos se o id de algum dos elementos do LS é igual ao id do link. se for, retornamos true, para usarmos na renderização condicional do botão de start recipe
  //   // const findItem = JSONKey.some((element) => element.id === id());
  // }
  // setIngredientsInLS();
  // console.log(setIngredientsInLS());

  // const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    rightFetch();
  }, []);

  const checkedItem = { // constante para o riscado do checked
    textDecoration: 'line-through solid rgb(0, 0, 0)',
  };

  const handleRisk = ({ target }, value) => {
    const options = localStorage.getItem('inProgressRecipes');
    const JSONOptions = JSON.parse(options) || [];
    let searchMealID = JSONOptions.meals[id()];
    let searchDrinkID = JSONOptions.drinks[id()];

    if (/meals/.test(location.pathname)) {
      const existingIngredient = searchMealID.some((ingredient) => ingredient === value);
      if (existingIngredient) {
        searchMealID = searchMealID.filter((ingredient) => ingredient !== value);
      } else {
        searchMealID.push(value);
      }
      const objectToSetInLS = {
        ...JSONOptions,
        meals: { ...JSONOptions.meals, [id()]: searchMealID },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objectToSetInLS));
    } else if (/drinks/.test(location.pathname)) {
      const existingIngredient = searchDrinkID.some((ingredient) => ingredient === value);
      if (existingIngredient) {
        searchDrinkID = searchDrinkID.filter((ingredient) => ingredient !== value);
      } else {
        searchDrinkID.push(value);
      }
      const objectToSetInLS = {
        ...JSONOptions,
        drinks: { ...JSONOptions.drinks, [id()]: searchDrinkID },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objectToSetInLS));
    }
  };

  return (
    <div>
      {
        shownRecipe.length > 0 && (/meals/.test(location.pathname) ? (
          <div>
            <img
              src={ shownRecipe[0].strMealThumb }
              alt={ shownRecipe.strMeal }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{ shownRecipe[0].strMeal }</h1>
            <p data-testid="recipe-category">{ shownRecipe[0].strCategory }</p>
            <p data-testid="instructions">{ shownRecipe[0].strInstructions }</p>
            <div className="ingredientsList">
              {
                getAllIngredients().map((ingredient, index) => (
                  <label
                    htmlFor={ ingredient }
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-step` }
                    // style={ { textDecoration: checkedItem } }
                  >
                    <input
                      type="checkbox"
                      id={ ingredient }
                      onClick={ (e) => handleRisk(e, index) }
                    />
                    {ingredient}
                  </label>
                ))
              }
            </div>
          </div>
        ) : (
          <div>
            <img
              src={ shownRecipe[0].strDrinkThumb }
              alt={ shownRecipe[0].strDrink }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{ shownRecipe[0].strDrink }</h1>
            <p data-testid="recipe-category">{ shownRecipe[0].strCategory }</p>
            <p>{ shownRecipe[0].strAlcoholic }</p>
            <p data-testid="instructions">{ shownRecipe[0].strInstructions }</p>
            <div className="ingredientsList">
              {
                getAllIngredients().map((ingredient, index) => (
                  <label
                    htmlFor={ ingredient }
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-step` }
                    // style={ isRisked ? checkedItem : {} }
                  >
                    <input
                      type="checkbox"
                      id={ ingredient }
                      name={ index }
                      // onClick={ (e) => handleSelected(e) }
                      // checked={false}
                      onClick={ (e) => handleRisk(e, index) }
                    />
                    {ingredient}
                  </label>
                ))
              }
            </div>
          </div>
        ))
      }
      <Buttons saveRecipeObject={ shownRecipe } />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        style={ {
          position: 'fixed',
          bottom: 0,
          width: '100vw',
        } }
      >
        Finalizar receita
      </button>
    </div>
  );
}
