// posts.js를 게시글을 CRUD하는 API들 (읽기/쓰기/수정/삭제)로 정의함. 

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => { // 글 전체 목록 조회
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    res.json(posts);
  } catch {
    res.status(500).json({ error: '서버 에러' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, author, authorId } = req.body;
    if (!title || !content || !author || !authorId) {
      return res.status(400).json({ error: '필수 정보 누락' });
    }
    const newPost = new Post({ title, content, author, authorId });
    const saved = await newPost.save();
    res.json(saved);
  } catch {
    res.status(400).json({ error: '작성 실패' });
  }
});

router.get('/:id', async (req, res) => {// 글 하나 조회 
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) return res.status(404).json({ error: '게시글 없음' });
    post.authorId = post.authorId.toString(); // 문자열 변환 추가
    res.json(post);
  } catch {
    res.status(404).json({ error: '게시글 없음' });
  }
});


router.put('/:id', async (req, res) => { // 글 수정
  try {
    const { title, content, userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: '게시글 없음' });
    if (post.authorId.toString() !== userId) {
      return res.status(403).json({ error: '작성자만 수정 가능' });
    }
    post.title = title;
    post.content = content;
    const updated = await post.save();
    res.json(updated);
  } catch {
    res.status(400).json({ error: '수정 실패' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: '게시글 없음' });
    if (post.authorId.toString() !== userId) {
      return res.status(403).json({ error: '작성자만 삭제 가능' });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: '삭제 완료' });
  } catch {
    res.status(400).json({ error: '삭제 실패' });
  }
});

module.exports = router;
