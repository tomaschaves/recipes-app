import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipeContex from './RecipeContext';
import drinksCategories from '../helpers/drinksCategories';
import mealsCategories from '../helpers/mealsCategories';

function RecipeProvider({ children }) {
  const [meals, setMeals] = React.useState([]);
  const [drinks, setDrinks] = React.useState([]);
  const [mealsCategoriesList, setMealsCategoriesList] = React.useState([]); // estado para carregamento das 12 primeiras receitas
  const [drinksCategoriesList, setDrinksCategoriesList] = React.useState([]); // estado para carregamento das 12 primeiras receitas

  const maximumNumerOfRecipes = 12;
  const didMountFetch = (link) => {
    // faz o fetch das receitas baseado no link visitado.
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        if (/themealdb/.test(link)) {
          // "/themealdb/.test(link)" testa se o link possui esse texto
          // seta o estado pegando os 12 primeiros valores do resultado do fetch
          setMeals(data.meals.slice(0, maximumNumerOfRecipes));
        } else if (/thecocktaildb/.test(link)) {
          // "/thecocktaildb/.test(link)" testa se o link possui esse texto
          // seta o estado pegando os 12 primeiros valores do resultado do fetch
          setDrinks(data.drinks.slice(0, maximumNumerOfRecipes));
        }
      });
  };

  const setFetchesinState = async () => {
    // assíncrono pois esperamos o retorno do fetch. Após, setamos no estado
    const mealsOptions = await mealsCategories();
    const drinksOptions = await drinksCategories();
    setMealsCategoriesList(mealsOptions);
    setDrinksCategoriesList(drinksOptions);
  };

  useEffect(() => {
    // didmount para fetchs
    didMountFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    didMountFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setFetchesinState();
  }, []);

  const state = useMemo(() => ({
    meals,
    drinks,
    mealsCategoriesList,
    drinksCategoriesList,
    setMeals,
    setDrinks,
  }), [meals, drinks, mealsCategoriesList, drinksCategoriesList]);

  return (
    <RecipeContex.Provider value={ state }>
      {children}
    </RecipeContex.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
