const { apiInit } = require("./config/apiConfig");
const fs = require("fs");

const api = apiInit();
const PORT = 3001;

try {
  let employees = fs.readFileSync("employees.txt", "utf-8").split("\n");
  console.log(employees);
} catch (error) {}

api.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/`)
);
