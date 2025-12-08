import type { Request, Response } from "express";
import { BookingServices } from "./booking.service";

const createBookings = async (req: Request, res: Response) => {
  try {
    const result = await BookingServices.createBookings(req.body);
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getALlBookings = async (req: Request, res: Response) => {
  try {
    const result = await BookingServices.getALlBookings(req.user!);
    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result?.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const updateBookings = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const user = req.user;
    const body = req.body;
    const result = await BookingServices.updateBookings({
      user,
      params,
      body,
    });
    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const BookingsController = {
  createBookings,
  getALlBookings,
  updateBookings,
};
