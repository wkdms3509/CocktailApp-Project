USE testcocktailsdb;

CREATE TABLE `user`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(30) NOT NULL,
    `user_id` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` VARCHAR(50),
    `salt` varchar(255),
    `auth` varchar(30) DEFAULT 'user',
    `create_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
