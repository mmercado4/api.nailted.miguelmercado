const express = require("express");
const EmployeeController = require("../controllers/employee");
const { validateEmployee } = require("../tools/validateEmployee");

const router = express.Router();

router.get("/employees", EmployeeController.getAll);

router.get("/employees/:id", EmployeeController.getOne);

router.post("/employees", validateEmployee, EmployeeController.insert);

module.exports = router;
