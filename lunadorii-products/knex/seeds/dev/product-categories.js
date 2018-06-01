exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('product_categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('product_categories').insert([
        {category: 'Skin care'},
        {category: 'Sabun Kecantikan'},
        {category: 'Perawatan Kulit'},
        {category: 'Perawatan Wajah'},
        {category: 'Sabun Cuci Muka'},
      ])
    })
}
