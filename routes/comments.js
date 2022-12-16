const express = require("express")
const router = express.Router();
const Comment = require("../schemas/comment.js")
const Post = require("../schemas/post.js")

//댓글 생성 /comments/:_postId
router.post("/comments/:_postId", async (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    const post = await Post.findOne({_id : ObjectId(req.params._postId)})
    const poster_user = post.user
    const poster_pw = post.password
    
    const {content} = req.body;
    
    await Comment.create({ user: poster_user, password: poster_pw, content: content });

  res.json({"message": "댓글을 작성하였습니다."});

});


//댓글 목록 조회 /comments/:_postId
router.get("/comments/:_postId", async (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    const post = await Post.findOne({_id : ObjectId(req.params._postId)})
    const poster_user = post.user
    const comments = await Comment.find({user: poster_user});

    const results = comments.map((comment) => {
        return{
            "commentId": comment._id,
            "user": comment.user,
            "content": comment.content
        };

    });
    

    res.json({"data": results});
});


//댓글 수정 /comments/:_commentId
router.put("/comments/:_commentId", async (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    const {password} = req.body;
    const {content} = req.body;
    
    const existsComments = await Comment.find({_id : ObjectId(req.params._commentId)})
    if (existsComments.length) {
      await Comment.updateOne({password: password}, { $set: {content} });
    }
  
    res.json({"message": "댓글을 수정하였습니다."});
  })

//댓글 삭제 /comments/:_commentId

router.delete("/comments/:_commentId", async (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    const result = await Comment.deleteOne({_id : ObjectId(req.params._commentId)})
    if(result.deletedCount == 0){
        res.status(402).json({
            success : false,
            message : "일치하는 게시물이 존재하지 않습니다"
        });
    }else{
        res.json({ "message": "댓글을 삭제하였습니다."});
    }
  });




module.exports = router;