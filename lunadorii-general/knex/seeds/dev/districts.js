
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('districts').del()
    .then(function () {
      // Inserts seed entries
      return knex('districts').insert([
        {district: 'Abiansemal', city_id: 1},
        {district: 'Kuta', city_id: 1},
        {district: 'Kuta Selatan', city_id: 1},
        {district: 'Kuta Utara', city_id: 1},
        {district: 'Menguwi', city_id: 1},
        {district: 'Ngurah Rai', city_id: 1},
        {district: 'Petang', city_id: 1},
        {district: 'Bangli', city_id: 2},
        {district: 'Kintamani', city_id: 2},
        {district: 'Susut', city_id: 2},
        {district: 'Tembuku', city_id: 2},
        {district: 'Banjar', city_id: 3},
        {district: 'Buleleng', city_id: 3},
        {district: 'Busung Biu', city_id: 3},
        {district: 'Gerokgak', city_id: 3},
        {district: 'Sawan', city_id: 3},
        {district: 'Seririt', city_id: 3},
        {district: 'Sukasada', city_id: 3},
        {district: 'Tejakula', city_id: 3},
        {district: 'Denpasar', city_id: 4},
        {district: 'Denpasar Barat', city_id: 4},
        {district: 'Denpasar Selatan', city_id: 4},
        {district: 'Denpasar Timur', city_id: 4},
        {district: 'Denpasar Utara', city_id: 4},
        {district: 'Blahbatu', city_id: 5},
        {district: 'Gianyar', city_id: 5},
        {district: 'Payangan', city_id: 5},
        {district: 'Sukawati', city_id: 5},
        {district: 'Tempaksiring', city_id: 5},
        {district: 'Tegal Lalang', city_id: 5},
        {district: 'Ubud', city_id: 5},
        {district: 'Jembrana', city_id: 6},
        {district: 'Melaya', city_id: 6},
        {district: 'Mendoyo', city_id: 6},
        {district: 'Negara', city_id: 6},
        {district: 'Pekutatan', city_id: 6},
        {district: 'Abang', city_id: 7},
        {district: 'Babadem', city_id: 7},
        {district: 'Karangasem', city_id: 7},
        {district: 'Kubu', city_id: 7},
        {district: 'Manggis', city_id: 7},
        {district: 'Rendang', city_id: 7},
        {district: 'Selat', city_id: 7},
        {district: 'Sidemen', city_id: 7},
        {district: 'Banjarangkan', city_id: 8},
        {district: 'Dawan', city_id: 8},
        {district: 'Klungkung', city_id: 8},
        {district: 'Nusapenida', city_id: 8},
        {district: 'Baturiti', city_id: 9},
        {district: 'Kediri', city_id: 9},
        {district: 'Kerambitan', city_id: 9},
        {district: 'Marga', city_id: 9},
        {district: 'Penebel', city_id: 9},
        {district: 'Pupuann', city_id: 9},
        {district: 'Selemadeg', city_id: 9},
        {district: 'Selemadeg Barat', city_id: 9},
        {district: 'Selemadeg Timur', city_id: 9},
        {district: 'Tabanan', city_id: 9},
        {district: 'Cibeber', city_id: 10},
        {district: 'Cilegon', city_id: 10},
        {district: 'Citangkil', city_id: 10},
        {district: 'Ciwandan', city_id: 10},
        {district: 'Gerogol', city_id: 10},
        {district: 'Jombang', city_id: 10},
        {district: 'Pulomerak', city_id: 10},
        {district: 'Merak', city_id: 10},
        {district: 'Purwakarta', city_id: 10},
        {district: 'Banjarsari', city_id: 11},
        {district: 'Bayah', city_id: 11},
        {district: 'Bojongmanik', city_id: 11},
        {district: 'Cibadak', city_id: 11},
        {district: 'Cibeber', city_id: 11},
        {district: 'Cigemlong', city_id: 11},
        {district: 'Cihara', city_id: 11},
        {district: 'Cijaku', city_id: 11},
        {district: 'Cikulur', city_id: 11},
        {district: 'Cileles', city_id: 11},
        {district: 'Cilograng', city_id: 11},
        {district: 'Cimarga', city_id: 11},
        {district: 'Cipanas', city_id: 11},
        {district: 'Cirenten', city_id: 11},
        {district: 'Curugbitung', city_id: 11},
        {district: 'Gunungkencana', city_id: 11},
        {district: 'Kalanganyar', city_id: 11},
        {district: 'Lebakgendong', city_id: 11},
        {district: 'Leuwidamar', city_id: 11},
        {district: 'Maja', city_id: 11},
        {district: 'Malingping', city_id: 11},
        {district: 'Muncang', city_id: 11},
        {district: 'Panggarangan', city_id: 11},
        {district: 'Rangkasbitung', city_id: 11},
        {district: 'Sajira', city_id: 11},
        {district: 'Sobang', city_id: 11},
        {district: 'Wanasalam', city_id: 11},
        {district: 'Warunggunung', city_id: 11},
        {district: 'Angsana', city_id: 12},
        {district: 'Banjar', city_id: 1},
        {district: 'Bojong', city_id: 1},
        {district: 'Cadas Sari', city_id: 1},
        {district: 'Carita', city_id: 1},
        {district: 'Cibaliung', city_id: 1},
        {district: 'Cibitung', city_id: 1},
        {district: 'Cigeulis', city_id: 1},
        {district: 'Cikedal', city_id: 1},
        {district: 'Cikeusik', city_id: 1},
        {district: 'Cimanggu', city_id: 1},
        {district: 'Cimanuk', city_id: 1},
        {district: 'Cipeucang', city_id: 1},
        {district: 'Cisata', city_id: 1},
        {district: 'Jiput', city_id: 1},
        {district: 'Kaduhejo', city_id: 1},
        {district: 'Karangtanjung', city_id: 1},
        {district: 'Koroncong', city_id: 1},
        {district: 'Labuan', city_id: 1},
        {district: 'Majasari', city_id: 1},
        {district: 'Mandalawangi', city_id: 1},
        {district: 'Mekarjaya', city_id: 1},
        {district: 'Menes', city_id: 1},
        {district: 'Munjul', city_id: 1},
        {district: 'Pagelaran', city_id: 1},
        {district: 'Pandeglang', city_id: 1},
        {district: 'Panimbang', city_id: 1},
        {district: 'Patia', city_id: 1},
        {district: 'Picung', city_id: 1},
        {district: 'Pulosari', city_id: 1},
        {district: 'Saketi', city_id: 1},
        {district: 'Sindangresmi', city_id: 1},
        {district: 'Sobang', city_id: 1},
        {district: 'Sukaresmi', city_id: 1},
        {district: 'Sumur', city_id: 1}
      ])
    })
}
