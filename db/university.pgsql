DROP TABLE IF EXISTS student;
CREATE TABLE student (
    name varchar(100),
    student_number int,
    class_nr int,
    major varchar (10)
);
INSERT INTO student
VALUES
('Smith', 17, 1, 'CS'),
('Brown', 8, 2, 'CS');

DROP TABLE if EXISTS course;
CREATE TABLE course (
    course_name varchar(100),
    course_number varchar(20),
    credit_hours int,
    department varchar(10)
);
INSERT INTO course
VALUES
('Intro', 'CS1310', 4, 'CS'),
('Data Structures', 'CS3320', 4, 'CS'),
('Discrete Mathematics', 'MATH2410', 3, 'MATH'),
('Database', 'CS3380', 3, 'CS');

DROP TABLE if EXISTS section;
CREATE TABLE section (
    section_id int,
    course_number varchar(20),
    semester varchar(20),
    year CHAR(2),
    instructor varchar(50)
);
insert into section
VALUES
(85, 'MATH2410', 'FALL', '07', 'King'),
(92, 'CS1310', 'FALL', '07', 'Anderson'),
(102, 'CS3320', 'Spring', '08', 'Knuth'),
(112, 'MATH2410', 'FALL', '08', 'Chang'),
(119, 'CS1310', 'FALL', '08', 'Anderson'),
(135, 'CS3380', 'FALL', '08', 'Stone');

DROP TABLE if EXISTS grade_report;
CREATE TABLE grade_report (
    student_number int,
    section_id int,
    grade CHAR(1)
);
insert into grade_report
VALUES
(17, 112, 'B'),
(17, 119, 'C'),
(8, 85, 'A'),
(8, 92, 'A'),
(8, 102, 'B'),
(8, 135, 'A');

DROP TABLE if EXISTS prerequisite;
CREATE TABLE prerequisite (
    course_number varchar(20),
    prerequisite_number varchar(20)
);
insert into prerequisite
VALUES
('CS3380', 'CS3320'),
('CS3380', 'MATH2410'),
('CS3320', 'CS1310');

select * from student;
select * from course;
select * from grade_report;
select * from section;
select * from prerequisite;

-- Retrieve the transcript—a list of all courses and grades—of ‘Smith’
select *
from student s
join grade_report g on s.student_number = g.student_number
join course c on s.major = c.department
where s.name = 'Smith';
