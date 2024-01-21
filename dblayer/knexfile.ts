import { Knex } from 'knex';
import * as dotenv from 'dotenv';
import { TYPES } from 'tedious';

dotenv.config({ path: '../.env' });

const config: Knex.Config =  {
  client: 'mssql',
  connection: {
    server: process.env.DB_HOST as string,
    userName: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME as string,
    port: 1433,
    options: {
      encrypt: true,
      mapBinding: (value: any) => {
        // bind all strings to varchar instead of nvarchar
        if (typeof value === 'string') {
          return {
            type: TYPES.VarChar,
            value
          };
        }

        // allow devs to pass tedious type at query time
        if (value != null && value.type) {
          return {
            type: value.type,
            value: value.value
          };
        }

        // undefined is returned; falling back to default mapping function
      }
    }
  },
  migrations: {
    directory: 'migrations',
    tableName: 'migrations_history',
    extension: 'ts',
  },
  seeds: {
    directory: 'seeds',
    extension: 'ts'
  }
};

export default config;