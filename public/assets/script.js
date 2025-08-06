let token = localStorage.getItem("authToken");
let currentUser = null // this will be needed to capture data at login and then be used in functions. 

function register() {

   preventDefault(); // prevent form reload

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        alert(data.errors[0].message);
      } else {
        alert("User registered successfully");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  fetch("http://localhost:3001/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      // Save the token in the local storage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        token = data.token;
        currentUser = data; // Need to create variable to use in later function

         // Set welcome message with username
    document.getElementById("welcome-message").textContent = `Welcome ${data.username}`;


        alert("User Logged In successfully");

       // Hide the auth container and show the app container as we're now logged in
        document.getElementById("auth-container").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");

        loadAccountInfo(); // getting data at login stage for speed.
        loadUsers(); 
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function logout() {
  fetch("http://localhost:3001/api/users/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  }).then(() => {
    // Clear the token and user data from the local storage as user logged out
    localStorage.removeItem("authToken");
    token = null;
    currentUser = null
    /// Show/hide the relevant section as logout. 
    document.getElementById("auth-container").classList.remove("hidden");
    document.getElementById("app-container").classList.add("hidden");
  });
}

//// Getting the info of the user once logged in to id them and provide correct access. 
function loadAccountInfo() {
  fetch("http://localhost:3001/api/users/${currentUser.id}")
    .then((res) => res.json())
    .then((data) => {
      const teams = data.map((userteam) => userteam.Team?.name).join(", "); // remember user can belong to multiple teams, hence join
      document.getElementById("account-info").innerHTML = `
        <p><strong>Username:</strong> ${currentUser.username}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Role:</strong> ${currentUser.role || 'Admin'}</p> //May change default to user later.
        <p><strong>Teams:</strong> ${teams}</p>
      `;
    });
}

/// adming can see the list of users
function loadUsers() {
  fetch("http://localhost:3001/api/users/") /// think of adding Authorisation later when role access are defined. 
    .then((res) => res.json())
    .then((users) => {
      const list = document.getElementById("users-list");
      list.innerHTML = "";
      users.forEach((user) => {
        const teams = user.Teams?.map((team) => team.name).join(", ") || "-"; // getting team array from route and put a - if user doesn't have any team. 
        list.innerHTML += `<p><strong>${user.username}</strong> (ID: ${user.id}) - Teams: ${teams}</p>`;
      });
    });
}

/// admin can create new teams
function createTeam() {
  const name = document.getElementById("new-team-name").value;
  fetch("http://localhost:3001/api/teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Team created!");
      loadUsers();
    });
}

/// Requests list

/// create request

function createRequest() {
  const title = document.getElementById("new-request-title").value;
  const type = document.getElementById("new-request-type").value;
  const description = document.getElementById("new-request-description").value;
  fetch("http://localhost:3001/api/approval_requests", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ title, type, description, created_by: currentUser.id }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Request created");
      loadRequests();
    });
}
