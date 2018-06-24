exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('cities', table => {
			table.increments('city_id')
			table.string('city')
			table.integer('province_id')
			table.timestamps(true, true)

			table.foreign('province_id')
				.references('province_id')
				.inTable('provinces')
		})
		.then(() => console.log('Cities table created'))
		.catch(() => console.log('There was an error with the cities table'))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('cities')
		.then(() => console.log('Cities table deleted'))
		.catch(() => console.log('there was an error deleting cities table'))
}
