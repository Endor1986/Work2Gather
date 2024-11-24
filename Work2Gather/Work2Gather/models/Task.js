class Task {
    constructor(id, title, description, status = "To Do") {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }
}

module.exports = Task;
