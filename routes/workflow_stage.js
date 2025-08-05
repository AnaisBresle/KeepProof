const app = require("express").Router();

// import the models
const { WorkflowStage } = require("../models/index");

// Same as workflow - MVP does not allow additional stages. 

// Get all workflow stages
app.get("/", async (req, res) => {
  try {
    const stages = await WorkflowStage.findAll();
    res.json(stages);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving workflow stages", details: error.message });
  }
});

// Get a specific workflow stage by ID
app.get("/:id", async (req, res) => {
  try {
    const stage = await WorkflowStage.findByPk(req.params.id);
    if (!stage) {
      return res.status(404).json({ error: "Workflow stage not found" });
    }
    res.json(stage);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving workflow stage", details: error.message });
  }
});



/// Add all stages for one specific workflow
module.exports = app;
