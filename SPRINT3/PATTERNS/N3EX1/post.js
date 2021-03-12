class Post {
    constructor(name) {
        this.name = name;
        this.users = [];
    }

    subscribe(user) {
		this.users.push(user);
	}

	unsubscribe(user) {
		this.users = this.users.filter(usr => usr !== user);
	}

	fire(msg) {
        console.log(`OUTBOX[${this.name}]: ${msg}`)
		this.users.forEach(user => {
			user.updateMessages(msg);
		});
	}
}

module.exports = Post;