import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const [shownRecipe, setShowRecipe] = useState([]);

  // decidimos qual fetch utilizar com base no pathname do  setamos o resultado no estado
  // const rightFetch = useCallback(() => {
  //   console.log(pathname);
  //   if (/meals/.test(pathname)) {
  //     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${(pathname.replace(/\D/g, ''))}`)
  //       .then((response) => response.json())
  //       .then((data) => setShowRecipe([data.meals[0]]));
  //   } else if (/drinks/.test(pathname)) {
  //     fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${(pathname.replace(/\D/g, ''))}`)
  //       .then((response) => response.json())
  //       .then((data) => setShowRecipe([data.drinks[0]]));
  //   }
  // }, [pathname]);

  // REQUISIÇÃO - na API com endpoint especifico da receita a detalhar
  const rightFetch = useCallback(() => {
    // VALIDAÇÃO - da condição que define qual endpoint utilizar
    const mealsRecipe = /meals/.test(pathname);
    // ACESSA - o id da receita
    const meal = pathname.replace(/\D/g, '');
    const drink = pathname.replace(/\D/g, '');
    // DEFINE - o endpoint com o id da receita
    const endPointMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;
    const endPointDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`;

    // AFERE - a condição para definir qual endpoint utilizar na requisição à API
    if (mealsRecipe) {
      fetch(endPointMeals)
        .then((response) => response.json())
        .then((data) => setShowRecipe([data.meals[0]]));
      return;
    }

    fetch(endPointDrinks)
      .then((response) => response.json())
      .then((data) => setShowRecipe([data.drinks[0]]));
  }, []);

  // usamos para fazer um array com todos os ingredientes que retornam como chaves do objeto (strIngredient1, strIngredient2, ...)
  const getAllIngredients = () => {
    let index = 1;
    const ingredients = [];
    // if (shownRecipe.length < 1) {
    //   return [];
    // }
    // enquanto não chega à strIngredient20, o código abaixo roda, colocando os ingredientes no array, para fazermos o map deles futuramente
    while (shownRecipe[0][`strIngredient${index}`] !== ''
    && shownRecipe[0][`strIngredient${index}`] !== null) {
      ingredients.push(`${shownRecipe[0][`strIngredient${index}`]} 
      - ${shownRecipe[0][`strMeasure${index}`]}`);
      // const limit = 19;
      // if (index > limit) {
      //   break;
      // }
      index += 1;
    }
    return ingredients;
  };

  // didmount para o rightFetch
  useEffect(() => {
    rightFetch();
  }, []);

  const ingredientsFunction = () => getAllIngredients();
  // console.log(ingredientsFunction());
  // renderizamos o componente com base no pathname atual
  const renderComponent = () => {
    if (/meals/.test(pathname)) {
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
