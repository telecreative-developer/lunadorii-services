
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('product_brands').del()
    .then(function () {
      // Inserts seed entries
      return knex('product_brands').insert([
        {brand: 'Zara', logo_url: 'https://www.varchev.com/wp-content/uploads/2015/06/zara-logo.jpg'},
        {brand: 'SK-II', logo_url: 'https://media.dermstore.com/catalog/503081/brand_logo.jpg'},
        {brand: 'Cottage', logo_url: 'https://ergasterblog.files.wordpress.com/2015/01/logo-cottage-300x185.jpg?w=366&h=226'},
        {brand: 'Garnier', logo_url: 'https://www.druni.es/media/brand/Garnier-logo.jpg'},
        {brand: 'Loreal', logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVD-jony6hCpxL-twcv_pNvqSBVYCsivisjhlGNCfkRU1x8ZeO'}
      ])
    })
}
