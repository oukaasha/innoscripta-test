import React, { createContext, useState } from 'react';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const updateArticles = (newArticles) => {
    setArticles(newArticles);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <NewsContext.Provider value={{
      articles,
      filters,
      searchTerm,
      updateArticles,
      updateFilters,
      updateSearchTerm,
    }}>
      {children}
    </NewsContext.Provider>
  );
};
