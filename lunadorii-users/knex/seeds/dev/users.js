exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Kevin', age: 18 },
        { name: 'Kevin', age: 18 },
        { name: 'Kevin', age: 18 }
      ])
    })
}
