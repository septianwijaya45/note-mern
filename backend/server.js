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

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const data = notes.find((n) => n._id === req.params.id);
  res.json(data);
});

// Routes Import //
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// ------------- //
app.use("/api/users", userRoutes);

// Middleware Error //
app.use(notFound);
app.use(errorHandler);
// ---------------- //

app.listen(PORT, () => {
  console.log(`Server Is Running in http://localhost:${PORT} !`);
});
