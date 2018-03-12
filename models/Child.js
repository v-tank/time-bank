module.exports = function (sequelize, DataTypes) {
  
  // Creates a Child model with a name and association to a ParentID
  var Child = sequelize.define("Child", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Child.associate = function(models) {
    Child.belongsTo(models.Parent, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Child; // Returns the Child model
}





