import { apiInit } from "./src/config/apiConfig";
import { Request, Response } from "express";
import fs from "fs";
import { Employee } from "./src/IEmployee";

const api = apiInit();
const PORT = 3001;

api.get("/employees", (request: Request, response: Response) => {
  try {
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
          birth: employee[6],
        };
      });
    return response.status(200).send(employees);
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
});

api.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/`)
);
