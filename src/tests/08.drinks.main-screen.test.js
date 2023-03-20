import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Drinks from '../Pages/Drinks';
import { renderWithRouterAndProvider } from './helpers/renderWithRouterAndProvider';
import meals from './mockData/meals';
import drinks from './mockData/drinks';
import mealCategories from './mockData/mealCategories';
import drinkCategories from './mockData/drinkCategories';
import mealsByIngredient from './mockData/mealsByIngredient';
import drinksByIngredient from './mockData/drinksByIngredient';
import oneMeal from './mockData/oneMeal';
import oneDrink from './mockData/oneDrink';
import mealIngredients from './mockData/mealIngredients';
import drinkIngredients from './mockData/drinkIngredients';

const MEALS_ROUTE = '/meals';
const PROFILE_ROUTE = '/profile';
const DRINKS_ROUTE = '/drinks';
const GG_DRINK = '/drinks/15997';
const SEARCH_INPUT = 'search-input';
const DRINKS_BOTTON_BTN = 'drinks-bottom-btn';
const RECIPE_CARD_0 = '0-recipe-card';
const SEARCH_TOP_BTN = 'search-top-btn';
const ORDINARY_DRINK_CATEGORY_FILTER = 'Ordinary Drink-category-filter';
const COCOA_CATEGORY_FILTER = 'Cocoa-category-filter';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const FLORIDA_BUSHWACKER = '151 Florida Bushwacker';

const MEAL_FETCH_URL_DEFAULT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEAL_NAME_FETCH_URL_EMPTY = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEAL_FETCH_CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
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
const DRINK_INGREDIENTS_FETCH_URL_DEFAULT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINKS_FETCH_CATEGORY_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINK_FILTER_INGREDIENT_FETCH_URL_DEFAULT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINK_FILTER_INGREDIENT_LIGHT_RUM_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum';
const DRINK_FILTER_INGREDIENT_ORDINARY_DRINK_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink';
const DRINK_FILTER_INGREDIENT_COCKTAIL_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
const DRINK_FILTER_INGREDIENT_SHAKE_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake';
const DRINK_FILTER_INGREDIENT_OTHER_UNKDOWN_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown';
const DRINK_FILTER_INGREDIENT_COCOA_FETCH_URL_DEFAULT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa';
const DRINK_RANDOM_RECIPE_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const DRINK_ID_178319_RECIPE_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319';
const DRINK_ID_15997_RECIPE_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';
const DRINK_NAME_AQUAMARINE_RECIPE_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine';
const DRINK_FIRST_LETTER_A_RECIPE_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

