db = db.getSiblingDB('youtube');
db.dropDatabase();

db.createCollection('users');
db.createCollection('channels');
db.createCollection('videos');
db.createCollection('comments');
db.createCollection('playlists');

db.users.insertOne( {
    email: 'User_1_email',
    password: 'pswd_user_1',
    name: 'User_1_Name',
    dob: new Date(2000, 1, 15),
    gender: 'male',
    country: 'USA',
    postal_code: '46468',
    subscribed_to: null
} );

db.channels.insertOne( {
    name: 'Channel_User_1_Name',
    description: 'Description_Channel_User_1',
    created_at: new Date(2000, 1, 20),
    user_id: db.users.findOne({email: 'User_1_email'})._id
} );

db.users.insertOne( {
    email: 'User_2_email',
    password: 'pswd_user_2',
    name: 'User_2_Name',
    dob: new Date(2000, 2, 21),
    gender: 'male',
    country: 'USA',
    postal_code: '52387',
    subscribed_to: [db.channels.findOne({name: 'Channel_User_1_Name'})._id]
} );

db.users.insertOne( {
    email: 'User_3_email',
    password: 'pswd_user_3',
    name: 'User_3_Name',
    dob: new Date(2000, 1, 11),
    gender: 'female',
    country: 'USA',
    postal_code: '27852',
    subscribed_to: null
} );


db.channels.insertOne( {
    name: 'Channel_User_3_Name',
    description: 'Description_Channel_User_3',
    created_at: new Date(2000, 2, 1),
    user_id: db.users.findOne({email: 'User_3_email'})._id
} );


db.videos.insertOne( {
    user_id: db.users.findOne({email: 'User_1_email'})._id,
    title: 'Video_1_title',
    descriptiom: 'Description_video_1',
    size: 68.56,
    name: 'Video_1_file_name',
    video_length: 11.45,
    thumbnail: 'Video_1_thumbnail',
    views: 1,
    likes: 0,
    dislikes: 0,
    status: 'public',
    created_at: new Date(2000, 1, 16, 18, 30),
    tags: ['Tag1', 'Tag2', 'Tag3'],
    video_likes: null
} );

db.videos.insertOne( {
    user_id: db.users.findOne({email: 'User_1_email'})._id,
    title: 'Video_2_title',
    descriptiom: 'Description_video_2',
    size: 86.45,
    name: 'Video_2_file_name',
    video_length: 13.24,
    thumbnail: 'Video_2_thumbnail',
    views: 1,
    likes: 1,
    dislikes: 0,
    status: 'public',
    created_at: new Date(2000, 1, 17, 20, 45),
    tags: ['Tag2', 'Tag4'],
    video_likes: [{
        user_id: db.users.findOne({email: 'User_2_email'})._id,
        created_at: new Date(2000, 1, 18, 9, 15),
        like: true}]
} );

db.videos.insertOne( {
    user_id: db.users.findOne({email: 'User_3_email'})._id,
    title: 'Video_3_title',
    descriptiom: 'Description_video_3',
    size: 25.36,
    name: 'Video_3_file_name',
    video_length: 7.45,
    thumbnail: 'Video_3_thumbnail',
    views: 0,
    likes: 0,
    dislikes: 0,
    status: 'public',
    created_at: new Date(2000, 1, 16, 18, 30),
    tags: ['Tag1'],
    video_likes: null
} );


db.comments.insertOne( {
    text: 'Comment to Video 2',
    created_at: new Date(2000, 1, 18, 9, 15),
    user_id: db.users.findOne({email: 'User_2_email'})._id,
    video_id: db.videos.findOne({title: 'Video_2_title'})._id,
    comment_likes: [
            {user_id: db.users.findOne({email: 'User_1_email'})._id,
             created_at: new Date(2000, 1, 18, 22, 05),
             like: true }
        ]
} );


db.playlists.insertOne( {
    name: 'Playlist_1_name',
    status: 'public',
    created_at: new Date(2000, 1, 18, 21, 15),
    user_id: db.users.findOne({email: 'User_1_email'})._id,
    videos: [db.videos.findOne({title: 'Video_1_title'})._id, db.videos.findOne({title: 'Video_2_title'})._id,]
} );


