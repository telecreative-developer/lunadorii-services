
# Products

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Resource Types

| No  | HTTP Method | HTTP Request                                       | HTTP Code     | Token Required     |
|-----|-------------|----------------------------------------------------|---------------|--------------------|
| 1   | PUT         | /api/v1/order/status/packing/:billing_code         | 200, 400, 500 | :white_check_mark: |
| 2   | PUT         | /api/v1/order/status/shipping/:billing_code        | 200, 400, 500 | :white_check_mark: |
| 3   | PUT         | /api/v1/order/status/delivered/:billing_code       | 200, 400, 500 | :white_check_mark: |
| 4   | GET         | /api/v1/order/histories                            | 200, 500      | :white_check_mark: |
| 5   | POST        | /api/v1/order/checkout                             | 201, 400, 500 | :white_check_mark: |
| 6   | GET         | /api/v1/order/history/:id                          | 200, 500      | :white_check_mark: |
| 7   | GET         | /api/v1/order/history/single/:order_id             | 200, 500      | :white_check_mark: |
| 8   | GET         | /api/v1/order/history/single/:order_id/admin       | 200, 500      | :white_check_mark: |
| 9   | GET         | /api/v1/order/recent/:id                           | 200, 500      | :white_check_mark: |
| 10  | GET         | /api/v1/order/recent/single/:order_id              | 200, 500      | :white_check_mark: |

## Description
#### 1. Switch order status to Packing

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success switch Order Status to Packing",
    "status": 201,
    "data": {
      ...
    }
}
```

#### 2. Switch order status to Shipping

### Request
```javascript
{
    "receipt_number": "Resi Number",
}
```
### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success switch Order Status Shipping",
    "status": 201,
    "data": {
      ...
    }
}
```

#### 3. Switch order status to Delivered

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success switch Order Status Delivered",
    "status": 201,
    "data": {
      ...
    }
}
```
#### 4. Get order histories

### Response
#### Success

```javascript
{
	"name": "success",
	"message": "Success Get Order Histories",
	"status": 200,
	"data": [
		{
			"order_id": 118,
			"billing_code": "LDQT2RZD5XFCL",
			"order_status": "accepted_payment",
			"total": 11000,
			"bank": "credit_card",
			"paid_method": "credit_card",
			"receipt_time": null,
			"receipt_number": null,
			"delivery_service": "tiki",
			"delivery_price": 9000,
			"delivery_time": null,
			"address": "baldfabsldfa",
			"created_at": "2018-11-21T02:20:28.000Z",
			"updated_at": "2018-11-21T02:20:28.000Z",
			"list": [
				{
					"order_product_id": 157,
					"product_id": 220,
					"product": "produk no diskon bro",
					"price": 2000,
					"discount_percentage": 0,
					"weight_gram": 1000,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 83,
							"subcategory": "Categori TJAKEP !"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 284,
							"thumbnail_url": "https://lunadorii-dev.s3.amazonaws.com/product-1542727063343.jpeg"
						}
					],
					"reviews": []
				}
			]
    },
    ...
  ]
