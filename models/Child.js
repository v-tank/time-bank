module.exports = function (sequelize, DataTypes) {
  var Child = sequelize.define("Child", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    }
  });

  Child.associate = function(models) {
    Child.belongsTo(models.Parent, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Child;
}





