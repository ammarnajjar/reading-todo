CREATE SCHEMA readiing_todo;
DROP TABLE IF EXISTS readiing_todo.books;
CREATE TABLE readiing_todo.books (
  isbn varchar(50) PRIMARY KEY,
  title varchar(300),
  year char(4),
  category varchar(300),
  sub_category varchar(300)
);
COMMENT ON TABLE readiing_todo.books IS 'Book to read';
DROP TABLE IF EXISTS readiing_todo.authors;
CREATE TABLE readiing_todo.authors (isbn varchar(50), name varchar(300));
COMMENT ON TABLE readiing_todo.authors IS 'Auther of the book';
ALTER TABLE
  readiing_todo.authors
ADD
  FOREIGN KEY (isbn) REFERENCES readiing_todo.books (isbn);
SELECT
  *
FROM
  readiing_todo.books;
SELECT
  *
FROM
  readiing_todo.authors;
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
