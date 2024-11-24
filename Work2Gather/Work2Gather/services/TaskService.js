const Task = require("../models/Task");

class TaskService {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    getAllTasks() {
        return this.tasks;
    }

    updateTaskStatus(id, newStatus) {
        const task = this.tasks.find((task) => task.id === id);
        if (task) {
            task.updateStatus(newStatus);
        }
    }
}

module.exports = TaskService;
