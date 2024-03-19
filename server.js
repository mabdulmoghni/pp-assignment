// app.js

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');

// Database configuration
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Define the ClientIP model
const ClientIP = sequelize.define('ClientIP', {
  ip: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Check if the table exists, if not, create it
async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

// Middleware to extract client IP and save it to the database
app.use('/client-ip', async (req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  try {
    await ClientIP.create({ ip: clientIP });
    console.log("Client IP saved to the database:", clientIP);
    next(); // Call next middleware
  } catch (error) {
    console.error("Error saving client IP:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to show message in browser
app.get('/client-ip', (req, res) => {
  res.send("Public IP saved to database :)");
});

// Endpoint to list all client IPs stored in the database
app.get('/client-ip/list', async (req, res) => {
  try {
    const clientIPs = await ClientIP.findAll();
    const ips = clientIPs.map(ip => ip.ip);
    res.json(ips);
  } catch (error) {
    console.error("Error fetching client IPs:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
