import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContex from '../context/RecipeContext';

export default function Drinks() {
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
      <Header title="Drinks" search="true" />
      <div>
        {recipes.slice(0, twelve).map((rec, index) => (
          <div key={ rec.idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ rec.strDrinkThumb }
              alt={ rec.strDrink }
            />
            <p data-testid={ `${index}-card-name` }>{rec.strDrink}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
