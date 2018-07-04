exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('product_orders', table => {
			table.increments('product_order_id')
			table.integer('product_id')
			table.integer('total')
			table.integer('currier_id')
			table.integer('currier_id')
			table.boolean('success')
			table.boolean('failed')
			table.timestamps(true, true)
		})
		.then(() => console.log('Product orders table created'))
		.catch(() => console.log('There was an error with the product orders table'))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('product_orders')
		.then(() => console.log('Product orders table deleted'))
		.catch(() => console.log('there was an error deleting product orders table'))
}
