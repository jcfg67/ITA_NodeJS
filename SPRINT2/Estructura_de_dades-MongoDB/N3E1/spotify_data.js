db = db.getSiblingDB('spotify');
db.dropDatabase();

db.createCollection('artists');
db.createCollection('albums');
db.createCollection('songs');
db.createCollection('users');
db.createCollection('subscriptions');
db.createCollection('payments');
db.createCollection('playlists');
db.createCollection('playlist_songs');


db.artists.insertOne( {
    name: 'Artist_1_name',
    photo: 'Artist_1_photo',
    similar_artist: null
} );

db.artists.insertOne( {
    name: 'Artist_2_name',
    photo: 'Artist_2_photo',
    similar_artist: null
} );

db.artists.insertOne( {
    name: 'Artist_3_name',
    photo: 'Artist_3_photo',
    similar_artist: [db.artists.findOne({name: 'Artist_2_name'})._id]
} );

db.artists.updateOne(
    {name: 'Artist_2_name'},
    {$set: { similar_artist: [db.artists.findOne({name: 'Artist_3_name'})._id] } }
);

db.albums.insertOne( {
    title: 'Album_1_title',
    year: 2018,
    picture: 'Album_1_picture',
    artist_id: db.artists.findOne({name: 'Artist_1_name'})._id
} );

db.albums.insertOne( {
    title: 'Album_2_title',
    year: 2020,
    picture: 'Album_2_picture',
    artist_id: db.artists.findOne({name: 'Artist_1_name'})._id
} );

db.albums.insertOne( {
    title: 'Album_3_title',
    year: 2020,
    picture: 'Album_3_picture',
    artist_id: db.artists.findOne({name: 'Artist_2_name'})._id
} );

db.albums.insertOne( {
    title: 'Album_4_title',
    year: 2019,
    picture: 'Album_4_picture',
    artist_id: db.artists.findOne({name: 'Artist_3_name'})._id
} );

db.songs.insertOne( {
    title: 'Song_1_title',
    length: 5.25,
    reproductions: 54,
    album_id: db.albums.findOne({title: 'Album_1_title'})._id
} );

db.songs.insertOne( {
    title: 'Song_2_title',
    length: 2.42,
    reproductions: 42,
    album_id: db.albums.findOne({title: 'Album_1_title'})._id
} );

db.songs.insertOne( {
    title: 'Song_3_title',
    length: 4.67,
    reproductions: 26,
    album_id: db.albums.findOne({title: 'Album_1_title'})._id
} );

db.songs.insertOne( {
    title: 'Song_4_title',
    length: 3.12,
    reproductions: 39,
    album_id: db.albums.findOne({title: 'Album_1_title'})._id
} );

db.songs.insertOne( {
    title: 'Song_5_title',
    length: 3.25,
    reproductions: 45,
    album_id: db.albums.findOne({title: 'Album_1_title'})._id
} );

db.songs.insertOne( {
    title: 'Song_6_title',
    length: 3.56,
    reproductions: 59,
    album_id: db.albums.findOne({title: 'Album_1_title'})._id
} );

db.songs.insertOne( {
    title: 'Song_7_title',
    length: 8.25,
    reproductions: 24,
    album_id: db.albums.findOne({title: 'Album_2_title'})._id
} );

db.songs.insertOne( {
    title: 'Song_8_title',
    length: 10.42,
    reproductions: 12,
    album_id: db.albums.findOne({title: 'Album_2_title'})._id
} );

db.songs.insertOne( {
    title: 'Song_9_title',
    length: 7.25,
    reproductions: 15,
    album_id: db.albums.findOne({title: 'Album_3_title'})._id
} );

db.songs.insertOne( {
    title: 'Song_10_title',
    length: 9.5,
    reproductions: 12,
    album_id: db.albums.findOne({title: 'Album_3_title'})._id
} );


db.users.insertOne( {
    type: 'premium',
    email: 'User_1_email',
    password: 'pswd_user_1',
    name: 'User_1_Name',
    dob: new Date(2000, 1, 15),
    gender: 'male',
    country: 'USA',
    postal_code: '46468',
    favorites: {
        song_id: db.songs.findOne({title: 'Song_5_title'})._id,
        album_id: db.albums.findOne({title: 'Album_1_title'})._id,
        artist_id: db.artists.findOne({name: 'Artist_1_name'})._id
    }
} );

