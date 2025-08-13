// create a new router
const app = require("express").Router();

// import the models
const { ApprovalDecisions } = require("../models/index");

// Route to add a new decision
app.post("/", async (req, res) => {
  try {
    console.log
    const { request_id, acted_by, action, comment= null, from_role = null, to_role = null} = req.body;
    const newDecision = await ApprovalDecisions.create({ request_id, acted_by, action, comment, from_role, to_role, action_at: new Date() });

    res.status(201).json(newDecision);
    
  } catch (error) {
    res.status(500).json({ error: "Error submitting the decision", details: error.message });
  }
});

// Route to get all approval decisions
app.get("/", async (req, res) => {
  try {
    const decisions = await ApprovalDecisions.findAll();

    res.json(decisions);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving decisions", error });
  }
});


// Route to get one specific approval decision
app.get("/:id", async (req, res) => {
  try {
    const decision = await ApprovalDecisions.findByPk(req.params.id);
    
  if (!decision) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(decision);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the record", details: error.message });
  }
});



// Route to update a decision
app.put("/:id", async (req, res) => {
  try {
    const { action, comment, from_role, to_role, acted_by } = req.body;
    const [updateDecision] = await ApprovalDecisions.update(
      { action, comment, from_role, to_role, acted_by, action_at: new Date() },
      { where: { id: req.params.id } }
    );
 if (updateDecision === 0) {
      return res.status(404).json({ error: "Decision not found or no changes made" });
    }
    const updatedRecord = await ApprovalDecisions.findByPk(req.params.id);
    res.json(updatedRecord);


  } catch (error) {
    res.status(500).json({ error: "Error updating record", details: error.message });
  }
});
// Route to delete a request
app.delete("/:id", async (req, res) => {
  try {
    const deleteDecision = await ApprovalDecisions.destroy({ where: { id: req.params.id } });
    res.json(deleteDecision);
  } catch (error) {
    res.status(500).json({ error: "Error deleting the record" });
  }
});

// export the router
module.exports = app;
