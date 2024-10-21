const express = require("express");
const app = express();
const cors = require("cors");

const authRoute = require("./router/auth-router");
// const contactRoute = require("./router/contact-router");
const tasksRoute = require("./router/task-router");
const userRoute = require("./router/user-router");
const projectRoute = require("./router/project-router");
const dashboardRoute = require("./router/dashboard-router")

const connectDb = require("./utilis/db");
require("dotenv").config();
const errorMiddleware = require("./middlewares/error-middleware");

// Enable CORS
app.use(cors());

// Handle JSON data from requests
app.use(express.json());

// Router
app.use("/api/auth", authRoute);
// app.use("/api/form", contactRoute);
app.use("/api/task", tasksRoute);
app.use("/api/user", userRoute);
app.use("/api/project", projectRoute);
app.use("/api/", dashboardRoute);

// Common error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
