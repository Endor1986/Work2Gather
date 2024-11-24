// fileUtils.js

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.json");

// Daten aus der JSON-Datei laden
function loadData() {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading data:", error);
        return { tasks: [], users: [] };
    }
}

// Daten in die JSON-Datei speichern
function saveData(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

module.exports = { loadData, saveData };
