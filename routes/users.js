// create a new router
const app = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey";

// import the models
const { Users, Teams } = require("../models/index");

// Route to create a new user
app.post("/", async (req, res) => {
  try {
    const { username, email, password, role_id } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ username, email, password_hash, role_id, created_on: new Date() });

     // Exclude password_hash in the response
    const { password_hash: _, ...userData } = newUser.toJSON();
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ error: "Error adding new User" });
  }
});



// Route to get all users and their teams
app.get("/", async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [{model: Teams, through:{attributes:[]}}]
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users", error });
  }
});

// Login and get a JWT token
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });

      if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      {  id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "2h" }
    );
   res.json({
      token,
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});



// Route to get one specific user and its teams
app.get("/:id", async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id, {
      include: [{ model: Teams, through:{attributes:[]}}]
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
    const updatedFields = { username, email, role_id };
 // Only hash password if it's provided
    if (password) {
      const password_hash = await bcrypt.hash(password, 10);
      updatedFields.password_hash = password_hash;
    }

    const [updated] = await Users.update(
      updatedFields,
      { where: { id: req.params.id } }
    );

    if (updated ===0) {
    return res.status(404).json({ error: "User not found or no changes" });  
    }

     // Fetch updated user
    const updatedUser = await Users.findByPk(req.params.id, {
      attributes: { exclude: ["password_hash"] },
    });
    res.json(updatedUser);
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
