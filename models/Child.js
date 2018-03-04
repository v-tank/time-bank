module.exports = function (sequelize, DataTypes) {
  var Child = sequelize.define("Child", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    banked_time_task_1: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: false
      }
    },
    banked_time_task_2: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: false
      }
    },
    banked_time_task_3: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: false
      }
    },
    banked_time_task_4: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: false
      }
    },
    banked_time_task_5: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: false
      }
    },
    banked_time_task_6: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: false
      }
    },
    total_banked_time: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: false
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





