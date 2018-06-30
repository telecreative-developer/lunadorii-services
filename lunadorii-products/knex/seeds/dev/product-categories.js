exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('product_categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('product_categories').insert([
        {category: 'Makeup'},
        {category: 'Skin Care'},
        {category: 'Tools & Brushes'}
      ])
    })
}
