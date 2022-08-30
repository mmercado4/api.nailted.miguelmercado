import { apiInit } from "./src/config/apiConfig";

const EmployeesController = require("./src/controllers/employee");

const api = apiInit();
const PORT = process.env.PORT || 3001;

api.get("/employees", EmployeesController.getEmployees);

api.get("/employees/:id", EmployeesController.getEmployeeById);

api.post("/employees", EmployeesController.insertEmployee);

api.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/`)
);
