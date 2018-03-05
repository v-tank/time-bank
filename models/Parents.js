var bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  var Parent = sequelize.define("Parent", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    weight_task_1: {
      type: DataTypes.DECIMAL(3, 2),

    },
    weight_task_2: {
      type: DataTypes.DECIMAL(3, 2),

    },
    weight_task_3: {
      type: DataTypes.DECIMAL(3, 2),

    },
    weight_task_4: {
      type: DataTypes.DECIMAL(3, 2),

    },
    weight_task_5: {
      type: DataTypes.DECIMAL(3, 2),

    },
    weight_task_6: {
      type: DataTypes.DECIMAL(3, 2),

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    }
  });

  return Parent;

  // Parent.method.generateHash = function(password) {
  //   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  // };

  // Parent.method.validPassword = function(password) {
  //   return bcrypt.compareSync(password, this.local.password);
  // };
}