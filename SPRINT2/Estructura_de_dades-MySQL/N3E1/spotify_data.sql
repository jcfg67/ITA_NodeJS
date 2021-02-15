USE SPOTIFY;

INSERT INTO users (user_id, type, email, password, name, dob, gender, country, postal_code)
VALUES
(1,'premium','email_user1@gmail.com','HwkL8$4Pa','User_1_Name','2001/05/12','man','USA','46468'),
(2,'premium','email_user2@gmail.com','dasJjhY62','User_2_Name','2003/01/02','female','USA','54972'),
(3,'premium','email_user3@gmail.com','Peieim83x','User_3_Name','2002/11/21','man','USA','68523');

INSERT INTO subscriptions (subscription_id, start_date, renovation_date, payment_method)
VALUES
(1,'2021/02/01','2022/02/01','Credit Card'),
(2,'2021/02/01','2022/02/01','PayPal'),
(3,'2021/02/01','2022/02/01','PayPal');

INSERT INTO paypals (paypal_id, user_name)
VALUES
(2,'PayPal_User_Name_2'),
(3,'PayPal_User_Name_3');


INSERT INTO creditcards (creditcard_id, number, month, year, security_code)
VALUES
(1,'1546 3584 5976 2548 6225',11,2022,358);

INSERT INTO payments (payment_id, date, order_number, price, subscription_id)
VALUES
(1,'2021/02/21','20220001001',59.99,1),
(2,'2021/02/01','20220001002',59.99,2),
(3,'2021/02/01','20220001003',59.99,3);

INSERT INTO artists (artist_id, name, photo)
VALUES
(1,'Artist_1_name','Photo_Artist_1'),
(2,'Artist_2_name','Photo_Artist_2');


INSERT INTO similar_artists (artist_id, similar_artist_id)
VALUES
(1,2),
(2,1);

INSERT INTO following_artists (user_id, artist_id)
VALUES
(1,1);

INSERT INTO albums (album_id, title, year, picture, artist_id)
VALUES
(1,'Album_1_title','2020','Picture_Album_1',1),
(2,'Album_2_title','2018','Picture_Album_2',1),
(3,'Album_3_title','2012','Picture_Album_3',2);


INSERT INTO favorite_albums (user_id, album_id)
VALUES
(1,1);

INSERT INTO songs (song_id, title, length, reproductions, album_id)
VALUES
(1,'Song_1_Title',3.35,5,1),
(2,'Song_2_Title',3.28,2,1),
(3,'Song_3_Title',5.05,4,1),
(4,'Song_4_Title',4.26,1,2),
(5,'Song_5_Title',3.56,1,2),
(6,'Song_6_Title',4.48,2,3);

INSERT INTO favorite_songs (user_id, song_id)
VALUES
(1,2);

INSERT INTO playlists (playlist_id, title, total_songs, created_at, status, shared, deleted_at, user_id)
VALUES
(1,'Playlist_1_name',3,'2020/02/11','active',0,NULL,1);

INSERT INTO playlist_songs (playlist_id, song_id, user_id, created_at)
VALUES
(1,1,NULL,'2020/02/11'),
(1,2,NULL,'2020/02/11'),
(1,3,NULL,'2020/02/11');

