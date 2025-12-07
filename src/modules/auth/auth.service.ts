import bcrypt from "bcryptjs";
import { pool } from "../../Database/db";
import jwt from "jsonwebtoken";

export const secret = `${process.env.JWT_SECRET}`;
const loginToDb = async (email: string, password: string) => {
  const user = await pool.query(
    `  SELECT * FROM users WHERE email=$1
        `,
    [email]
  );
  if (user.rows.length === 0) {
    throw new Error("User not found");
  }
  const matchPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!matchPassword) {
    throw new Error("imvalid crenditials");
  }
  delete user.rows[0].password;

  const JwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  const token = jwt.sign(JwtPayload, secret, { expiresIn: "7d" });
  return { token, user: user.rows[0] };
};
export const AuthService = { loginToDb };
