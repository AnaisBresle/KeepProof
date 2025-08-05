const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../config/connection");

class Teams extends Model {}

Teams.init(
  {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
   name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Teams",
  }
);



// Export Post model
module.exports = Teams;
