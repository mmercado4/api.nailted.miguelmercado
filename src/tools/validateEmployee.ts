const { body } = require("express-validator");
const { resultIsValid } = require("./validateHelper");
import { Request, Response, NextFunction } from "express";

const validateEmployee = [
  body("email").isEmail().normalizeEmail(),
  body("name").exists().not().isEmpty().trim().escape(),
  body("surname").exists().not().isEmpty().trim().escape(),
  body("phone").exists().isNumeric().trim().escape(),
  body("address").exists().not().isEmpty().trim().escape(),
  body("birthdate").exists().not().isEmpty().trim(),
  (request: Request, response: Response, next: NextFunction) =>
    resultIsValid(request, response, next),
];

module.exports = { validateEmployee };
