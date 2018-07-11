require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")

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
						purchase_number: Math.floor(100000 + Math.random() * 900000),
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
