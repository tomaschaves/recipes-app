import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Carousel from './Carrousel';
import StartButton from './StartButton';
import Buttons from './Buttons';

export default function DrinkDetails({ recipe, ingredientsFunction }) {
  const history = useHistory();
  // função para pegar e retornar o id da receita que estamos no momento
  const id = () => {
    const { location: { pathname } } = history;
    const idForSearch = pathname.replace(/\D/g, '');
    return `${idForSearch}`;
  };

  // função para checarmos se o id consta ou não no localStorage na chave inProgressRecipes
  const getLSInProgress = () => {
    // vamos se o id de algum dos elementos do LS é igual ao id do link. se for, retornamos true, para usarmos na renderização condicional do botão de continue recipe
    const obj = {
      drinks: {
      },
      meals: {
      },
    };

    const key = localStorage.getItem('inProgressRecipes');

    if (!key || key.length === 0 || key === undefined) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));

      return false;
    }

    const JSONKey = JSON.parse(key) || [];
    const findItem = Object.keys(JSONKey?.drinks).some((element) => element === id());

    return findItem;
  };
  // // função para checarmos se o id consta ou não no localStorage na chave doneRecipes
  const getLSDone = () => {
    // pegamos do local storage o doneRecipes. fazemos o parse dele ou retornamos [] se for vazio, para não quebrar a aplicação
    const key = localStorage.getItem('doneRecipes');

    if (!key || key.length === 0 || key === undefined) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
      return false;
    }

    const JSONKey = JSON.parse(key) || [];
    // vamos se o id de algum dos elementos do LS é igual ao id do link. se for, retornamos true, para usarmos na renderização condicional do botão de start recipe
    const findItem = JSONKey.some((element) => element.id === id());
    return findItem;
  };

  useEffect(() => {
    getLSDone();
    getLSInProgress();
  }, []);

  // criação do objeto para setar no LS
  const recipeObject = {
    id: recipe.idDrink,
    type: 'drink',
    nationality: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  };

  const setDrinksInLS = () => {
    const options = localStorage.getItem('inProgressRecipes');
    const JSONOptions = JSON.parse(options) || [];

    const objectToSetInLS = {
      ...JSONOptions,
      drinks: { ...JSONOptions.drinks, [id()]: [] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectToSetInLS));
  };

  // recebemos a receita e o array de ingredientes por props
  return (
    <div key={ recipe.idDrink }>

      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
        style={ { width: '50vw' } }
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
      <Buttons saveRecipeObject={ recipeObject } />
      <Carousel options="meals" />
      <StartButton
        text="Start"
        renderContinue={ getLSInProgress() }
        renderDone={ getLSDone() }
        type="drinks"
        id={ id() }
        recipeDetails={ recipeObject }
        redirect={ setDrinksInLS }
      />
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
