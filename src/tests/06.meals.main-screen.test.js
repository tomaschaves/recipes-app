import React from 'react';
import { cleanup, waitFor, screen, findByTestId, findByAltText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndProvider } from './helpers/renderWithRouterAndProvider';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';
const VALID_EMAIL_TEST = 'teste@teste.gmail.com';
const VALIDE_PASSWORD_TEST = '1234567';
const MEALS_ROUTE = '/meals';
const PROFILE_ROUTE = '/profile';
const DRINKS_ROUTE = '/drinks';
const CORBA_RECIPE = '/meals/52977';
const GG_DRINK = '/drinks/15997';
const SEARCH_INPUT = 'search-input';
const DRINKS_BOTTON_BTN = 'drinks-bottom-btn';
const RECIPE_CARD_0 = '0-recipe-card';

const MEAL_INGREDIENT_FETCH_URL_EMPTY = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEAL_NAME_FETCH_URL_EMPTY = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEAL_FETCH_CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const MEAL_FILTER_INGREDIENT_FETCH_URL_DEFAULT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEAL_SEARCH_INGREDIENT_FETCH_URL_DEFAULT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
const MEAL_FILTER_INGREDIENT_BEFF_FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef';
const MEAL_FILTER_INGREDIENT_BREAKFAST_FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast';
const MEAL_FILTER_INGREDIENT_CHICKEN_FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';
const MEAL_FILTER_INGREDIENT_DESSERT_FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';
const MEAL_FILTER_INGREDIENT_GOAT_FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat';
const MEAL_NAME_ARRABIATA_RECIPE_FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
const MEAL_FIRST_LETTER_A_RECIPE_FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
const MEAL_RANDOM_RECIPE_FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const MEAL_ID_52771_RECIPE_FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
const MEAL_ID_52977_RECIPE_FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';

const DRINK_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINKS_FETCH_CATEGORY_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINKS_FILTER_INGREDIENT_FETCH_URL_DEFAULT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINK_FILTER_INGREDIENT_LIGHT_RUM_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum';
const DRINK_RANDOM_RECIPE_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const DRINK_ID_178319_RECIPE_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319';
const DRINK_ID_15997_RECIPE_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';
const DRINK_NAME_AQUAMARINE_RECIPE_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(async (url) => {
    if (url === MEAL_INGREDIENT_FETCH_URL_EMPTY) {
      return { json: async () => meals };
    }
    if (url === MEAL_NAME_FETCH_URL_EMPTY) {
      return { json: async () => meals };
    }
    if (url === DRINK_FETCH_URL) {
      return { json: async () => drinks };
    }
    if (url === MEAL_FETCH_CATEGORY_URL) {
      return { json: async () => mealCategories };
    }
    if (url === DRINKS_FETCH_CATEGORY_URL) {
      return { json: async () => drinkCategories };
    }
    if (url === MEAL_FILTER_INGREDIENT_FETCH_URL_DEFAULT) {
      return { json: async () => mealsByIngredient };
    }
    if (    url === MEAL_FILTER_INGREDIENT_CHICKEN_FETCH_URL
        || url === MEAL_FILTER_INGREDIENT_BEFF_FETCH_URL
        || url === MEAL_FILTER_INGREDIENT_BREAKFAST_FETCH_URL
        || url === MEAL_FILTER_INGREDIENT_DESSERT_FETCH_URL
        || url === MEAL_FILTER_INGREDIENT_GOAT_FETCH_URL
        || url === MEAL_SEARCH_INGREDIENT_FETCH_URL_DEFAULT    
      ) {
      return { json: async () => mealsByIngredient };
    }
    if (url === DRINK_FILTER_INGREDIENT_LIGHT_RUM_FETCH_URL) {
      return { json: async () => drinksByIngredient };
    }
    if (url === DRINKS_FILTER_INGREDIENT_FETCH_URL_DEFAULT) {
      return { json: async () => drinkIngredients };
    }
    if (
      url === MEAL_NAME_ARRABIATA_RECIPE_FETCH_URL
        || url === MEAL_RANDOM_RECIPE_FETCH_URL
        || url === MEAL_ID_52771_RECIPE_FETCH_URL
        || url === MEAL_ID_52977_RECIPE_FETCH_URL
        || url === MEAL_FIRST_LETTER_A_RECIPE_FETCH_URL
      ) {
      return { json: async () => oneMeal };
    }
    if (
      url === DRINK_NAME_AQUAMARINE_RECIPE_FETCH_URL
        || url === DRINK_RANDOM_RECIPE_FETCH_URL
        || url === DRINK_ID_178319_RECIPE_FETCH_URL
        || url === DRINK_ID_15997_RECIPE_FETCH_URL
    ) {
      return { json: async () => oneDrink };
    }
  });
});

