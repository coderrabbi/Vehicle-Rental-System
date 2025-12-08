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
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await UserService.updateUserDetailsToDB({ updatedData, id });
    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "updated successfully",
        user: result.rows,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Usercontroller = { createUser, gellAlluser, updateSingleUser };
