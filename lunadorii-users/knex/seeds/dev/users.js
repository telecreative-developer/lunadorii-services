exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { first_name: 'Kevin', last_name: 'Hermawan', email: 'kevinhermawanx@gmail.com', password: '$2y$12$TeIo.XWWP9EeAGSg7QJS.u0lqscwjaLEpLuO85zbhw4vgeTIJM9jm' },
        { first_name: 'Rendi', last_name: 'Simamora', email: 'rendisimamora@gmail.com', password: '$2y$12$XcMWB0qmnbgUIVMLpV7tuuShKxooo1x8ZR4ap85nJwAaqqquCiije' },
        { first_name: 'Dicky', last_name: 'Perdian', email: 'dickyperdian@gmail.com', password: '$2y$12$yAk4NYA5otPUsvg.vrtp6uylMWVFus7KbYF9UJv2A5wKrtzF1DcSW' },
        { first_name: 'Alfan', last_name: 'Hiban', email: 'alfanhiban@gmail.com', password: '$2y$12$CY4JMHCC472QvgSw9XsklOuswWSC84Ym9os6aJib.A.gw6YCCeaYq' },
        { first_name: 'Isa', last_name: 'WK', email: 'isawk@gmail.com', password: '$2y$12$x1urq81GQ/NbCtLYoqu9Re6en4Eu/tOJZ/X4ST/9lrFhhG6S6q6r2' }
      ])
    })
}
