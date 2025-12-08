import express, { type Request, type Response } from "express";
import { userRoute } from "./modules/user/user.route";
import { initDB } from "./Database/db";
import { authRouter } from "./modules/auth/auth.route";
import { vehicleRoute } from "./modules/vehicles/vehicles.route";
import path from "path";
import dotenv from "dotenv";
import { bookingRouter } from "./modules/bookings/booking.route";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
app.use(express.json());

// connect database

initDB();

app.use("/api/v1/signup", userRoute);
app.use("/api/v1/signin", authRouter);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/vehicles", vehicleRoute);
app.use("/api/v1/bookings", bookingRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running",
    path: req.path,
  });
});
const currentDate = new Date();
console.log(currentDate);
const startDate = new Date("2024-01-15");
console.log(startDate);
app.listen(5000, () => {
  console.log(`server is running in port 5000`);
});
