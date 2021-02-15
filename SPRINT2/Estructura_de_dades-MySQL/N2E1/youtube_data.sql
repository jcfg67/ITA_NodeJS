USE YOUTUBE;

INSERT INTO users (user_id, email, password, name, dob, gender, country, postal_code)
VALUES
(1,'email_user1@gmail.com','HwkL8$4Pa','User_1_Name','2001/05/12','m','USA','46468'),
(2,'email_user2@gmail.com','dasJjhY62','User_2_Name','2003/01/02','f','USA','54972'),
(3,'email_user3@gmail.com','Peieim83x','User_3_Name','2002/11/21','m','USA','68523');

INSERT INTO videos (video_id, titol, description, size, name, video_length, thumbnail, views, likes, dislikes, status, created_at, user_id)
VALUES
(1,'Video_1_Titol','Video_1_Description',485,'Video_1_file_name',12.35,'Thumbnail_1',2,0,0,'public','2019/05/15',1),
(2,'Video_2_Titol','Video_2_Description',846,'Video_2_file_name',25.30,'Thumbnail_2',5,0,0,'public','2019/05/30',1),
(3,'Video_3_Titol','Video_3_Description',395,'Video_3_file_name',11,'Thumbnail_3',0,0,0,'private','2019/06/07',1),
(4,'Video_4_Titol','Video_4_Description',652,'Video_4_file_name',18.45,'Thumbnail_4',1,0,0,'public','2020/01/07',2),
(5,'Video_5_Titol','Video_5_Description',125,'Video_5_file_name',5.32,'Thumbnail_5',1,0,0,'public','2020/02/17',2),
(6,'Video_6_Titol','Video_6_Description',75,'Video_6_file_name',3.25,'Thumbnail_6',1,0,0,'public','2020/05/06',3);

INSERT INTO tags (tag_id, name)
VALUES
(1,'TAG_1'),
(2,'TAG_2');

INSERT INTO tagged_as (video_id, tag_id)
VALUES
(1,1),
(1,2);

INSERT INTO playlists (playlist_id, name, status, created_at, user_id)
VALUES
(1,'Playlist_1_name','public','2019/07/01',1);

INSERT INTO playlist_videos (playlist_id, video_id)
VALUES
(1,1),
(1,2),
(1,3);

INSERT INTO channels (channel_id, name, description, created_at, user_id)
VALUES
(1,'Channel_1_name','Channel_1_Description','2019/06/01',1);

INSERT INTO subscribed_to (channel_id, user_id)
VALUES
(1,2);

INSERT INTO comments (comment_id, text, created_at, user_id, video_id)
VALUES
(1,'Comment_1','2019/05/21',2,1);

INSERT INTO comment_likes (comment_id, user_id, created_at, a_like)
VALUES
(1,3,'2019/05/22',1);

INSERT INTO video_likes (video_id, user_id, created_at, a_like)
VALUES
(1,2,'2019/05/16',1),
(1,3,'2019/05/17',1);

