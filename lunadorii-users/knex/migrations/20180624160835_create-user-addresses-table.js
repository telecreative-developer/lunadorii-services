exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('user_addresses', table => {
			table.increments('user_address_id')
			table.string('address_name')
			table.string('recipient')
			table.integer('phone')
			table.float('longitude')
			table.float('latitude')
			table.integer('postal_code')
			table.text('address_detail')
			table.integer('province_id')
			table.integer('city_id')
			table.integer('id')
			table.timestamps(true, true)
		})
		.then(() => console.log('User addresses table created'))
		.catch(() => console.log('There was an error with the user addresses table'))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('user_addresses')
		.then(() => console.log('User addresses table deleted'))
		.catch(() => console.log('there was an error deleting user addresses table'))
}
