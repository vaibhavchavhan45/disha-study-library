import pool from "../../db/db.js";

export const checkTodayBooking = async (email) => {
  const result = await pool.query(
    `
    SELECT 1 FROM bookings
    WHERE email = $1
    AND DATE(created_at) = CURRENT_DATE
    `,
    [email]
  );

  return result.rows.length > 0;
};

export const insertBooking = async ({
  fullName,
  email,
  phone,
  fieldOfPreparation,
}) => {
  await pool.query(
    `
    INSERT INTO bookings (full_name, email, phone, field_of_preparation)
    VALUES ($1, $2, $3, $4)`,
    [fullName, email, phone, fieldOfPreparation]
  );
};

export const getAllBookings = async () => {
  const result = await pool.query(
    "SELECT * FROM bookings ORDER BY created_at ASC"
  );

  return result.rows;
};