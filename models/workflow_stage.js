const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../config/connection");

class WorkflowStage extends Model {}

WorkflowStage.init(
  {
   id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  workflow_id: {
    type: DataTypes.INTEGER, //use workflows.id
    allowNull: false,
  },
  stage_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role_required: {
    type: DataTypes.STRING, // different role required at different stage e.g. final sign-off can only be done by level 3 user
    allowNull: false,
  },
  escalation_role: {
    type: DataTypes.STRING,
    allowNull: true,
  }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "workflow_stage",
  }
);

// Export Post model
module.exports = WorkflowStage;
