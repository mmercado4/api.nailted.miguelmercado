const { validationResult } = require("express-validator");
import { Request, Response, NextFunction } from "express";

const resultIsValid = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let errors = validationResult(request);
  if (errors.isEmpty()) next();
  else
    response.status(403).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
};

module.exports = { resultIsValid };
