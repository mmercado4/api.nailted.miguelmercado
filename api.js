const { apiInit } = require("./config/apiConfig");

const api = apiInit();
const PORT = 3001;

api.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/`)
);
