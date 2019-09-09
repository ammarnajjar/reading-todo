DROP TABLE IF EXISTS todo;
CREATE TABLE todo (id serial PRIMARY KEY, title varchar);
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