db.users.insertOne( {
    type: 'premium',
    email: 'User_2_email',
    password: 'pswd_user_2',
    name: 'User_2_Name',
    dob: new Date(1998, 5, 11),
    gender: 'female',
    country: 'USA',
    postal_code: '84674',
    favorites: {
        song_id: db.songs.findOne({title: 'Song_9_title'})._id,
        album_id: db.albums.findOne({title: 'Album_3_title'})._id,
        artist_id: db.artists.findOne({name: 'Artist_3_name'})._id
    }
} );

db.users.insertOne( {
    type: 'premium',
    email: 'User_3_email',
    password: 'pswd_user_3',
    name: 'User_3_Name',
    dob: new Date(2001, 3, 1),
    gender: 'male',
    country: 'USA',
    postal_code: '58943',
    favorites: {
        song_id: db.songs.findOne({title: 'Song_7_title'})._id,
        album_id: null,
        artist_id: null
    }
} );


db.subscriptions.insertOne( {
    start_date: new Date(2021, 1, 1),
    renovation_date: new Date(2022, 1, 1),
    payment_method: 'Paypal',
    paypal_user_name: 'Paypal_user_1_name',
    creditcard: {
        number: null,
        month: null,
        year: null,
        security_code: null
    },
    user_id: db.users.findOne({email: 'User_1_email'})._id

} );

db.subscriptions.insertOne( {
    start_date: new Date(2021, 1, 11),
    renovation_date: new Date(2022, 1, 11),
    payment_method: 'CreditCard',
    paypal_user_name: null,
    creditcard: {
        number: '2568 3265 1457 5869 4879',
        month: 11,
        year: 2025,
        security_code: 594
    },
    user_id: db.users.findOne({email: 'User_2_email'})._id

} );

db.subscriptions.insertOne( {
    start_date: new Date(2021, 2, 1),
    renovation_date: new Date(2022, 2, 1),
    payment_method: 'Paypal',
    paypal_user_name: 'Paypal_user_3_name',
    creditcard: {
        number: null,
        month: null,
        year: null,
        security_code: null
    },
    user_id: db.users.findOne({email: 'User_3_email'})._id

} );


db.payments.insertOne( {
    date: new Date(2021, 1, 1),
    order_number: '202100010001',
    price: 59.99,
    subscription_id: db.subscriptions.findOne({user_id: db.users.findOne({email: 'User_1_email'})._id})._id
} );

db.payments.insertOne( {
    date: new Date(2021, 1, 11),
    order_number: '202100010002',
    price: 59.99,
    subscription_id: db.subscriptions.findOne({user_id: db.users.findOne({email: 'User_2_email'})._id})._id
} );

db.payments.insertOne( {
    date: new Date(2021, 2, 1),
    order_number: '202100010003',
    price: 59.99,
    subscription_id: db.subscriptions.findOne({user_id: db.users.findOne({email: 'User_3_email'})._id})._id
} );


db.playlists.insertOne( {
    title: 'Playlist_1_title',
    total_songs: 6,
    created_at: new Date(2021, 1, 9),
    status: 'active',
    shared: true,
    deleted_at: null,
    user_id: db.users.findOne({email: 'User_1_email'})._id
} );


db.playlist_songs.insertOne( {
    playlist_id: db.playlists.findOne({title: 'Playlist_1_title'})._id,
    songs: [{ song_id: db.songs.findOne({title: 'Song_1_title'})._id,
              user_id: db.users.findOne({email: 'User_1_email'})._id,
              created_at: new Date(2021, 1, 9) },
            { song_id: db.songs.findOne({title: 'Song_2_title'})._id,
              user_id: db.users.findOne({email: 'User_1_email'})._id,
              created_at: new Date(2021, 1, 9) },
            { song_id: db.songs.findOne({title: 'Song_3_title'})._id,
              user_id: db.users.findOne({email: 'User_1_email'})._id,
              created_at: new Date(2021, 1, 9) },
            { song_id: db.songs.findOne({title: 'Song_4_title'})._id,
              user_id: db.users.findOne({email: 'User_1_email'})._id,
              created_at: new Date(2021, 1, 9) },
            { song_id: db.songs.findOne({title: 'Song_7_title'})._id,
              user_id: db.users.findOne({email: 'User_2_email'})._id,
              created_at: new Date(2021, 1, 11) },
            { song_id: db.songs.findOne({title: 'Song_9_title'})._id,
              user_id: db.users.findOne({email: 'User_3_email'})._id,
              created_at: new Date(2021, 2, 5) },
           ]
} );


