const { body } = require("express-validator");
const { resultIsValid } = require("./validateHelper");
import { Request, Response, NextFunction } from "express";

const validateEmployee = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Something is wrong with the email"),
  body("name")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Name should not be empty")
    .trim()
    .escape(),
  body("surname")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Surname should not be empty")
    .trim()
    .escape(),
  body("phone")
    .exists()
    .isNumeric()
    .withMessage("Something is wrong with phone")
    .trim()
    .escape(),
  body("address")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Address shoud not be empty")
    .trim()
    .escape(),
  body("birthdate")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Birthdate should not be empty")
    .trim(),
  (request: Request, response: Response, next: NextFunction) =>
    resultIsValid(request, response, next),
];

module.exports = { validateEmployee };
