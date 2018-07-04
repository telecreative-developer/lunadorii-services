exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {colName: 'rowValue1'},
        {colName: 'rowValue2'},
        {colName: 'rowValue3'}
      ])
    })
}
