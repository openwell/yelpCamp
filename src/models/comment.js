const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      text: { type: DataTypes.STRING, allowNull: false },
      author: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};

export default comment;
