import { pool } from "../../Database/db";
import { Roles } from "../auth/auth.constant";

const createBookings = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } =
    payload as {
      customer_id: number;
      vehicle_id: number;
      rent_start_date: string;
      rent_end_date: string;
    };

  const vehicleResult = await pool.query(
    `
      SELECT daily_rent_price FROM vehicles WHERE id = $1
      `,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error(`Vehicle with ID ${vehicle_id} not found`);
  }
  const dailyRentPrice = Number(vehicleResult.rows[0].daily_rent_price);

  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);

  if (startDate >= endDate) {
    throw new Error("End date must be after start date");
  }
  const timeDifference = endDate.getTime() - startDate.getTime();
  const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const totalPrice = dailyRentPrice * numberOfDays;

  const result = await pool.query(
    `
      INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) 
      VALUES($1, $2, $3, $4, $5) 
      RETURNING *
      `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
  );

  return result.rows[0];
};

const getALlBookings = async (payload: Record<string, unknown>) => {
  if (payload.role === Roles.admin) {
    const result = await pool.query(`
        
        SELECT * FROM bookings
        
        `);
    return result;
  } else {
    if (payload.role === Roles.customer) {
      const result = await pool.query(
        `
        
        SELECT * FROM bookings WHERE customer_id=$1
        
        `,
        [payload.id]
      );
      return result;
    }
  }
};
const updateBookings = async () => {
  const result = await pool.query(`
        
        SELECT * FROM bookings
        
        `);
  return result;
};
export const BookingServices = { createBookings, getALlBookings };
