
const inquirer = require('inquirer');
const db = require("./config");
require('console.table');

// This starts the prompts when the user inputs "node server.js" in the command line.
const startChoiceMenu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "startChoiceMenu",
      message: "Please select an option below",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all employees",
        "Add a department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
      ],
    })
    .then((userChoice) => {
      switch (userChoice.startChoiceMenu) {
        case "View all Departments":
          viewAllDepartments();
          break;
        case "View all Roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add an Employee":
          addNewEmployee();
          break;
        case "Add a department":
          addNewDepartment();
          break;
        case "Add a Role":
          addNewRole();
          break;
        case "Update an Employee Role":
          updateEmployeeRole();
          break;
      }
    });
};

// This function is to view all the departments in the database
const viewAllDepartments = () => {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
    })
    .then(() => startChoiceMenu());
};

// This function is to view all the roles in the database
const viewAllRoles = () => {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.table(roles);
  })
    .then(() => startChoiceMenu());
};

// This function is to view all the employees in the database
const viewAllEmployees = () => {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => startChoiceMenu());
};

// This function is to add a new department to the database
const addNewDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the new department?",
      },
    ])
    .then((answers) => {
      const newDepartment = answers.department;

      db.addDepartment(newDepartment)
        .then(() => console.log(`Added ${newDepartment} to the database!`))
        .then(() => startChoiceMenu());
    });
};

//This function adds a new role to the database
const addNewRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message:
          'What is the salary of the new role? (numbers only! i.e. "1234")',
      },
    ])
    .then((answers) => {
      const title = answers.role;
      const salary = answers.salary;

      db.findAllDepartments().then(([rows]) => {
        let departments = rows;

        const departmentChoices = departments.map(({ name, id }) => ({
          name: name,
          value: id,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "department",
              message: "What department is the new role in?",
              choices: departmentChoices,
            },
          ])
          .then((answers) => {
            const newRole = {
              title: title,
              salary: salary,
              department: answers.department,
            };
            db.addRole(newRole)
              .then(() => console.log(`Added ${title} to the database!`))
              .then(() => startChoiceMenu());
          });
      });
    });
};

// This function is to add a new employee to the database and put them in the role the users assign
const addNewEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the new employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the new employee?",
      },
    ])
    .then((answers) => {
      const firstName = answers.firstName;
      const lastName = answers.lastName;

      db.findAllRoles().then(([rows]) => {
        let roles = rows;

        const roleChoices = roles.map(({ title, id }) => ({
          name: title,
          value: id,
        }));

        inquirer
          .prompt({
            type: "list",
            name: "roleId",
            message: "What role will this employee be assigned to?",
            choices: roleChoices,
          })
          .then((response) => {
            let roleId = response.roleId;

            db.findAllEmployees().then(([rows]) => {
              let employees = rows;

              const employeeChoices = employees.map(
                ({ first_name, last_name, id }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id,
                })
              );

              inquirer
                .prompt({
                  type: "list",
                  name: "managerId",
                  message: "What manager will this employee be assigned to?",
                  choices: employeeChoices,
                })
                .then((response) => {
                  let managerId = response.managerId;

                  const newEmployee = {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId,
                    manager_id: managerId,
                  };

                  db.addEmployee(newEmployee)
                    .then(() =>
                      console.log(
                        `Added ${firstName} ${lastName} to the database!`
                      )
                    )
                    .then(() => startChoiceMenu());
                });
            });
          });
      });
    });
};

// This function allows the user to change a role for a employee already in the database
const updateEmployeeRole = () => {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    console.log(employees);

    const employeeChoices = employees.map(
      ({ id, first_name, last_name, }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      })
    );

    db.findAllRoles().then(([rows]) => {
      let roles = rows;

      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee_id",
            message: "Which employee do you want to update?",
            choices: employeeChoices,
          },
          {
            type: "list",
            name: "role_id",
            message:
              'What new role would you like for your employee? Please use role ID#! (i.e. "4")',
            choices: roleChoices,
          },
        ])
        .then((response) => {
          db.updateEmployee(response)
            .then(() => console.log(`Updated ${response.employee_id} 's role!`))
            .then(() => startChoiceMenu());
        });
    });
  });
};



startChoiceMenu();