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
      SELECT daily_rent_price,availability_status FROM vehicles WHERE id = $1
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
  if (vehicleResult.rows[0].availability_status === "available") {
    const result = await pool.query(
      `
      INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) 
      VALUES($1, $2, $3, $4, $5) 
      RETURNING *
      `,
      [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
    );
    await pool.query(
      `
      UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
      [vehicle_id]
    );
    return result.rows[0];
  } else {
    throw new Error("Vehicle is not available for booking");
  }
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
const updateBookings = async (payload: Record<string, unknown>) => {
  const { user, params, body } = payload as {
    user: { role: string };
    params: { id: string };
    body: { status: string };
  };
  const status = body.status;
  const currentDate = new Date().toISOString().split("T")[0] ?? "";

  if (user.role === Roles.admin) {
    if (status === "returned") {
      const result = await pool.query(
        `  UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *
            `,
        [status, params.id as string]
      );
      await pool.query(
        `UPDATE vehicles SET availability_status = 'available' WHERE id = (SELECT vehicle_id FROM bookings WHERE id = $1)`,
        [params.id as string]
      );
      return result;
    } else {
      throw new Error("Please Enter the value 'cancelled' ");
    }
  }
  if (user.role === Roles.customer) {
    const rentStartDate = await pool.query(
      `
      SELECT rent_start_date FROM bookings WHERE id = $1
      `,
      [params.id]
    );
    const rentDate = rentStartDate.rows[0].rent_start_date;

    if (rentDate >= currentDate && status === "cancelled") {
      const result = await pool.query(
        `  UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *
            `,
        [status, params.id]
      );
      return result;
    } else {
      throw new Error("Please Enter the value 'cancelled' ");
    }
  } else {
    throw new Error("You are not allow to edit this");
  }
  

};

export const BookingServices = {
  createBookings,
  getALlBookings,
  updateBookings,
  //   markAsReturned,
};
