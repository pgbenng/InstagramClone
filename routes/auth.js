const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post(
  "/signup",
  passport.authenticate("local-signup"),
  (req, res, next) => {
    if (req.user) {
      res.send(200);
    } else {
      res.send(400);
    }
  }
);

router.post(
  "/login",
  passport.authenticate("local-signin"),
  (req, res, next) => {
    if (req.user) {
      res.send(200);
    } else {
      res.send(400);
    }
  }
);

router.get("/current-user", (req, res, next) => {
  res.send(req.user);
}); 

module.exports = router;
