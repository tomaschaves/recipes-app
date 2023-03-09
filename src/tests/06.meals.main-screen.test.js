import React from 'react';
import { cleanup, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndProvider } from './helpers/renderWithRouterAndProvider';

afterEach(cleanup);

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';
const validEmailTest = 'teste@teste.gmail.com';
const validPasswordTest = '1234567';
const mealsRoute = '/meals';

// FUNÇÃO PARA EFETUAR O LOGIN NA APLICAÇÃO
// const handleLogin = ({ getByTestId }) => {
//   // DEFINIR
//   const emailInput = getByTestId(EMAIL_INPUT);
//   const passwordInput = getByTestId(PASSWORD_INPUT);
//   const loginButton = getByTestId(LOGIN_BUTTON);

//   // AGIR
//   userEvent.type(emailInput, validEmailTest);
//   userEvent.type(passwordInput, validPasswordTest);
//   userEvent.click(loginButton);
// };

describe('Teste da página Meals.js', () => {
  describe('1 - Rota', () => {
    test.only('1.1 - Se o usuário é redirecionado para a rota "/meals" ao efetuar o login na aplicação.', async () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
      const { history, getByTestId, getByText } = renderWithRouterAndProvider(<App />);

      // ACESSAR
      const emailInput = getByTestId(EMAIL_INPUT);
      const passwordInput = getByTestId(PASSWORD_INPUT);
      const loginButton = getByTestId(LOGIN_BUTTON);

      // AGIR
      userEvent.type(emailInput, validEmailTest);
      userEvent.type(passwordInput, validPasswordTest);
      userEvent.click(loginButton);

      await waitForElementToBeRemoved(loginButton, { timeout: 3000 });
      const { pathname } = history.location;
      expect(pathname).toBe(mealsRoute);
      // console.log(pathname);

      // expect(emailInput).not.toBeInTheDocument();
      // // await wait(1000);

      await waitFor(() => {
        const pageTitle = getByTestId('page-title');
        const title = getByText('Meals');
        // AFERIR
        expect(title).toBeInTheDocument();
        expect(pageTitle).toBeInTheDocument();
      });
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
