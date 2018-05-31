exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('users', table => {
			table.increments()
			table.string('name')
			table.string('age')
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
