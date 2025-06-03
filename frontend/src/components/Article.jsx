import React from 'react';
import { useNavigate } from 'react-router-dom';

function Article({ post }) {
  const navigate = useNavigate();

  return (
    <li>
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/posts/${post._id}`);
        }}
      >
        {post.title}
      </a>
    </li>
  );
}

export default Article;
