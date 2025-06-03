import React, { useEffect, useState } from 'react';
import Article from '../components/Article';

function PostList({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleDelete = async (id) => {
    if (!user) return;
    const res = await fetch(`http://localhost:4000/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user._id })
    });
    if (res.ok) {
      setPosts(posts.filter((post) => post._id !== id));
    } else {
      const data = await res.json();
      alert(data.error || '삭제 실패');
    }
  };

  return (
    <div>
      <ul>
        {posts.length === 0 ? (
          <li>게시글이 없습니다.</li>
        ) : (
          posts.map((post) => (
            <Article key={post._id} post={post} user={user} onDelete={handleDelete} />
          ))
        )}
      </ul>
    </div>
  );
}

export default PostList;
