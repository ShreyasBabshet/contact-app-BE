const http = require("http");

const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRouts");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const app = express();

const port = process.env.port || 5001;
connectDb();
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/user", userRoutes);
app.use(errorHandler);
app.listen(port);
