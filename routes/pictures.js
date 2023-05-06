const express = require("express");
const router = express.Router();
const models = require("../models");
const multer = require('multer');
const upload = multer({ dest: '/tmp/'});
const fs = require('fs');

router.get("/all", function(req, res, next) {
  const photos = [
    "https://cdn-images-1.medium.com/max/1600/1*mONNI1lG9VuiqovpnYqicA.jpeg",
    "https://i.chzbgr.com/full/9355733248/h06DD7D5A/"
  ];
  res.send(200, JSON.stringify(photos));
});

router.get("/photos", function(req, res, next) {
  models.Post.findAll({
    where: {
      user_id: req.user.id
    }
  }).then(postObjects => {
    console.log(postObjects);
    res.send(postObjects);
  });
});

router.get("/userphotos", function(req, res, next){
  models.Post.findAll({
    include: [{
      model: models.User,
      where: {
        username: req.query.username
      }
    }]
  }).then(postObjects => {
    console.log(postObjects);
    res.send(postObjects)
  })
})

router.post('/upload', upload.single('file'), function(req, res, next){
  const public_folder = 'public'
  const file_path = `/saved_pictures/${req.file.filename}`;
  const full_file_path = public_folder + file_path;

  console.log(req.body);


  fs.rename(req.file.path, full_file_path, (err) => {
    if (err) {
      console.log(err)
      res.send(500);
    } else {
      models.Post.create({
        user_id: req.user.id,
        imageurl: file_path,
        caption: req.body.caption
        
        //INSERT INTO Post (user_id, imageurl)
      })
      .then(pictureCreated => {
        res.send(pictureCreated.get())
      })
      .catch((err) => {
        console.log(err)
      })
    }
  })
})



router.get("*", function(req, res, next) {
  return res.render("index");
});

module.exports = router;
