DROP TABLE IF EXISTS books;
CREATE TABLE books (
  isbn varchar(50) PRIMARY KEY,
  title varchar(300),
  year char(4),
  category varchar(300),
  sub_category varchar(300)
);
DROP TABLE IF EXISTS authors;
CREATE TABLE authors (isbn varchar(50), name varchar(300));
ALTER TABLE
  authors
ADD
  FOREIGN KEY (isbn) REFERENCES books (isbn);
SELECT
  *
FROM
  books;
SELECT
  *
FROM
  authors;
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
