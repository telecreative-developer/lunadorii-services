exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('banners').del()
    .then(function () {
      // Inserts seed entries
      return knex('banners').insert([
        {title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', thumbnail_url: 'https://cdns.klimg.com/vemale.com/headline/650x325/2012/11/8-mitos-kecantikan-turun-temurun.jpg'},
        {title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', thumbnail_url: 'https://cdns.klimg.com/vemale.com/headline/650x325/2017/10/5-cara-untuk-membuat-wajah-lebih-cerah.jpg'},
        {title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', thumbnail_url: 'https://cdns.klimg.com/merdeka.com/i/w/news/2013/09/30/255971/670x335/4-tips-perawatan-kulit-untuk-wanita-50-an.jpg'}
      ])
    })
}
