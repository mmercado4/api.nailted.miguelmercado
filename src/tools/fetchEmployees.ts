import fs from "fs";
import { Employee } from "./types";

const fetchEmployees = () => {
  let employees: Array<Employee> = fs
    .readFileSync("employees.txt", "utf-8")
    .split("\n")
    .map((data: String) => {
      let employee: Array<string> = data.split(",");
      return {
        id: parseInt(employee[0]),
        name: employee[1],
        surname: employee[2],
        address: employee[3],
        phone: employee[4],
        email: employee[5],
        birthdate: employee[6],
      };
    });
  return employees;
};

export { fetchEmployees };
