// create a new router
const app = require("express").Router();

// import the models
const { Roles, Users } = require("../models/index");


// Create/upload a new file
router.post("/", async (req, res) => {
  try {
    const { name, description, approval_request_id, approval_decision_id, uploaded_by } = req.body;
    const newFile = await Files.create({ 
      name,
      description,
      approval_request_id,
      approval_decision_id,
      uploaded_by,
      uploaded_at: new Date(),
    });
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ error: "Error uploading new file", details: error.message });
  }
});

// Get all files
router.get("/", async (req, res) => {
  try {
    const files = await Files.findAll();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving files", details: error.message });
  }
});

// Get one file by ID
router.get("/:id", async (req, res) => {
  try {
    const file = await Files.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving file", details: error.message });
  }
});

////To ADD getting all files linked to a request - including those link to a decision. 

// Update a file by ID - Not for MVP


// Delete a file by ID
router.delete("/:id", async (req, res) => {
  try {
    await Files.destroy({ where: { id: req.params.id } });
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting file", details: error.message });
  }
});




module.exports = router;
