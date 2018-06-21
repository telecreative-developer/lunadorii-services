exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admin')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('admin').insert([
        { username: 'kevinhermawan', first_name: 'Kevin', last_name: 'Hermawan', email: 'kevinhermawanx@gmail.com', password: '$2y$12$TeIo.XWWP9EeAGSg7QJS.u0lqscwjaLEpLuO85zbhw4vgeTIJM9jm' }
      ])
    })
}
