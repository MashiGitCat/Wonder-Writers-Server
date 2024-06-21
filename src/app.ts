import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import draftRoutes from "./routes/draftsRoutes"
dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api", draftRoutes); 

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
