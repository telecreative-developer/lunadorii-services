exports.up = function(knex, Promise) {
  return knex.schema
		.createTable('product_categories', table => {
			table.increments('product_category_id')
			table.string('category')
			table.timestamps(true, true)
		})
		.then(() => console.log('Product Categories table created'))
		.catch(() => console.log('There was an error with the Product Categories table'))
}

exports.down = function(knex, Promise) {
  return knex.schema
		.dropTable('product_categories')
		.then(() => console.log('Product Categories table deleted'))
		.catch(() => console.log('There was an error deleting Product Categories table'))
}

exports.config = {
	transaction: false
}