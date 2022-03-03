DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS author;
Create TABLE author(
  id_author BIGINT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(250) NOT NULL,
  last_name VARCHAR(250) NOT NULL
);
CREATE TABLE category (
  id_category BIGINT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(250) NOT NULL
);
CREATE TABLE article (
  id_article BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  publication_date TIMESTAMP NOT NULL,
  content TEXT(1000),
  id_author BIGINT NOT NULL,
  id_category BIGINT NOT NULL
);