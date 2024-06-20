import React, { useState, useContext } from 'react';
import { NewsContext } from '../context/NewsContext';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { updateSearchTerm } = useContext(NewsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSearchTerm(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
