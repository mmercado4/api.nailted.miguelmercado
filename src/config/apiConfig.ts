const express = require("express");
const routes = require("../routes/employee");
const cors = require("cors");

const apiInit = () => {
  const api = express();

  api.use(express.json());
  api.use(express.urlencoded({ extended: true }));

  // let corsOptions = {
  //   origin: ["*"],
  //   methods: ["GET", "PATCH", "PUT", "POST", "DELETE", "OPTIONS"],
  //   allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  // };

  api.use(cors());

  api.use("/", routes);

  return api;
};

export { apiInit };
