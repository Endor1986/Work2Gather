class User {
    constructor(id, name, email, role = "Member") {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role; // Rollen: Member, Admin, etc.
    }

    updateRole(newRole) {
        this.role = newRole;
    }
}

module.exports = User;
