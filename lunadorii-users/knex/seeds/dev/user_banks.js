
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_banks').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_banks').insert([
        {account_number: '0893912731837', account_name: 'Kevin Hermawan', account_default: true, bank_id: 1, id: 1},
        {account_number: '0893912731837', account_name: 'Isa Wk', account_default: false, bank_id: 1, id: 2},
        {account_number: '0893912731837', account_name: 'Alfan Hibban', account_default: true, bank_id: 1, id: 3},
        {account_number: '0893912731837', account_name: 'Rehan Choirul', account_default: false, bank_id: 1, id: 4},
        {account_number: '0893912731837', account_name: 'Pradeta Surya', account_default: true, bank_id: 1, id: 5},
      ])
    })
}
