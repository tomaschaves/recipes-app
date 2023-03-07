import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';

export default function Meals() {
  const {
    meals,
    setMeals,
    mealsCategoriesList,
  } = useContext(RecipeContext);

  const twelve = 12; // 12 receitas a serem carregadas.
  const [filteredCategory, setFilteredCategory] = useState([]); // para o filtro vindo dos botões das categorias

  useEffect(() => {
    if (!meals) {
      setMeals(meals);
    }
  }, [meals, setMeals]);

  const filterCategory = async (theme) => {
    // para filtrar as bebidas pela categoria escolhida pelos radio button
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${theme}`;

    const fetchURL = await fetch(endpoint);
    const response = await fetchURL.json();
    return response.meals;
  };

  const setInState = async (theme) => {
    const fetchItems = await filterCategory(theme);
    // setamos o filtro no estado criado para filtrar
    setFilteredCategory(fetchItems);
  };

  return (
    <div>
      <Header title="Meals" search="true" />
      {/* Input radio para filtros de categoria */}
      {/* css inline para melhor visualização da página durante a programação */}
      {/* container dos inputs */}
      <div className="options_container" style={ { display: 'flex', gap: '7px' } }>
        { mealsCategoriesList && mealsCategoriesList.map((category) => (
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
          // caso o estado de filtro tenha algo nele, fazemos o slice/map a partir dele. Se não tiver nada, fazemos o slice/map do estado padrão(meals). o map em si é exatamente igual
          filteredCategory.length > 0
            ? filteredCategory.slice(0, twelve).map((filteredMeal, index) => (
              <div key={ filteredMeal.idMeal } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ filteredMeal.strMealThumb }
                  alt={ filteredMeal.strMeal }
                />
                <p data-testid={ `${index}-card-name` }>{filteredMeal.strMeal}</p>
              </div>
            ))
            : meals.slice(0, twelve).map((rec, index) => (
              <div key={ rec.idMeal } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ rec.strMealThumb }
                  alt={ rec.strMeal }
                />
                <p data-testid={ `${index}-card-name` }>{rec.strMeal}</p>
              </div>
            ))
        }
      </div>
      <Footer />
    </div>
  );
}
