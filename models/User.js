'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Post, {foreignKey: 'user_id'})
        User.hasMany(models.like, {foreignKey: 'user_id'})
        User.belongsToMany(User, {as: "followers", through: "InfluencerFollower", foreignKey: 'influencer_id', otherKey: 'follower_id'})
        User.belongsToMany(User, {as: "influencers", through: "InfluencerFollower", foreignKey: 'follower_id', otherKey: 'influencer_id'})

      }
    }
  });
  return User;
};