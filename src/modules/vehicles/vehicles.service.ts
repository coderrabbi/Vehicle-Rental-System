import { pool } from "../../Database/db";

const createVehicleToDb = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
    INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  const reusltInNumber = result;
  return reusltInNumber;
};

const getAllVehiclesFromDB = async () => {
  const result = await pool.query(
    `SELECT * FROM vehicles
`
  );
  return result;
};

const getSingeVehiclesFromDB = async (payload: Record<string, unknown>) => {
  const { id } = payload;
  const result2 = await pool.query(
    `SELECT * FROM vehicles WHERE id=$1
`,
    [id]
  );
  return result2;
};

const updateVehicleToDB = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload.updatedData as {
    vehicle_name: string;
    type: string;
    registration_number: string;
    daily_rent_price: number;
    availability_status: string;
  };

  {
  }

  const result = await pool.query(
    `
      UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      payload.id,
    ]
  );
  return result;
};

const deleteVehicle = async (payload: Record<string, unknown>) => {
  const result = await pool.query(
    `
     DELETE FROM vehicles WHERE id=$1
    `,
    [payload.id]
  );
  return result;
};

export const VehiclesService = {
  createVehicleToDb,
  getAllVehiclesFromDB,
  getSingeVehiclesFromDB,
  updateVehicleToDB,
  deleteVehicle,
};
