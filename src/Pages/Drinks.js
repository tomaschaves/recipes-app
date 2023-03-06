import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';

export default function Drinks() {
  const {
    drinks,
    setDrinks,
    drinksCategoriesList,
  } = React.useContext(RecipeContext);

  const twelve = 12; // 12 receitas a serem carregadas.

  React.useEffect(() => {
    if (!drinks) {
      setDrinks(drinks);
    }
  }, [drinks, setDrinks]);

  return (
    <div>
      <Header title="Drinks" search="true" />
      {/* Input radio para filtros de categoria */}
      {/* css inline para melhor visualização da página durante a programação */}
      {/* container dos inputs */}
      <div className="options_container" style={ { display: 'flex', gap: '7px' } }>
        { drinksCategoriesList && drinksCategoriesList.map((category) => (
          <div key={ category.strCategory }>
            {/* label para as options radio button */}
            <label htmlFor={ category.strCategory }>
              {category.strCategory}
            </label>
            <input
              className="input_radio"
              type="radio"
              // id para que seja possível selecionar clicando no nome (htmlFor)
              id={ category.strCategory }
              // name para que apenas um radio button fique selecionado
              name="option"
              data-testid={ `${category.strCategory}-category-filter` }
            />
          </div>
        )) }
      </div>
      <div>
        {drinks.slice(0, twelve).map((rec, index) => (
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