const mockFetchMethods = {
  mealsCase: (url) => (
    url === MEAL_FETCH_URL_DEFAULT
    || url === MEAL_NAME_FETCH_URL_EMPTY
  ),
  drinksCase: (url) => (url === DRINK_FETCH_URL),
  mealCategoriesCase: (url) => (url === MEAL_FETCH_CATEGORY_URL),
  drinkCategoriesCase: (url) => (url === DRINKS_FETCH_CATEGORY_URL),
  mealIngredientsCase: (url) => (url === MEAL_FETCH_URL_DEFAULT),
  drinkIngredientsCase: (url) => (url === DRINK_INGREDIENTS_FETCH_URL_DEFAULT),
  mealsByIngredientCase: (url) => (
    url === MEAL_FILTER_INGREDIENT_CHICKEN_FETCH_URL
        || url === MEAL_FILTER_INGREDIENT_BEFF_FETCH_URL
        || url === MEAL_FILTER_INGREDIENT_BREAKFAST_FETCH_URL
        || url === MEAL_FILTER_INGREDIENT_DESSERT_FETCH_URL
        || url === MEAL_FILTER_INGREDIENT_GOAT_FETCH_URL
        || url === MEAL_FETCH_URL_DEFAULT
        || url === MEAL_SEARCH_INGREDIENT_FETCH_URL_DEFAULT
  ),
  drinksByIngredientCase: (url) => (
    url === DRINK_FILTER_INGREDIENT_ORDINARY_DRINK_FETCH_URL
    || url === DRINK_FILTER_INGREDIENT_COCKTAIL_FETCH_URL
    || url === DRINK_FILTER_INGREDIENT_SHAKE_FETCH_URL
    || url === DRINK_FILTER_INGREDIENT_OTHER_UNKDOWN_FETCH_URL
    || url === DRINK_FILTER_INGREDIENT_COCOA_FETCH_URL_DEFAULT
    || url === DRINK_FILTER_INGREDIENT_LIGHT_RUM_FETCH_URL
    || url === DRINK_FILTER_INGREDIENT_FETCH_URL_DEFAULT
  ),
  oneMealCase: (url) => (
    url === MEAL_NAME_ARRABIATA_RECIPE_FETCH_URL
    || url === MEAL_RANDOM_RECIPE_FETCH_URL
    || url === MEAL_ID_52771_RECIPE_FETCH_URL
    || url === MEAL_ID_52977_RECIPE_FETCH_URL
    || url === MEAL_FIRST_LETTER_A_RECIPE_FETCH_URL
  ),
  oneDrinkCase: (url) => (
    url === DRINK_FIRST_LETTER_A_RECIPE_FETCH_URL
    || url === DRINK_NAME_AQUAMARINE_RECIPE_FETCH_URL
    || url === DRINK_RANDOM_RECIPE_FETCH_URL
    || url === DRINK_ID_178319_RECIPE_FETCH_URL
    || url === DRINK_ID_15997_RECIPE_FETCH_URL
  ),
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(async (url) => {
    if (mockFetchMethods.mealsCase(url)) {
      return { json: async () => meals };
    }
    if (mockFetchMethods.drinksCase(url)) {
      return { json: async () => drinks };
    }
    if (mockFetchMethods.mealCategoriesCase(url)) {
      return { json: async () => mealCategories };
    }
    if (mockFetchMethods.drinkCategoriesCase(url)) {
      return { json: async () => drinkCategories };
    }
    if (mockFetchMethods.mealsByIngredientCase(url)) {
      return { json: async () => mealsByIngredient };
    }
    if (mockFetchMethods.drinksByIngredientCase(url)) {
      return { json: async () => drinksByIngredient };
    }
    if (mockFetchMethods.mealIngredientsCase(url)) {
      return { json: async () => mealIngredients };
    }
    if (mockFetchMethods.drinkIngredientsCase(url)) {
      return { json: async () => drinkIngredients };
    }
    if (mockFetchMethods.oneMealCase(url)) {
      return { json: async () => oneMeal };
    }
    if (mockFetchMethods.oneDrinkCase(url)) {
      return { json: async () => oneDrink };
    }
  });
});

afterEach(jest.restoreAllMocks);

// FUNÇÃO LOGIN - efetua o login na aplicação e navega até a rota "/drinks"
// const handleLogin = async (getByTestId, findByTestId) => {
//   // DEFINIR
//   const emailInput = getByTestId(EMAIL_INPUT);
//   const passwordInput = getByTestId(PASSWORD_INPUT);
//   const loginButton = getByTestId(LOGIN_BUTTON);

//   // AGIR
//   userEvent.type(emailInput, VALID_EMAIL_TEST);
//   userEvent.type(passwordInput, VALIDE_PASSWORD_TEST);
//   userEvent.click(loginButton);

//   // ACESSAR
//   const drinksIcon = await findByTestId(DRINKS_BUTTON_BOTTON)

//   // AGIR
//   userEvent.click(drinksIcon)
// };

// screen.debug();

