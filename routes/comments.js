const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/comments", (req, res, next) => {
  const postToComment = req.body.post_id;
  const comment = req.body.comment;

  models.Comment.create({
    user_id: 2,
    comment: comment,
    post_id: postToComment
  }).then(result => {
      res.send(201)
  });
});


router.get("/getcomments", (req, res, next) => {
    const commentInPost = req.query.post_id
    models.Comment.findAll({
        where: {
            post_id: commentInPost
        },
        include:{
            model: models.like
        }
    })
    .then(result => {
        res.send(result)
    })
})

module.exports = router;
