const express = require("express");

const apiInit = () => {
  const api = express();

  api.use(express.json());
  api.use(express.urlencoded({ extended: true }));

  return api;
};

export { apiInit };
