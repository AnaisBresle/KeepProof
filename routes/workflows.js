const app = require("express").Router();

// import the models
const { Workflows } = require("../models/index");

// For launch we are presetting some workflow and not allowing updated or creationg of new workflow. 
// in later development - we will allow user to customise their workflow and create new ones. 

// Get all workflows
app.get("/", async (req, res) => {
  try {
    const workflows = await Workflows.findAll();
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving workflows", details: error.message });
  }
});

// Get one workflow by ID
app.get("/:id", async (req, res) => {
  try {
    const workflow = await Workflows.findByPk(req.params.id);
    if (!workflow) {
      return res.status(404).json({ error: "Workflow not found" });
    }
    res.json(workflow);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving workflow", details: error.message });
  }
});



module.exports = app;
