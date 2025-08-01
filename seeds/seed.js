// Import required packages
const sequelize = require("../config/connection");

// import models
const { Roles, Teams, Workflow, WorkflowStage } = require("../models");

// import seed data
const rolesData = require("./roles.json");
const teamsData = require("./teams.json");
const workflowData = require("./workflow.json");
const workflowStageData = require("./workflow_stages.json");

// Seed database
const seedDatabase = async () => {

  try{
  await sequelize.sync({ force: true });

  await Roles.bulkCreate(rolesData);
  await Teams.bulkCreate(teamsData);
  await Workflow.bulkCreate(workflowData);
  await WorkflowStage.bulkCreate(workflowStageData);


  console.log('Database seeded successfully');
   process.exit(0); // success 

   } catch (err) {
    console.error('Failed to seed database:', err);
    process.exit(1); // Error occured
  }
};

// Call seedDatabase function
seedDatabase()