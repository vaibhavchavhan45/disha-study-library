import pg from "pg";
import config from "../config/config.js";

const { Pool } = pg;

const pool = new Pool({
  connectionString: config.databaseUrl,
});

export default pool;