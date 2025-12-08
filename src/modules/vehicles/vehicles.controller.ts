import type { Request, Response } from "express";
import { VehiclesService } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await VehiclesService.createVehicleToDb(req.body);
    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllVehiclesFromDB = async (req: Request, res: Response) => {
  try {
    const result = await VehiclesService.getAllVehiclesFromDB();

    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: result.rows,
      });
    } else
      res.status(200).json({
        success: true,
        message: "Vehicles retrieved successfully",
        data: result.rows,
      });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const getSingleVehiclesFromDB = async (req: Request, res: Response) => {
  try {
    const result = await VehiclesService.getSingeVehiclesFromDB(req.params);

    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: result.rows,
      });
    } else
      res.status(200).json({
        success: true,
        message: "Vehicles retrieved successfully",
        data: result.rows,
      });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const updateVehicleFromDB = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await VehiclesService.updateVehicleToDB({ updatedData, id });
    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const deleteVehicleFromDB = async (req: Request, res: Response) => {
  try {

      
    const result = await VehiclesService.deleteVehicle(req.params);
    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const VehiclesController = {
  createVehicle,
  getAllVehiclesFromDB,
  getSingleVehiclesFromDB,
  updateVehicleFromDB,
  deleteVehicleFromDB,
};
