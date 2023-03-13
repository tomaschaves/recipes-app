import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Carrousel from './Carrousel';
import StartButton from './StartButton';
import Buttons from './Buttons';

export default function MealDetails({ recipe, ingredientsFunction }) {
  const history = useHistory();
  // função para pegar e retornar o id da receita que estamos no momento
  const id = () => {
    const { location: { pathname } } = history;
    const idForSearch = pathname.replace(/\D/g, '');
    return `${idForSearch}`;
  };

  // // função para checarmos se o id consta ou não no localStorage na chave inProgressRecipes
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
    const findItem = Object.keys(JSONKey?.meals).some((element) => element === id());

    return findItem;
  };
  // função para checarmos se o id consta ou não no localStorage na chave doneRecipes
  const getLSDone = () => {
    // pegamos do local storage o doneRecipes. fazemos o parse dele ou retornamos [] se for vazio, para não quebrar a aplicação
    const key = localStorage.getItem('doneRecipes');

    if (!key || key.length === 0 || key === undefined) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
      return false; // mesma ideia do getLSInProgress
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
    id: recipe.idMeal,
    type: 'meal',
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  };

  const setMealInLS = () => {
    // pegamos a chave do LS, vemos se existe algo ou retornamos um array vazio
    const options = localStorage.getItem('inProgressRecipes');
    const JSONOptions = JSON.parse(options) || [];
    // setamos um array vazio no id chamado, para que seja possível colocar os ingredientes
    const objectToSetInLS = {
      ...JSONOptions,
      meals: { ...JSONOptions.meals, [id()]: [] },
    };
    // se não existir um elemento com o mesmo id da página, criamos sua chave, com valor []
    if (!(Object.keys(JSONOptions.meals).some((element) => element === id()))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(objectToSetInLS));
    }
  };

  // recebemos a receita e o array de ingredientes por props
  return (
    <div key={ recipe.idMeal }>

      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
        style={ { width: '50vw' } }
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
      <Buttons saveRecipeObject={ recipeObject } />
      <Carrousel options="drinks" />
      <StartButton
        text="Start"
        renderContinue={ getLSInProgress() }
        renderDone={ getLSDone() }
        type="meals"
        id={ id() }
        recipeDetails={ recipeObject }
        redirect={ setMealInLS }
      />
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
