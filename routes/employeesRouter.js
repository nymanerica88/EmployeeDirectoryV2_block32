//imported Express Router and employees from employees.js
import {Router} from "express";
import employees from "#db/employees";

//creates a new object that the routes can be attached to
//conceptually, it's a container for the routes
const router = Router();

//GET employees -- sends back the list of all employees
router.get("/", (req,res) => {
res.send(employees);
});

//GET employees/random -- sends back a random employee from the list
router.get("/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * employees.length);
    res.send(employees[randomIndex]);
});


//GET employees/:id -- sends back the employee from the corresponding id number inserted into the URL after employees/#
//req.params.id ensures that it's always a string that is returned back
//find searches the first element that matches in an array of objects
//(e => e.id === id) checks each employee id for a match to the one that was entered into the URL
//if (!employee)... returns "Employee not found" if the inserted id number did not match any of the id numbers in the array
//res.send(employee) returns the employee back to the user if an employee was found
//status 404 means Not Found
router.get ("/:id", (req, res) => {
    const id = Number(req.params.id);
    const employee = employees.find(e => e.id === id);

    if (!employee) {
        return res.status(404).send("Employee not found");
    }
    res.send(employee);
});

//req.body(.name) contains the data sent by the client in the request (and accesses the name property)
//if (!name) shows a message of "Name is required" if the name was missing
//status 400 means the client sent a bad request 
router.post("/", (req, res) => {
    const name = req.body.name;
    if (!name) {
        return res.status(400).send("Name is required");
    }

//const newEmployee creates a new employee object in memory
//employees.length is how many employees are in the array and adding one gives it a new unique ID Number
//name:name sets the name of the new employee to the user input 
//push adds the newEmployee to the array 
//status 201 means a new item was created
    const newEmployee = {
        id: employees.length +1,
        name: name,
    };
    employees.push(newEmployee);
    res.status(201).send(newEmployee);
});

export default router; 