// import pg from 'pg';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import * as schema from '@shared/schema';

// const { Pool } = pg;

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// export const db = drizzle(pool, { schema });

import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Neon requires this for SSL
  },
});

export const db = drizzle(pool, { schema });
