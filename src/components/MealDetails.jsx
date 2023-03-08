import React from 'react';
import PropTypes from 'prop-types';
import Carrousel from './Carrousel';
import StartButton from './StartButton';

export default function MealDetails({ recipe, ingredientsFunction }) {
  // recebemos a receita e o array de ingredientes por props
  return (
    <div key={ recipe.idMeal }>

      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
      {
        // fazemos o map dos ingredientes que foram passados por props
        ingredientsFunction().map((ingredient, index) => (
          <p
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {
              ingredient
            }
          </p>
        ))
      }
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      {
        recipe.strYoutube && (
          <iframe
            width="420"
            height="345"
            title={ recipe.strMeal }
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            data-testid="video"
          />
        )
      }
      <Carrousel options="drinks" />
      <StartButton />
    </div>
  );
}

MealDetails.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
  }),
  ingredientsFunction: PropTypes.func,
}.isRequired;
