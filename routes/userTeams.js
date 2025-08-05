// create a new router
const app = require("express").Router();

// import the models
const { UserTeams, Users, Teams } = require("../models/index");


// route to get all userTeams
app.get("/", async (req, res) => {
  try {
    const userteams = await UserTeams.findAll();
    res.json(userteams);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving userteams combo", details: error.message });
  }
});


// Route to Assign a user to a team
app.post("/", async (req, res) => {
  try {
    const { user_id, team_id } = req.body;


     if (!user_id || !team_id) return res.status(400).json({ error: 'Missing user_id or team_id' });

     // checking if combo user/team arlready exist 

      const existing = await UserTeams.findOne({ where: { user_id, team_id } });
    if (existing) return res.status(409).json({ error: 'User already in team' });
    
    
    const userTeam = await UserTeams.create({ user_id, team_id});

    res.status(201).json(userTeam);
  } catch (error) {
    res.status(500).json({ error: "Failed to assign team to user" });
  }
});

// Remove User from team

app.delete("/:id", async (req, res) => {
  try {
    const { user_id, team_id } = req.body;
    const removeTeam = await UserTeams.destroy({ where: { user_id, team_id } });
res.json({ message: 'User removed from team' });
    if (!removeTeam) return res.status(404).json({ error: 'User not in team' });
    res.json(removeTeam);
  } catch (error) {
    res.status(500).json({ error: "Error deleting team" });
  }
});


// Route to get all TEAMs for one USER
app.get("/users/:userId", async (req, res) => {
  try {
    const userteams = await UserTeams.findAll({
    where: { user_id: req.params.userId },
      include: [{ model: Teams }]
    });

    res.json(userteams);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving teams for selected user", error });
  }
});


// Route to get all USERS for one TEAM
app.get("/teams/:teamId", async (req, res) => {
  try {
    const teamUsers = await UserTeams.findAll({
    where: { team_id: req.params.teamId },
      include: [{ model: Users }]
    });

    res.json(teamUsers);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users for selected team", error });
  }
});




// export the router
module.exports = app;
