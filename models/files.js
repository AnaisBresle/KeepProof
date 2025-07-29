const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../config/connection");

class Files extends Model {}

Files.init(
  {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "files",
  }
);

// Export Post model
module.exports = Files;
