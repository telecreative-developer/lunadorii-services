const banksDefinition = [{
	user_bank_id: {column: 'user_bank_id', id: true},
	account_number: {column: 'account_number'},
	account_name: {column: 'account_name'},
	account_default: {column: 'account_default'},
	created_at: {column: 'created_at'},
	updated_at: {column: 'updated_at'},
	bank: {
		bank_id: {column: 'bank_id', id: true},
		name: {column: 'bank'}
	}
}]

module.exports = banksDefinition