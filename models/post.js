'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    user_id: DataTypes.INTEGER,
    imageurl: DataTypes.TEXT,
    caption: DataTypes.TEXT,
    timeposted: DataTypes.TEXT
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User,{foreignKey: 'user_id'})
    Post.hasMany(models.Comment,{foreignKey: 'post_id'})

  };
  return Post;
};