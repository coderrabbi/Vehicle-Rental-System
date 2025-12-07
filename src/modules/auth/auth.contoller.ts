import type { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginToDb(
      req.body.email,
      req.body.password
    );
    return res.status(201).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const AuthController = { loginUser };
