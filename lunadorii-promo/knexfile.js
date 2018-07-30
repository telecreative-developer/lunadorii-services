require("dotenv").config({ path: __dirname + "/./../../.env" })

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_DEV,
    migrations: {
      directory: "./knex/migrations"
    },
    seeds: {
      directory: "./knex/seeds/dev"
    }
  },

  test: {
    client: "pg",
    connection: process.env.DATABASE_TEST,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/test"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_PROD,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/production"
    }
  }
}
