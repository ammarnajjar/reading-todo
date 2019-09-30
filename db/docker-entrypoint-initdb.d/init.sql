CREATE SCHEMA readiing_todo;
DROP TABLE IF EXISTS readiing_todo.book;
CREATE TABLE readiing_todo.book (
  isbn varchar(50) PRIMARY KEY,
  title varchar(300),
  year char(4),
  category varchar(300),
  sub_category varchar(300)
);
COMMENT ON TABLE readiing_todo.book IS 'Book to read';
DROP TABLE IF EXISTS readiing_todo.author;
CREATE TABLE readiing_todo.author (id bigserial PRIMARY KEY, name varchar(300));
COMMENT ON TABLE readiing_todo.author IS 'Auther of the book';
DROP TABLE IF EXISTS readiing_todo.book_author;
CREATE TABLE readiing_todo.book_author (book_isbn varchar(50), author_id bigint);
COMMENT ON TABLE readiing_todo.book_author IS 'Book <-> Author';
ALTER TABLE
  readiing_todo.book_author
ADD
  FOREIGN KEY (book_isbn) REFERENCES readiing_todo.book (isbn);
ALTER TABLE
  readiing_todo.book_author
ADD
  FOREIGN KEY (author_id) REFERENCES readiing_todo.author (id);
SELECT
  *
FROM
  readiing_todo.book;
SELECT
  *
FROM
  readiing_todo.author;
SELECT
  *
FROM
  readiing_todo.book_author;
-- Show databases
SELECT
  *
FROM
  pg_database;
-- Show Tables
SELECT
  *
FROM
  pg_catalog.pg_tables
WHERE
  schemaname != 'pg_catalog'
  AND schemaname != 'information_schema';
