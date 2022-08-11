INSERT INTO departments ( id, name )
    VALUES
    (1, "CEO"),
    (2, "Management"),
    (3, "Accounting"),
    (4, "Legal"),
    (5, "Human Resources"),
    (6, "IT"),
    (7, "Logistics");

INSERT INTO role ( id, title, salary, department_id )
    VALUES
    ( 1, "CEO", 200000, 1 ),
    ( 2, "Manager", 60000, 2),
    ( 3, "Assistant Manager", 45000, 2),
    ( 4, "Accountant", 72000, 3),
    ( 5, "Lawyer", 80000, 4),
    ( 6, "Paralegal", 65000, 4 ),
    ( 7, "Human Resources", 55000, 5),
    ( 8, "Developer", 85000, 6 ),
    ( 9, "IT Associate", 40000, 6),
    ( 10, "Logistics", 60000, 7);


INSERT INTO employee ( id, first_name, last_name, role_id, manager_id)
    VALUES
    ( 1, "Matt", "Gaither", 1, NULL),
    ( 2, "Diane", "Roads", 2, 1),
    ( 3, "Paul", "Moreman", 3, 2),
    ( 4, "Audrey", "Lindsey", 4, 1),
    ( 5, "Laura", "Cooper", 5, 1),
    ( 6, "Clare", "Brown", 6, 5),
    ( 7, "Josh", "Smith", 7, 1),
    ( 9, "William", "Dutton", 8, 1),
    ( 8, "Henry", "Duke", 9, 8),
    ( 10, "Catherine", "Narveaz", 10, 1);