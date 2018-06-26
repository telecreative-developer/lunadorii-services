exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('user_banks', table => {
			table.increments('user_bank_id')
			table.string('account_number')
			table.string('account_name')
			table.boolean('account_default')
			table.integer('bank_id')
			table.timestamps(true, true)

			table.foreign('bank_id')
				.references('bank_id')
				.inTable('banks')
		})
		.then(() => console.log('User banks table created'))
		.catch(() => console.log('There was an error with the user banks table'))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('user_banks')
		.then(() => console.log('User banks table deleted'))
		.catch(() => console.log('there was an error deleting user banks table'))
}
