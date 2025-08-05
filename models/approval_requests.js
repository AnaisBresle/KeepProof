const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../config/connection");

class ApprovalRequests extends Model {}

ApprovalRequests.init(
  {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING, // e.g. "budget", "purchase", "feedback"
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING, // e.g. "pending", "approved", "rejected", "escalated", "returned"
    allowNull: false,
    defaultValue: "pending",
  },
  created_by: {
    type: DataTypes.INTEGER, // will use user_id
    allowNull: false,
  },

updated_by: {
    type: DataTypes.INTEGER, // will use user_id
    allowNull: true,
  },

  current_approver: {
    type: DataTypes.INTEGER, // will use user_id
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "approval_requests",
  }
);

// Export Post model
module.exports = ApprovalRequests;
