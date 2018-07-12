require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")
const { historyDefinition } = require("../definitions/orders")

exports.checkoutOrder = data => {
	return knex("orders")
		.insert({
			billing_code: `LD${Math.random()
				.toString(36)
				.substr(2, 15)
				.toUpperCase()}`,
			address: data.address,
			total: data.data.reduce(
				(a, b) =>
					parseInt(a.subtotal) +
					parseInt(a.delivery_price) +
					parseInt(b.subtotal) +
					parseInt(b.delivery_price)
			),
			paid_method: data.paid_method,
			order_status: "waiting-for-payment",
			id: data.id
		})
		.returning("order_id")
		.then(order_id =>
			data.data.forEach(d =>
				knex("order_products")
					.insert({
						purchase_number: Math.floor(100000 + Math.random() * 9000000000000),
						delivery_service: d.delivery_service,
						delivery_price: d.delivery_price,
						qty: d.qty,
						subtotal: d.subtotal,
						note: d.note,
						product_id: d.product_id,
						order_id: parseInt(order_id)
					})
					.catch(err => errorResponse(err, 500))
			)
		)
		.then(() => successResponse(null, "Success Checkout Order", 201))
		.catch(err => errorResponse(err, 500))
}

exports.getOrderHistory = id => {
	return knex("orders")
		.where("orders.id", id)
		.innerJoin("order_products", "orders.order_id", "order_products.order_id")
		.innerJoin("products", "order_products.product_id", "products.product_id")
		.innerJoin(
			"product_thumbnails",
			"products.product_id",
			"product_thumbnails.product_id"
		)
		.innerJoin(
			"product_subcategories",
			"products.product_subcategory_id",
			"product_subcategories.product_subcategory_id"
		)
		.select(
			"*",
			"product_thumbnails.thumbnail_url as product_thumbnail_url",
			"orders.created_at as created_at",
			"orders.updated_at as updated_at"
		)
		.orderBy("orders.created_at", "desc")
		.then(response => NestHydrationJS.nest(response, historyDefinition))
		.then(response =>
			successResponse(response, "Success Get Order History", 200)
		)
}

exports.getOrderRecent = id => {
	return knex("orders")
		.where("orders.id", id)
		.innerJoin("order_products", "orders.order_id", "order_products.order_id")
		.innerJoin("products", "order_products.product_id", "products.product_id")
		.innerJoin(
			"product_thumbnails",
			"products.product_id",
			"product_thumbnails.product_id"
		)
		.innerJoin(
			"product_subcategories",
			"products.product_subcategory_id",
			"product_subcategories.product_subcategory_id"
		)
		.select(
			"*",
			"product_thumbnails.thumbnail_url as product_thumbnail_url",
			"orders.created_at as created_at",
			"orders.updated_at as updated_at"
		)
		.orderBy("orders.created_at", "desc")
		.limit(5)
		.then(response => NestHydrationJS.nest(response, historyDefinition))
		.then(response =>
			successResponse(response, "Success Get Order Recent", 200)
		)
}