```
#### 5. Checkout order

### Request
#### Bank Transfer
```javascript
{
	"delivery_service": "JNE OKE",
	"delivery_price": 110000,
	"paid_method": "bank_transfer",
	"address": "W",
	"city_id": 22,
	"province_id": 9,
	"id": 76,
	"data": [
		{
			"qty": 10,
			"product_id": 1,
			"price": 1000,
			"discount_percentage": 1
		}
	],
	"user": {
		"first_name": "Rehan",
		"last_name": "Choirul",
		"email": "rehanchoirul@gmail.com"
	},
	"payment_detail": {
		"bank": "bca"
	}
}
```
#### Credit Card
```javascript
{
	"delivery_service": "JNE OKE",
	"delivery_price": 110000,
	"paid_method": "credit_card",
	"address": "W",
	"city_id": 22,
	"province_id": 9,
	"id": 76,
	"data": [
		{
			"qty": 10,
			"product_id": 1,
			"price": 100000,
			"discount_percentage": 1
		}
	],
	"user": {
		"first_name": "Bima",
		"last_name": "Natawijaya",
		"email": "bima.natawi@gmail.com"
	},
	"payment_detail": {
		"card_number": "4811 1111 1111 1114",
		"card_exp_month": "01",
		"card_exp_year": "20",
		"card_cvv": "123"
	}
}
```

### Response
#### Success

```javascript
[
	{
		"name": "success",
		"message": "Checkout Success",
		"status": 201,
		"data": [
			{
				"billing_code": "LD0KHW3LR74CL",
				"paid_method": "bank_transfer",
				"bank": "bca",
				"products": [
					{
						"product_id": 1,
						"qty": 10,
						"price": 1000,
						"discount_percentage": 1
					}
				],
				"midtrans_response": {
					"status_code": "201",
					"status_message": "Success, Bank Transfer transaction is created",
					"transaction_id": "b4fd5472-106a-4e4a-ae4e-fe4afa29a85b",
					"order_id": "LD0KHW3LR74CL",
					"gross_amount": "119900.00",
					"currency": "IDR",
					"payment_type": "bank_transfer",
					"transaction_time": "2018-10-24 18:03:43",
					"transaction_status": "pending",
					"va_numbers": [
						{
							"bank": "bca",
							"va_number": "01836358860"
						}
					],
					"fraud_status": "accept"
				}
			}
		]
	}
]
```
#### 6. Get order history

### Response
#### Success

```javascript
{
	"name": "success",
	"message": "Success Get Order History",
	"status": 200,
	"data": [
		{
			"order_id": 74,
			"billing_code": "LDUVKCDYMNQBN",
			"order_status": "Expired",
			"total": 89000,
			"bank": "BCA",
			"paid_method": "bank_transfer",
			"receipt_time": null,
			"receipt_number": null,
			"delivery_service": "jne",
			"delivery_price": 9000,
			"delivery_time": null,
			"address": "Ev Hive",
			"created_at": "2018-11-01T12:24:09.000Z",
			"updated_at": "2018-11-20T11:22:21.000Z",
			"list": [
				{
					"order_product_id": 96,
					"product_id": 151,
					"product": "Kei Matte - Rose Maiden",
					"price": 35000,
					"discount_percentage": 0,
					"weight_gram": 40,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 42,
							"subcategory": "LIPSTICK"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 19,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
						}
					],
					"reviews": [],
					"reviewed": false
				},
				{
					"order_product_id": 95,
					"product_id": 120,
					"product": "L'Absolu - LA2310",
					"price": 45000,
					"discount_percentage": 0,
					"weight_gram": 31,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 51,
							"subcategory": "FALSE LASHES"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 78,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
						}
					],
					"reviews": [],
					"reviewed": false
				}
			]
		}
	]
}
```
#### 7. Get Order history single

### Response
#### Success

```javascript
{
	"name": "success",
	"message": "Success Get Order History",
	"status": 200,
	"data": [
		{
			"order_id": 74,
			"billing_code": "LDUVKCDYMNQBN",
			"order_status": "Expired",
			"total": 89000,
			"bank": "BCA",
			"paid_method": "bank_transfer",
			"receipt_time": null,
			"receipt_number": null,
			"delivery_service": "jne",
			"delivery_price": 9000,
			"delivery_time": null,
			"address": "Ev Hive",
			"created_at": "2018-11-01T12:24:09.000Z",
			"updated_at": "2018-11-20T11:22:21.000Z",
			"list": [
				{
					"order_product_id": 96,
					"product_id": 151,
					"product": "Kei Matte - Rose Maiden",
					"price": 35000,
					"discount_percentage": 0,
					"weight_gram": 40,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 42,
							"subcategory": "LIPSTICK"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 19,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
						}
					],
					"reviews": []
				},
				{
					"order_product_id": 95,
					"product_id": 120,
					"product": "L'Absolu - LA2310",
					"price": 45000,
					"discount_percentage": 0,
					"weight_gram": 31,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 51,
							"subcategory": "FALSE LASHES"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 78,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
						}
					],
					"reviews": []
				}
			],
			"midtrans_response": {
				"va_numbers": [
					{
						"bank": "bca",
						"va_number": "01836512034"
					}
				],
				"payment_amounts": [],
				"transaction_time": "2018-11-01 19:24:08",
				"gross_amount": "89000.00",
				"currency": "IDR",
				"order_id": "LDUVKCDYMNQBN",
				"payment_type": "bank_transfer",
				"signature_key": "a3bb1828f01a9ce03853374a39c254d2f152b30c615c6789d5cefeca9b519cc0686aa166877510c7cc89c78986b27a20d76f275a45298c725eccd67e864e3f3f",
				"status_code": "200",
				"transaction_id": "f3f8f6e9-34c7-446d-b409-c0eadf843272",
				"transaction_status": "settlement",
				"fraud_status": "accept",
				"settlement_time": "2018-11-01 19:24:54",
				"status_message": "Success, transaction is found"
			},
			"thumbnails": [
				{
					"product_thumbnail_id": 19,
					"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
				}
			]
		},
		{
			"order_id": 74,
			"billing_code": "LDUVKCDYMNQBN",
			"order_status": "Expired",
			"total": 89000,
			"bank": "BCA",
			"paid_method": "bank_transfer",
			"receipt_time": null,
			"receipt_number": null,
			"delivery_service": "jne",
			"delivery_price": 9000,
			"delivery_time": null,
			"address": "Ev Hive",
			"created_at": "2018-11-01T12:24:09.000Z",
			"updated_at": "2018-11-20T11:22:21.000Z",
			"list": [
				{
					"order_product_id": 96,
					"product_id": 151,
					"product": "Kei Matte - Rose Maiden",
					"price": 35000,
					"discount_percentage": 0,
					"weight_gram": 40,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 42,
							"subcategory": "LIPSTICK"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 19,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
						}
					],
					"reviews": []
				},
				{
					"order_product_id": 95,
					"product_id": 120,
					"product": "L'Absolu - LA2310",
					"price": 45000,
					"discount_percentage": 0,
					"weight_gram": 31,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 51,
							"subcategory": "FALSE LASHES"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 78,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
						}
					],
					"reviews": []
				}
			],
			"midtrans_response": {
				"va_numbers": [
					{
						"bank": "bca",
						"va_number": "01836512034"
					}
				],
				"payment_amounts": [],
				"transaction_time": "2018-11-01 19:24:08",
				"gross_amount": "89000.00",
				"currency": "IDR",
				"order_id": "LDUVKCDYMNQBN",
				"payment_type": "bank_transfer",
				"signature_key": "a3bb1828f01a9ce03853374a39c254d2f152b30c615c6789d5cefeca9b519cc0686aa166877510c7cc89c78986b27a20d76f275a45298c725eccd67e864e3f3f",
				"status_code": "200",
				"transaction_id": "f3f8f6e9-34c7-446d-b409-c0eadf843272",
				"transaction_status": "settlement",
				"fraud_status": "accept",
				"settlement_time": "2018-11-01 19:24:54",
				"status_message": "Success, transaction is found"
			},
			"thumbnails": [
				{
					"product_thumbnail_id": 78,
					"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
				}
			]
		}
	]
}
```
#### 8. GET Order history single (admin)

### Response
#### Success

```javascript
{
	"name": "success",
	"message": "Success Get Order History",
	"status": 200,
	"data": [
		{
			"order_id": 74,
			"billing_code": "LDUVKCDYMNQBN",
			"order_status": "Expired",
			"total": 89000,
			"bank": "BCA",
			"paid_method": "bank_transfer",
			"receipt_time": null,
			"receipt_number": null,
			"delivery_service": "jne",
			"delivery_price": 9000,
			"delivery_time": null,
			"address": "Ev Hive",
			"created_at": "2018-11-01T12:24:09.000Z",
			"updated_at": "2018-11-20T11:22:21.000Z",
			"list": [
				{
					"order_product_id": 96,
					"product_id": 151,
					"product": "Kei Matte - Rose Maiden",
					"price": 35000,
					"discount_percentage": 0,
					"weight_gram": 40,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 42,
							"subcategory": "LIPSTICK"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 19,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
						}
					],
					"reviews": []
				},
				{
					"order_product_id": 95,
					"product_id": 120,
					"product": "L'Absolu - LA2310",
					"price": 45000,
					"discount_percentage": 0,
					"weight_gram": 31,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 51,
							"subcategory": "FALSE LASHES"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 78,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
						}
					],
					"reviews": []
				}
			],
			"midtrans_response": {
				"va_numbers": [
					{
						"bank": "bca",
						"va_number": "01836512034"
					}
				],
				"payment_amounts": [],
				"transaction_time": "2018-11-01 19:24:08",
				"gross_amount": "89000.00",
				"currency": "IDR",
				"order_id": "LDUVKCDYMNQBN",
				"payment_type": "bank_transfer",
				"signature_key": "a3bb1828f01a9ce03853374a39c254d2f152b30c615c6789d5cefeca9b519cc0686aa166877510c7cc89c78986b27a20d76f275a45298c725eccd67e864e3f3f",
				"status_code": "200",
				"transaction_id": "f3f8f6e9-34c7-446d-b409-c0eadf843272",
				"transaction_status": "settlement",
				"fraud_status": "accept",
				"settlement_time": "2018-11-01 19:24:54",
				"status_message": "Success, transaction is found"
			},
			"thumbnails": [
				{
					"product_thumbnail_id": 19,
					"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
				}
			]
		},
		{
			"order_id": 74,
			"billing_code": "LDUVKCDYMNQBN",
			"order_status": "Expired",
			"total": 89000,
			"bank": "BCA",
			"paid_method": "bank_transfer",
			"receipt_time": null,
			"receipt_number": null,
			"delivery_service": "jne",
			"delivery_price": 9000,
			"delivery_time": null,
			"address": "Ev Hive",
			"created_at": "2018-11-01T12:24:09.000Z",
			"updated_at": "2018-11-20T11:22:21.000Z",
			"list": [
				{
					"order_product_id": 96,
					"product_id": 151,
					"product": "Kei Matte - Rose Maiden",
					"price": 35000,
					"discount_percentage": 0,
					"weight_gram": 40,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 42,
							"subcategory": "LIPSTICK"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 19,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
						}
					],
					"reviews": []
				},
				{
					"order_product_id": 95,
					"product_id": 120,
					"product": "L'Absolu - LA2310",
					"price": 45000,
					"discount_percentage": 0,
					"weight_gram": 31,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 51,
							"subcategory": "FALSE LASHES"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 78,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
						}
					],
					"reviews": []
				}
			],
			"midtrans_response": {
				"va_numbers": [
					{
						"bank": "bca",
						"va_number": "01836512034"
					}
				],
				"payment_amounts": [],
				"transaction_time": "2018-11-01 19:24:08",
				"gross_amount": "89000.00",
				"currency": "IDR",
				"order_id": "LDUVKCDYMNQBN",
				"payment_type": "bank_transfer",
				"signature_key": "a3bb1828f01a9ce03853374a39c254d2f152b30c615c6789d5cefeca9b519cc0686aa166877510c7cc89c78986b27a20d76f275a45298c725eccd67e864e3f3f",
				"status_code": "200",
				"transaction_id": "f3f8f6e9-34c7-446d-b409-c0eadf843272",
				"transaction_status": "settlement",
				"fraud_status": "accept",
				"settlement_time": "2018-11-01 19:24:54",
				"status_message": "Success, transaction is found"
			},
			"thumbnails": [
				{
					"product_thumbnail_id": 78,
					"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
				}
			]
		}
	]
}
```
#### 9. GET Order recent

### Response
#### Success

```javascript
{
	"name": "success",
	"message": "Success Get Order Recent",
	"status": 200,
	"data": [
		{
			"order_id": 74,
			"billing_code": "LDUVKCDYMNQBN",
			"order_status": "Expired",
			"total": 89000,
			"bank": "BCA",
			"paid_method": "bank_transfer",
			"receipt_time": null,
			"receipt_number": null,
			"delivery_service": "jne",
			"delivery_price": 9000,
			"delivery_time": null,
			"address": "Ev Hive",
			"created_at": "2018-11-01T12:24:09.000Z",
			"updated_at": "2018-11-20T11:22:21.000Z",
			"list": [
				{
					"order_product_id": 96,
					"product_id": 151,
					"product": "Kei Matte - Rose Maiden",
					"price": 35000,
					"discount_percentage": 0,
					"weight_gram": 40,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 42,
							"subcategory": "LIPSTICK"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 19,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
						}
					],
					"reviews": [],
					"reviewed": false
				},
				{
					"order_product_id": 95,
					"product_id": 120,
					"product": "L'Absolu - LA2310",
					"price": 45000,
					"discount_percentage": 0,
					"weight_gram": 31,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 51,
							"subcategory": "FALSE LASHES"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 78,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
						}
					],
					"reviews": [],
					"reviewed": false
				}
			],
			"thumbnails": [
				{
					"product_thumbnail_id": 19,
					"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
				}
			]
		},
		{
			"order_id": 74,
			"billing_code": "LDUVKCDYMNQBN",
			"order_status": "Expired",
			"total": 89000,
			"bank": "BCA",
			"paid_method": "bank_transfer",
			"receipt_time": null,
			"receipt_number": null,
			"delivery_service": "jne",
			"delivery_price": 9000,
			"delivery_time": null,
			"address": "Ev Hive",
			"created_at": "2018-11-01T12:24:09.000Z",
			"updated_at": "2018-11-20T11:22:21.000Z",
			"list": [
				{
					"order_product_id": 96,
					"product_id": 151,
					"product": "Kei Matte - Rose Maiden",
					"price": 35000,
					"discount_percentage": 0,
					"weight_gram": 40,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 42,
							"subcategory": "LIPSTICK"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 19,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
						}
					],
					"reviews": [],
					"reviewed": false
				},
				{
					"order_product_id": 95,
					"product_id": 120,
					"product": "L'Absolu - LA2310",
					"price": 45000,
					"discount_percentage": 0,
					"weight_gram": 31,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 51,
							"subcategory": "FALSE LASHES"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 78,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
						}
					],
					"reviews": [],
					"reviewed": false
				}
			],
			"thumbnails": [
				{
					"product_thumbnail_id": 78,
					"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
				}
			]
		}
	]
}
```
#### 10. GET Order recent single

### Response
#### Success

```javascript
{
	"name": "success",
	"message": "Success Get Order Recent",
	"status": 200,
	"data": [
		{
			"order_id": 74,
			"billing_code": "LDUVKCDYMNQBN",
			"order_status": "Expired",
			"total": 89000,
			"bank": "BCA",
			"paid_method": "bank_transfer",
			"receipt_time": null,
			"receipt_number": null,
			"delivery_service": "jne",
			"delivery_price": 9000,
			"delivery_time": null,
			"address": "Ev Hive",
			"created_at": "2018-11-01T12:24:09.000Z",
			"updated_at": "2018-11-20T11:22:21.000Z",
			"list": [
				{
					"order_product_id": 96,
					"product_id": 151,
					"product": "Kei Matte - Rose Maiden",
					"price": 35000,
					"discount_percentage": 0,
					"weight_gram": 40,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 42,
							"subcategory": "LIPSTICK"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 19,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
						}
					],
					"reviews": []
				},
				{
					"order_product_id": 95,
					"product_id": 120,
					"product": "L'Absolu - LA2310",
					"price": 45000,
					"discount_percentage": 0,
					"weight_gram": 31,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 51,
							"subcategory": "FALSE LASHES"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 78,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
						}
					],
					"reviews": []
				}
			],
			"midtrans_response": {
				"va_numbers": [
					{
						"bank": "bca",
						"va_number": "01836512034"
					}
				],
				"payment_amounts": [],
				"transaction_time": "2018-11-01 19:24:08",
				"gross_amount": "89000.00",
				"currency": "IDR",
				"order_id": "LDUVKCDYMNQBN",
				"payment_type": "bank_transfer",
				"signature_key": "a3bb1828f01a9ce03853374a39c254d2f152b30c615c6789d5cefeca9b519cc0686aa166877510c7cc89c78986b27a20d76f275a45298c725eccd67e864e3f3f",
				"status_code": "200",
				"transaction_id": "f3f8f6e9-34c7-446d-b409-c0eadf843272",
				"transaction_status": "settlement",
				"fraud_status": "accept",
				"settlement_time": "2018-11-01 19:24:54",
				"status_message": "Success, transaction is found"
			},
			"thumbnails": [
				{
					"product_thumbnail_id": 19,
					"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
				}
			]
		},
		{
			"order_id": 74,
			"billing_code": "LDUVKCDYMNQBN",
			"order_status": "Expired",
			"total": 89000,
			"bank": "BCA",
			"paid_method": "bank_transfer",
			"receipt_time": null,
			"receipt_number": null,
			"delivery_service": "jne",
			"delivery_price": 9000,
			"delivery_time": null,
			"address": "Ev Hive",
			"created_at": "2018-11-01T12:24:09.000Z",
			"updated_at": "2018-11-20T11:22:21.000Z",
			"list": [
				{
					"order_product_id": 96,
					"product_id": 151,
					"product": "Kei Matte - Rose Maiden",
					"price": 35000,
					"discount_percentage": 0,
					"weight_gram": 40,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 42,
							"subcategory": "LIPSTICK"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 19,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/KIMASAKO+KEI+MATTE+ROSE+MAIDEN.jpg"
						}
					],
					"reviews": []
				},
				{
					"order_product_id": 95,
					"product_id": 120,
					"product": "L'Absolu - LA2310",
					"price": 45000,
					"discount_percentage": 0,
					"weight_gram": 31,
					"note": "",
					"qty": 1,
					"subcategories": [
						{
							"product_subcategory_id": 51,
							"subcategory": "FALSE LASHES"
						}
					],
					"thumbnails": [
						{
							"product_thumbnail_id": 78,
							"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
						}
					],
					"reviews": []
				}
			],
			"midtrans_response": {
				"va_numbers": [
					{
						"bank": "bca",
						"va_number": "01836512034"
					}
				],
				"payment_amounts": [],
				"transaction_time": "2018-11-01 19:24:08",
				"gross_amount": "89000.00",
				"currency": "IDR",
				"order_id": "LDUVKCDYMNQBN",
				"payment_type": "bank_transfer",
				"signature_key": "a3bb1828f01a9ce03853374a39c254d2f152b30c615c6789d5cefeca9b519cc0686aa166877510c7cc89c78986b27a20d76f275a45298c725eccd67e864e3f3f",
				"status_code": "200",
				"transaction_id": "f3f8f6e9-34c7-446d-b409-c0eadf843272",
				"transaction_status": "settlement",
				"fraud_status": "accept",
				"settlement_time": "2018-11-01 19:24:54",
				"status_message": "Success, transaction is found"
			},
			"thumbnails": [
				{
					"product_thumbnail_id": 78,
					"thumbnail_url": "https://s3-ap-southeast-1.amazonaws.com/lunadorii-dev/products/ARTISAN+LABSOLUTE+LA2310.jpg"
				}
			]
		}
	]
}
```

#### Failed
##### Field can not be empty
```javascript
{
    "name": "error",
    "message": {},
    "status": 500
}
```
