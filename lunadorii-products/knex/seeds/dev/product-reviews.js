
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('product_reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('product_reviews').insert([
        {rate: 1, comment: 'Recommend product!', product_id: 1, id: 1},
        {rate: 2, comment: 'Recommend product!', product_id: 1, id: 2},
        {rate: 3, comment: 'Recommend product!', product_id: 1, id: 3},
        {rate: 4, comment: 'Recommend product!', product_id: 1, id: 4},
        {rate: 5, comment: 'Recommend product!', product_id: 1, id: 5},
        {rate: 1, comment: 'Recommend product!', product_id: 2, id: 1},
        {rate: 2, comment: 'Recommend product!', product_id: 2, id: 2},
        {rate: 3, comment: 'Recommend product!', product_id: 2, id: 3},
        {rate: 4, comment: 'Recommend product!', product_id: 2, id: 4},
        {rate: 5, comment: 'Recommend product!', product_id: 2, id: 5},
        {rate: 1, comment: 'Recommend product!', product_id: 3, id: 1},
        {rate: 2, comment: 'Recommend product!', product_id: 3, id: 2},
        {rate: 3, comment: 'Recommend product!', product_id: 3, id: 3},
        {rate: 4, comment: 'Recommend product!', product_id: 3, id: 4},
        {rate: 5, comment: 'Recommend product!', product_id: 3, id: 5},
        {rate: 1, comment: 'Recommend product!', product_id: 4, id: 1},
        {rate: 2, comment: 'Recommend product!', product_id: 4, id: 2},
        {rate: 3, comment: 'Recommend product!', product_id: 4, id: 3},
        {rate: 4, comment: 'Recommend product!', product_id: 4, id: 4},
        {rate: 5, comment: 'Recommend product!', product_id: 4, id: 5},
        {rate: 1, comment: 'Recommend product!', product_id: 5, id: 1},
        {rate: 2, comment: 'Recommend product!', product_id: 5, id: 2},
        {rate: 3, comment: 'Recommend product!', product_id: 5, id: 3},
        {rate: 4, comment: 'Recommend product!', product_id: 5, id: 4},
        {rate: 5, comment: 'Recommend product!', product_id: 5, id: 5}
      ])
    })
}
