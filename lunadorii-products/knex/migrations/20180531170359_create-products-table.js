exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', table => {
			table.increments('product_id')
			table.string('product')
			table.text('description')
			table.text('detail')
			table.text('to_use')
			table.integer('price')
			table.boolean('discount').defaultTo(false)
			table.integer('discount_percentage').defaultTo(0)
			table.integer('product_subcategory_id')
			table.integer('product_brand_id')
			table.timestamps(true, true)

			table.foreign('product_subcategory_id')
				.references('product_subcategory_id')
				.inTable('product_subcategories')
			table.foreign('product_brand_id')
				.references('product_brand_id')
				.inTable('product_brands')
		})
		.then(() => console.log('Products table created'))
		.catch((e) => console.log('There was an error with the Products table: ', e))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('products')
		.then(() => console.log('Products table deleted'))
		.catch((e) => console.log('there was an error deleting Products table', e))
}

exports.config = {
	transaction: false
}