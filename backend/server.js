const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const notes = require("./data/note");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

// Routes Import //
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// ------------- //
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// Middleware Error //
app.use(notFound);
app.use(errorHandler);
// ---------------- //

app.listen(PORT, () => {
  console.log(`Server Is Running in http://localhost:${PORT} !`);
});
