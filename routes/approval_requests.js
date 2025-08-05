// create a new router
const app = require("express").Router();

// import the models
const { ApprovalRequests, ApprovalDecisions } = require("../models/index");

// Route to add a new request
app.post("/", async (req, res) => {
  try {
    const { title, type, description, created_by } = req.body;
    const newRequest = await ApprovalRequests.create({ title, type, description, created_by, created_at: new Date() });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: "Error adding new Request" });
  }
});

// Route to get all approval requests
app.get("/", async (req, res) => {
  try {
    const requests = await ApprovalRequests.findAll();

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving requests", error });
  }
});


// Route to get one specific approval requests
app.get("/:id", async (req, res) => {
  try {
    const request = await ApprovalRequests.findByPk(req.params.id);
    res.json(request);
  if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving request", details: error.message });
  }
});

// Route to update a request
app.put("/:id", async (req, res) => {
  try {
    const { title, type, description, updated_by } = req.body;
    const [UpdateRequest] = await ApprovalRequests.update(
      { title, type, description, updated_by, updated_at: new Date() },
      { where: { id: req.params.id } }
    );
     if (UpdateRequest === 0) {
      return res.status(404).json({ error: "Request not found or no changes made" });
    }

    res.json({ message: "Request updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating request", details: error.message });
  }
});

// Route to retireve all decisions for one specific request
app.get("/:request_id/approval_decisions", async (req, res) => {
  try {
    const decisions = await ApprovalDecisions.findAll({
      where: { request_id: req.params.request_id },
      order: [['action_at', 'DESC']],  // Order by date of action
    });
    res.json(decisions);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving decisions for this request", details: error.message });
  }
});


// Route to delete a request
app.delete("/:id", async (req, res) => {
  try {
    const deleteRequest = await ApprovalRequests.destroy({ where: { id: req.params.id } });
    res.json(deleteRequest);
  } catch (error) {
    res.status(500).json({ error: "Error deleting request" });
  }
});

// export the router
module.exports = app;
