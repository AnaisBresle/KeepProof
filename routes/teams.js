// create a new router
const app = require("express").Router();

// import the models
const { Teams } = require("../models/index");

// Route to add a new team
app.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newTeam = await Teams.create({ name});

    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: "Error creating the Team" });
  }
});

// Route to get all teams
app.get("/", async (req, res) => {
  try {
    const teams = await Teams.findAll();

    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving teams", error });
  }
});


// Route to get one specific team with users attached to it
app.get("/:id", async (req, res) => {
  try {
    const team = await Teams.findByPk(req.params.id,{
     include: [{ model: Users, through: { attributes: [] } }]
    });

     if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving team", details: error.message });
  }
});



// Route to update a team
app.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const UpdateTeam = await Teams.update(
      { name },
      { where: { id: req.params.id } }
    );
    res.json(UpdateTeam);
  } catch (error) {
    res.status(500).json({ error: "Error updating team" });
  }
});

// Route to delete a team
app.delete("/:id", async (req, res) => {
  try {
    const deleteTeam = await Teams.destroy({ where: { id: req.params.id } });
    res.json(deleteTeam);
  } catch (error) {
    res.status(500).json({ error: "Error deleting team" });
  }
});

// export the router
module.exports = app;
