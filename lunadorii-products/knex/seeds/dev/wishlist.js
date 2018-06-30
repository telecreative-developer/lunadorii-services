exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('wishlist').del()
    .then(function () {
      // Inserts seed entries
      return knex('wishlist').insert([
        {product_id: 1, id: 1},
        {product_id: 2, id: 1},
        {product_id: 3, id: 1},
        {product_id: 4, id: 1},
        {product_id: 5, id: 1},
        {product_id: 1, id: 2},
        {product_id: 2, id: 2},
        {product_id: 3, id: 2},
        {product_id: 4, id: 2},
        {product_id: 5, id: 2},
        {product_id: 1, id: 3},
        {product_id: 2, id: 3},
        {product_id: 3, id: 3},
        {product_id: 4, id: 3},
        {product_id: 5, id: 3},
        {product_id: 1, id: 4},
        {product_id: 2, id: 4},
        {product_id: 3, id: 4},
        {product_id: 4, id: 4},
        {product_id: 5, id: 4},
        {product_id: 1, id: 5},
        {product_id: 2, id: 5},
        {product_id: 3, id: 5},
        {product_id: 4, id: 5},
        {product_id: 5, id: 5}
      ])
    })
};
