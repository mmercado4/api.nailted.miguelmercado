import { apiInit } from "./src/config/apiConfig";

const api = apiInit();
const PORT = process.env.PORT || 3001;

api.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/`)
);
