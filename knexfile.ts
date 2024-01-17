import knex from 'knex';
import TYPES from 'tedious';

export const dbClient = knex({
  client: 'mssql',
  connection: {
    host: '127.0.0.1',
    port: 1433,
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'myapp_test',
    options: {
      mapBinding: value => {
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
    directory: './dblayer/migrations'
  },
  seeds: {
    directory: './dblayer/seeds'
  }
});