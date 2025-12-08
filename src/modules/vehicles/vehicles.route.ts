import { Router } from "express";
import { VehiclesController } from "./vehicles.controller";
import auth from "../../Middlewere/auth";

const router = Router();
router.post("/", auth("admin"), VehiclesController.createVehicle);
router.get("/", VehiclesController.getAllVehiclesFromDB);
router.get("/:id", VehiclesController.getSingleVehiclesFromDB);
router.put("/:id", auth("admin"), VehiclesController.updateVehicleFromDB);
router.delete("/:id", auth("admin"), VehiclesController.deleteVehicleFromDB);

export const vehicleRoute = router;
