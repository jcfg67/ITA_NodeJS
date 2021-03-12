class User {
    constructor(user) {
        this.user = user
    }

    updateMessages(msg) {
        console.log(`INBOX[${this.user}]: "${msg}"`);
    }
}

module.exports = User;