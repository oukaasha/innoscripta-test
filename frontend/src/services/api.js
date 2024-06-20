import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const fetchTopHeadlines = async () => {
  try {
    const response = await api.get('/top-headlines');
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return [];
  }
};

export const searchArticles = async (query) => {
  try {
    const response = await api.get('/search', { params: { q: query } });
    return response.data.articles;
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
};

export const filterArticles = async (filters) => {
  try {
    const response = await api.get('/filter', { params: filters });
    return response.data.articles;
  } catch (error) {
    console.error('Error filtering articles:', error);
    return [];
  }
};
