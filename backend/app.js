const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./src/middleware/errorMiddleware");
const app = express();
dotenv.config({ path: "./process.env" });
const PORT = process.env.PORT || 8204;
try {
  const db = require("./src/database/dbConfig");
  db();
} catch (error) {
  console.log("Following error occured", error);
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "httpp://localhost:3000" }));

// Returns middleware that only parses json and only looks at requests where the
// Content-Type header matches the type option.
app.use(express.json());

app.use("/api/user", require("./src/routes/userRoutes"));
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(errorHandler);
module.exports = app;
