require('dotenv').config(); // Load env vars upfront

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sequelize = require("./config/connection");


const { Users } = require('./models'); // Import Users model 
const app = express();
const PORT = process.env.PORT || 3001; 
const routes = require('./routes'); // set up the link to the routes
const path = require('path');

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

app.use(express.json());
app.use('/api', routes);



// Middleware for authenticating JWT tokens
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ message: "Access Denied" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

// Register a new user
app.post("/register", async (req, res) => {
  try {
    const { username, password, email, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({ username, password: hashedPassword, email, role_id });
    res.json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

// Login and get a JWT token
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "2h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Serve index.htm on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.htm'));
});


// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
