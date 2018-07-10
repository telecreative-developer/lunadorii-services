exports.up = function(knex, Promise) {
	return knex.schema
		.createTable("orders", table => {
			table.increments("order_id")
			table.string("billing_code").unique()
			table.text("address")
			table.integer("total")
			table.boolean("paid_success").defaultTo(false)
			table.boolean("paid_failed").defaultTo(false)
			table.string("paid_method")
			table.boolean("expired")
			table.timestamps("expired_date")
			table.timestamps(true, true)
		})
		.then(() => console.log("Orders table created"))
		.catch(() => console.log("There was an error with the orders table"))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable("orders")
		.then(() => console.log("Orders table deleted"))
		.catch(() => console.log("there was an error deleting orders table"))
}
