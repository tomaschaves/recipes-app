import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Buttons from '../components/Buttons';

export default function RecipeInProgress() {
  const history = useHistory();
  // const saveInLS = 52771
  const location = useLocation();
  const [shownRecipe, setShowRecipe] = useState([]);
  const [optionsSelected, setOptionsSelected] = useState([]);

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

  const checkedItem = { // constante para o riscado do checked
    textDecoration: 'line-through solid rgb(0, 0, 0)',
  };

  const handleRisk = (/* { target }, */ value) => {
    const options = localStorage.getItem('inProgressRecipes');
    const JSONOptions = JSON.parse(options) || [];
    let searchMealID = JSONOptions.meals[id()];
    let searchDrinkID = JSONOptions.drinks[id()];

    if (/meals/.test(location.pathname)) {
      if (!searchMealID) {
        const objectToSetInLS = {
          ...JSONOptions,
          meals: { ...JSONOptions.meals, [id()]: [value] },
        };
        return localStorage.setItem('inProgressRecipes', JSON.stringify(objectToSetInLS));
      }
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
      setOptionsSelected(searchMealID);
    } else if (/drinks/.test(location.pathname)) {
      if (!searchDrinkID) {
        const objectToSetInLS = {
          ...JSONOptions,
          drinks: { ...JSONOptions.drinks, [id()]: [value] },
        };
        return localStorage.setItem('inProgressRecipes', JSON.stringify(objectToSetInLS));
      }
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
      setOptionsSelected(searchDrinkID);
    }
    // getInfoRiskLS();
  };

  const getInfoRiskLS = () => {
    const LSObject = localStorage.getItem('inProgressRecipes');
    const JSONObject = JSON.parse(LSObject) || [];
    if (JSONObject.length === 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {},
        drinks: {},
      }));
      return setOptionsSelected([]);
    }
    let searchMealID = JSONObject.meals[id()];
    let searchDrinkID = JSONObject.drinks[id()];
    if (/meals/.test(location.pathname)) {
      searchMealID = JSONObject.meals[id()];
      setOptionsSelected(searchMealID);
    } else if (/drinks/.test(location.pathname)) {
      searchDrinkID = JSONObject.drinks[id()];
      setOptionsSelected(searchDrinkID);
    }
  };

  useEffect(() => {
    rightFetch();
    getInfoRiskLS();
  }, []);

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
                    style={ optionsSelected
                      && optionsSelected.some((number) => number === index)
                      ? checkedItem : {} }
                  >
                    <input
                      type="checkbox"
                      id={ ingredient }
                      checked={ optionsSelected
                        && optionsSelected.some((number) => number === index) }
                      onClick={ () => handleRisk(index) }
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
                    style={ optionsSelected
                      && optionsSelected.some((number) => number === index)
                      ? checkedItem : {} }
                  >
                    <input
                      type="checkbox"
                      id={ ingredient }
                      name={ index }
                      checked={ optionsSelected
                        && optionsSelected.some((number) => number === index) }
                      onClick={ () => handleRisk(index) }
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
