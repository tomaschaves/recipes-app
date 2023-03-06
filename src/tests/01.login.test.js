import React from 'react';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Pages/Login';
import { renderWithRouterAndProvider } from './helpers/renderWithRouterAndProvider';

afterEach(cleanup);

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';
const validEmailTest = 'teste@teste.gmail.com';
const validPasswordTest = '1234567';

describe('Teste da página Login.js', () => {
  describe('1 - Rota', () => {
    test('1.1 - Se o componente <Login /> é renderizado na rota "/".', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR

      // ACESSAR
      const { history } = renderWithRouterAndProvider(<Login />);

      // DEFINIR
      const roteDefault = '/';
      const { pathname } = history.location;

      // AFERIR
      expect(pathname).toBe(roteDefault);
    });
  });

  describe('2 - Navegação', () => {
    test('2.1 - Se o usuário é redirecionado para a rota "/meals" ao clicar no botão "Login" após preencher corretamente os campos de "email" e "password"', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR

      // ACESSAR
      const { history, getByTestId } = renderWithRouterAndProvider(<Login />);

      // DEFINIR
      const emailInput = getByTestId(EMAIL_INPUT);
      const passwordInput = getByTestId(PASSWORD_INPUT);
      const loginButton = getByTestId(LOGIN_BUTTON);
      const mealsRoute = '/meals';

      // AGIR
      userEvent.type(emailInput, validEmailTest);
      userEvent.type(passwordInput, validPasswordTest);
      userEvent.click(loginButton);

      // ACESSAR
      const { pathname } = history.location;

      // AFERIR
      expect(pathname).toBe(mealsRoute);
    });
  });

  describe('3 - Renderização', () => {
    test('3.1 - Se os elementos campo de "EMAIL", "SENHA" e botão de "LOGIN" estão presentes na tela', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR

      // ACESSAR
      const { getByTestId } = renderWithRouterAndProvider(<Login />);
      const emailInput = getByTestId(EMAIL_INPUT);
      const passwordInput = getByTestId(PASSWORD_INPUT);
      const loginButton = getByTestId(LOGIN_BUTTON);

      // AFERIR
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe('4 - Funcionalidade', () => {
    test('4.1 - Botão de "Login" deve estar desabilitado caso o campo de e-mail e senha esteja vazio', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR

      // ACESSAR
      const { getByTestId } = renderWithRouterAndProvider(<Login />);
      const loginButton = getByTestId(LOGIN_BUTTON);

      // AFERIR
      expect(loginButton).toHaveAttribute('disabled');
      expect(loginButton.disabled).toBe(true);
    });

    test('4.2 - Botão de "Login" deve estar desabilitado caso o campo de e-mail esteja vazio e o campo de senha esteja preenchido', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR

      // ACESSAR
      const { getByTestId } = renderWithRouterAndProvider(<Login />);
      const passwordInput = getByTestId(PASSWORD_INPUT);
      const loginButton = getByTestId(LOGIN_BUTTON);

      // AGIR
      userEvent.type(passwordInput, validPasswordTest);

      // AFERIR
      expect(loginButton).toHaveAttribute('disabled');
      expect(loginButton.disabled).toBe(true);
    });

    test('4.3 - Botão de "Login" deve estar desabilitado caso o campo de "senha" esteja vazio e o campo de "e-mail" esteja preenchido', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR

      // ACESSAR
      const { getByTestId } = renderWithRouterAndProvider(<Login />);
      const emailInput = getByTestId(EMAIL_INPUT);
      const loginButton = getByTestId(LOGIN_BUTTON);

      // AGIR
      userEvent.type(emailInput, validEmailTest);

      // AFERIR
      expect(loginButton).toHaveAttribute('disabled');
      expect(loginButton.disabled).toBe(true);
    });

    test('4.4 - Botão de "Login" deve estar "habilitado" caso o campo de "senha" e "e-mail" estejam preenchidos corretamente', () => {
      // DAAAM - DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR

      // ACESSAR
      const { getByTestId } = renderWithRouterAndProvider(<Login />);
      const emailInput = getByTestId(EMAIL_INPUT);
      const passwordInput = getByTestId(PASSWORD_INPUT);

      // AGIR
      userEvent.type(emailInput, validEmailTest);
      userEvent.type(passwordInput, validPasswordTest);

      // ACESSAR
      const loginButton = getByTestId(LOGIN_BUTTON);

      // AFERIR
      expect(loginButton).not.toHaveAttribute('disabled');
      expect(loginButton.disabled).toBe(false);
    });
  });
});

// LOCAL STORAGE: falta testar a funcionalidade de salvar a informação do e-mail no local storage com a chave e o valor correto.
