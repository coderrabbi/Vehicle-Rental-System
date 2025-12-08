import { Router } from "express";

import { BookingsController } from "./booking.controller";
import auth from "../../Middlewere/auth";
import { Roles } from "../auth/auth.constant";

const router = Router();
router.post("/", BookingsController.createBookings);
router.get(
  "/",
  auth(Roles.admin, Roles.customer),
  BookingsController.getALlBookings
);
router.put(
  "/:id",
  auth(Roles.admin, Roles.customer),
  BookingsController.updateBookings
);

export const bookingRouter = router;
