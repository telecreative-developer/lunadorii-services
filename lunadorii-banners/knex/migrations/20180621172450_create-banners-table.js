exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('banners', table => {
			table.increments('banner_id')
			table.string('title')
			table.string('thumbnail_url')
			table.timestamps(true, true)
		})
		.then(() => console.log('Banners table created'))
		.catch(() => console.log('There was an error with the banners table'))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('banners')
		.then(() => console.log('Banners table deleted'))
		.catch(() => console.log('there was an error deleting banners table'))
}
