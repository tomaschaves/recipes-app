import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';

export default function RecipeDetails() {
  const location = useLocation();
  const [shownRecipe, setShowRecipe] = useState([]);

  // decidimos qual fetch utilizar com base no pathname do location. setamos o resultado no estado
  const rightFetch = useCallback(() => {
    if (/meals/.test(location.pathname)) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${(location.pathname.replace(/\D/g, ''))}`)
        .then((response) => response.json())
        .then((data) => setShowRecipe([data.meals[0]]));
    } else if (/drinks/.test(location.pathname)) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${(location.pathname.replace(/\D/g, ''))}`)
        .then((response) => response.json())
        .then((data) => setShowRecipe([data.drinks[0]]));
    }
  }, [location.pathname]);

  // usamos para fazer um array com todos os ingredientes que retornam como chaves do objeto (strIngredient1, strIngredient2, ...)
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

  // didmount para o rightFetch
  useEffect(() => {
    rightFetch();
  }, []);

  const ingredientsFunction = () => getAllIngredients();
  // renderizamos o componente com base no pathname atual
  const renderComponent = () => {
    if (/meals/.test(location.pathname)) {
      return (
        <MealDetails
        // passamos a receita atual como props, além do array de ingredientes para .map
          recipe={ shownRecipe[0] }
          ingredientsFunction={ ingredientsFunction }
        />
      );
    }
    return (
      <DrinkDetails
      // passamos a receita atual como props, além do array de ingredientes para .map
        recipe={ shownRecipe[0] }
        ingredientsFunction={ ingredientsFunction }
      />
    );
  };

  return (
    <div>
      {
        // se tivermos algo no estado, chamamos a função, que verá qual o location e renderizará o componente correto. senão, renderizará um Loading
        shownRecipe.length > 0 ? renderComponent() : <h1>Loading</h1>
      }
    </div>
  );
}
