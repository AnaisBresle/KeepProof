// create a new router
const app = require("express").Router();

// import the models
const { Roles, Users } = require("../models/index");

// As roles are set up in the app there's is not need for create, delete or update route at this point
// In later dev, we may consider allowing new roles and or tweaks in preset ones. But for now these are Read only. 


// Route to get all roles
app.get("/", async (req, res) => {
  try {
    const roles = await Roles.findAll();

    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving decisions", error });
  }
});


// Route to get one specific approval decision
app.get("/:id", async (req, res) => {
  try {
    const role = await Roles.findByPk(req.params.id);
    res.json(role);
  if (!role) {
      return res.status(404).json({ error: "No role found" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the record", details: error.message });
  }
});

// Route to retireve all users for one specific role
router.get("/:role_id/users", async (req, res) => {
  try {
    const users = await Users.findAll({
      where: { role_id: req.params.role_id },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users for the selected role", details: error.message });
  }
});








// export the router
module.exports = app;
