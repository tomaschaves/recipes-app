import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RecipeDetails() {
  const location = useLocation();

  const rightFetch = () => {
    if (/meals/.test(location.pathname)) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${(location.pathname.replace(/\D/g, ''))}`)
        .then((response) => response.json())
        .then((data) => console.log(data));
    } else if (/drink/.test(location.pathname)) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${(location.pathname.replace(/\D/g, ''))}`)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  useEffect(() => {
    rightFetch();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}
