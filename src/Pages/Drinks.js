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
  const [filteredCategory, setFilteredCategory] = React.useState([]); // para o filtro vindo dos botões das categorias

  React.useEffect(() => {
    if (!drinks) {
      setDrinks(drinks);
    }
  }, [drinks, setDrinks]);

  const filterCategory = async (theme) => {
    // para filtrar as bebidas pela categoria escolhida pelos radio button
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${theme}`;

    const fetchURL = await fetch(endpoint);
    const response = await fetchURL.json();
    return response.drinks;
  };

  const setInState = async (theme) => {
    const fetchItems = await filterCategory(theme);
    // setamos o filtro no estado criado para filtrar
    setFilteredCategory(fetchItems);
  };

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
              onClick={ () => setInState(category.strCategory) }
            />
          </div>
        )) }
        <div>
          <button
            className="input_radio"
            type="button"
            // id para que seja possível selecionar clicando no nome (htmlFor)
            id="all"
            // name para que apenas um radio button fique selecionado
            name="option"
            data-testid="All-category-filter"
            // para resetar os filtros
            onClick={ () => setFilteredCategory([]) }
          >
            All
          </button>
        </div>
      </div>
      <div>
        {
          // caso o estado de filtro tenha algo nele, fazemos o slice/map a partir dele. Se não tiver nada, fazemos o slice/map do estado padrão(drinks). o map em si é exatamente igual
          filteredCategory.length > 0
            ? filteredCategory.slice(0, twelve).map((filteredDrink, index) => (
              <div key={ filteredDrink.idDrink } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ filteredDrink.strDrinkThumb }
                  alt={ filteredDrink.strDrink }
                />
                <p data-testid={ `${index}-card-name` }>{filteredDrink.strDrink}</p>
              </div>
            ))
            : drinks.slice(0, twelve).map((rec, index) => (
              <div key={ rec.idDrink } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ rec.strDrinkThumb }
                  alt={ rec.strDrink }
                />
                <p data-testid={ `${index}-card-name` }>{rec.strDrink}</p>
              </div>
            ))
        }
      </div>
      <Footer />
    </div>
  );
}
