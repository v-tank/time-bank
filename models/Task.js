module.exports = function (sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    task_weight: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false
    }, 
    productive_time: {
      type: DataTypes.INTEGER
    },
    banked_time: {
      type: DataTypes.INTEGER
    }
  });

  Task.associate = function (models) {
    Task.belongsTo(models.Child, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
}