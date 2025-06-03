import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Update({ user }) {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!user || user._id !== data.authorId) {
          alert('작성자만 수정할 수 있습니다.');
          navigate('/posts');
          return;
        }
        setTitle(data.title);
        setContent(data.content);
      });
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, userId: user._id })
    });
    if (res.ok) {
      navigate('/posts');
    } else {
      const data = await res.json();
      alert(data.error || '수정 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>글 수정</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <br />
      <button type="submit">수정 완료</button>
    </form>
  );
}

export default Update;
