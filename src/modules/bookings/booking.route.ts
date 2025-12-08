import { Router } from "express";

import { BookingsController } from "./booking.controller";
import Verify from "../../Middlewere/verify";
import auth from "../../Middlewere/auth";
import { Roles } from "../auth/auth.constant";

const router = Router();
router.post("/", BookingsController.createBookings);
router.get(
  "/",
  auth(Roles.admin, Roles.customer),
  BookingsController.getALlBookings
);

export const bookingRouter = router;
