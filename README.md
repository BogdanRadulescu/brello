# Zero to Hero

## Setup

* Install [nvm](https://github.com/coreybutler/nvm-windows/releases)
* Run `nvm use` from the project root
* Run `npm i`

## env files

* Copy `.env.template` to `.env`
* Fill in the values with secrets

## Running the server

To run the development server:
```
npm run dev
```

To run the linter:
```
npm run lint
```

## Migrations

The migration system is available in the `dblayer` project. For a list of all commands available, check `dblayer/package.json`, but the most important ones are:
* `npm run migrate:list`
* `npm run migrate:latest` - runs all new migrations in order
* `npm run migrate:rollback` - rolls back all migrations
* `npm run migrate:make <migration_name>` - generate a new migration file, available in `dblayer/migrations`