afterEach(jest.restoreAllMocks);

// FUNÇÃO PARA EFETUAR O LOGIN NA APLICAÇÃO
const handleLogin = (getByTestId) => {
  // DEFINIR
  const emailInput = getByTestId(EMAIL_INPUT);
  const passwordInput = getByTestId(PASSWORD_INPUT);
  const loginButton = getByTestId(LOGIN_BUTTON);

  // AGIR
  userEvent.type(emailInput, VALID_EMAIL_TEST);
  userEvent.type(passwordInput, VALIDE_PASSWORD_TEST);
  userEvent.click(loginButton);
};

// screen.debug();

describe('Teste da página Meals.js', () => {
  describe('1 - Rota: Verifique se o componente "<Meals />" é renderizado na rota "/meals".', () => {
    test('1.1 - Se o usuário é redirecionado para a rota "/meals" ao efetuar o login na aplicação.', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { history, getByTestId, getByText } = renderWithRouterAndProvider(<App />);

      // ACESSAR
      const emailInput = getByTestId(EMAIL_INPUT);
      const passwordInput = getByTestId(PASSWORD_INPUT);
      const loginButton = getByTestId(LOGIN_BUTTON);

      // AGIR
      userEvent.type(emailInput, VALID_EMAIL_TEST);
      userEvent.type(passwordInput, VALIDE_PASSWORD_TEST);
      userEvent.click(loginButton);

      // ACESSAR
      const { pathname } = history.location;
      const pageTitle = getByTestId('page-title');
      const title = getByText('Meals');

      // AFERIR
      expect(pathname).toBe(MEALS_ROUTE);
      expect(title).toBeInTheDocument();
      expect(pageTitle).toBeInTheDocument();
    });
  });

  describe('2 - Navegação: Verifique os elementos renderizados no componente "<Meals />" que gerenciam a navegação para outras rotas.', () => {
    test('2.1 - Perfil: o usuário é redirecionado para a rota "/profile" ao pressionar o botão de "Perfil" no topo da aplicação', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { history, getByTestId } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      // ACESSAR
      const profileIconButton = getByTestId('profile-top-btn');

      // AGIR
      userEvent.click(profileIconButton);

      // ACESSAR
      const { location: { pathname } } = history;

      // AFERIR
      expect(pathname).toBe(PROFILE_ROUTE);
    });

    test('2.2 - Bebidas: o usuário é redirecionado para a rota "/drinks" ao pressionar o botão de "BEBIDAS" no rodapé da aplicação', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { history, getByTestId } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      // ACESSAR
      const drinksButton = getByTestId(DRINKS_BOTTON_BTN);

      // AGIR
      userEvent.click(drinksButton);

      // ACESSAR
      const { location: { pathname } } = history;

      // AFERIR
      expect(pathname).toBe(DRINKS_ROUTE);
    });

    test('2.3 - Comidas: o usuário é redirecionado para a rota "/meals" ao pressionar o botão de "COMIDAS" no rodapé da aplicação', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { history, getByTestId } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      // ACESSAR
      const mealsButton = getByTestId('meals-bottom-btn');

      // AGIR
      userEvent.click(mealsButton);

      // ACESSAR
      const { location: { pathname } } = history;

      // AFERIR
      expect(pathname).toBe(MEALS_ROUTE);
    });

    test('2.4 - Receita: o usuário é redirecionado para a rota "/meals/52977" ao pressionar a imagem da receita "Corba" a partir da rota "/meals".', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { history, getByTestId, findByTestId } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      // ACESSAR
      await waitFor(() => findByTestId(RECIPE_CARD_0));
      const corbaRecipe = getByTestId(RECIPE_CARD_0);

      // AGIR
      userEvent.click(corbaRecipe);

      // ACESSAR
      const { location: { pathname } } = history;

      // AFERIR
      expect(pathname).toBe(CORBA_RECIPE);
    });

    test('2.5 - Receita: o usuário é redirecionado para a rota "/drinks/15997" ao pressionar a imagem da receita "GG" a partir da rota "/drinks".', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const {
        history,
        getByTestId,
        findByTestId,
      } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      //  ACESSAR
      const drinksButton = getByTestId(DRINKS_BOTTON_BTN);

      userEvent.click(drinksButton);

      // ACESSAR
      const ggDrinks = await findByTestId(RECIPE_CARD_0);

      // AGIR
      userEvent.click(ggDrinks);

      // ACESSAR
      const { location: { pathname } } = history;

      // AFERIR
      expect(pathname).toBe(GG_DRINK);
    });
  });

  describe('3 - Renderização: Verifique se os elementos do componente "<Meals />" estão presentes e/ou visiveis na tela.', () => {
    test('3.1 - <Meals /> - verifique se o botão de perfil está visível na tela.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const {
        getByTestId,
      } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      //  ACESSAR
      const profileButton = getByTestId('profile-top-btn');

      // AFERIR
      expect(profileButton).toBeVisible();
    });

    test('3.2 - <Meals /> - verifique se o botão de busca está visível na tela.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const {
        getByTestId,
      } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      //  ACESSAR
      const searchButton = getByTestId('search-top-btn');

      // AFERIR
      expect(searchButton).toBeVisible();
    });

    test('3.3 - <Meals /> - verifique se o título da página está visível na tela.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const {
        getByTestId,
      } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      //  ACESSAR
      const pageTitle = getByTestId('page-title');

      // AFERIR
      expect(pageTitle).toBeVisible();
    });

    test('3.4 - <Meals /> - verifique se os botões de filtro, "Beef", "Breakfast", Chicken, "Dessert" e "goat" estão visiveis na tela.', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const {
        getByTestId,
        findByTestId,
      } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      // AGIR
      await waitFor(() => findByTestId('Beef-category-filter'));
      // await waitFor(() => findByTestId('Ordinary Drink-category-filter'));

      // ACESSAR
      const beefCategoryFilterRadio = await findByTestId('Beef-category-filter');
      const breakfastCategoryFilterRadio = getByTestId('Breakfast-category-filter');
      const chickenCategoryFilterRadio = getByTestId('Chicken-category-filter');
      const dessertCategoryFilterRadio = getByTestId('Dessert-category-filter');
      const goatCategoryFilterRadio = getByTestId('Goat-category-filter');
      const resetFilterAllCategoryButton = getByTestId('All-category-filter');

      // AFERIR
      expect(beefCategoryFilterRadio).toBeVisible();
      expect(breakfastCategoryFilterRadio).toBeVisible();
      expect(chickenCategoryFilterRadio).toBeVisible();
      expect(dessertCategoryFilterRadio).toBeVisible();
      expect(goatCategoryFilterRadio).toBeVisible();
      expect(resetFilterAllCategoryButton).toBeVisible();
    });

    test('3.5 - <Meals /> - verifique se as 12 primeiras receitas, contendo imagem e nome, estão visiveis na tela', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const {
        getByTestId,
        getAllByTestId,
        findAllByTestId,
      } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      // AGIR
      // await waitFor(() => findByTestId('11-recipe-card'));

      // ACESSAR
      const twelveRecipesCard = await findAllByTestId(/recipe-card/i);
      const twelveRecipesImage = getAllByTestId(/card-img/i);
      const twelveRecipesNAme = getAllByTestId(/card-name/i);

      // AFERIR
      expect(twelveRecipesCard.length).toBe(12);
      expect(twelveRecipesImage.length).toBe(12);
      expect(twelveRecipesNAme.length).toBe(12);
      twelveRecipesCard.map((img) => expect(img).toBeVisible());
      twelveRecipesImage.map((img) => expect(img).toBeVisible());
      twelveRecipesNAme.map((img) => expect(img).toBeVisible());
    });

    test('3.6 - <Meals /> - verifique se o botão de filtro de bebidas está visível na tela.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const {
        getByTestId,
      } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      //  ACESSAR
      const drinksBottomButton = getByTestId(DRINKS_BOTTON_BTN);

      // AFERIR
      expect(drinksBottomButton).toBeVisible();
    });

    test('3.7 - <Meals /> - verifique se o botão de filtro de comidas está visível na tela.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const {
        getByTestId,
      } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      //  ACESSAR
      const mealsBottomButton = getByTestId('meals-bottom-btn');

      // AFERIR
      expect(mealsBottomButton).toBeVisible();
    });

    test('3.8 - <Meals /> - verifique se o formulário de busca não está presente na tela ao efetuar o login.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const {
        getByTestId,
        queryByTestId,
      } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      // ACESSAR
      const searchInput = queryByTestId(SEARCH_INPUT);
      const ingredientSearchRadioButton = queryByTestId('ingredient-search-radio');
      const nameSearchRadioButton = queryByTestId('name-search-radio');
      const firstLetterSearchRadioButton = queryByTestId('first-letter-search-radio');
      const SearchExecButton = queryByTestId('exec-search-btn');

      // AFERIR
      expect(searchInput).toBeNull();
      expect(ingredientSearchRadioButton).toBeNull();
      expect(nameSearchRadioButton).toBeNull();
      expect(firstLetterSearchRadioButton).toBeNull();
      expect(SearchExecButton).toBeNull();
    });

    test('3.9 - <Meals /> - verifique se o formulário de busca está presente na tela após pressionar o botão de "Busca".', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const {
        getByTestId,
        findByTestId,
      } = renderWithRouterAndProvider(<App />);

      // AGIR - LOGAR
      handleLogin(getByTestId);

      // ACESSAR
      const searchButton = getByTestId('search-top-btn');

      // AGIR
      userEvent.click(searchButton);
      await waitFor(() => findByTestId(SEARCH_INPUT), { timeout: 5000 - 1 });

      // ACESSAR
      const searchInput = getByTestId(SEARCH_INPUT);
      const ingredientSearchRadioButton = getByTestId('ingredient-search-radio');
      const nameSearchRadioButton = getByTestId('name-search-radio');
      const firstLetterSearchRadioButton = getByTestId('first-letter-search-radio');
      const SearchExecButton = getByTestId('exec-search-btn');

      // AFERIR
      expect(searchInput).toBeInTheDocument();
      expect(ingredientSearchRadioButton).toBeInTheDocument();
      expect(nameSearchRadioButton).toBeInTheDocument();
      expect(firstLetterSearchRadioButton).toBeInTheDocument();
      expect(SearchExecButton).toBeInTheDocument();
    });
  });

  describe('4 - Teste as funcionalidades do componente <Meals />', () => {
    describe('4.1 - Teste a funcionalidade de "Buscar".', () => {
      test('4.1.1 - Buscar: verifique se ao realizar uma busca por ingrediente com o input vazio, a primeira receita é "Corba"', async () => {
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByAltText,
        } = renderWithRouterAndProvider(<App />);

        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId('search-top-btn');

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura o botão de filtro por ingrediente
        const ingredientFilterButon = getByTestId('ingredient-search-radio')

        // AGIR - clica no filtro capturado
        userEvent.click(ingredientFilterButon)

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId('exec-search-btn');

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // ACESSAR
        const corbaRecipe = await findByAltText('Corba');

        // AFERIR
        expect(corbaRecipe).toBeInTheDocument();

        // screen.debug();
      });

      test('4.1.2 - Buscar: verifique se ao realizar uma busca por nome com o input vazio, a primeira receita é "Corba"', async () => {
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByAltText,
        } = renderWithRouterAndProvider(<App />);

        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId('search-top-btn');

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura filtro por nome
        const nameFilterButton = getByTestId('name-search-radio')

        // AGIR - clica no filtro capturado
        userEvent.click(nameFilterButton)

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId('exec-search-btn');

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // ACESSAR
        const corbaRecipe = await findByAltText('Corba');

        // AFERIR
        expect(corbaRecipe).toBeInTheDocument();

        // screen.debug();
      });

      test('4.1.3 - Buscar: verifique se ao realizar uma busca pela primeira letra com o input vazio, o alerta "Your search must have only 1 (one) character" é exibido na tela.', async () => {
        // MOCK
        jest.spyOn(global, 'alert').mockReturnValue('Your search must have only 1 (one) character')
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByAltText,
          findByText,
        } = renderWithRouterAndProvider(<App />);

        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId('search-top-btn');

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura filtro por nome
        const firstLetterFilterButton = getByTestId('first-letter-search-radio')

        // AGIR - clica no filtro capturado
        userEvent.click(firstLetterFilterButton)

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId('exec-search-btn');

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // ACESSAR
        // const ondeCharacterText = await findByText('Your search must have only 1 (one) character');

        // AFERIR
        expect(global.alert).toHaveBeenCalled()
        // expect(ondeCharacterText).toBeVisible();

        // screen.debug();
      });

      test('4.1.4 - Buscar: verifique se ao realizar uma busca de ingrediente pelo termo "chicken", a primeira receita é "Brown Stew Chicken"', async () => {
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByAltText,
        } = renderWithRouterAndProvider(<App />);

        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId('search-top-btn');

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura o elemento de input
        const searchInput = getByTestId('search-input');

        // AGIR - insere o termo de busca "chicken" no input
        userEvent.type(searchInput, 'chicken');

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId('exec-search-btn');

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // ACESSAR
        const brownStewChickenRecipe = await findByAltText('Brown Stew Chicken');

        // AFERIR
        expect(brownStewChickenRecipe).toBeInTheDocument();
      });

      test('4.1.5 - Buscar: verifique se ao realizar uma busca pelo nome, utilizando o termo "arrabiata", a primeira receita é "Spicy Arrabiata Penne"', async () => {
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByAltText,
        } = renderWithRouterAndProvider(<App />);

        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId('search-top-btn');

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura o elemento de input
        const searchInput = getByTestId('search-input');

        // AGIR - insere o termo de busca "chicken" no input
        userEvent.type(searchInput, 'Arrabiata');

        // ACESSAR - filtro de nome
        const nameFilterRadio = getByTestId('name-search-radio')

        // AGIR - clickar no filtro de nome
        userEvent.click(nameFilterRadio)

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId('exec-search-btn');

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // ACESSAR
        const spicyArrabiataPenneRecipe = await findByAltText('Spicy Arrabiata Penne');

        // AFERIR
        expect(spicyArrabiataPenneRecipe).toBeInTheDocument();
      });

      test('4.1.6 - Buscar: verifique se ao realizar uma busca pela primeira letra, utilizando o termo "a", a primeira receita é "Spicy Arrabiata Penne"', async () => {
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByAltText,
        } = renderWithRouterAndProvider(<App />);

        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId('search-top-btn');

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura o elemento de input
        const searchInput = getByTestId('search-input');

        // AGIR - insere o termo de busca "chicken" no input
        userEvent.type(searchInput, 'a');

        // ACESSAR - filtro de primeira letra
        const firstLetterFilterRadio = getByTestId('first-letter-search-radio')

        // AGIR - clickar no filtro de nome
        userEvent.click(firstLetterFilterRadio)

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId('exec-search-btn');

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // ACESSAR
        const spicyArrabiataPenneRecipe = await findByAltText('Spicy Arrabiata Penne');

        // AFERIR
        expect(spicyArrabiataPenneRecipe).toBeInTheDocument();
      });

    });

    describe('4.2 - Teste a funcionalidade de filtar', () => {
      test('4.2.1 - Filtrar: verifique se ao selecionar o filtro "Beef", a receita "Brown Stew Chicken" está presente na tela.', async () => {
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByTestId,
          findByAltText,
        } = renderWithRouterAndProvider(<App />);
  
        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - capturar filtro Beff
        const beffFilter = await findByTestId('Beef-category-filter')

        // AGIR - pressionar de filtro capturado
        userEvent.click(beffFilter)

        // ACESSAR
        const brownStewChicken = await findByAltText('Brown Stew Chicken')

        // AFERIR
        expect(brownStewChicken).toBeVisible()

      })
      
      test('4.2.2 - Filtrar: verifique se ao selecionar o filtro "Breakfast", a receita "Brown Stew Chicken" está presente na tela', async () => {
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByTestId,
          findByAltText,
        } = renderWithRouterAndProvider(<App />);
  
        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - capturar filtro Beff
        const breakfastFilter = await findByTestId('Breakfast-category-filter')

        // AGIR - pressionar de filtro capturado
        userEvent.click(breakfastFilter)

        // ACESSAR
        const brownStewChicken = await findByAltText('Brown Stew Chicken')

        // AFERIR
        expect(brownStewChicken).toBeVisible()
      })

      test('4.2.3 - Filtrar: verifique se ao selecionar o filtro "Chicken", a receita "Brown Stew Chicken" está presente na tela.', async () => {
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByTestId,
          findByAltText,
        } = renderWithRouterAndProvider(<App />);
  
        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - capturar filtro Beff
        const chickenFilter = await findByTestId('Chicken-category-filter')

        // AGIR - pressionar de filtro capturado
        userEvent.click(chickenFilter)

        // ACESSAR
        const brownStewChicken = await findByAltText('Brown Stew Chicken')

        // AFERIR
        expect(brownStewChicken).toBeVisible()
      })

      test('4.2.4 - Filtrar: verifique se ao selecionar o filtro "Dessert",a receita "Brown Stew Chicken" está presente na tela.', async () => {
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByTestId,
          findByAltText,
        } = renderWithRouterAndProvider(<App />);
  
        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - capturar filtro Beff
        const dessertFilter = await findByTestId('Dessert-category-filter')

        // AGIR - pressionar de filtro capturado
        userEvent.click(dessertFilter)

        // ACESSAR
        const brownStewChicken = await findByAltText('Brown Stew Chicken')

        // AFERIR
        expect(brownStewChicken).toBeVisible()
      })

      test('4.2.5 - Filtrar: verifique se ao selecionar o filtro "Goat", a receita "Brown Stew Chicken" está presente na tela.', async () => {
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByTestId,
          findByAltText,
        } = renderWithRouterAndProvider(<App />);
  
        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - capturar filtro Beff
        const goatFilter = await findByTestId('Goat-category-filter')

        // AGIR - pressionar de filtro capturado
        userEvent.click(goatFilter)

        // ACESSAR
        const brownStewChicken = await findByAltText('Brown Stew Chicken')

        // AFERIR
        expect(brownStewChicken).toBeVisible()
      })

      test('4.2.6 - Filtrar: verifique se ao selecionar o filtro "Goat" e pressionar o botão "All" para limpar os filtros, a receita "Corba" está presente na tela', async () => {
        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const {
          getByTestId,
          findByTestId,
          findByAltText,
        } = renderWithRouterAndProvider(<App />);
  
        // AGIR - LOGAR
        handleLogin(getByTestId);

        // ACESSAR - capturar filtro Beff
        const goatFilter = await findByTestId('Goat-category-filter')

        // AGIR - pressionar de filtro capturado
        userEvent.click(goatFilter)

        // ACESSAR
        const allCategoryFilterButton = getByTestId('All-category-filter')

        // AGIR
        userEvent.click(allCategoryFilterButton)

        // ACESSAR
        const corbaRecipe = await findByAltText('Corba')

        // AFERIR
        expect(corbaRecipe).toBeVisible()
      })
    });
  });
});
