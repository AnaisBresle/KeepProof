// import all models
const Users = require("./users");
const Roles = require("./roles");
const ApprovalDecisions = require("./approval_decisions");
const ApprovalRequests = require("./approval_requests");
const Workflow = require("./workflow");
const WorkflowStage = require("./workflow_stage");
const Files = require("./files");

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
});

Users.hasMany(File, {
  foreignKey: "uploaded_by",
  onDelete: "SET NULL",
});

File.belongsTo(Users, {
  foreignKey: "uploaded_by",
});

// Request and decisions relationships

ApprovalRequests.hasMany(ApprovalDecisions, {
  foreignKey: "request_id",
  onDelete: "CASCADE",
});

ApprovalDecisions.belongsTo(ApprovalRequests, {
  foreignKey: "request_id",
});

// linking files to request and decisions

ApprovalRequests.hasMany(File, {
  foreignKey: "approval_request_id",
  onDelete: "CASCADE",
});

File.belongsTo(ApprovalRequests, {
  foreignKey: "approval_request_id",
});

ApprovalDecisions.hasMany(File, {
  foreignKey: "approval_decision_id",
  onDelete: "CASCADE",
});
File.belongsTo(ApprovalDecisions, {
  foreignKey: "approval_decision_id",
});

/// workflows & stages relatioships

Workflow.hasMany(WorkflowStage, {
  foreignKey: "workflow_id",
  onDelete: "CASCADE",
});

WorkflowStage.belongsTo(Workflow, {
  foreignKey: "workflow_id",
});


module.exports = {
 Users,
 Roles,
 ApprovalDecisions,
 ApprovalRequests,
 Workflow,
 WorkflowStage,
 Files
};
