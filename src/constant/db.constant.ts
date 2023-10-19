import * as dotenv from 'dotenv';
dotenv.config();
export const config = {
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  userName: process.env.MYSQL_USERNAME,
};
