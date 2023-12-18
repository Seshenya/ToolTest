CREATE DATABASE IF NOT EXISTS `ARTSYNC` DEFAULT CHARACTER SET latin1;
USE `ARTSYNC`;

--
-- Table structure for table user
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `user_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `type` TINYINT NOT NULL,
    `active_status` TINYINT NOT NULL,
    `skills` TEXT,
    `profile_picture` VARCHAR(255),
    `description` TEXT
);

--
-- Table structure for table product
--

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
    `product_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `media_type` TINYINT NOT NULL,
    `media` TEXT NOT NULL,
    `size` INT NOT NULL,
    `date` TIMESTAMP NOT NULL,
    `owner_id` BIGINT NOT NULL,
    `price` DECIMAL(12,4) NOT NULL DEFAULT 0,
    `status` TINYINT NOT NULL,
    `title` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `tags` TEXT,
    `file_format` VARCHAR(50) NOT NULL,
    `previews` TEXT,
    `thumbnail` TEXT,
    `category` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`owner_id`) REFERENCES user(`user_id`) ON DELETE RESTRICT
);

ALTER TABLE `product` ADD FULLTEXT INDEX idx_title_tags (`title`, `tags`);

--
-- Table structure for table order
--

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
    `order_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `buyer_id` BIGINT NOT NULL,
    `status` TINYINT NOT NULL,
    FOREIGN KEY (`buyer_id`) REFERENCES user(`user_id`) ON DELETE CASCADE
);

--
-- Table structure for table order_items
--

DROP TABLE IF EXISTS `order_item`;

CREATE TABLE `order_item` (
    `order_item_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `product_id` BIGINT NOT NULL,
    `quantity` INT NOT NULL,
    `discounted_code` VARCHAR(50),
    `order_id` BIGINT NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES product(`product_id`) ON DELETE CASCADE,
    FOREIGN KEY (`order_id`) REFERENCES order(`order_id`) ON DELETE CASCADE
);

--
-- Table structure for table competition
--

DROP TABLE IF EXISTS `competition`;

CREATE TABLE `competition` (
    `competition_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `host_id` BIGINT NOT NULL,
    `title` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `deadline` TIMESTAMP NOT NULL,
    `rules` TEXT NOT NULL,
    `competition_content` TEXT NOT NULL,
    `previews` TEXT,
    `winner` VARCHAR(255),
    `status` TINYINT NOT NULL,
    FOREIGN KEY (`host_id`) REFERENCES user(`user_id`) ON DELETE CASCADE
);


-- Table structure for messages

CREATE TABLE IF NOT EXISTS message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX sender_receiver_idx (sender_id, receiver_id),
    FOREIGN KEY (sender_id) REFERENCES user(user_id),
    FOREIGN KEY (receiver_id) REFERENCES user(user_id)
) ENGINE=InnoDB;

--
-- Table structure for table category
--

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
    `type` VARCHAR(255) NOT NULL,
    UNIQUE INDEX `type_UNIQUE` (`type` ASC)
);

--
-- Alter Table product for foreign key category
--

ALTER TABLE `product`
ADD CONSTRAINT `fk_product_category`
FOREIGN KEY (`category`)
REFERENCES `category` (`type`)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

--
-- Table structure for table media_type
--

DROP TABLE IF EXISTS `media_type`;

CREATE TABLE `artsync`.`media_type` (
    `id` TINYINT AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(25) NOT NULL,
     UNIQUE INDEX `type_UNIQUE` (`type` ASC)
);

--
-- Alter Table product for foreign key media_type
--

ALTER TABLE `artsync`.`product`
ADD CONSTRAINT `fk_product_type`
FOREIGN KEY (`media_type`)
REFERENCES `media_type` (`id`)
ON DELETE NO ACTION
ON UPDATE NO ACTION;
