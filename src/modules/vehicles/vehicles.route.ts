import { Router } from "express";
import { VehiclesController } from "./vehicles.controller";

const router = Router();
router.post("/", VehiclesController.createVehicle);

export const vehicleRoute = router;
