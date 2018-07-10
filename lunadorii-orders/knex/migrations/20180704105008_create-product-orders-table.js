exports.up = function(knex, Promise) {
	return knex.schema
		.createTable("product_orders", table => {
			table.increments("product_order_id")
			table.integer("purchase_number")
			table.integer("receipt_number")
			table.string("status")
			table.text("notes")
			table.string("delivery_service")
			table.integer("order_id")
			table.timestamps("delivery_time")
			table.timestamps("payment_time")
			table.timestamps("receipt_time")
			table.timestamps(true, true)
		})
		.then(() => console.log("Product orders table created"))
		.catch(() =>
			console.log("There was an error with the product orders table")
		)
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable("product_orders")
		.then(() => console.log("Product orders table deleted"))
		.catch(() =>
			console.log("there was an error deleting product orders table")
		)
}
