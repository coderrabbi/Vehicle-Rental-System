import type { Request, Response } from "express";
import { VehiclesService } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await VehiclesService.createVehicleToDb(req.body);
    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      user: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const VehiclesController = { createVehicle };
