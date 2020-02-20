const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      text: { type: DataTypes.STRING, allowNull: false },
      author_id: { type: DataTypes.UUID, allowNull: false },
      camp_id: { type: DataTypes.UUID, allowNull: false },
    },
    {}
  );
  Comment.associate = models => {
    // associations can be defined here
    Comment.belongsTo(models.User, {
      foreignKey: 'author_id',
      onDelete: 'CASCADE',
    });
    Comment.belongsTo(models.Camp, {
      foreignKey: 'camp_id',
      onDelete: 'CASCADE',
    });
  };
  return Comment;
};

module.exports = comment;
