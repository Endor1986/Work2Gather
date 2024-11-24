// controllers/UserController.js

const express = require("express");
const User = require("../models/User");
const { loadData, saveData } = require("../fileUtils");

const router = express.Router();

// Daten aus der JSON-Datei laden
let { tasks = [], users = [] } = loadData() || {};

// Hilfsfunktion zum Suchen eines Eintrags
function findItemById(array, id) {
    return array.find(item => item.id === id);
}

// Middleware zur Validierung von Benutzern
function validateUser(req, res, next) {
    const { id, name, email } = req.body;
    if (!id || !name || !email) {
        return res.status(400).json({ message: "ID, Name, and Email are required" });
    }
    next();
}

// *** USER ROUTES ***

// GET: Alle Benutzer abrufen
router.get("/", (req, res) => {
    res.json(users);
});

// POST: Neuen Benutzer erstellen
router.post("/", validateUser, (req, res) => {
    const { id, name, email, role } = req.body;

    if (findItemById(users, id)) {
        return res.status(409).json({ message: "User with this ID already exists" });
    }

    const newUser = new User(id, name, email, role || "Member");
    users.push(newUser);
    saveData({ tasks, users });
    res.status(201).json({ message: "User created", user: newUser });
});

// DELETE: Bestehenden Benutzer löschen
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const user = findItemById(users, id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Überprüfen, ob der Benutzer noch Aufgaben zugewiesen hat
    const assignedTasks = tasks.filter(task => task.assignedTo && task.assignedTo.includes(id));

    if (assignedTasks.length > 0) {
        return res.status(400).json({ message: "Cannot delete user. User is assigned to tasks." });
    }

    // Benutzer löschen
    users = users.filter(u => u.id !== id);
    saveData({ tasks, users });
    res.json({ message: "User deleted" });
});

module.exports = router;
