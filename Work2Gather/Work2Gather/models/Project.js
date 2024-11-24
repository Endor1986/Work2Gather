class Project {
    constructor(id, name, description, status = "Active") {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }
}

module.exports = Project;
