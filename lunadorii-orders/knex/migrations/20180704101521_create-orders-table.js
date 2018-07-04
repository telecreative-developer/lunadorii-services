exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('orders', table => {
			table.increments('order_id')
			table.string('order_no').unique()
			table.integer('user_address_id')
			table.integer('id')
			table.timestamps(true, true)

			table.foreign('user_address_id')
				.references('user_address_id')
				.inTable('user_addresses')

			table.foreign('id')
				.references('id')
				.inTable('users')
		})
		.then(() => console.log('Orders table created'))
		.catch(() => console.log('There was an error with the orders table'))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('orders')
		.then(() => console.log('Orders table deleted'))
		.catch(() => console.log('there was an error deleting orders table'))
}
