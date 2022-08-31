import { fetchEmployees } from "../tools/fetchEmployees";
import { Request, Response } from "express";
import fs from "fs";
import { ParsedQs } from "qs";
import { Employee, Pagination } from "../tools/types";

exports.getEmployees = (request: Request, response: Response) => {
  try {
    let employees = fetchEmployees(); //TODO: sort and filter by email

    let query: Pagination | string | ParsedQs | string[] | ParsedQs[] =
      Object.keys(request.query).length > 0
        ? request.query
        : { offset: 0, limit: employees.length };
    let start: number = parseInt(query.offset as string);
    let end: number =
      parseInt(query.offset as string) + parseInt(query.limit as string);
    let result: Array<Employee> = employees.slice(start, end);
    if (result.length > 0)
      return response
        .status(200)
        .send(JSON.stringify({ success: true, data: result }));
    else throw new Error("Employees not found");
  } catch (error) {
    console.error(error);
    return response
      .status(400)
      .send(JSON.stringify({ success: false, message: String(error) }));
  }
};

exports.getEmployeeById = (request: Request, response: Response) => {
  try {
    let employees = fetchEmployees();

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
};

exports.insertEmployee = (request: Request, response: Response) => {
  let { body } = request;

  try {
    let employees = fetchEmployees();
    let newId =
      employees.map((employee) => employee.id)[employees.length - 1] + 1;
    let newEmployee: String = ["\r" + newId, ...Object.values(body)].join(",");

    fs.appendFile("employees.txt", newEmployee as string, (error) => {
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
};
