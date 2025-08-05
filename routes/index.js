const app= require("express").Router();

const approvalDecisionsRoutes = require("./approval_decisions");
const approvalRequestsRoutes = require("./approval_requests");

const filesRoutes = require("./files");
const rolesRoutes = require("./roles");
const teamsRoutes = require("./teams");
const usersRoutes = require("./users");
const userTeamsRoutes = require("./userTeams");
const workflowStageRoutes = require("./workflow_stage");
const workflowsRoutes = require("./workflows");

// create a default route for /api
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use("/approval_decisions", approvalDecisionsRoutes);
app.use("/approval_requests", approvalRequestsRoutes);

app.use("/files", filesRoutes);
app.use("/roles", rolesRoutes);
app.use("/teams", teamsRoutes);
app.use("/users", usersRoutes);
app.use("/userTeams", userTeamsRoutes);
app.use("/workflow_stage", workflowStageRoutes);
app.use("/workflows", workflowsRoutes);



module.exports = app;
