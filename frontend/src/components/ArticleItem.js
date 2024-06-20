import React from 'react';
import './ArticleItem.css';

function ArticleItem({ article }) {
  return (
    <div className="article-item">
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
  );
}

export default ArticleItem;
