const express = require("express");
const router = express.Router();
const models = require("../models");

router.post('/likes', (req, res, next) => {
    const posttoLike = req.body.posttoLike;
    models.like
        .findOrCreate({
            where: {
                post_id: posttoLike,
                user_id: req.user.id
            }
        })
        .then (like => {
            res.send(201)
        });
  
});

router.post('/unlikes', (req, res, next)=> {
    const posttoUnLike = req.body.posttoUnLike;
    models.like
        .destroy({
            where: {
                post_id: posttoUnLike,
                user_id: req.user.id
            }
        })
        .then (unlike => {
            res.send(201)
        })
})

router.get('/isLiked', (req, res, next) => {
    const postIsLiked =  req.query.post_id;
    models.like
        .findOne({
            where: {
                post_id: postIsLiked
            }
        })
        .then (result => {
            if (result) {
                res.send(true)
            } else {
                res.send(false)
            }
        })
})

router.post('/likingcomment', (req, res, next) => {
    models.like.create({
        comment_id: req.body.comment_id
    })
    .then(result => {
        res.send(201)
    })
})

router.post('/unlikingcomment', (req, res, next) => {
    models.like.destroy({
        where:{
        comment_id: req.body.comment_id
    }})
    .then(result=> {
        res.send(201)
    })
})


module.exports = router;