const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/follow", (req, res, next) => {
  const usernametofollow = req.body.usernametofollow;

  models.User.findOne({
    where: { username: usernametofollow }
  }).then(user => {
    console.log(user.get());
    models.InfluencerFollower.findOrCreate({
      where: {
        follower_id: req.user.id,
        influencer_id: user.get().id
      }
    }).then(influencerfollower => {
      console.log(influencerfollower);
      res.send(201);
    });
  });
});

router.post("/unfollow", (req, res, next) => {
  const usernametounfollow = req.body.usernametounfollow;
  models.User.findOne({
    where: { username: usernametounfollow }
  }).then(user => {
    console.log(user.get());
    models.InfluencerFollower.destroy({
      where: {
        follower_id: req.user.id,
        influencer_id: user.get().id
      }
    }).then(after => {
      res.send(201);
    });
  });
});

router.get("/followers", (req, res, next) => {
  const influencerUsername = req.query.influencerUsername;

  models.User.findOne({
    include: [
      {
        model: models.User,
        as: "followers"
      }
    ],
    where: {
      username: influencerUsername
    }
  }).then(followers => {
    res.send(followers);
  });
});

router.get("/following", (req, res, next) => {
  const followingUsername = req.query.followingUsername;
  models.User.findOne({
    include: [
      {
        model: models.User,
        as: "influencers"
      }
    ],
    where: {
      username: followingUsername
    }
  }).then(following => {
    res.send(following);
  });
});

router.get("/isFollowing", (req, res, next) => {
  const influencerUsername = req.query.influencerUsername;
  models.User.findOne({
    where: {
      username: influencerUsername
    }
  }).then(user => {
    models.InfluencerFollower.findOne({
      where: {
        influencer_id: user.get().id,
        follower_id: req.user.id
      }
    }).then(followerinfluencerObject => {
      if (followerinfluencerObject) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });
});

router.post("/bio", (req, res, next) => {
  const bio = req.body.bio;
  console.log("this is the bio", bio);
  models.User.update(
    {
      bio: bio
    },
    {
      where: {
        id: req.user.id
      }
    }
  ).then(result => {
    console.log("this is result", result);
    res.send(201);
  });
});

router.get("/bio", (req, res, next) => {
  const username = req.query.username
  models.User.findOne({
    where: {
      username: username
    }
  })
  .then(result => {
    res.send(result.get().bio)
  })
})

module.exports = router;
