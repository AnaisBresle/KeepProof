const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../config/connection");

class Roles extends Model {}

Roles.init(
  {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "roles",
  }
);


// Export Post model
module.exports = Roles;