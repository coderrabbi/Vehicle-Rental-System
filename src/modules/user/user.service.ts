import bcrypt from "bcryptjs";
import { pool } from "../../Database/db";
import Verify from "../../Middlewere/verify";

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

const deleteUser = async (payload: Record<string, unknown>) => {
  const activeBookingsCheck = await pool.query(
    `SELECT COUNT(*) as active_count 
         FROM bookings 
         WHERE customer_id = $1 
         AND status = 'active'`,
    [payload.id]
  );
  const activeBookingsCount = parseInt(
    activeBookingsCheck.rows[0].active_count
  );

  if (activeBookingsCount > 0) {
    throw new Error(
      `Cannot delete user with ${activeBookingsCount} active bookings. Cancel all active bookings first.`
    );
  }
  const result = await pool.query(
    `
    DELETE FROM users where id=$1
    `,
    [payload.id]
  );
  return result;
};
export const UserService = {
  createUserToDb,
  getallUserFromDB,
  updateUserDetailsToDB,
  deleteUser,
};
