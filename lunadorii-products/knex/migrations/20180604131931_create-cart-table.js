exports.up = function(knex, Promise) {
  return knex.schema.createTable('cart', table => {
			table.increments('cart_id')
			table.integer('product_id')
			table.integer('id')
			table.integer('qty')
			table.timestamps(true, true)

			table.foreign('product_id')
				.references('product_id')
				.inTable('products')
			table.foreign('id')
				.references('id')
				.inTable('users')
		})
		.then(() => console.log('Cart table created'))
		.catch(() => console.log('There was an error with the Cart table'))
}

exports.down = function(knex, Promise) {
  return knex.schema
		.dropTable('cart')
		.then(() => console.log('Cart table deleted'))
		.catch(() => console.log('There was an error deleting Cart table'))
}

exports.config = {
	transaction: false
}