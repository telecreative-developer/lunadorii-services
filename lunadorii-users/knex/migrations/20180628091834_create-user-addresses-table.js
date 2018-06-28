exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('user_addresses', table => {
			table.increments('user_address_id')
			table.string('recepient')
			table.string('phone')
			table.float('longitude')
			table.float('latitude')
			table.integer('postal_code')
			table.text('detail_address')
			table.boolean('address_default')
			table.integer('province_id')
			table.integer('city_id')
			table.integer('district_id')
			table.integer('id')
			table.timestamps(true, true)

			table.foreign('province_id')
				.references('province_id')
				.inTable('provinces')

			table.foreign('city_id')
				.references('city_id')
				.inTable('cities')

			table.foreign('district_id')
				.references('district_id')
				.inTable('districts')

			table.foreign('id')
				.references('id')
				.inTable('users')
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
