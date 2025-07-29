// import all models
const Users = require("./users");
const Roles = require("./roles");
const ApprovalDecisions = require("./approval_decisions");
const ApprovalRequests = require("./approval_requests");
const Workflow = require("./workflow");
const WorkflowStage = require("./workflow_stage");
const Files = require("./files");


Roles.hasMany(Users, {
  foreignKey: "role_id",
  onDelete: "SET NULL",
});

Users.belongsTo(Roles, {
  foreignKey: "role_id",
});


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





module.exports = {
 Users,
 Roles,
 ApprovalDecisions,
 ApprovalRequests,
 Workflow,
 WorkflowStage,
 Files
};
