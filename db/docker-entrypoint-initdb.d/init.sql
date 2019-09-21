DROP TABLE IF EXISTS books;
CREATE TABLE books (
  id serial PRIMARY KEY,
  title varchar(200),
  category varchar(100),
  sub_category varchar(100),
  year CHAR(4),
  author varchar(200)
);
SELECT
  *
FROM
  books;
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
