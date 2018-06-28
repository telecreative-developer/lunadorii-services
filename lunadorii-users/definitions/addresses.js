const addressesDefinition = [{
	user_address_id: {column: 'user_address_id', id: true},
	recepient: {column: 'recepient'},
	longitude: {column: 'longitude'},
  latitude: {column: 'latitude'},
  postal_code: {column: 'postal_code'},
  detail_address: {column: 'detail_address'},
  address_default: {column: 'address_default'},
	created_at: {column: 'created_at'},
	updated_at: {column: 'updated_at'},
	province: {
		province_id: {column: 'province_id', id: true},
		name: {column: 'province'}
	},
	city: {
		city_id: {column: 'city_id', id: true},
		name: {column: 'city'}
	},
	district: {
		district_id: {column: 'district_id', id: true},
		district: {column: 'district'}
	}
}]

module.exports = addressesDefinition