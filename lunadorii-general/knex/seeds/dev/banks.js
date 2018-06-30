exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('banks').del()
    .then(function () {
      // Inserts seed entries
      return knex('banks').insert([
        {bank: 'Anglomas International Bank'},
        {bank: 'BCA Syariah'},
        {bank: 'BII Syariah'},
        {bank: 'Bangkok Bank'},
        {bank: 'Bank ANZ Indonesia'},
        {bank: 'Bank Agris'},
        {bank: 'Bank Agroniaga'},
        {bank: 'Bank Andara'},
        {bank: 'Bank Artha Graha International'},
        {bank: 'Bank Artos Indonesia'},
        {bank: 'Bank BJB (Bandunng)'},
        {bank: 'Bank BJB Syariah'},
        {bank: 'Bank BNI Syariah'},
        {bank: 'Bank BNP Paribas Indonesia'},
        {bank: 'Bank BPD Aceh (Banda Aceh)'},
        {bank: 'Bank BPD Aceh Syariah'},
        {bank: 'Bank BPD Bali (Denpasar)'},
        {bank: 'Bank BPD DIY (Yogyakarta)'},
        {bank: 'Bank BRI Syariah'},
        {bank: 'Bank BTN Syariah'},
        {bank: 'Bank Bengkulu (Bengkulu)'},
        {bank: 'Bank Bisnis Internasional'},
        {bank: 'Bank Bukopin'},
        {bank: 'Bank Bumi Arta'},
        {bank: 'Bank CIMB Niaga'},
        {bank: 'Bank Capital Indonesia'},
        {bank: 'Bank Central Asia (BCA)'},
        {bank: 'Bank Chinatrust Indonesia'},
        {bank: 'Bank Commonwealth'},
        {bank: 'Bank DBS Indonesia'},
        {bank: 'Bank DKI (Jakarta)'},
        {bank: 'Bank DKI Syariah'},
        {bank: 'Bank Danamon Indonesia'},
        {bank: 'Bank Danamon Syariah'},
        {bank: 'Bank Dipo International'},
        {bank: 'Bank Ekonomi Raharja'},
        {bank: 'Bank Fama International'},
        {bank: 'Bank Ganesha'},
        {bank: 'Bank Hana'},
        {bank: 'Bank Harda International'},
        {bank: 'Bank Bank ICB Bumiputra'},
        {bank: 'Bank ICBC Indonesia'},
        {bank: 'Bank International Indonesia (BII)'},
        {bank: 'Bank J Trust Indonesia'},
        {bank: 'Bank Jambi (Jambi)'},
        {bank: 'Bank Jasa Jakarta'},
        {bank: 'Bank Jateng (Semarang)'},
        {bank: 'Bank Jatim (Surabaya)'},
        {bank: 'Bank KEB Indonesia'},
        {bank: 'Bank Kalbar (Pontianak)'},
        {bank: 'Bank Kalbar Syariah'},
        {bank: 'Bank Kalsel (Banjarmasin)'},
        {bank: 'Bank Kalsel Syariah'},
        {bank: 'Bank Kalteng (Palangka Raya)'},
        {bank: 'Bank Kaltim (Samarinda)'},
        {bank: 'Bank Kesejahteraan Ekonomi'},
        {bank: 'Bank Lampung (Bandar Lampung)'},
        {bank: 'Bank Liman International'},
        {bank: 'Bank Maluku (Ambon)'},
        {bank: 'Bank Mandiri'},
        {bank: 'Bank Maspion'},
        {bank: 'Bank Mayapada'},
        {bank: 'Bank Maybank Indonesia'},
        {bank: 'Bank Maybank Syariah Indonesia'},
        {bank: 'Bank Mayora'},
        {bank: 'Bank Mega'},
        {bank: 'Bank Mega Syariah'},
        {bank: 'Bank Mestika Dharma'},
        {bank: 'Bank Metro Express'},
        {bank: 'Bank Mitraniaga'},
        {bank: 'Bank Mizuho Indonesia'},
        {bank: 'Bank Muamalat Indonesia'},
        {bank: 'Bank Multi Arta Sentosa'},
        {bank: 'Bank NTB (Mataram)'},
        {bank: 'Bank NTB Syariah'},
        {bank: 'Bank NTT (Kupang)'},
        {bank: 'Bank Nagari (Padang)'},
        {bank: 'Bank Nationalnobu'},
        {bank: 'Bank Negara Indonesia (BNI)'},
        {bank: 'Bank Nusa Parahayangan'},
        {bank: 'Bank OCBC NISP'},
        {bank: 'Bank Papua (Jayapura)'},
        {bank: 'Bank Perkreditan Rakyat (BPR KS)'},
        {bank: 'Bank Permata'},
        {bank: 'Bank Permata Syariah'},
        {bank: 'Bank Pundi Indonesia'},
        {bank: 'Bank QNB Kesawan'},
        {bank: 'Bank Rabobank International Indonesia'},
        {bank: 'Bank Rakyat Indonesia (BRI)'},
        {bank: 'Bank Resona Perdania'},
        {bank: 'Bank Riau Kepri (Pekanbaru)'},
        {bank: 'Bank Riau Kepri Syariah'},
        {bank: 'Bank Royal Indonesia'},
        {bank: 'Bank SBI Indonesia'},
        {bank: 'Bank Sahabat Purba Danarta'},
        {bank: 'Bank Sinar Harapan Bali'},
        {bank: 'Bank Sinarmas'},
        {bank: 'Bank Sulsel (Makassar)'},
        {bank: 'Bank Sulteng (Palu)'},
        {bank: 'Bank Sulstra (Kendari)'},
        {bank: 'Bank Sulut (Manado)'},
        {bank: 'Bank Sumitomo Mitsui Indonesia'},
        {bank: 'Bank Sumsel Babel (Palembang)'},
        {bank: 'Bank Sumsel Babel Syariah'},
        {bank: 'Bank Sumut (Medan)'},
        {bank: 'Bank Sumut Syariah'},
        {bank: 'Bank Syariah Bukopin'},
        {bank: 'Bank Syariah Mandiri'},
        {bank: 'Bank Tabungan Negara (BTN)'},
        {bank: 'Bank Tabungan Pensiun Nasional'},
        {bank: 'Bank UOB Indonesia'},
        {bank: 'Bank Victoria International'},
        {bank: 'Bank Victoria Syariah'},
        {bank: 'Bank Windu Ketjana International'},
        {bank: 'Bank Woori Indonesia'},
        {bank: 'Bank Yudha Bhakti'},
        {bank: 'Bank of America'},
        {bank: 'Bank of China'},
        {bank: 'Bank of India Indonesia'},
        {bank: 'Bank Woori Indonesia'},
        {bank: 'CIMB Niaga Syariah'},
        {bank: 'Centrama Nasional Bank'},
        {bank: 'Citibank'},
        {bank: 'Deutsche Bank'},
        {bank: 'HSBC'},
        {bank: 'HSBC Amanah'},
        {bank: 'JPMorgan Chase'},
        {bank: 'OCBC NISP Syariah'},
        {bank: 'Panin Bank'},
        {bank: 'Panin Bank Syariah'},
        {bank: 'Prima Master Bank'},
        {bank: 'Rolay Bank of Scotland'},
        {bank: 'Standard Chartered'},
        {bank: 'The Bank of Tokyo Mitsubishi UFJ'}
      ])
    })
}