import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function PostDetail({ user }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  const isAuthor = user && post && user._id === String(post.authorId);


  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
      <p>작성일: {new Date(post.createdAt).toLocaleString()}</p>
      <br />
      <Link to="/posts">목록으로</Link>
      {isAuthor && (
        <>
          {" | "}
          <Link to={`/update/${post._id}`}>수정</Link>
          {" | "}
          <a
            href="/"
            onClick={async (e) => {
              e.preventDefault();
              const ok = window.confirm("정말 삭제하시겠습니까?");
              if (!ok) return;
              const res = await fetch(`http://localhost:4000/api/posts/${post._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id })
              });
              if (res.ok) {
                navigate('/posts');
              } else {
                const data = await res.json();
                alert(data.error || '삭제 실패');
              }
            }}
          >
            삭제
          </a>
        </>
      )}
    </div>
  );
}

export default PostDetail;
