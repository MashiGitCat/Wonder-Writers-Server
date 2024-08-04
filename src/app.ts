import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import draftRoutes from "./routes/draftsRoutes";
import path from "path";
import helmet from "helmet";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(helmet());

const allowedOrigins = [
  "http://localhost:3000",
  "https://wonderwriters.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api", draftRoutes);

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const PORT: string = process.env.PORT || "8080";
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
