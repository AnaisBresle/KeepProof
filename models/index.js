// import all models
const Users = require("./users");
const Roles = require("./roles");
const ApprovalDecisions = require("./approval_decisions");
const ApprovalRequests = require("./approval_requests");
const Workflows = require("./workflows");
const WorkflowStage = require("./workflow_stage");
const Files = require("./files");
const Teams = require("./teams");
const UserTeams = require("./userTeams");

// User and role tables link
Roles.hasMany(Users, {
  foreignKey: "role_id",
  onDelete: "SET NULL",
});

Users.belongsTo(Roles, {
  foreignKey: "role_id",
});

// User relationships wit other tables
Users.hasMany(ApprovalRequests, {
  foreignKey: "created_by",
  onDelete: "CASCADE",
});

ApprovalRequests.belongsTo(Users, {
  foreignKey: "created_by",
});

Users.hasMany(ApprovalDecisions, {
  foreignKey: "acted_by",
  onDelete: "CASCADE",
});

ApprovalDecisions.belongsTo(Users, {
  foreignKey: "acted_by",
  as: "User",
});

Users.hasMany(ApprovalDecisions, { 
  foreignKey: "acted_by" });

Users.hasMany(Files, {
  foreignKey: "uploaded_by",
  onDelete: "SET NULL",
});

Files.belongsTo(Users, {
  foreignKey: "uploaded_by",
});

// Many-to-Many Users <-> Teams relationship via UserTeams
Users.belongsToMany(Teams, {
  through: UserTeams,
  foreignKey: "user_id",
  otherKey: "team_id",
});
Teams.belongsToMany(Users, {
  through: UserTeams,
  foreignKey: "team_id",
  otherKey: "user_id",
});

UserTeams.belongsTo(Teams, { foreignKey: "team_id" });
UserTeams.belongsTo(Users, { foreignKey: "user_id" });

// Request and decisions relationships

ApprovalRequests.hasMany(ApprovalDecisions, {
  foreignKey: "request_id",
  onDelete: "CASCADE",
});

ApprovalDecisions.belongsTo(ApprovalRequests, {
  foreignKey: "request_id",
});

// linking files to request and decisions

ApprovalRequests.hasMany(Files, {
  foreignKey: "approval_request_id",
  onDelete: "CASCADE",
});

Files.belongsTo(ApprovalRequests, {
  foreignKey: "approval_request_id",
});

ApprovalDecisions.hasMany(Files, {
  foreignKey: "approval_decision_id",
  onDelete: "CASCADE",
});
Files.belongsTo(ApprovalDecisions, {
  foreignKey: "approval_decision_id",
});

/// workflows & stages relatioships

Workflows.hasMany(WorkflowStage, {
  foreignKey: "workflow_id",
  onDelete: "CASCADE",
});

WorkflowStage.belongsTo(Workflows, {
  foreignKey: "workflow_id",
});


module.exports = {
 Users,
 Roles,
 ApprovalDecisions,
 ApprovalRequests,
 Workflows,
 WorkflowStage,
 Files,
 Teams,
 UserTeams,
 
};
