import React, { useEffect, useContext, useCallback } from 'react';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { NewsContext } from '../context/NewsContext';
import { fetchTopHeadlines, searchArticles, filterArticles } from '../services/api';
import './NewsFeed.css';

function NewsFeed() {
  const { articles, updateArticles, searchTerm, filters } = useContext(NewsContext);

  const memoizedUpdateArticles = useCallback(updateArticles, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const articlesData = await fetchTopHeadlines();
      memoizedUpdateArticles(articlesData);
    };

    fetchArticles();
  }, [memoizedUpdateArticles]);

  const handleSearch = async (term) => {
    const searchResults = await searchArticles(term);
    updateArticles(searchResults);
  };

  const handleFilterChange = async (filter) => {
    const filteredResults = await filterArticles(filter);
    updateArticles(filteredResults);
  };

  return (
    <main>
      <h2>News Feed</h2>
      <SearchBar onSearch={handleSearch} />
      <Filter onFilterChange={handleFilterChange} />
      <ArticleList articles={articles} />
    </main>
  );
}

export default NewsFeed;
