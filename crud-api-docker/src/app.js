const express = require("express");
const userRoutes = require("./routes/user.routes");
const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use(errorMiddleware);
module.exports = app;