import { fetchEmployees } from "../tools/fetchEmployees";
import { Request, Response } from "express";
import fs from "fs";
import { ParsedQs } from "qs";
import { Employee, Pagination } from "../tools/types";

exports.getAll = (request: Request, response: Response) => {
  try {
    getEmployees(request, response);
  } catch (error) {
    throwError(error as Error, response);
  }
};

exports.getOne = (request: Request, response: Response) => {
  try {
    getEmployeeById(request, response);
  } catch (error) {
    throwError(error as Error, response);
  }
};

exports.insert = (request: Request, response: Response) => {
  try {
    insertEmployee(request, response);
  } catch (error) {
    throwError(error as Error, response);
  }
};

const getEmployees = (request: Request, response: Response) => {
  let result: Array<Employee> = fetchEmployees();
  let { query }: Pagination | string | ParsedQs | string[] | ParsedQs[] | any =
    request;
  let start: number = parseInt(query.offset as string) || 0;
  let end: number =
    parseInt(query.offset as string) + parseInt(query.limit as string) ||
    result.length;

  if (query.hasOwnProperty("email")) {
    result = result.filter((employee) =>
      new RegExp(query.email as string, "i").test(employee.email)
    );
  }

  if (query.hasOwnProperty("sort")) {
    let criteria: keyof Employee = query.sort;
    let ord1 = query.orderBy === "asc" ? -1 : 1;
    let ord2 = query.orderBy === "asc" ? 1 : -1;
    result = result.sort((a, b) => {
      if (a[criteria] > b[criteria]) return ord1;
      if (a[criteria] < b[criteria]) return ord2;
      return 0;
    });
  }

  let totalEmployees = result.length;

  result = result.slice(start, end);

  if (result.length > 0)
    return response
      .status(200)
      .send(
        JSON.stringify({ success: true, data: result, total: totalEmployees })
      );
  else throw new Error("Employees not found");
};

const getEmployeeById = (request: Request, response: Response) => {
  let employees = fetchEmployees();
  let { id } = request.params;
  let search: Employee | undefined = employees.find(
    (employee) => parseInt(id) === employee.id
  );

  if (search)
    response.status(200).send(JSON.stringify({ success: true, data: search }));
  else throw new Error(`Employee ${id} does not exist`);
};

const insertEmployee = (request: Request, response: Response) => {
  let { body } = request;
  let employees = fetchEmployees();
  let newId =
    employees.map((employee) => employee.id)[employees.length - 1] + 1;
  let newEmployee: String = ["\n" + newId, ...Object.values(body)].join(",");

  fs.appendFile("employees.txt", newEmployee as string, (error) => {
    if (error) throw new Error("Can not save new employee");
    response.status(200).send(
      JSON.stringify({
        success: true,
        message: "Employee saved successfully",
        id: newId,
      })
    );
  });
};

const throwError = (error: Error, response: Response) => {
  console.error("Something went wrong!", error);
  response.status(400).send(
    JSON.stringify({
      success: false,
      message: String(error),
    })
  );
};
