import type { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUserToDb(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const gellAlluser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getallUserFromDB();
    return res.status(201).json({
      success: true,
      message: "Users retrieved successfully",
      user: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Usercontroller = { createUser, gellAlluser };
