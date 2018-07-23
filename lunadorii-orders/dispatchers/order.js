require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")
const { historyDefinition } = require("../definitions/orders")
const mdServerKey = process.env.MIDTRANS_SERVER_KEY
const mdClientKey = process.env.MIDTRANS_CLIENT_KEY
const mdUrl = process.env.MIDTRANS_URL
const Midtrans = require("../midtrans")
const md = new Midtrans(mdClientKey, mdServerKey, mdUrl)

Array.prototype.count = function() {
	let total = 0
	for (let i = 0, _len = this.length; i < _len; i++) {
		total +=
			this[i]["price"] -
			((this[i]["price"] * this[i]["discount_percentage"]) / 100) *
				this[i]["qty"]
	}

	return total
}

exports.checkoutOrder = data => {
	const billingCode = `LD${Math.random()
		.toString(36)
		.substr(2, 15)
		.toUpperCase()}`
	const total = parseInt(data.data.count() + parseInt(data.delivery_price))

	const midtrans = item => {
		return md
			.chargeBankTransfer(
				data.bank,
				{
					order_id: billingCode,
					gross_amount: total
				},
				{
					first_name: data.user.first_name,
					last_name: data.user.last_name,
					email: data.user.email
				}
			)
			.then(res => item.map(d => ({ ...d, va_numbers: res.data.va_numbers })))
			.catch(err => err)
	}

	return knex("orders")
		.insert({
			billing_code: billingCode,
			total: total,
			order_status: "checkout",
			delivery_service: data.delivery_service,
			delivery_price: data.delivery_price,
			paid_method: data.paid_method,
			bank: data.bank,
			address: data.address,
			city_id: data.city_id,
			province_id: data.province_id,
			id: data.id
		})
		.returning("order_id")
		.then(order_id => {
			return knex("order_products")
				.insert(
					data.data.map(d => ({
						...d,
						order_id: parseInt(order_id)
					}))
				)
				.then(res => order_id)
				.catch(err => err)
		})
		.then(order_id => {
			return knex("orders")
				.where("orders.order_id", parseInt(order_id))
				.innerJoin(
					"order_products",
					"orders.order_id",
					"order_products.order_id"
				)
				.then(res => res)
				.catch(err => err)
		})
		.then(res => {
			return NestHydrationJS.nest(res, [
				{
					billing_code: { column: "billing_code", id: true },
					paid_method: { column: "paid_method" },
					bank: { column: "bank" },
					products: [
						{
							product_id: { column: "product_id", id: true },
							product: { column: "product" },
							qty: { column: "qty" },
							price: { column: "price" },
							discount_percentage: { column: "discount_percentage" }
						}
					]
				}
			])
		})
		.then(response => midtrans(response))
		.then(res => successResponse(res, "Success", 201))
		.catch(err => console.log(err))
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

exports.getOrderHistorySingle = order_id => {
	const midtrans = item => {
		return md
			.status(order_id)
			.then(res => {
				return item.map(d => ({
					...d,
					transaction_time: res.data.transaction_time,
					transaction_status: res.data.transaction_status,
					payment_type: res.data.payment_type
				}))
			})
			.catch(err => err)
	}

	return knex("orders")
		.where("orders.order_id", order_id)
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
		.then(response => midtrans(response))
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
