class Team {
    constructor(id, name, members = []) {
        this.id = id;
        this.name = name;
        this.members = members; // Array von User-IDs
    }

    addMember(userId) {
        if (!this.members.includes(userId)) {
            this.members.push(userId);
        }
    }

    removeMember(userId) {
        this.members = this.members.filter(id => id !== userId);
    }
}

module.exports = Team;
