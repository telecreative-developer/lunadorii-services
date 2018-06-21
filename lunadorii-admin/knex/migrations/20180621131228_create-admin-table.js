exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('admin', table => {
			table.increments('admin_id')
			table.string('username').unique()
			table.string('first_name')
			table.string('last_name')
			table.string('email').unique()
			table.string('password')
			table.timestamps(true, true)
		})
		.then(() => console.log('Admin table created'))
		.catch(() => console.log('There was an error with the admin table'))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('admin')
		.then(() => console.log('Admin table deleted'))
		.catch(() => console.log('there was an error deleting admin table'))
}
