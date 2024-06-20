import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPreferences.css';

const UserPreferences = () => {
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch available sources, categories, and authors from the API
    const fetchPreferences = async () => {
      try {
        const sourcesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/news/sources`);
        const categoriesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/news/categories`);
        const authorsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/news/authors`);
        
        setSources(sourcesResponse.data);
        setCategories(categoriesResponse.data);
        setAuthors(authorsResponse.data);

        // Fetch user's current preferences
        const userPreferencesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/user/preferences`, { withCredentials: true });
        const { preferredSources, preferredCategories, preferredAuthors } = userPreferencesResponse.data;
        setSelectedSources(preferredSources);
        setSelectedCategories(preferredCategories);
        setSelectedAuthors(preferredAuthors);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPreferences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/preferences`, {
        preferredSources: selectedSources,
        preferredCategories: selectedCategories,
        preferredAuthors: selectedAuthors,
      }, { withCredentials: true });

      if (response.status === 200) {
        setSuccess('Preferences updated successfully');
      }
    } catch (error) {
      setError('Error updating preferences. Please try again.');
    }
  };

  const handleSourceChange = (source) => {
    setSelectedSources((prev) => {
      if (prev.includes(source)) {
        return prev.filter((s) => s !== source);
      } else {
        return [...prev, source];
      }
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleAuthorChange = (author) => {
    setSelectedAuthors((prev) => {
      if (prev.includes(author)) {
        return prev.filter((a) => a !== author);
      } else {
        return [...prev, author];
      }
    });
  };

  return (
    <div className="user-preferences-container">
      <h2>User Preferences</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="preference-section">
          <h3>Preferred Sources</h3>
          {sources.map((source) => (
            <label key={source.id}>
              <input
                type="checkbox"
                checked={selectedSources.includes(source.id)}
                onChange={() => handleSourceChange(source.id)}
              />
              {source.name}
            </label>
          ))}
        </div>
        <div className="preference-section">
          <h3>Preferred Categories</h3>
          {categories.map((category) => (
            <label key={category.id}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              {category.name}
            </label>
          ))}
        </div>
        <div className="preference-section">
          <h3>Preferred Authors</h3>
          {authors.map((author) => (
            <label key={author.id}>
              <input
                type="checkbox"
                checked={selectedAuthors.includes(author.id)}
                onChange={() => handleAuthorChange(author.id)}
              />
              {author.name}
            </label>
          ))}
        </div>
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default UserPreferences;
