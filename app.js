const express = require('express');
const app = express();
const port = 3001;
const postsRouter = require('./routes/posts.js')
const commentsRouter = require('./routes/comments.js')

const connect = require("./schemas")
connect();

app.use(express.json());

app.use("/api", postsRouter, commentsRouter);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});