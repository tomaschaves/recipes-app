import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carrousel';

export default function DrinkDetails({ recipe, ingredientsFunction }) {
  // recebemos a receita e o array de ingredientes por props
  return (
    <div key={ recipe.idDrink }>

      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
      <h2 data-testid="recipe-category">{recipe.strAlcoholic}</h2>
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
      <Carousel options="meals" />
    </div>
  );
}

DrinkDetails.propTypes = {
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
  }),
  ingredientsFunction: PropTypes.func,
}.isRequired;
