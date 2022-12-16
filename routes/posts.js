const express = require("express")
const router = express.Router();
const Post = require("../schemas/post.js")

//게시글 작성 POST /posts

router.post("/posts", async (req, res) => {
    const {user} = req.body;
    const {password} = req.body;
    const {title} = req.body;
    const {content} = req.body;

    const existsUser = await Post.find({ user: user });
    if (existsUser.length) {
        return res.json({ success: false, errorMessage: "이미 존재하는 user입니다." });
    }


  await Post.create({ user: user, password: password, title: title, content: content });

  res.json({"message": "게시글을 생성하였습니다."});

});
//게시글 조회 GET /posts

router.get("/posts", async (req, res) => {
    const posts = await Post.find();

    const results = posts.map((post) => {
        return{
            "postId": post._id,
            "user": post.user,
            "title": post.title,
            "content": post.content
        };

    });
    

    res.json({"data": results});
});

//게시글 상세조회 GET  /posts/:_postId

router.get("/posts/:_postId", async (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    const post = await Post.find({_id : ObjectId(req.params._postId)})
    

    const results = post.map((item) => {

             return{
            "postId": item._id,
            "user": item.user,
            "title": item.title,
            "content": item.content
        }

    });
    

    res.json({"data": results});
});


//게시글 수정 PUT  /posts/:_postId

router.put("/posts/:_postId", async (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    const {password} = req.body;
    const {title} = req.body;
    const {content} = req.body;
    
    const existsPosts = await Post.find({_id : ObjectId(req.params._postId)})
    if (existsPosts.length) {
      await Post.updateOne({password: password}, { $set: {title} }, { $set: {content} });
    }
  
    res.json({"message": "게시글을 수정하였습니다."});
  })

//게시글 삭제 DELETE /posts/:_postId
router.delete("/posts/:_postId", async (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    const result = await Post.deleteOne({_id : ObjectId(req.params._postId)})
    if(result.deletedCount == 0){
        res.status(402).json({
            success : false,
            message : "일치하는 게시물이 존재하지 않습니다"
        });
    }else{
        res.json({ "message": "게시글을 삭제하였습니다."});
    }
  });

module.exports = router;