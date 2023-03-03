import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContex from '../context/RecipeContext';

export default function Meals() {
  const { recipe } = React.useContext(RecipeContex);
  const [recipes, setRecipes] = React.useState([]);
  const twelve = 12;

  React.useEffect(() => {
    if (recipe) {
      setRecipes(recipe);
    }
  }, [recipe]);

  return (
    <div>
      <Header title="Meals" search="true" />
      <div>
        {recipes.slice(0, twelve).map((rec, index) => (
          <div key={ rec.idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ rec.strMealThumb }
              alt={ rec.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>{rec.strMeal}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
