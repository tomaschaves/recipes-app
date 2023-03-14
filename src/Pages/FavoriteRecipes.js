import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneMeal from '../components/DoneMeal';
import DoneDrink from '../components/DoneDrink';

export default function FavoriteRecipes() {
  const [filteredItems, setFilteredItems] = useState('');
  const [refreshScreen, setRefreshScreen] = useState(false);

  const getFromLocalStorage = () => {
    const getLS = localStorage.getItem('favoriteRecipes');
    let parseLS = JSON.parse(getLS);
    parseLS = parseLS !== null ? parseLS : [];
    return parseLS;
  };

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" />
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
                <DoneMeal
                  key={ index }
                  recipe={ recipe }
                  index={ index }
                  refresh={ refreshScreen }
                  setRefresh={ setRefreshScreen }
                />
              ) : (
                <DoneDrink
                  key={ index }
                  recipe={ recipe }
                  index={ index }
                  refresh={ refreshScreen }
                  setRefresh={ setRefreshScreen }
                />
              )
          ))
      }
      {
        filteredItems.length === 0 && getFromLocalStorage().map((recipe, index) => (
          recipe.type === 'meal'
            ? (
              <DoneMeal
                key={ index }
                recipe={ recipe }
                index={ index }
                refresh={ refreshScreen }
                setRefresh={ setRefreshScreen }
              />
            ) : (
              <DoneDrink
                key={ index }
                recipe={ recipe }
                index={ index }
                refresh={ refreshScreen }
                setRefresh={ setRefreshScreen }
              />
            )))
      }
    </div>
  );
}
