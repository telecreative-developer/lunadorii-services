exports.up = function(knex, Promise) {
  return knex.schema.createTable('wishlist', table => {
			table.increments('wishlist_id')
			table.integer('product_id')
			table.integer('id')
			table.timestamps(true, true)

			table.foreign('product_id')
				.references('product_id')
				.inTable('products')
			table.foreign('id')
				.references('id')
				.inTable('users')
		})
		.then(() => console.log('Wishlist table created'))
		.catch(() => console.log('There was an error with the wishlist table'))
}

exports.down = function(knex, Promise) {
  return knex.schema
		.dropTable('wishlist')
		.then(() => console.log('Wishlist table deleted'))
		.catch(() => console.log('There was an error deleting wishlist table'))
}

exports.config = {
	transaction: false
}