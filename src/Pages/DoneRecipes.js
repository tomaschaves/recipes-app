import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneMeal from '../components/DoneMeal';
import DoneDrink from '../components/DoneDrink';

export default function DoneRecipes() {
  const [filteredItems, setFilteredItems] = useState('');

  const getFromLocalStorage = () => {
    const getLS = localStorage.getItem('doneRecipes');
    let parseLS = JSON.parse(getLS);
    parseLS = parseLS !== null ? parseLS : [];
    return parseLS;
  };

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilteredItems('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilteredItems('drink') }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilteredItems('') }
        >
          All
        </button>
      </div>
      {
        filteredItems !== '' && getFromLocalStorage()
          .filter((element) => element.type.includes(filteredItems))
          .map((recipe, index) => (
            recipe.type === 'meal'
              ? (
                <DoneMeal key={ index } recipe={ recipe } index={ index } />
              ) : (
                <DoneDrink key={ index } recipe={ recipe } index={ index } />
              )
          ))
      }
      {
        filteredItems.length === 0 && getFromLocalStorage().map((recipe, index) => (
          recipe.type === 'meal'
            ? (
              <DoneMeal key={ index } recipe={ recipe } index={ index } />
            ) : (
              <DoneDrink key={ index } recipe={ recipe } index={ index } />
            )))
      }
    </div>
  );
}
