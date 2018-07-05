const addressesDefinition = [{
	user_address_id: {column: 'user_address_id', id: true},
	recepient: {column: 'recepient'},
	longitude: {column: 'longitude'},
  latitude: {column: 'latitude'},
  city: {column: 'city'},
  province: {column: 'province'},
  postal_code: {column: 'postal_code'},
  detail_address: {column: 'detail_address'},
  address_default: {column: 'address_default'},
	created_at: {column: 'created_at'},
	updated_at: {column: 'updated_at'}
}]

module.exports = addressesDefinition