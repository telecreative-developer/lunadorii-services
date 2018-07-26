const placesDefinition = [
	{
		province_id: { column: "province_id", id: true },
		province: { column: "province" },
		cities: [
			{
				city_id: { column: "city_id", id: true },
				city: { column: "city" },
				type: { column: "type" },
				postal_code: { column: "postal_code" }
			}
		]
	}
]

module.exports = placesDefinition
