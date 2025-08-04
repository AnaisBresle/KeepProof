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
  },

  approval_decision_id: {
  type: DataTypes.INTEGER,
  allowNull: true,  // allow updload of new/updated file on approval - but can be null as not all decision require a file. 
},
 approval_request_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Files can be linked directly to requests


  },
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
