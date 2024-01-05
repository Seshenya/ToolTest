-- Drop the existing foreign key constraint
ALTER TABLE `product` DROP FOREIGN KEY `fk_product_category`;

--
-- Table structure for table category
--

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
    `id` TINYINT AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(255) NOT NULL,
    UNIQUE INDEX `type_UNIQUE` (`type` ASC)
);

-- Inserting all existing categories
INSERT INTO category (type) VALUES ('Flowers');
INSERT INTO category (type) VALUES ('Social Media');
INSERT INTO category (type) VALUES ('Tech');


-- Make sure all the product categories are added to the category table.
-- Disable safe update mode
SET SQL_SAFE_UPDATES = 0;
-- Update the `product` table to replace category type with category ID

UPDATE `product`
SET `category` = (
    SELECT `id` FROM `category` WHERE `type` = `product`.`category`
);

-- Alter the column to TINYINT NOT NULL
ALTER TABLE `product` MODIFY COLUMN `category` TINYINT NOT NULL;

-- Add the new foreign key constraint
ALTER TABLE `product`
ADD CONSTRAINT `fk_product_category`
FOREIGN KEY (`category`)
REFERENCES `category` (`id`)
ON DELETE NO ACTION
ON UPDATE NO ACTION;
