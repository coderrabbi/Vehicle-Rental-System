import type { Request, Response } from "express";
import { BookingServices } from "./booking.service";
import { Roles } from "../auth/auth.constant";

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
    const result = await BookingServices.getALlBookings(req.params);
    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      user: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const BookingsController = { createBookings, getALlBookings };
