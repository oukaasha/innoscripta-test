export const newsReducer = (state, action) => {
    switch (action.type) {
      case 'SET_ARTICLES':
        return { ...state, articles: action.payload };
      case 'SET_FILTERS':
        return { ...state, filters: action.payload };
      case 'SET_SEARCH_TERM':
        return { ...state, searchTerm: action.payload };
      default:
        return state;
    }
  };
  