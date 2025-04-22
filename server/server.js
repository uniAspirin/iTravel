import express from "express";
import cors from "cors";
import mysql2 from "mysql2/promise";
import bcrypt from "bcrypt";
import dbconfig from "./dbconfig.json" with {type: "json"};
import { userRouter } from "./routes/userRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { travelLogRouter } from "./routes/travelLogRoutes.js";
import { journeyPlanRouter } from "./routes/journeyPlanRoutes.js";


// connect to database
const db = await mysql2.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
});

console.log("Connected to MySQL");

const app = express()
const PORT = 3000;

app.use(express.json())
app.use(cors())

// routes
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/travel-logs", travelLogRouter)
app.use("/journey-plans", journeyPlanRouter)

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`)
})

export {app, db}

