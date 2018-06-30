exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('users', table => {
			table.increments()
			table.string('first_name')
			table.string('last_name')
			table.date('bod')
			table.string('avatar_url')
			table.string('email').unique()
			table.string('password')
			table.string('provider').defaultTo('local')
			table.timestamps(true, true)
		})
		.then(() => console.log('Users table created'))
		.catch(() => console.log('There was an error with the users table'))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('users')
		.then(() => console.log('Users table deleted'))
		.catch(() => console.log('there was an error deleting users table'))
}
