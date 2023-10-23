import * as dotenv from 'dotenv';
const ENV = process.env.NODE_ENV;
dotenv.config({
  path: !ENV ? '.env.dev' : `.env.${ENV}`,
});
export const config = {
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  userName: process.env.MYSQL_USERNAME,
};
