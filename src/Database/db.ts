import path from "path";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const pool = new Pool({
  connectionString: `${process.env.CONNECT_STR}`,
});
console.log(`${process.env.CONNECT_STR}`);
export const initDB = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 6),
      phone VARCHAR(20) NOT NULL,
      role VARCHAR(50) NOT NULL
    )`
  );

  await pool.query(
    `CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(200) NOT NULL,
      type VARCHAR(50),
      registration_number VARCHAR(255) UNIQUE NOT NULL,
      daily_rent_price DECIMAL(10,2) NOT NULL CHECK (daily_rent_price > 0),
      availability_status VARCHAR(50) NOT NULL
    )`
  );
  console.log("database connected");
};
