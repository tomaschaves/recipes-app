import React from 'react';
import { cleanup, fireEvent, waitFor, waitForElementToBeRemoved, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndProvider } from './helpers/renderWithRouterAndProvider';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';

afterEach(cleanup);

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';
const VALID_EMAIL_TEST = 'teste@teste.gmail.com';
const VALIDE_PASSWORD_TEST = '1234567';
const MEALS_ROUTE = '/meals';
const MEAL_FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINK_FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MEAL_FETCH_CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINKS_FETCH_CATEGORY_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

// jest.spyOn(global, 'fetch');

// global.fetch.mockImplementation((url) => {
//   if (url === MEAL_FETCH_URL) {
//     return Promise.resolve({
//       json: () => Promise.resolve(meals),
//     });
//   }
//   if (url === DRINK_FETCH_URL) {
//     return Promise.resolve({
//       json: () => Promise.resolve(drinks),
//     });
//   }
//   if (url === MEAL_FETCH_CATEGORY_URL) {
//     return Promise.resolve({
//       json: () => Promise.resolve(mealCategories),
//     });
//   }
//   if (url === DRINKS_FETCH_CATEGORY_URL) {
//     return Promise.resolve({
//       json: () => Promise.resolve(drinkCategories),
//     });
//   }
// });

// FUNÇÃO PARA EFETUAR O LOGIN NA APLICAÇÃO
// const handleLogin = ({ getByTestId }) => {
//   // DEFINIR
//   const emailInput = getByTestId(EMAIL_INPUT);
//   const passwordInput = getByTestId(PASSWORD_INPUT);
//   const loginButton = getByTestId(LOGIN_BUTTON);

//   // AGIR
//   userEvent.type(emailInput, VALID_EMAIL_TEST);
//   userEvent.type(passwordInput, VALIDE_PASSWORD_TEST);
//   userEvent.click(loginButton);
// };

describe('Teste da página Meals.js', () => {
  describe('1 - Rota', () => {
    test.only('1.1 - Se o usuário é redirecionado para a rota "/meals" ao efetuar o login na aplicação.', async () => {
      jest.spyOn(global, 'fetch');

      global.fetch.mockImplementation((url) => {
        if (url === MEAL_FETCH_URL) {
          return Promise.resolve({
            json: () => Promise.resolve(meals),
          });
        }
        if (url === DRINK_FETCH_URL) {
          return Promise.resolve({
            json: () => Promise.resolve(drinks),
          });
        }
        if (url === MEAL_FETCH_CATEGORY_URL) {
          return Promise.resolve({
            json: () => Promise.resolve(mealCategories),
          });
        }
        if (url === DRINKS_FETCH_CATEGORY_URL) {
          return Promise.resolve({
            json: () => Promise.resolve(drinkCategories),
          });
        }
      });

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

  describe('2 - Navegação', () => {
    test('2.1 - Se o usuário é redirecionado para a rota "X" ao realizar determinada ação', () => {
      // const { history, getByTestId } = renderWithRouterAndProvider(<App />);
    });
  });

  describe('3 - Renderização', () => {
    test('3.1 - Se os elementos ??? estão presentes na tela', () => {

    });

    test('3.2 - Se os elementos ??? estão presentes na tela após determinada ação', () => {

    });
  });

  describe('4 - Funcionalidade', () => {
    test('4.1 - As regras de negócio em cada cenário possível na interação com o usuário ', () => {

    });
  });
});
