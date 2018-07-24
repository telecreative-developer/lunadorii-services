const axios = require("axios")

const axiosOptions = (method, urlMidtrans, key, data) => {
	return {
		method: method,
		url: urlMidtrans,
		headers: {
			Authorization: `Basic ${key}`,
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		data: data
	}
}

class MidtransJS {
	constructor(clientKey, serverKey, urlMidtrans) {
		this.clientKey = clientKey
		this.serverKey = Buffer.from(`${serverKey}:`).toString("base64")
		this.url = urlMidtrans
	}

	chargeBankTransfer(bank_transfer, transaction_details, customer_details) {
		return axios(
			axiosOptions("POST", `${this.url}/charge`, this.serverKey, {
				payment_type: "bank_transfer",
				bank_transfer: {
					bank: bank_transfer
				},
				transaction_details: {
					order_id: transaction_details.order_id,
					gross_amount: transaction_details.gross_amount
				},
				customer_details: {
					first_name: customer_details.first_name,
					last_name: customer_details.last_name,
					email: customer_details.email
				}
			})
		)
			.then(res => res)
			.catch(err => err)
	}

	chargeCreditCard(transaction_details, customer_details) {
		axios(
			axiosOptions("POST", `${this.url}/charge`, this.serverKey, {
				payment_type: "credit_card",
				transaction_details: {
					order_id: transaction_details.order_id,
					gross_amount: transaction_details.gross_amount
				},
				customer_details: {
					first_name: customer_details.first_name,
					last_name: customer_details.last_name,
					email: customer_details.email
				}
			})
		)
	}

	status(order_id) {
		return axios(
			axiosOptions("GET", `${this.url}/${order_id}/status`, this.serverKey)
		)
			.then(res => res)
			.catch(err => err)
	}
}

module.exports = MidtransJS
