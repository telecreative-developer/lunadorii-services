exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('provinces', table => {
			table.increments('province_id')
			table.string('province')
			table.timestamps(true, true)
		})
		.then(() => console.log('Provinces table created'))
		.catch(() => console.log('There was an error with the provinces table'))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('provinces')
		.then(() => console.log('Provinces table deleted'))
		.catch(() => console.log('there was an error deleting provinces table'))
}
