USE testcocktailsdb;

CREATE TABLE `cocktail2`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '아이템 식별값',
    `name` VARCHAR(50) NOT NULL COMMENT '아이템 이름',
    `type` VARCHAR(50) NOT NULL COMMENT '아이템 타입',
    `img` VARCHAR(255) NOT NULL COMMENT '아이템 이미지',
    `description` VARCHAR(500) DEFAULT NULL COMMENT '아이템 설명',
    `alcohol` VARCHAR(50) DEFAULT NULL COMMENT '아이템 도수',
    `sugar` VARCHAR(50) DEFAULT NULL COMMENT '아이템 당도',
    `sourness` VARCHAR(50) DEFAULT NULL COMMENT '아이템 산미',
    `bitter` VARCHAR(50) DEFAULT NULL COMMENT '아이템 쓴맛',
    `recipe` VARCHAR(50) DEFAULT NULL COMMENT '아이템 레시피',
    `create_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

