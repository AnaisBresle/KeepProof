let token = localStorage.getItem("authToken");
let currentUser = null // this will be needed to capture data at login and then be used in functions. 

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  const section = document.getElementById(`section-${id}`);
  section.classList.remove("hidden");

  if (id === "account") {
    if (!currentUser) {
      alert("Please log in first.");
      return;
    }
    loadAccountInfo();
  }
}

function register() {

   const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  fetch(`http://localhost:3001/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Register response:", data);
      if (data.errors) {
        alert(data.errors[0].message);
      } else {
        alert("User registered successfully!");
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
      }
    })
    .catch((error) => {
      console.error("Registration failed:", error);
      alert("Something went wrong.");
    });
}

function login() {
  const username = document.getElementById("login-username").value.trim();
const password = document.getElementById("login-password").value;
  fetch(`http://localhost:3001/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      // Save the token in the local storage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        token = data.token;
        currentUser = {
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,

        }; // Need to create variable to use in later function

         // Set welcome message with username
    document.getElementById("welcome-message").textContent = `Welcome ${currentUser.username}`;


        alert("User Logged In successfully");

       // Hide the auth container and show the app container as we're now logged in
        document.getElementById("auth-container").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");

        loadAccountInfo(); // getting data at login stage for speed.
        loadUsers(); 
        loadRequests();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function logout() {localStorage.removeItem("authToken");
  token = null;
  currentUser = null;
  document.getElementById("auth-container").classList.remove("hidden");
  document.getElementById("app-container").classList.add("hidden");
  alert("Logged out successfully!");
}

//// Getting the info of the user once logged in to id them and provide correct access. 
function loadAccountInfo() {
  fetch(`http://localhost:3001/api/users/${currentUser.id}`)
    .then((res) => res.json())
    .then((data) => {
      const teams = data.Teams?.map(team => team.name).join(", ") || '-'; // remember user can belong to multiple teams, hence join
      document.getElementById("account-info").innerHTML = `
        <p><strong>Username:</strong> ${currentUser.username}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Role:</strong> ${currentUser.role || 'Admin'}</p> 
        <p><strong>Teams:</strong> ${teams}</p>
      `;
    });
}

/// adming can see the list of users
function loadUsers() {
  fetch(`http://localhost:3001/api/users/`) /// think of adding Authorisation later when role access are defined. 
    .then((res) => res.json())
    .then((users) => {
      const list = document.getElementById("users-list");
      list.innerHTML = "";
      users.forEach((user) => {
        const teams = user.Teams?.map(team => team.name).join(", ") || '-';// getting team array from route and put a - if user doesn't have any team. 
        list.innerHTML += `<p><strong>${user.username}</strong> - Teams: ${teams} </p>`;
      });
    });
}

/// admin can create new teams
function createTeam() {
  const name = document.getElementById("new-team-name").value;
  fetch(`http://localhost:3001/api/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Team created!");
      document.getElementById("new-team-name").value = "";  // Clear input
      loadUsers();
    });
}




/// Requests list

function loadRequests() {
  fetch(`http://localhost:3001/api/approval_requests/`) 
  .then((res) => res.json())
    .then((requests) => {
      const list = document.getElementById("request-list");
      list.innerHTML = "";
      requests.forEach((request) => {
 // Sort decisions by date (newest first)
     
      const decisions = request.ApprovalDecisions?.sort((a, b) => new Date(b.action_at) - new Date(a.action_at)); // sorting decision by action date - if b-a > then b is first and vice verse allong sorting newest first. 
      const lastDecision = decisions?.[0] /// array starts at zero, so first record. 

      const decisionOutcome = lastDecision
          ? `${lastDecision.status} by ${lastDecision.username || "Unknown"} on ${new Date(lastDecision.action_at).toLocaleDateString()}`
          : "No decisions yet";

        list.innerHTML += `<div>
            <strong>${request.title}</strong> (${request.type})<br />
            ${request.description}<br />
            <em>Last updated: ${new Date(request.updated_at).toLocaleString()}</em><br />
            <strong>Last decision:</strong> ${decisionOutcome}<br />
            <select id="decision-select-${request.id}">
      <option value="approved">Approve</option>
      <option value="rejected">Reject</option>
      <option value="pending">Pending</option>
    </select>
             
             <button onclick="updateDecision(${request.id})">Update</button>
            <br />
            <button onclick="deleteRequest(${request.id})">Delete</button> <br /><hr>
          </div>`;
      });
    });
}


/// create request

function createRequest() {
  const title = document.getElementById("new-request-title").value;
  const type = document.getElementById("new-request-type").value;
  const description = document.getElementById("new-request-description").value;
  fetch(`http://localhost:3001/api/approval_requests`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ title, type, description, created_by: currentUser.id }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Request created");
      document.getElementById("new-request-title").value = "";
document.getElementById("new-request-type").value = "";
document.getElementById("new-request-description").value = "";
      loadRequests();
    });
}


// delete request

function deleteRequest(requestID) {
  if (!confirm("Are you sure you want to delete this request?")) return;

  fetch(`http://localhost:3001/api/approval_requests/${requestID}`, {
    method: "DELETE",
    
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete request");
      alert("Request deleted!");
      loadRequests();
    })
    .catch((err) => alert(err.message));
}

function updateDecision(requestID) {
  const selectEl = document.getElementById(`decision-select-${requestID}`);
  const decision = selectEl.value;

  fetch(`http://localhost:3001/api/approval_requests/${requestID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ decision }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to update decision");
      return res.json();
    })
    .then(() => {
      alert("Decision updated!");
      loadRequests();
    })
    .catch((err) => {
      console.error(err);
      alert("Error updating decision");
    });
}