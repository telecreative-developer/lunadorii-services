exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cart').del()
    .then(function () {
      // Inserts seed entries
      return knex('cart').insert([
        {product_id: 1, id: 1, qty: 1},
        {product_id: 2, id: 1, qty: 2},
        {product_id: 3, id: 1, qty: 3},
        {product_id: 4, id: 1, qty: 4},
        {product_id: 5, id: 1, qty: 5},
        {product_id: 1, id: 2, qty: 6},
        {product_id: 2, id: 2, qty: 7},
        {product_id: 3, id: 2, qty: 8},
        {product_id: 4, id: 2, qty: 9},
        {product_id: 5, id: 2, qty: 1},
        {product_id: 1, id: 3, qty: 2},
        {product_id: 2, id: 3, qty: 3},
        {product_id: 3, id: 3, qty: 4},
        {product_id: 4, id: 3, qty: 5},
        {product_id: 5, id: 3, qty: 6},
        {product_id: 1, id: 4, qty: 7},
        {product_id: 2, id: 4, qty: 8},
        {product_id: 3, id: 4, qty: 9},
        {product_id: 4, id: 4, qty: 1},
        {product_id: 5, id: 4, qty: 2},
        {product_id: 1, id: 5, qty: 3},
        {product_id: 2, id: 5, qty: 4},
        {product_id: 3, id: 5, qty: 5},
        {product_id: 4, id: 5, qty: 6},
        {product_id: 5, id: 5, qty: 7}
      ])
    })
};
