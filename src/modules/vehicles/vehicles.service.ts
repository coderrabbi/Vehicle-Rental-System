import { pool } from "../../Database/db";

const createVehicleToDb = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,

    availability_status,
  } = payload;
  const result = await pool.query(
    `
    INSERT INTO vehicles(vehicle_name,type,registration_number,availability_status) VALUES($1,$2,$3,$4) RETURNING *
    `,
    [vehicle_name, type, registration_number, availability_status]
  );
  return result;
};

export const VehiclesService = { createVehicleToDb };
