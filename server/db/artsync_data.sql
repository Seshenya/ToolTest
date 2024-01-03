-- Inserting users
INSERT INTO user (firstname, lastname, username, password, email, type, active_status, skills, profile_picture, description)
VALUES ('John', 'Doe', 'john_doe', 'password123', 'john.doe@example.com', 1, 1, 'Coding, Design', 'profile.jpg', 'A software developer.');

INSERT INTO user (firstname, lastname, username, password, email, type, active_status, skills, profile_picture, description)
VALUES ('Alice', 'Smith', 'alice_smith', 'securepass', 'alice.smith@example.com', 2, 1, 'Marketing, Social Media', 'avatar.png', 'Marketing specialist.');

INSERT INTO user (firstname, lastname, username, password, email, type, active_status, skills, profile_picture, description)
VALUES ('Bob', 'Johnson', 'bob_j', 'bobspassword', 'bob.j@example.com', 1, 1, 'Data Analysis, Excel', 'bob_pic.jpg', 'Data analyst.');

INSERT INTO user (firstname, lastname, username, password, email, type, active_status, skills, profile_picture, description)
VALUES ('Eva', 'Brown', 'eva_brown', 'evapassword', 'eva.brown@example.com', 2, 0, 'Customer Service', 'eva_photo.jpg', 'Customer service representative.');

INSERT INTO user (firstname, lastname, username, password, email, type, active_status, skills, profile_picture, description)
VALUES ('Chris', 'Williams', 'chris_w', 'chrispass', 'chris.w@example.com', 1, 1, 'Project Management, Leadership', 'chris_pic.png', 'Project manager.');


-- Inserting products
INSERT INTO product (media_type, media, size, date, owner_id, price, status, title, description, tags, file_format, previews, thumbnail, category)
VALUES (1, 'image1.jpg', 2048, '2023-01-15 10:30:00', 1, 25.99, 1, 'Beautiful Landscape', 'A breathtaking landscape photo', 'nature, photography', 'JPEG', 'preview1.jpg', 'thumbnail1.jpg', 'Flowers');

INSERT INTO product (media_type, media, size, date, owner_id, price, status, title, description, tags, file_format, previews, thumbnail, category)
VALUES (2, 'audio_track.mp3', 5120, '2023-02-20 15:45:00', 2, 9.99, 2, 'Relaxing Music', 'A calming audio track for relaxation', 'music, relaxation', 'MP3', 'preview_audio.wav', 'thumbnail_audio.jpg', 'Social Media');

INSERT INTO product (media_type, media, size, date, owner_id, price, status, title, description, tags, file_format, previews, thumbnail, category)
VALUES (3, 'video_clip.mp4', 10240, '2023-03-10 18:00:00', 3, 35.50, 1, 'Adventure Documentary', 'Exciting documentary on travel and adventure', 'documentary, travel', 'MP4', 'preview_video1.mkv', 'thumbnail_video.jpg', 'Tech');

-- Inserting categories
INSERT INTO category (type) VALUES ('Flowers');
INSERT INTO category (type) VALUES ('Social Media');
INSERT INTO category (type) VALUES ('Tech');

-- Inserting media types
INSERT INTO media_type (type) VALUES ('Image');
INSERT INTO media_type (type) VALUES ('Audio');
INSERT INTO media_type (type) VALUES ('Video');

-- Inserting reviews
INSERT INTO review (product_id, rating, description, reviewed_by) VALUES (1, 4.5, "Absolutely stunning image! The clarity and colors are amazing. It's exactly what I was looking for to enhance my project. The download process was quick and easy. Will definitely be coming back for more.", 1);
INSERT INTO review (product_id, rating, description, reviewed_by) VALUES (1, 0.5, "Disappointed with the image quality. The colors looked different from what was advertised.", 2);
