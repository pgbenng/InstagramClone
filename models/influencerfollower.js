'use strict';
module.exports = (sequelize, DataTypes) => {
  const InfluencerFollower = sequelize.define('InfluencerFollower', {
    follower_id: DataTypes.INTEGER,
    influencer_id: DataTypes.INTEGER
  }, {});
  InfluencerFollower.associate = function(models) {
    // associations can be defined here
  };
  return InfluencerFollower;
};