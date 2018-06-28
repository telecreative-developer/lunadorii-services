exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_addresses').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_addresses').insert([
        {recepient: 'Kevin Hermawan', phone: '0895800271271', longitude: -6.1541316, latitude: 106.9152365, postal_code: 14250, detail_address: 'Jl. Pegangsaan Dua, RT.2/RW.3, Pegangsaan Dua, Klp. Gading, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14250', address_default: true, province_id: 1, city_id: 1, district_id: 1, id: 16},
        {recepient: 'Alfan Hibban', phone: '0895800271271', longitude: -6.1541316, latitude: 106.9152365, postal_code: 14250, detail_address: 'Jl. Pegangsaan Dua, RT.2/RW.3, Pegangsaan Dua, Klp. Gading, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14250', address_default: true, province_id: 1, city_id: 1, district_id: 1, id: 1},
        {recepient: 'Isa WK', phone: '0895800271271', longitude: -6.1541316, latitude: 106.9152365, postal_code: 14250, detail_address: 'Jl. Pegangsaan Dua, RT.2/RW.3, Pegangsaan Dua, Klp. Gading, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14250', address_default: true, province_id: 1, city_id: 1, district_id: 1, id: 2}
      ])
    })
}
