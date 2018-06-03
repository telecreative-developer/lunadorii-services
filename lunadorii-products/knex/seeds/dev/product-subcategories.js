
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('product_subcategories').del()
    .then(function () {
      // Inserts seed entries
      return knex('product_subcategories').insert([
        {subcategory: 'Face', product_category_id: 1},
        {subcategory: 'Lips', product_category_id: 1},
        {subcategory: 'Eyes', product_category_id: 1},
        {subcategory: 'Skin Concern', product_category_id: 2},
        {subcategory: 'Steps', product_category_id: 2},
        {subcategory: 'Cream & Lotions', product_category_id: 2},
        {subcategory: 'Sunscreens', product_category_id: 2},
        {subcategory: 'Face Packs/Facial', product_category_id: 2},
        {subcategory: 'Spa & Body grances', product_category_id: 2},
        {subcategory: 'Women\'s Hygiene', product_category_id: 2},
        {subcategory: 'Brushes', product_category_id: 3},
        {subcategory: 'Aplicators', product_category_id: 3},
        {subcategory: 'Cream & Lotions', product_category_id: 3},
        {subcategory: 'Sunscreens', product_category_id: 3},
        {subcategory: 'Face Packs/Facial', product_category_id: 3},
        {subcategory: 'Spa & Body grances', product_category_id: 3},
        {subcategory: 'Women\'s Hygiene', product_category_id: 3},
      ])
    })
}
