import React from 'react';
import '../styles/nav.css';

const Nav: React.FC = () => (
  <nav className="nav" aria-label="Main Navigation">
    <ul className="nav-list">
      <li className="nav-item">
        <a href="/" className="nav-link" tabIndex={1}>Home</a>
      </li>
      <li className="nav-item">
        <a href="/team" className="nav-link" tabIndex={2}>Our Team</a>
      </li>
      <li className="nav-item">
        <a href="/projects" className="nav-link" tabIndex={3}>Projects</a>
      </li>
      <li className="nav-item">
        <a href="/blog" className="nav-link" tabIndex={4}>Blog</a>
      </li>
    </ul>
    <form className="search-form" aria-label="Searchbar">
      <label htmlFor="searchbar" className="visually-hidden" tabIndex={5}>
        Search the site
      </label>
      <input
        type="search"
        id="searchbar"
        name="searchbar"
        placeholder="Input search terms"
        className="search-input"
        tabIndex={6}
        aria-label="Search the site"
      />
      <button
        type="submit"
        className="search-button"
        tabIndex={7}
        aria-label="Submit search"
      >
        Submit
      </button>
    </form>
  </nav>
);

export default Nav;