
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('provinces').del()
    .then(function () {
      // Inserts seed entries
      return knex('provinces').insert([
        {province: 'Aceh'},
        {province: 'Bali'},
        {province: 'Banten'},
        {province: 'Bengkulu'},
        {province: 'Gorontalo'},
        {province: 'Jakarta'},
        {province: 'Jambi'},
        {province: 'Jawa Barat'},
        {province: 'Jawa Tengah'},
        {province: 'Jawa Timur'},
        {province: 'Kalimantan Barat'},
        {province: 'Kalimantan Selatan'},
        {province: 'Kalimantan Timur'},
        {province: 'Kalimantan Utara'},
        {province: 'Kepulauan Bangka Belitung'},
        {province: 'Kepulauan Riau'},
        {province: 'Lampung'},
        {province: 'Maluku'},
        {province: 'Maluku Utara'},
        {province: 'Nusa Tenggara Barat'},
        {province: 'Nusa Tenggara Timur'},
        {province: 'Papua'},
        {province: 'Papua Barat'},
        {province: 'Riau'},
        {province: 'Sulawesi Barat'},
        {province: 'Sulawesi Selatan'},
        {province: 'Sulawesi Tengah'},
        {province: 'Sulawesi Tenggara'},
        {province: 'Sulawesi Utara'},
        {province: 'Sumatra Barat'},
        {province: 'Sumatra Selatan'},
        {province: 'Sumatra Utara'},
        {province: 'Yogyakarta'}
      ])
    })
}
