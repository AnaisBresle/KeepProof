const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../config/connection");

class ApprovalDecisions extends Model {}

ApprovalDecisions.init(
  {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  request_id: {
    type: DataTypes.INTEGER, // use approval_requests.id
    allowNull: false,
  },
  acted_by: {
    type: DataTypes.INTEGER, // use users.id
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING, // e.g. "approve", "reject", "escalate", "return"
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  action_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  from_role: { // role of the user taking or responsible to sign-off at this stage
    type: DataTypes.STRING,
    allowNull: true,
  },
  to_role: { // role of the user who is next on the approval workflow (if any or if escalated)
    type: DataTypes.STRING,
    allowNull: true,
  }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "approval_decisions",
  }
);

// Export Post model
module.exports = ApprovalDecisions;
