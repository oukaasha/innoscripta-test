import React, { useState, useContext } from 'react';
import { NewsContext } from '../context/NewsContext';
import './Filter.css';
import { SOURCES, CATEGORIES } from '../utils/constants';

function Filter({ onFilterChange }) {
  const { updateFilters } = useContext(NewsContext);
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');

  const handleFilterChange = () => {
    const filters = { category, source, date };
    updateFilters(filters);
    onFilterChange(filters);
  };

  return (
    <div className="filter">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Category</option>
        {CATEGORIES.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="">Source</option>
        {SOURCES.map((source) => (
          <option key={source.value} value={source.value}>
            {source.label}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
}

export default Filter;
