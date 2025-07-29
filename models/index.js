// import all models
const Users = require("./users");
const Roles = require("./roles");
const ApprovalDecisions = require("./approval_decisions");
const ApprovalRequests = require("./approval_requests");
const Workflow = require("./workflow");
const WorkflowStage = require("./workflow_stage");
const Files = require("./files");



Post.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Category.hasMany(Post, {
  foreignKey: "categoryId",
  as: "posts",
});

User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "userId",
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
