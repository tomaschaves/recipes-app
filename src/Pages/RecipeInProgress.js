import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Buttons from '../components/Buttons';

export default function RecipeInProgress() {
  // const saveInLS = 52771
  const location = useLocation();
  const [shownRecipe, setShowRecipe] = useState([]);

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
  console.log(shownRecipe);

  useEffect(() => {
    rightFetch();
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

// O elemento de instruções deve possuir o atributo data-testid="instructions";

// imagem
// título
// categoria (comidas)
// alcóolico (bebidas)
// lista de ingredientes (com quantidades e instruções)

// Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes com suas respectivas quantidades e instruções
// Observações técnicas
// Verifica se os atributos data-testid estão presentes na tela:

// A foto deve possuir o atributo data-testid="recipe-photo";
// O título deve possuir o atributo data-testid="recipe-title";
// O botão de compartilhar deve possuir o atributo data-testid="share-btn";
// O botão de favoritar deve possuir o atributo data-testid="favorite-btn";
// O texto da categoria deve possuir o atributo data-testid="recipe-category";
// O elemento de instruções deve possuir o atributo data-testid="instructions";
// O botão para finalizar a receita deve possuir o atributo data-testid="finish-recipe-btn"

// {
//   drinks: {
//       id-da-bebida: [lista-de-ingredientes-utilizados],
//       ...
//   },
//   meals: {
//       id-da-comida: [lista-de-ingredientes-utilizados],
//       ...
//   }
