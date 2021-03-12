const User = require('./user');
const Post = require('./post');

const post1 = new Post("Post_1");
const post2 = new Post("Post_2");

const user1 = new User("User_1");
const user2 = new User("User_2");
const user3 = new User("User_3");

post1.subscribe(user1);
post2.subscribe(user2);
post2.subscribe(user3);

post1.fire("New Post created from Post_1");
post2.fire("New Post created from Post_2");

post1.unsubscribe(user1);
post2.unsubscribe(user2);

post1.fire("Another one Post created from Post_1");
post2.fire("Another one Post created from Post_2");

