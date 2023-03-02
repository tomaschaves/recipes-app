import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setDisabled] = useState(true);
  const history = useHistory();

  const checkSubmit = () => {
    const { email, password } = login;
    const minLength = 6;
    const checkEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
    const checkPassword = password.length >= minLength;
    setDisabled(!(checkEmail && checkPassword));
  };

  const handleLogin = ({ target }) => {
    const { name, value } = target;
    setLogin({
      ...login,
      [name]: value,
    });
    checkSubmit();
  };

  const handleSubmit = () => {
    const { email } = login;
    const emailObj = {
      email,
    };

    localStorage.setItem('user', JSON.stringify(emailObj));
    history.push('/meals');
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="text"
        name="email"
        placeholder="Usuário"
        onChange={ handleLogin }
      />
      <input
        data-testid="password-input"
        type="password"
        name="password"
        placeholder="Senha"
        onChange={ handleLogin }
      />
      <button
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleSubmit }
      >
        Login
      </button>
    </div>
  );
}
