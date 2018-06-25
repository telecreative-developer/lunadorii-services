exports.up = function(knex, Promise) {
  return knex.schema
		.createTable('reports', table => {
			table.increments('report_id')
			table.string('name')
			table.string('email')
			table.string('subject')
			table.text('content')
			table.boolean('read').defaultTo(false)
			table.timestamps(true, true)
		})
		.then(() => console.log('Reports table created'))
		.catch(() => console.log('There was an error with the reports table'))
}

exports.down = function(knex, Promise) {
  return knex.schema
		.dropTable('reports')
		.then(() => console.log('Reports table deleted'))
		.catch(() => console.log('There was an error deleting reports table'))
}

exports.config = {
	transaction: false
}