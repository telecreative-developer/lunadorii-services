const placesDefinition = [{
	province_id: {column: 'province_id', id: true},
	province: {column: 'province'},
	cities: [{
		city_id: {column: 'city_id', id: true},
		city: {column: 'city'},
		districts: [{
			district_id: {column: 'district_id', id: true},
			district: 'district'
		}]
	}]
}]

module.exports = placesDefinition