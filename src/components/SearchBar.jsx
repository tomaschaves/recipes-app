import React from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContex from '../context/RecipeContext';

export default function SearchBar() {
  const [searchType, setSearchType] = React.useState('ingredient');
  const inputRef = React.useRef();
  const { setRecipe } = React.useContext(RecipeContex);
  const history = useHistory();

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const fetchData = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals && data.meals.length === 1) {
          history.push(`/meals/${data.meals[0].idMeal}`);
        } else if (data.meals === null) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
        } else {
          setRecipe(data.meals);
        }
      });

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks && data.drinks.length === 1) {
          history.push(`/drinks/${data.drinks[0].idDrink}`);
        } else if (data.drinks === null) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
        } else {
          setRecipe(data.drinks);
        }
      });
  };

  const handleSearch = () => {
    const searchInput = inputRef.current.value;
    let endpoint = '';

    const baseEndpoint = window.location.pathname === '/meals'
      ? 'https://www.themealdb.com/api/json/v1/1'
      : 'https://www.thecocktaildb.com/api/json/v1/1';

    if (searchType === 'ingredient') {
      endpoint = `${baseEndpoint}/filter.php?i=${searchInput}`;
    } else if (searchType === 'name') {
      endpoint = `${baseEndpoint}/search.php?s=${searchInput}`;
    } else if (searchType === 'letter') {
      if (searchInput.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      endpoint = `${baseEndpoint}/search.php?f=${searchInput}`;
    }

    fetchData(endpoint);
  };

  return (
    <div>
      <input data-testid="search-input" type="text" name="searchMeal" ref={ inputRef } />
      <label htmlFor="asc">
        <input
          id="asc"
          type="radio"
          name="search"
          value="ingredient"
          data-testid="ingredient-search-radio"
          checked={ searchType === 'ingredient' }
          onChange={ handleSearchTypeChange }
        />
        Ingredient
      </label>
      <label htmlFor="nameFor">
        <input
          id="nameFor"
          type="radio"
          name="search"
          value="name"
          data-testid="name-search-radio"
          checked={ searchType === 'name' }
          onChange={ handleSearchTypeChange }
        />
        Name
      </label>
      <label htmlFor="firstLetter">
        <input
          id="firstLetter"
          type="radio"
          name="search"
          value="letter"
          data-testid="first-letter-search-radio"
          checked={ searchType === 'letter' }
          onChange={ handleSearchTypeChange }
        />
        First Letter
      </label>
      <button data-testid="exec-search-btn" onClick={ handleSearch }>Search</button>
    </div>
  );
}
