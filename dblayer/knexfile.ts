const knex = require('knex');
const TYPES = require('tedious');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

module.exports = {
  client: 'mssql',
  connection: {
    host: process.env.DB_HOST,
    port: 1433,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    encrypt: true,
    options: {
      mapBinding: (value: { type: any; value: any; } | null) => {
        // bind all strings to varchar instead of nvarchar
        if (typeof value === 'string') {
          return {
            type: TYPES.TYPES.VarChar,
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