import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const getEmail = () => JSON.parse(localStorage.getItem('user')).email;

  return (
    <div>
      <Header title="Profile" />
      <div>
        <p data-testid="profile-email">{ getEmail() }</p>
      </div>
      <div>
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button type="button" data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer />
    </div>
  );
}
