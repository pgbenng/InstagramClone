'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    user_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    post_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Post,{foreignKey: 'post_id'})
    Comment.belongsTo(models.Comment,{foreignKey: 'comment_id'})
    Comment.belongsTo(models.User, {foreignKey: 'user_id'})
    Comment.hasMany(models.like, {foreignKey: 'comment_id'})
  };
  return Comment;
};