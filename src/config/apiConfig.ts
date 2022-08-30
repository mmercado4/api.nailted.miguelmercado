const express = require("express");
const routes = require("../routes/employee");

const apiInit = () => {
  const api = express();

  api.use(express.json());
  api.use(express.urlencoded({ extended: true }));

  api.use("/", routes);

  return api;
};

export { apiInit };
