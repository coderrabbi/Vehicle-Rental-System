import type { Request, Response } from "express";
import { UserService } from "./user.service";
import { Roles } from "../auth/auth.constant";

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
    const requestingUser = req.user;
    const id = req.params.id;
    const updatedData = req.body;
    const hasPermission =
      requestingUser?.id === id || requestingUser?.role === Roles.admin;
    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this user",
      });
    }
    const result = await UserService.updateUserDetailsToDB({
      updatedData,
      id,
    });
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    
    const result = await UserService.deleteUser(req.params);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const Usercontroller = {
  createUser,
  gellAlluser,
  updateSingleUser,
  deleteUser,
};
