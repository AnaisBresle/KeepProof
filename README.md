# KeepProof

## Description
A simple approval workflow system with user registration, login, request creation, and approval/rejection features.
Built with Node.js, Express, MySQL and simp;le js frontend.

## Installation
1. Clone the repo
"```bash
git clone https://github.com/your-username/approval-workflow.git
cd approval-workflow ```"

2. "```bash
npm install```"

3. Create an .env filed in the root folder
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password (change to your own pw)
DB_NAME=KeepProof_db
DB_PORT=3306

PORT=3001
JWT_SECRET=your_secret_key (replace with yours)
4. Log into MySQL 
"```bash
mysql -u root -p ```"

5. Create a db
CREATE DATABASE KeepProof_db;
USE KeepProof_db;

6. Seed data
"```bash
npm run seed```"

7. Start server
"```bash
npm run dev```"

8. go to your borwser and look at http://localhost:3001

## Usage
To use this project you need Node.js and Express installed. 
You can then rune the app on your local server. 
You will get an webapp that allows you to create user, login, create, delete request, make decision, view users and crete a new team. 

## License
MIT

## Author
Anais Bresle

## Contact
• none

## Useful Links
• https://expressjs.com/en/starter/installing.html
• https://dev.mysql.com/doc/
• https://sequelize.org/docs/v6/
• https://developer.mozilla.org/
• https://www.postman.com/
• https://www.w3schools.com/jsref/