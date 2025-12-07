import type { NextFunction, Request, Response } from "express";
import { secret } from "../modules/auth/auth.service";
import { pool } from "../Database/db";
import jwt, { type JwtPayload } from "jsonwebtoken";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      console.log("Token:", token);

      if (!token) {
        return res.status(401).json({ error: "Token required" });
      }

      const decode = jwt.verify(token, secret) as JwtPayload;
      console.log("Decoded:", decode);

      // CORRECT: Parameters as second argument
      const result = await pool.query(
        `SELECT * FROM users WHERE email=$1`,
        [decode.email] // This is the correct way
      );

      console.log("Query result:", result.rows);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found!" });
      }

      // Attach user to request
      (req as any).user = result.rows[0];

      next();
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(401).json({ error: "Authentication failed" });
    }
  };
};
export default auth;
