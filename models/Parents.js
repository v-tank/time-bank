var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {

  // Creates a Parent model with a username and password
  var Parent = sequelize.define("Parent", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    }
  });

  // Creates a one-to-many relationship between Child and Parent
  Parent.associate = function (models) {
    Parent.hasMany(models.Child);
  };

  // Checks whether the Parent's password is valid
  Parent.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Parent.hook("beforeCreate", function(parent) {
    parent.password = bcrypt.hashSync(parent.password, bcrypt.genSaltSync(10), null);
  });

  return Parent; // Returns the Parent model
};