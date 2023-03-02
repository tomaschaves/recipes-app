import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input data-testid="search-input" type="text" name="searchMeal" />
      <label htmlFor="asc">
        Ingredient
        <input
          type="radio"
          name="search"
          value="ingredient"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="desc">
        Name
        <input
          type="radio"
          name="search"
          value="name"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="desc">
        First Letter
        <input
          type="radio"
          name="search"
          value="letter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button data-testid="exec-search-btn">Search</button>
    </div>
  );
}
