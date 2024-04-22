import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // url: process.env.DB_URL,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  logging: false,
  synchronize: false,
  // ssl: {
  //   rejectUnauthorized: true,
  // },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

//npm run migration:generate -- db/migrations/create_user_table
//npm run migration:run
