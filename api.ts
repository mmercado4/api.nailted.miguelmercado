import { apiInit } from "./src/config/apiConfig";
import { Request, Response } from "express";
import fs from "fs";
import { Employee } from "./src/IEmployee";
import { ParsedQs } from "qs";

const api = apiInit();
const PORT = process.env.PORT || 3001;

interface Pagination {
  offset: number | string;
  limit: number | string;
}

api.get("/employees", (request: Request, response: Response) => {
  try {
    //FIXME: REFACTORIZAR ESTE EMPLOYEES PARA NO REPETIR
    let employees: Array<Employee> = fs
      .readFileSync("employees.txt", "utf-8")
      .split("\r")
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

    let query: Pagination | string | ParsedQs | string[] | ParsedQs[] =
      Object.keys(request.query).length > 0
        ? request.query
        : { offset: 0, limit: employees.length };
    let start: number = parseInt(query.offset as string);
    let end: number =
      parseInt(query.offset as string) + parseInt(query.limit as string);

    return response.status(200).send(employees.slice(start, end));
  } catch (error) {
    console.error("Something went wrong: ", error); //TODO: Valorar si es necesario incluir alguna respuesta con success
  }
});

api.get("/employees/:id", (request: Request, response: Response) => {
  try {
    let employees: Array<Employee> = fs
      .readFileSync("employees.txt", "utf-8")
      .split("\r")
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

    let { id } = request.params;
    let search: Employee | undefined = employees.find(
      (employee) => parseInt(id) === employee.id
    );
    if (search)
      response
        .status(200)
        .send(JSON.stringify({ success: true, data: search }));
    else throw new Error(`Employee ${id} does not exist`);
  } catch (error) {
    console.error("Something went wrong!", error);
    response.status(400).send(
      JSON.stringify({
        success: false,
        message: String(error),
      })
    );
  }
});

api.post("/employees", (request: Request, response: Response) => {
  let { body } = request;

  let employees: Array<Employee> = fs
    .readFileSync("employees.txt", "utf-8")
    .split("\r")
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

  let newId =
    employees.map((employee) => employee.id)[employees.length - 1] + 1;

  let newEmployee: String = [newId, ...Object.values(body)].join(",");

  try {
    fs.appendFile("employees.txt", ("\r" + newEmployee) as string, (error) => {
      if (error) throw new Error("Can not save new employee");
      response.status(200).send(
        JSON.stringify({
          success: true,
          message: "Employee saved successfully",
        })
      );
    });
  } catch (error) {
    console.error(error);
    response.status(400).send(
      JSON.stringify({
        success: false,
        message: error,
      })
    );
  }
});

api.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/`)
);
