exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('districts', table => {
			table.increments('district_id')
			table.string('district')
			table.integer('city_id')
			table.timestamps(true, true)

			table.foreign('city_id')
				.references('city_id')
				.inTable('cities')
		})
		.then(() => console.log('Districts table created'))
		.catch(() => console.log('There was an error with the districts table'))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('districts')
		.then(() => console.log('Districts table deleted'))
		.catch(() => console.log('there was an error deleting districts table'))
}
