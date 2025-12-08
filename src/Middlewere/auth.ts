import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { secret } from "../modules/auth/auth.service";
import { pool } from "../Database/db";

const auth = (...role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      throw new Error("user unvalid");
    }
    const token = authHeader.split(" ")[1] as string;
    const decode = jwt.verify(token, secret) as JwtPayload;
    const user = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
`,
      [decode.email]
    );
    if (user.rows.length === 0) {
      throw new Error("User not found!");
    }
    req.user = decode;

    if (role.length && !role.includes(decode.role)) {
      res.status(403).json({
        success: false,
        message: "You have no permission",
        error: "You have no permission",
      });
    }
    next();
  };
};
export default auth;
