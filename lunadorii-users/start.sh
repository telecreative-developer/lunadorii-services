npm install
knex migration:latest
mv knex/seeds/dev/user_addresses.js knex/seeds/dev/user_addresses
mv knex/seeds/dev/user_banks.js knex/seeds/dev/user_banks
knex seed:run
mv knex/seeds/dev/user_addresses knex/seeds/dev/user_addresses.js
mv knex/seeds/dev/user_banks knex/seeds/dev/user_banks.js
mv knex/seeds/dev/users.js knex/seeds/dev/users
knex seed:run
mv knex/seeds/dev/users knex/seeds/dev/users.js