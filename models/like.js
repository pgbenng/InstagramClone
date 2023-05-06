'use strict';
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER
  }, {});
  like.associate = function(models) {
    // associations can be defined here
    like.belongsTo(models.User,{foreignKey: 'user_id'})
    like.belongsTo(models.Comment,{foreignKey: 'comment_id'})
    like.belongsTo(models.Post, {foreignKey: 'post_id'})
  };
  return like;
};