import type { NextFunction, Request, Response } from "express";
import { AuthService, secret } from "../modules/auth/auth.service";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../Database/db";

const tokenVerify = (id: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("user unvalid");
    }
    const token = authHeader.split(" ")[1] as string;
    const decode = jwt.verify(token, secret) as JwtPayload;
    const user = await pool.query(
      `
      SELECT * FROM users WHERE id=$1
`,
      [decode.id]
    );
    if (user.rows[0].id === id || user.rows[0].role === "admin")
      if (user.rows.length === 0) {
        throw new Error("User not found!");
      }
    req.user = decode;

    next();
  };
};
export default tokenVerify;
