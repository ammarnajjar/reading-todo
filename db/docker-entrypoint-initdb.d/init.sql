CREATE SCHEMA reading;
DROP TABLE IF EXISTS reading.book;
CREATE TABLE reading.book (
  isbn varchar(50) PRIMARY KEY,
  title varchar(300),
  year char(4),
  category varchar(300),
  sub_category varchar(300)
);
COMMENT ON TABLE reading.book IS 'Book to read';
DROP TABLE IF EXISTS reading.author;
CREATE TABLE reading.author (id bigint PRIMARY KEY, name varchar(300));
COMMENT ON TABLE reading.author IS 'Auther of the book';
DROP TABLE IF EXISTS reading.book_author;
CREATE TABLE reading.book_author (
  book_isbn varchar(50),
  author_id bigint,
  PRIMARY KEY (book_isbn, author_id)
);
COMMENT ON TABLE reading.book_author IS 'Book <-> Author';
ALTER TABLE
  reading.book_author
ADD
  FOREIGN KEY (book_isbn) REFERENCES reading.book (isbn);
ALTER TABLE
  reading.book_author
ADD
  FOREIGN KEY (author_id) REFERENCES reading.author (id);
CREATE FUNCTION "book_authorsByBookId"(b reading.book)
RETURNS setof reading.author AS $$
SELECT
  author.*
FROM
  reading.author
  INNER JOIN reading.book_author ON (reading.book_author.author_id = author.id)
WHERE
  reading.book_author.book_isbn = b.isbn;
$$ LANGUAGE SQL stable;

INSERT INTO
  reading.book (isbn, title, year, category, sub_category)
VALUES
  ('12345', 'book1', '1990', 'cat1', 'sub-cat1');
INSERT INTO
  reading.author (id, name)
VALUES
  (1, 'author 1');
INSERT INTO
  reading.book_author (book_isbn, author_id)
VALUES
  ('12345', 1);

SELECT
  *
FROM
  reading.book;
SELECT
  *
FROM
  reading.author;
SELECT
  *
FROM
  reading.book_author;
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
