# MERN으로 CRUD 게시판 만들기

이 프로젝트는 MongoDB, Express, React, Node.js를 기반으로 만든 게시판입니다.  
생활코딩 강의과 주신 참고자료를 참고하여 로그인, 회원가입, 글 작성, 수정, 삭제 기능을 구현했습니다.

## 사용 기술

- **Frontend**: React + React Router + fetch
- **Backend**: Express + Mongoose
- **Database**: MongoDB


## 실행 방법

1. 백엔드 실행

cd backend
npm install
node index.js

2. 프론트엔드 실행

cd frontend
npm install
npm start

3. 환경 변수 설정 (.env)

backend/.env 파일을 생성하고 아래 내용을 입력 필요:
MONGO_URI=MongoDB_URI_입력
PORT=4000

.gitignore 예시:
node_modules/
.env

4. 기본 접속 경로

프론트엔드: http://localhost:3000  
백엔드 API: http://localhost:4000/api

