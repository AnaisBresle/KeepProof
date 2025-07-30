// create a new router
const app = require("express").Router();

// import the models
const { ApprovalRequests } = require("../models/index");

// Route to add a new post
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
    const UpdateRequest = await ApprovalRequests.update(
      { title, type, description, updated_by, updated_at: new Date() },
      { where: { id: req.params.id } }
    );
    res.json(UpdateRequest);
  } catch (error) {
    res.status(500).json({ error: "Error updating request" });
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
