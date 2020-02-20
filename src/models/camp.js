const camp = (sequelize, DataTypes) => {
  const Camp = sequelize.define(
    'Camp',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      author_id: { type: DataTypes.UUID, allowNull: false },
    },
    {}
  );
  Camp.associate = models => {
    // associations can be defined here
    Camp.belongsTo(models.User, {
      foreignKey: 'author_id',
      onDelete: 'CASCADE',
    });
  };
  return Camp;
};

module.exports = camp;
// it when the query is made that when u get comment by id
// comment: { type: DataTypes.STRING, allowNull: false },
// hasOne hasMany BelongsTo BelongsToMany
