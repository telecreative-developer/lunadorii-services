require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")
const {
	historyDefinition,
	checkoutDefinition
} = require("../definitions/orders")
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

const midtrans = (data, { billingCode, total }) => {
	return new Promise((resolve, reject) => {
		if (data.paid_method === "bank_transfer") {
			const { bank } = data.payment_detail
			const { first_name, last_name, email } = data.user
			return md
				.chargeBankTransfer(
					{ bank },
					{ order_id: billingCode, gross_amount: total },
					{ first_name, last_name, email }
				)
				.then(res => resolve(res))
				.catch(err => reject(errorResponse(err, err.status_code)))
		} else if (data.paid_method === "credit_card") {
			const {
				card_number,
				card_cvv,
				card_exp_month,
				card_exp_year
			} = data.payment_detail
			const { first_name, last_name, email } = data.user
			return md
				.chargeCreditCard(
					{ card_number, card_cvv, card_exp_month, card_exp_year },
					{ order_id: billingCode, gross_amount: total },
					{ first_name, last_name, email }
				)
				.then(res => resolve(res))
				.catch(err => reject(errorResponse(err, err.status_code)))
		} else {
			return reject(errorResponse("Paid method does not valid", 500))
		}
	})
}

const knexResponseInsertOrder = (data, { billingCode, total }) => {
	return knex("orders")
		.insert({
			billing_code: billingCode,
			total: total,
			order_status: "checkout",
			delivery_service: data.delivery_service,
			delivery_price: data.delivery_price,
			paid_method: data.paid_method,
			address: data.address,
			city_id: data.city_id,
			province_id: data.province_id,
			id: data.id
		})
		.returning("order_id")
		.then(order_id => order_id)
		.catch(err => errorResponse("Internal Server Error", 500))
}

const knexResponseInsertOrderProduct = (data, order_id) => {
	return knex("order_products")
		.insert(
			data.data.map(d => ({
				...d,
				order_id: parseInt(order_id)
			}))
		)
		.then(res => order_id)
		.catch(err => errorResponse("Internal Server Error", 500))
}

const knexResponseSelectOrders = order_id => {
	return knex("orders")
		.where("orders.order_id", parseInt(order_id))
		.innerJoin("order_products", "orders.order_id", "order_products.order_id")
		.then(res => res)
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.checkoutOrder = data => {
	const billingCode = `LD${Math.random()
		.toString(36)
		.substr(2, 15)
		.toUpperCase()}`
	const total = parseInt(data.data.count() + parseInt(data.delivery_price))

	const knexResponse = mdResponse => {
		return knexResponseInsertOrder(data, { billingCode, total })
			.then(order_id => knexResponseInsertOrderProduct(data, order_id))
			.then(order_id => knexResponseSelectOrders(order_id))
			.then(res => NestHydrationJS.nest(res, checkoutDefinition))
			.then(res => res.map(d => ({ ...d, midtrans_response: mdResponse })))
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return midtrans(data, { billingCode, total })
		.then(mdResponse => knexResponse(mdResponse))
		.then(res => successResponse(res, "Checkout Success", 201))
		.catch(err => err)
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
					transaction_time: res.transaction_time,
					transaction_status: res.transaction_status,
					payment_type: res.payment_type
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
		.leftJoin(
			"product_reviews",
			"order_products.order_product_id",
			"product_reviews.order_product_id"
		)
		.select(
			"*",
			"orders.order_id as order_id",
			"order_products.order_product_id as order_product_id",
			"product_thumbnails.product_thumbnail_id as product_thumbnail_id",
			"product_thumbnails.thumbnail_url as product_thumbnail_url",
			"product_subcategories.product_subcategory_id",
			"product_reviews.id as product_reviews_user_id",
			"orders.created_at as created_at",
			"orders.updated_at as updated_at"
		)
		.orderBy("orders.created_at", "desc")
		.then(res => NestHydrationJS.nest(res, historyDefinition))
		.then(res =>
			res.map(d =>
				d.list.map(dlm => ({
					...dlm,
					reviewed: !!dlm.reviews.filter(dlmr => dlmr.id === parseInt(id))
						.length
				}))
			)
		)
		.then(res => successResponse(res, "Success Get Order Recent", 200))
}

exports.getOrderRecentSingle = order_id => {
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
		.leftJoin(
			"product_reviews",
			"order_products.order_product_id",
			"product_reviews.order_product_id"
		)
		.select(
			"*",
			"orders.order_id as order_id",
			"order_products.order_product_id as order_product_id",
			"product_thumbnails.product_thumbnail_id as product_thumbnail_id",
			"product_thumbnails.thumbnail_url as product_thumbnail_url",
			"product_subcategories.product_subcategory_id",
			"product_reviews.id as product_reviews_user_id",
			"orders.created_at as created_at",
			"orders.updated_at as updated_at"
		)
		.orderBy("orders.created_at", "desc")
		.then(res => NestHydrationJS.nest(res, historyDefinition))
		.then(res => successResponse(res, "Success Get Order Recent", 200))
}

exports.getOrderRecentSingleLogged = (order_id, id) => {
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
		.leftJoin(
			"product_reviews",
			"order_products.order_product_id",
			"product_reviews.order_product_id"
		)
		.select(
			"*",
			"orders.order_id as order_id",
			"order_products.order_product_id as order_product_id",
			"product_thumbnails.product_thumbnail_id as product_thumbnail_id",
			"product_thumbnails.thumbnail_url as product_thumbnail_url",
			"product_subcategories.product_subcategory_id",
			"product_reviews.id as product_reviews_user_id",
			"orders.created_at as created_at",
			"orders.updated_at as updated_at"
		)
		.orderBy("orders.created_at", "desc")
		.then(res => NestHydrationJS.nest(res, historyDefinition))
		.then(res =>
			res.map(d =>
				d.list.map(dlm => ({
					...dlm,
					reviewed: !!dlm.reviews.filter(dlmr => dlmr.id === parseInt(id))
						.length
				}))
			)
		)
		.then(res => successResponse(res, "Success Get Order Recent", 200))
}
