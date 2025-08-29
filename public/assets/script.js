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
        localStorage.setItem("user_id", data.id); // store user ID for later
        token = data.token;
        currentUser = {
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,

        }; // Need to create variable to use in later function

         // Set welcome message with username
    document.getElementById("welcome-message").textContent = `Welcome ${currentUser.username}`;
    document.querySelector("nav").classList.remove("hidden");

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
  document.querySelector("nav").classList.add("hidden");
  alert("Logged out successfully!");
 
}

//// Getting the info of the user once logged in to id them and provide correct access. 
function loadAccountInfo() {
  fetch(`http://localhost:3001/api/users/${currentUser.id}`)
    .then((res) => res.json())
    .then((data) => {
      const teams = data.Teams?.map(team => team.name).join(", ") || '-'; // remember user can belong to multiple teams, hence join
      document.getElementById("account-info").innerHTML = `<div class="profile-card">
        <h4>Username:</strong> ${currentUser.username}</h4>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Role:</strong> ${currentUser.role || 'Admin'}</p> 
        <p><strong>Teams:</strong> ${teams}</p></div>
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
        list.innerHTML += `<div class="card"><h4>${user.username}</h4> <p> Teams: ${teams} </p></div>`;
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


console.log("About to fetch approval requests...");
fetch("/api/approval_requests")
  .then(res => {
    console.log("Raw response:", res);
    return res.json();
  })
  .then(data => {
    console.log("Requests from API:", data);
    data.forEach(r => console.log("Request:", r));
  })
  .catch(err => {
    console.error("Fetch failed:", err);
  });

/// Requests list

function loadRequests() {
  fetch(`http://localhost:3001/api/approval_requests/`) 
    .then((res) => res.json())
    .then((requests) => {
      const list = document.getElementById("request-list");
      list.innerHTML = "";

      console.log("Requests from API:", requests);

      requests.forEach((request) => {
        // Safely get the latest decision
        let decisionOutcome = "No decision yet";
        let decisionClass = "pending"; // default style
        if (request.approval_decisions && request.approval_decisions.length > 0) {
  const sortedDecisions = request.approval_decisions.sort((a, b) => b.id - a.id);
  const lastDecision = sortedDecisions[0];
  const username = lastDecision.User?.username || "Unknown";
  decisionOutcome = `${lastDecision.action} by ${username}`;
      if (lastDecision.action === "approved") decisionClass = "approved";
else if (lastDecision.action === "rejected") decisionClass = "rejected";
else decisionClass = "pending";
}

        console.log(`Request: ${request.title}, Last Decision: ${decisionOutcome}`);
        // Build the HTML 
        list.innerHTML += `<div class="card">
          <h4>${request.title}</h4> (${request.type || 'N/A'})
          <p>${request.description || ''}</p>
          <p><em>Last updated: ${request.updated_at ? new Date(request.updated_at).toLocaleString() : '-'}</em></p>
          <p><span class="status ${decisionClass}"> ${decisionOutcome}</span></p>
          <select id="decision-select-${request.id}">
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
            <option value="pending">Pending</option>
          </select><br />
         <div class="btn-group">
  <button class="update-btn" onclick="updateDecision(${request.id})">Update</button>
  <button class="delete-btn" onclick="deleteRequest(${request.id})">Delete</button>
</div>
        </div>`;
      });
    })
    .catch((err) => {
      console.error("Error loading requests:", err);
      alert("Failed to load requests.");
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


//update decision
function updateDecision(requestID) {
  const selectEl = document.getElementById(`decision-select-${requestID}`);
  const decision = selectEl.value;

  const acted_by = currentUser?.id;

console.log({   request_id: requestID,  acted_by: acted_by,  action: decision});


  fetch(`http://localhost:3001/api/approval_decisions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      request_id: requestID,
      acted_by: acted_by,
      action: decision,
      comment: null, 
      from_role: null, 
      to_role: null}),
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
      console.error("Error creating decision:", err); 
      alert("Error updating decision");
    });
}