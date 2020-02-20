// eslint-disable-next-line max-lines-per-function
const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your Username',
        },
        unique: true,
      },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Camp, {
      foreignKey: 'author_id',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'author_id',
      onDelete: 'CASCADE',
    });
  };
  return User;
};

module.exports = user;
// hasOne hasMany BelongsTo BelongsToMany
