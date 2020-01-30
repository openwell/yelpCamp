const camp = (sequelize, DataTypes) => {
  const Camp = sequelize.define(
    'Camp',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      author: { type: DataTypes.STRING, allowNull: false },
      comment: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  Camp.associate = function(models) {
    // associations can be defined here
  };
  return Camp;
};

export default camp;
