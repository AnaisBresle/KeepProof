const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../config/connection");

class UserTeams extends Model {}

UserTeams.init(
  {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Teams', key: 'id' }
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "UserTeams",
  }
);

// Export Post model
module.exports = UserTeams;
