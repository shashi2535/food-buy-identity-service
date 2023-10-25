import * as dotenv from 'dotenv';
const ENV = process.env.NODE_ENV;
dotenv.config({
  path: !ENV ? '.env.dev' : `.env.${ENV}`,
});
export const config = {
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  userName: process.env.DB_USER,
  JWT: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};
