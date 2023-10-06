USE testcocktailsdb;

CREATE TABLE `new_bookmark`
(
    `user_id` VARCHAR(50) NOT NULL,
    `item_ids` VARCHAR(50) DEFAULT NULL,
    `update_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP                
);