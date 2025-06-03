import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const res = await fetch('http://localhost:4000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        author: user.username,
        authorId: user._id
      })
    });
    if (res.ok) {
      navigate('/posts');
    } else {
      const data = await res.json();
      alert(data.error || '작성 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>글쓰기</h2>
      <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
      <br />
      <button type="submit">등록</button>
    </form>
  );
}

export default Create;
