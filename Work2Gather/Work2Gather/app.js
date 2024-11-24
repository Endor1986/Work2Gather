const express = require("express");
const path = require("path");
const TaskController = require("./controllers/TaskController");
const UserController = require("./controllers/UserController");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Statische Dateien bereitstellen

// API-Routen
app.use("/api/tasks", TaskController);
app.use("/api/users", UserController);

// Standardroute
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Server starten
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
