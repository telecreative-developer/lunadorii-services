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

	chargeBankTransfer(
		bankTransfer,
		transactionDetails,
		customerDetails,
		itemDetails
	) {
		return axios(
			axiosOptions("POST", `${this.url}/charge`, this.serverKey, {
				payment_type: "bank_transfer",
				bank_transfer: {
					bank: bankTransfer.bank
				},
				transaction_details: {
					order_id: transactionDetails.order_id,
					gross_amount: transactionDetails.gross_amount
				},
				customer_details: {
					first_name: customerDetails.first_name,
					last_name: customerDetails.last_name,
					email: customerDetails.email
				},
				item_details: itemDetails,
				custom_expiry: {
					expiry_duration: 12,
					unit: "hour"
				}
			})
		)
			.then(res => res.data)
			.catch(err => err)
	}

	getToken(cardInfo) {
		const cardNumber = "card_number=" + cardInfo.card_number
		const cardCvv = "card_cvv=" + cardInfo.card_cvv
		const cardExpMonth = "card_exp_month=" + cardInfo.card_exp_month
		const cardExpYear = "card_exp_year=" + cardInfo.card_exp_year
		const clientKey = "client_key=" + this.clientKey
		return new Promise((resolve, reject) => {
			axios
				.get(
					`${
						this.url
					}/token?${cardNumber}&${cardCvv}&${cardExpMonth}&${cardExpYear}&${clientKey}`
				)
				.then(res => {
					return parseInt(res.data.status_code) === 200
						? resolve(res.data)
						: reject(res.data)
				})
				.catch(err => reject(err))
		})
	}

	chargeCreditCard(cardInfo, transactionDetails, customerDetails, itemDetails) {
		return new Promise((resolve, reject) => {
			return this.getToken(cardInfo)
				.then(res => {
					return axios(
						axiosOptions("POST", `${this.url}/charge`, this.serverKey, {
							payment_type: "credit_card",
							transaction_details: {
								order_id: transactionDetails.order_id,
								gross_amount: transactionDetails.gross_amount
							},
							credit_card: {
								token_id: res.token_id
							},
							customer_details: {
								first_name: customerDetails.first_name,
								last_name: customerDetails.last_name,
								email: customerDetails.email
							},
							item_details: itemDetails
						})
					)
						.then(res => {
							parseInt(res.data.status_code) === 200
								? resolve(res.data)
								: reject(res.data)
						})
						.catch(err => reject(err))
				})
				.catch(err => reject(err))
		})
	}

	status(order_id) {
		return axios(
			axiosOptions("GET", `${this.url}/${order_id}/status`, this.serverKey)
		)
			.then(res => res.data)
			.catch(err => err)
	}
}

module.exports = MidtransJS
