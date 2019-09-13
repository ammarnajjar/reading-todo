drop table if exists schools_left;
create table schools_left (
  id integer constraint left_id_key primary key,
  left_school varchar(30)
);
drop table if exists schools_right;
create table schools_right (
  id integer constraint right_id_key primary key,
  right_school varchar(30)
);
insert into
  schools_left (id, left_school)
values
  (1, 'Oak Street School'),
  (2, 'Roosevelt High School'),
  (5, 'Washington Middle School'),
  (6, 'Jefferson High School');
insert into
  schools_right (id, right_school)
values
  (1, 'Oak Street School'),
  (2, 'Roosevelt High School'),
  (3, 'Morrison Elementary'),
  (4, 'Chase Magnet School'),
  (6, 'Jefferson High School');
select
  *
from
  schools_left
  join schools_right on schools_left.id = schools_right.id;
select
  *
from
  schools_left
  left join schools_right on schools_left.id = schools_right.id;
select
  *
from
  schools_left
  right join schools_right on schools_left.id = schools_right.id;
select
  *
from
  schools_left full
  outer join schools_right on schools_left.id = schools_right.id;
select
  *
from
  schools_left
  cross join schools_right;

select schools_left.id as left_id, schools_left.left_school, schools_right.right_school
from schools_left left join schools_right
on schools_left.id = schools_right.id
where schools_right.id is null;
