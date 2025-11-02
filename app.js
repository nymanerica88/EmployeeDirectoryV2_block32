import express from "express";
import employees from "#db/employees";
const app = express();

app.use(express.json());


app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.route("/employees").get((req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
app.route("/employees/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

app.route("/employees/:id").get((req, res) => {
  const { id } = req.params;
  
  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);
  
  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  
  res.send(employee);
});

//Middleware 500 Error-Handling
//app.use adds the middleware
//err,req,res,next are the four parameters of middleware
//err.stack -- err is an error object in JavaScript; .stack shows where the error happened in your code 
//500 means Internal Server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500 Error-Handling Middleware");
});

export default app;
