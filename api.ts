import { apiInit } from "./src/config/apiConfig";
import { Request, Response } from "express";
import fs from "fs";
import { Employee } from "./src/IEmployee";
import { ParsedQs } from "qs";

const api = apiInit();
const PORT = 3001;

interface Pagination {
  offset: number | string;
  limit: number | string;
}

api.get(
  "/employees",
  (request: Request<any, any, ParsedQs>, response: Response) => {
    try {
      //FIXME: REFACTORIZAR ESTE EMPLOYEES PARA NO REPETIR
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
  }
);

api.get("/employees/:id", (request: Request, response: Response) => {
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

api.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/`)
);
