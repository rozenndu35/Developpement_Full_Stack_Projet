INSERT INTO author (first_name, last_name) VALUES
  ('firstName1', 'lastName1'),
  ('firstName2', 'lastName2'),
  ('firstName3', 'lastName3');
INSERT INTO category (category_name) VALUES
  ('categoryName1'),
  ('categoryName2'),
  ('categoryName3');
  INSERT INTO article (title, publication_date, content, id_author, id_category) VALUES
  ('title1', '2022-01-01', 'article1' , '1', '1'),
  ('title2', '2022-02-02', 'article2', '2', '2'),
  ('title3', '2022-03-03', 'article3', '3', '3');

  INSERT INTO users (username, password) VALUES
      ('user', '$2y$10$g3o9pkK/h62GIeX/FvkoL.SAoxa0uN9pQohNC71SimcKIYc4KrbNq');