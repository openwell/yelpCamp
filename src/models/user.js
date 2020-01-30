const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
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
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

export default user;
