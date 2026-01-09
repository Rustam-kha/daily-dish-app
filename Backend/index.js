import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./connection.js";
import routes from "./routes.js";

dotenv.config();

const app = express();
const port = 5000;

connectDb();

app.use(
  cors({
   rigin: [
    "http://localhost:5173",                 
    "https://daily-dish-app.vercel.app"     
  ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
