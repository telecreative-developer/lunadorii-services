exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('banks', table => {
			table.increments('bank_id')
			table.string('bank')
			table.timestamps(true, true)
		})
		.then(() => console.log('Banks table created'))
		.catch(() => console.log('There was an error with the banks table'))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('banks')
		.then(() => console.log('Banks table deleted'))
		.catch(() => console.log('there was an error deleting banks table'))
}
