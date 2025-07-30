const router = require("express").Router();

const approvalDecisionsRoutes = require("./approval_decisions");
const approvalRequestsRoutes = require("./approval_requests");

const filesRoutes = require("./files");
const rolesRoutes = require("./roles");
const usersRoutes = require("./users");

const workflowStageRoutes = require("./workflow_stage");
const workflowsRoutes = require("./workflows");

// create a default route for /api
router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

router.use("/api/approval_decisions", approvalDecisionsRoutes);
router.use("/api/approval_requests", approvalRequestsRoutes);

router.use("/api/files", filesRoutes);
router.use("/api/roles", rolesRoutes);
router.use("/api/users", usersRoutes);

router.use("/api/workflow_stage", workflowStageRoutes);
router.use("/api/workflows", workflowsRoutes);



module.exports = router;
