// create a new router
const app = require("express").Router();

// import the models
const { Users } = require("../models/index");

// Route to create a new user
app.post("/", async (req, res) => {
  try {
    const { username, email, password, role_id } = req.body;
    const newUser = await Users.create({ username, email, password, role_id, created_on: new Date() });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error adding new User" });
  }
});

// Route to get all users and their teams
app.get("/", async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [{model:Teams, through:{attritbutes:[]}}]
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users", error });
  }
});


// Route to get one specific user and its teams
app.get("/:id", async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id, {
      include: [{ model:Teams, through:{attritbutes:[]}}]
    });
    
  if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user", details: error.message });
  }
});

// Route to update a user
app.put("/:id", async (req, res) => {
  try {
    const { username, email, password, role_id } = req.body;
    const UpdateUser = await Users.update(
      { username, email, password, role_id  },
      { where: { id: req.params.id } }
    );
    res.json(UpdateUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating uer" });
  }
});

// Route to delete a user
app.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await Users.destroy({ where: { id: req.params.id } });
    res.json(deleteUser);
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

// export the router
module.exports = app;
