import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, search = false }) {
  const [isSearchEnabled, setSearchEnable] = useState(false);
  const history = useHistory();
  return (
    <div>
      <button
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
        src={ profileIcon }
      >
        <img
          src={ profileIcon }
          alt="Profile"
        />
      </button>
      {search
      && (
        <button
          data-testid="profile-top-btn"
          src={ searchIcon }
          onClick={ () => setSearchEnable(!isSearchEnabled) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Profile"
          />
        </button>
      )}
      {isSearchEnabled && <SearchBar />}
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;
