import bcrypt from "bcryptjs";
import { pool } from "../../Database/db";

const createUserToDb = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const hashPassword = await bcrypt.hash(password as string, 12);
  // create user
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,phone,role)VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [name, email, hashPassword, phone, role]
  );
  delete result.rows[0].password;
  return result;
};
// all users

const getallUserFromDB = async () => {
  const result = await pool.query(
    `
      SELECT id,name,email,phone,role FROM users
    `
  );
  return result;
};
// get single user

const updateUserDetailsToDB = async (payload: Record<string, unknown>) => {
  const { name, email, phone, role } = payload.updatedData as {
    name: string;
    email: string;
    phone: string;
    role: string;
  };

  

  const result = await pool.query(
    `
      UPDATE users SET name=$1, email=$2,phone=$3,role=$4 WHERE id=$5 RETURNING *
    `,
    [name, email, phone, role, payload.id]
  );
  return result;
};

export const UserService = {
  createUserToDb,
  getallUserFromDB,
  updateUserDetailsToDB,
};
