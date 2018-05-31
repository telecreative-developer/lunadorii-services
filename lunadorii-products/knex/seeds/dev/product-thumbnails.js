
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('product_thumbnails').del()
    .then(function () {
      // Inserts seed entries
      return knex('product_thumbnails').insert([
        {thumbnail_url: 'https://cdn.popbela.com/content-images/post/20171230/hmgoepprod-74f1db24ccce932562be6322ef017396_750x500.jpg', product_id: 1},
        {thumbnail_url: 'https://cdn.brilio.net/news/2017/10/03/132836/9-produk-kecantikan-ini-bikin-kamu-nggak-nyesel-sudah-membelinya-171003d.jpg', product_id: 1},
        {thumbnail_url: 'https://www.optidaily.com/wp-content/uploads/2017/11/4-Merek-Produk-Kecantikan-Korea-yang-Populer-.jpg', product_id: 1},
        {thumbnail_url: 'https://cdns.klimg.com/merdeka.com/i/w/news/2016/07/11/727810/670x335/beda-nama-beda-fungsi-kenali-kegunaan-setiap-produk-kecantikan-ini.jpg', product_id: 2},
        {thumbnail_url: 'https://www.wanista.com/wp-content/uploads/2016/05/Korean-Beauty-Products-Yahoo-01-e1464338578575.jpg', product_id: 2},
        {thumbnail_url: 'https://cdns.klimg.com/merdeka.com/i/w/news/2017/11/07/906481/670x335/yuk-kenali-bahan-bahan-aktif-di-produk-kecantikan-korea-dan-khasiatnya.jpg', product_id: 2},
        {thumbnail_url: 'https://koreancosmeticsmalaysia.files.wordpress.com/2016/07/t2ec16hzue9s39ftsbqqze7t06-60_57.jpg?w=616', product_id: 3},
        {thumbnail_url: 'https://s3.halookorea.com/wp-content/uploads/20180128224136/mamonde.jpg', product_id: 3},
        {thumbnail_url: 'https://s3-ap-southeast-1.amazonaws.com/soc-phoenix/wp-content/uploads/2017/03/20111314/Produk-Kecantikan-Jumbo-Cottage-Redwin-2.jpg', product_id: 3},
        {thumbnail_url: 'https://cdn.sribu.com/assets/media/contest_detail/2017/10/pembuatan-label-arischa-59edbee49d68b10f2d0bde4e/4b656f510a.jpg', product_id: 4},
        {thumbnail_url: 'https://img20.jd.id/Indonesia/s386x386_/nHBfsgAAAwAAAAkACZUkxAABxLY.jpg', product_id: 4},
        {thumbnail_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6D9F2QLZLIsdSarnITtW2O6vUb04IHxb1CfsmfzmVRprmjOcJ', product_id: 4},
        {thumbnail_url: 'https://cdns.klimg.com/vemale.com/headline/650x325/2017/07/ladies-ini-lho-manfaat-produk-skincare-natural-st-ives.jpg', product_id: 5},
        {thumbnail_url: 'https://cdn.sribu.com/assets/media/contest_detail/2017/10/pembuatan-label-arischa-59edbee49d68b10f2d0bde4e/a79e24beea.jpg', product_id: 5},
        {thumbnail_url: 'https://cdn.sribu.com/assets/media/contest_detail/2017/10/pembuatan-label-arischa-59edbee49d68b10f2d0bde4e/076df631da.jpg', product_id: 5}
      ]);
    });
};