describe('Teste da página Meals.js', () => {
  describe('1 - Rota: Verifique se o componente "<Drinks />" é renderizado na rota "/drinks".', () => {
    test('1.1 - Se o título da página "Drinks" está presente no compoente renderizado e se a rota é "/drinks".', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { history, getByTestId } = renderWithRouterAndProvider(<Drinks />, { initialEntries: ['/drinks'] });

      // ACESSAR
      const pageTitle = getByTestId('page-title');
      const { location: { pathname } } = history;

      // AFERIR
      expect(pageTitle.innerHTML).toBe('Drinks');
      expect(pathname).toBe(DRINKS_ROUTE);
    });
  });

  describe('2 - Navegação: Verifique os elementos renderizados no componente "<Drinks />" que gerenciam a navegação para outras rotas.', () => {
    test('2.1 - Perfil: o usuário é redirecionado para a rota "/profile" ao pressionar o botão de "Perfil" no topo da aplicação', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { history, getByTestId } = renderWithRouterAndProvider(<Drinks />, { initialEntries: ['/drinks'] });

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
      const { history, getByTestId } = renderWithRouterAndProvider(<Drinks />, { initialEntries: ['/drinks'] });

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
      const { history, getByTestId } = renderWithRouterAndProvider(<Drinks />, { initialEntries: ['/drinks'] });

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
      const { history, getByTestId, findByTestId } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

      // ACESSAR
      await waitFor(() => findByTestId(RECIPE_CARD_0));
      const GGRecipe = getByTestId(RECIPE_CARD_0);

      // AGIR
      userEvent.click(GGRecipe);

      // ACESSAR
      const { location: { pathname } } = history;

      console.log(pathname);

      screen.debug();
      // AFERIR
      expect(pathname).toBe(GG_DRINK);
    });
  });

  describe('3 - Renderização: Verifique se os elementos do componente "<Drinks />" estão presentes e/ou visiveis na tela.', () => {
    test('3.1 - <Drinks /> - verifique se o botão de perfil está visível na tela.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { getByTestId } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

      //  ACESSAR
      const profileButton = getByTestId('profile-top-btn');

      // AFERIR
      expect(profileButton).toBeVisible();
    });

    test('3.2 - <Drinks /> - verifique se o botão de busca está visível na tela.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { getByTestId } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

      //  ACESSAR
      const searchButton = getByTestId(SEARCH_TOP_BTN);

      // AFERIR
      expect(searchButton).toBeVisible();
    });

    test('3.3 - <Drinks /> - verifique se o título da página está visível na tela.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { getByTestId } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

      //  ACESSAR
      const pageTitle = getByTestId('page-title');

      // AFERIR
      expect(pageTitle).toBeVisible();
    });

    test('3.4 - <Drinks /> - verifique se os botões de filtro, "Ordinary Drink", "Cocktail", "Shake", "Other / Unknown", "Cocoa" e "All" estão visiveis na tela.', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { getByTestId, findByTestId } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

      // AGIR
      await waitFor(() => findByTestId(ORDINARY_DRINK_CATEGORY_FILTER));

      // ACESSAR
      const beefCategoryFilterRadio = await findByTestId(ORDINARY_DRINK_CATEGORY_FILTER);
      const cocktailCategoryFilterRadio = getByTestId('Cocktail-category-filter');
      const shakeCategoryFilterRadio = getByTestId('Shake-category-filter');
      const otherAndUnknownCategoryFilterRadio = getByTestId('Other/Unknown-category-filter');
      const cocoaCategoryFilterRadio = getByTestId(COCOA_CATEGORY_FILTER);
      const resetFilterAllCategoryButton = getByTestId('All-category-filter');

      // AFERIR
      expect(beefCategoryFilterRadio).toBeVisible();
      expect(cocktailCategoryFilterRadio).toBeVisible();
      expect(shakeCategoryFilterRadio).toBeVisible();
      expect(otherAndUnknownCategoryFilterRadio).toBeVisible();
      expect(cocoaCategoryFilterRadio).toBeVisible();
      expect(resetFilterAllCategoryButton).toBeVisible();
    });

    test('3.5 - <Drinks /> - verifique se as 12 primeiras receitas, contendo imagem e nome, estão visiveis na tela', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { findAllByTestId, getAllByTestId } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

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

    test('3.6 - <Drinks /> - verifique se o botão de filtro de bebidas está visível na tela.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { getByTestId } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

      //  ACESSAR
      const drinksBottomButton = getByTestId(DRINKS_BOTTON_BTN);

      // AFERIR
      expect(drinksBottomButton).toBeVisible();
    });

    test('3.7 - <Drinks /> - verifique se o botão de filtro de comidas está visível na tela.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { getByTestId } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

      //  ACESSAR
      const mealsBottomButton = getByTestId('meals-bottom-btn');

      // AFERIR
      expect(mealsBottomButton).toBeVisible();
    });

    test('3.8 - <Drinks /> - verifique se o formulário de busca não está presente na tela ao efetuar o login.', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { queryByTestId } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

      // ACESSAR
      const searchInput = queryByTestId(SEARCH_INPUT);
      const ingredientSearchRadioButton = queryByTestId(INGREDIENT_SEARCH_RADIO);
      const nameSearchRadioButton = queryByTestId(NAME_SEARCH_RADIO);
      const firstLetterSearchRadioButton = queryByTestId(FIRST_LETTER_SEARCH_RADIO);
      const SearchExecButton = queryByTestId(EXEC_SEARCH_BTN);

      // AFERIR
      expect(searchInput).toBeNull();
      expect(ingredientSearchRadioButton).toBeNull();
      expect(nameSearchRadioButton).toBeNull();
      expect(firstLetterSearchRadioButton).toBeNull();
      expect(SearchExecButton).toBeNull();
    });

    test('3.9 - <Drinks /> - verifique se o formulário de busca está presente na tela após pressionar o botão de "Busca".', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { getByTestId, findByTestId } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

      // ACESSAR
      const searchButton = getByTestId(SEARCH_TOP_BTN);

      // AGIR
      userEvent.click(searchButton);
      await waitFor(() => findByTestId(SEARCH_INPUT), { timeout: 5000 - 1 });

      // ACESSAR
      const searchInput = getByTestId(SEARCH_INPUT);
      const ingredientSearchRadioButton = getByTestId(INGREDIENT_SEARCH_RADIO);
      const nameSearchRadioButton = getByTestId(NAME_SEARCH_RADIO);
      const firstLetterSearchRadioButton = getByTestId(FIRST_LETTER_SEARCH_RADIO);
      const SearchExecButton = getByTestId(EXEC_SEARCH_BTN);

      // AFERIR
      expect(searchInput).toBeInTheDocument();
      expect(ingredientSearchRadioButton).toBeInTheDocument();
      expect(nameSearchRadioButton).toBeInTheDocument();
      expect(firstLetterSearchRadioButton).toBeInTheDocument();
      expect(SearchExecButton).toBeInTheDocument();
    });
  });

  describe('4 - Teste as funcionalidades do componente <Drinks />', () => {
    describe('4.1 - Teste a funcionalidade de "Buscar".', () => {
      test('4.1.1 - Buscar: verifique se ao realizar uma busca por ingrediente com o input vazio, a primeira receita é "151 Florida Bushwacker"', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { getByTestId, findByAltText } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId(SEARCH_TOP_BTN);

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura o botão de filtro por ingrediente
        const ingredientFilterButon = getByTestId(INGREDIENT_SEARCH_RADIO);

        // AGIR - clica no filtro capturado
        userEvent.click(ingredientFilterButon);

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId(EXEC_SEARCH_BTN);

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // ACESSAR
        const firstDrinkRecipe = await findByAltText(FLORIDA_BUSHWACKER);

        // AFERIR
        expect(firstDrinkRecipe).toBeInTheDocument();

        // screen.debug();
      });

      test('4.1.2 - Buscar: verifique se ao realizar uma busca por nome com o input vazio, a primeira receita é "GG"', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { getByTestId, findByAltText } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId(SEARCH_TOP_BTN);

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura filtro por nome
        const nameFilterButton = getByTestId(NAME_SEARCH_RADIO);

        // AGIR - clica no filtro capturado
        userEvent.click(nameFilterButton);

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId(EXEC_SEARCH_BTN);

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // ACESSAR
        const firstDrinkRecipe = await findByAltText('GG');

        // AFERIR
        expect(firstDrinkRecipe).toBeInTheDocument();
      });

      test('4.1.3 - Buscar: verifique se ao realizar uma busca pela primeira letra com o input vazio, o alerta "Your search must have only 1 (one) character" é exibido na tela.', async () => {
        // MOCK
        jest.spyOn(global, 'alert').mockReturnValue('Your search must have only 1 (one) character');

        // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { getByTestId } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId(SEARCH_TOP_BTN);

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura filtro por nome
        const firstLetterFilterButton = getByTestId(FIRST_LETTER_SEARCH_RADIO);

        // AGIR - clica no filtro capturado
        userEvent.click(firstLetterFilterButton);

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId(EXEC_SEARCH_BTN);

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // AFERIR
        expect(global.alert).toHaveBeenCalled();
      });

      test('4.1.4 - Buscar: verifique se ao realizar uma busca de ingrediente pelo termo "Light rum", a primeira receita é "151 Florida Bushwacker"', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { getByTestId, findByAltText } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId(SEARCH_TOP_BTN);

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura o elemento de input
        const searchInput = getByTestId(SEARCH_INPUT);

        // AGIR - insere o termo de busca "chicken" no input
        userEvent.type(searchInput, 'Light rum');

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId(EXEC_SEARCH_BTN);

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // ACESSAR
        const firstDrinkRecipe = await findByAltText(FLORIDA_BUSHWACKER);

        // AFERIR
        expect(firstDrinkRecipe).toBeInTheDocument();
      });

      test('4.1.5 - Buscar: verifique se ao realizar uma busca pelo nome, utilizando o termo "Aquamarine", a primeira receita é "Aquamarine"', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { getByTestId, findByAltText } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId(SEARCH_TOP_BTN);

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura o elemento de input
        const searchInput = getByTestId(SEARCH_INPUT);

        // AGIR - insere o termo de busca "chicken" no input
        userEvent.type(searchInput, 'Aquamarine');

        // ACESSAR - filtro de nome
        const nameFilterRadio = getByTestId(NAME_SEARCH_RADIO);

        // AGIR - clickar no filtro de nome
        userEvent.click(nameFilterRadio);

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId(EXEC_SEARCH_BTN);

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // ACESSAR
        const oneDrinkRecipe = await findByAltText('Aquamarine');

        // AFERIR
        expect(oneDrinkRecipe).toBeInTheDocument();
      });

      test('4.1.6 - Buscar: verifique se ao realizar uma busca pela primeira letra, utilizando o termo "a", a primeira receita é "Aquamarine"', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { getByTestId, findByAltText } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - captura o botão de busca no topo
        const searchTopButton = getByTestId(SEARCH_TOP_BTN);

        // AGIR - clica no botão captura
        userEvent.click(searchTopButton);

        // ACESSAR - captura o elemento de input
        const searchInput = getByTestId(SEARCH_INPUT);

        // AGIR - insere o termo de busca "chicken" no input
        userEvent.type(searchInput, 'a');

        // ACESSAR - filtro de primeira letra
        const firstLetterFilterRadio = getByTestId(FIRST_LETTER_SEARCH_RADIO);

        // AGIR - clickar no filtro de nome
        userEvent.click(firstLetterFilterRadio);

        // ACESSAR  - captura o botão que ativa o filtro de busca
        const execSearchButton = getByTestId(EXEC_SEARCH_BTN);

        // AGIR - clica no botao de ativação do filtro.
        userEvent.click(execSearchButton);

        // ACESSAR
        const oneDrinkRecipe = await findByAltText('Aquamarine');

        // AFERIR
        expect(oneDrinkRecipe).toBeInTheDocument();
      });
    });

    describe('4.2 - Teste a funcionalidade de filtar', () => {
      test('4.2.1 - Filtrar: verifique se ao selecionar o filtro "Ordinary Drink", a receita "151 Florida Bushwacker" está presente na tela, e, se ao selecionar novamente o filtro "Ordinary Drink", o filtro é resetado e a receita "GG" está presente na tela.', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { findByTestId, findByAltText } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - capturar filtro Ordinary Drink
        const ordinaryDrinkFilter = await findByTestId(ORDINARY_DRINK_CATEGORY_FILTER);

        // AGIR - pressionar de filtro capturado
        userEvent.click(ordinaryDrinkFilter);

        // ACESSAR
        const firstDrinkRecipe = await findByAltText(FLORIDA_BUSHWACKER);

        // AFERIR
        expect(firstDrinkRecipe).toBeVisible();

        // AGIR
        userEvent.click(ordinaryDrinkFilter);

        // ACESAR
        const resetFilterOrdinaryDrink = await findByAltText('GG');

        // AFERIR
        expect(resetFilterOrdinaryDrink).toBeVisible();
      });

      test('4.2.2 - Filtrar: verifique se ao selecionar o filtro "Cocktail", a receita "151 Florida Bushwacker" está presente na tela', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { findByTestId, findByAltText } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - capturar filtro Cocktail
        const cocktailCategoryFilter = await findByTestId('Cocktail-category-filter');

        // AGIR - pressionar de filtro capturado
        userEvent.click(cocktailCategoryFilter);

        // ACESSAR
        const firstDrinkByIngredientRecipe = await findByAltText(FLORIDA_BUSHWACKER);

        // AFERIR
        expect(firstDrinkByIngredientRecipe).toBeVisible();

        // AGIR
        userEvent.click(cocktailCategoryFilter);

        // ACESAR
        const resetFilterOrdinaryDrink = await findByAltText('GG');

        // AFERIR
        expect(resetFilterOrdinaryDrink).toBeVisible();
      });

      test('4.2.3 - Filtrar: verifique se ao selecionar o filtro "Shake", a receita "151 Florida Bushwacker" está presente na tela.', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { findByTestId, findByAltText } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - capturar filtro Beff
        const shakeCategoryFilter = await findByTestId('Shake-category-filter');

        // AGIR - pressionar de filtro capturado
        userEvent.click(shakeCategoryFilter);

        // ACESSAR
        const firstDrinkByIngredientRecipe = await findByAltText(FLORIDA_BUSHWACKER);

        // AFERIR
        expect(firstDrinkByIngredientRecipe).toBeVisible();

        // AGIR
        userEvent.click(shakeCategoryFilter);

        // ACESAR
        const resetFilterOrdinaryDrink = await findByAltText('GG');

        // AFERIR
        expect(resetFilterOrdinaryDrink).toBeVisible();
      });

      test('4.2.4 - Filtrar: verifique se ao selecionar o filtro "Other/Unknown",a receita "151 Florida Bushwacker" está presente na tela.', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { findByTestId, findByAltText } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - capturar filtro Beff
        const otherAndUnknownFilter = await findByTestId('Other/Unknown-category-filter');

        // AGIR - pressionar de filtro capturado
        userEvent.click(otherAndUnknownFilter);

        // ACESSAR
        const firstDrinkByIngredientRecipe = await findByAltText(FLORIDA_BUSHWACKER);

        // AFERIR
        expect(firstDrinkByIngredientRecipe).toBeVisible();

        // AGIR
        userEvent.click(otherAndUnknownFilter);

        // ACESAR
        const resetFilterOrdinaryDrink = await findByAltText('GG');

        // AFERIR
        expect(resetFilterOrdinaryDrink).toBeVisible();
      });

      test('4.2.5 - Filtrar: verifique se ao selecionar o filtro "Cocoa", a receita "151 Florida Bushwacker" está presente na tela.', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { findByTestId, findByAltText } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - capturar filtro Beff
        const cocoaFilter = await findByTestId(COCOA_CATEGORY_FILTER);

        // AGIR - pressionar de filtro capturado
        userEvent.click(cocoaFilter);

        // ACESSAR
        const firstDrinkByIngredientRecipe = await findByAltText(FLORIDA_BUSHWACKER);

        // AFERIR
        expect(firstDrinkByIngredientRecipe).toBeVisible();

        // AGIR
        userEvent.click(cocoaFilter);

        // ACESAR
        const resetFilterOrdinaryDrink = await findByAltText('GG');

        // AFERIR
        expect(resetFilterOrdinaryDrink).toBeVisible();
      });

      test('4.2.6 - Filtrar: verifique se ao selecionar o filtro "Cocoa" e pressionar o botão "All" para limpar os filtros, a receita "151 Florida Bushwacker" está presente na tela', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
        const { getByTestId, findByTestId, findByAltText } = renderWithRouterAndProvider(<App />, { initialEntries: ['/drinks'] });

        // ACESSAR - capturar filtro Beff
        const cocoaFilter = await findByTestId(COCOA_CATEGORY_FILTER);

        // AGIR - pressionar de filtro capturado
        userEvent.click(cocoaFilter);

        // ACESSAR
        const allCategoryFilterButton = getByTestId('All-category-filter');

        // AGIR
        userEvent.click(allCategoryFilterButton);

        // ACESSAR
        const firstDrinkRecipeDefault = await findByAltText(FLORIDA_BUSHWACKER);

        // AFERIR
        expect(firstDrinkRecipeDefault).toBeVisible();
      });
    });
  });
});
