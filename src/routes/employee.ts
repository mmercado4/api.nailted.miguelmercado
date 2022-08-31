const express = require("express");
const EmployeeController = require("../controllers/employee");
const { validateEmployee } = require("../tools/validateEmployee");

const router = express.Router();

router.get("/employees", EmployeeController.getEmployees);

router.get("/employees/:id", EmployeeController.getEmployeeById);

router.post("/employees", validateEmployee, EmployeeController.insertEmployee);

module.exports = router;
