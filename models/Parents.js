var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
  var Parent = sequelize.define("Parent", {
    name: {
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

  Parent.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Parent.hook("beforeCreate", function(parent) {
    parent.password = bcrypt.hashSync(parent.password, bcrypt.genSaltSync(10), null);
  });

  return Parent;
};