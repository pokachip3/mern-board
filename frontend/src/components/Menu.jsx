import React from 'react';
import { Link } from 'react-router-dom';

function Menu({ user, onLogout }) {
  return (
    <nav>
      <Link to="/">홈</Link> |{" "}
      <Link to="/posts">게시판</Link> |{" "}
      {user ? (
        <>
          <Link to="/create">글쓰기</Link> |{" "}
          <a href="/" onClick={(e) => { e.preventDefault(); onLogout(); }}>로그아웃</a>
        </>
      ) : (
        <>
          <Link to="/login">로그인</Link> |{" "}
          <Link to="/signup">회원가입</Link>
        </>
      )}
    </nav>
  );
}

export default Menu;
