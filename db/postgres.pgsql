DROP TABLE IF EXISTS number_data_types;
CREATE TABLE number_data_types (
  numeric_column numeric(20, 5),
  real_column real,
  double_column double precision
);
INSERT INTO
  number_data_types
VALUES
  (.7,.7,.7),
  (2.13579, 2.13579, 2.13579),
  (2.1357987654, 2.1357987654, 2.1357987654);
SELECT
  *
FROM
  number_data_types;
SELECT
  numeric_column * 100000000 AS "Fixed",
  real_column * 100000000 AS "Float"
FROM
  number_data_types
WHERE
  numeric_column =.7;
DROP TABLE IF EXISTS date_time_types;
CREATE TABLE date_time_types (
    timestamp_column timestamp with time zone,
    interval_column interval
  );
INSERT INTO
  date_time_types
VALUES
  ('2018-12-31 01:00 EST', '2 days'),
  ('2018-12-31 01:00 -8', '1 month'),
  ('2018-12-31 01:00 CET', '1 century'),
  (now(), '1 week');
SELECT
  *
FROM
  date_time_types;
SELECT
  timestamp_column,
  interval_column,
  timestamp_column - interval_column AS new_date
FROM
  date_time_types;

SELECT timestamp_column, CAST(timestamp_column AS varchar(10))
FROM date_time_types;

SELECT numeric_column ,
  CAST(numeric_column AS integer),
  numeric_column::varchar(6)
  FROM number_data_types;

COPY date_time_types
TO '/data/date_time_types.csv'
WITH (FORMAT csv, HEADER);

DROP TABLE IF EXISTS sale_records;
CREATE TABLE sale_records (
  region varchar(100),
  country varchar(100),
  item_type varchar(50),
  sales_channel varchar(10),
  order_priority char(1),
  order_date date,
  order_id bigint,
  ship_date date,
  units_sold int,
  unit_price real,
  unit_cost real,
  total_revenue numeric(20, 2),
  total_cost numeric(20, 2),
  total_profit numeric(20, 2)
)
COPY sale_records
FROM '/data/sale_records.csv'
WITH (FORMAT csv, HEADER);
SELECT * FROM sale_records
LIMIT 5;

CREATE TEMPORARY TABLE sales_recs (LIKE sale_records);
CREATE TEMPORARY TABLE sales_temp (LIKE sale_records);
COPY sales_temp
FROM '/data/sale_records.csv'
WITH (FORMAT csv, HEADER);
INSERT INTO sales_recs (units_sold, unit_price, unit_cost, total_cost)
SELECT units_sold, unit_price, unit_cost, units_sold * unit_cost
FROM sales_temp
LIMIT 4;
SELECT * FROM sales_recs;
DROP TABLE IF EXISTS sales_temp;
DROP TABLE IF EXISTS sales_recs;
