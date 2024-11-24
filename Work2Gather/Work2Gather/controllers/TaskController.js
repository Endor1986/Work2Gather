const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const { loadData, saveData } = require("../fileUtils");

const router = express.Router();

// Daten aus der JSON-Datei laden
let { tasks = [], users = [] } = loadData() || {};

// Hilfsfunktion zum Suchen eines Eintrags
function findItemById(array, id) {
    return array.find(item => item.id === id);
}

// Middleware zur Validierung von Tasks
function validateTask(req, res, next) {
    const { id, title, description } = req.body;
    if (!id || !title || !description) {
        return res.status(400).json({ message: "ID, Title, and Description are required" });
    }
    next();
}

// *** TASK ROUTES ***

// GET: Alle Tasks abrufen
router.get("/", (req, res) => {
    res.json(tasks);
});

// GET: Kombinierte Ansicht von Tasks und zugewiesenen Employern
router.get("/combined", (req, res) => {
    const combinedData = tasks.map(task => ({
        taskTitle: task.title,
        assignedUsers: (task.assignedTo || []).map(userId => {
            const user = findItemById(users, userId);
            return user ? `${user.name} (${user.email})` : "Unknown";
        }).join(", ")
    }));
    res.json(combinedData);
});

// POST: Neuen Task erstellen
router.post("/", validateTask, (req, res) => {
    const { id, title, description, status } = req.body;

    if (findItemById(tasks, id)) {
        return res.status(409).json({ message: "Task with this ID already exists" });
    }

    const newTask = new Task(id, title, description, status || "To Do");
    tasks.push(newTask);
    saveData({ tasks, users });
    res.status(201).json({ message: "Task created", task: newTask });
});

// POST: Task einem Mitarbeiter zuweisen
router.post("/:id/assign", (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const task = findItemById(tasks, id);
    const user = findItemById(users, userId);

    if (task && user) {
        task.assignedTo = task.assignedTo || [];
        if (!task.assignedTo.includes(userId)) {
            task.assignedTo.push(userId);
        }
        saveData({ tasks, users });
        res.json({ message: "Task assigned", task });
    } else {
        res.status(404).json({ message: "Task or User not found" });
    }
});

// PUT: Bestehenden Task aktualisieren
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const task = findItemById(tasks, id);
    if (task) {
        task.updateStatus(status);
        saveData({ tasks, users });
        res.json({ message: "Task updated", task });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// DELETE: Bestehenden Task löschen
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === id);

    if (index !== -1) {
        tasks.splice(index, 1);
        saveData({ tasks, users });
        res.json({ message: "Task deleted" });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

module.exports = router;
