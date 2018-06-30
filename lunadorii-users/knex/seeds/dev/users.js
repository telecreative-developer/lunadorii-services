exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'Kevin',
          last_name: 'Hermawan',
          email: 'kevinhermawanx@gmail.com',
          bod: '1999-06-06',
          avatar_url: 'https://avatars2.githubusercontent.com/u/20070808?s=460&v=4',
          password: '$2b$10$5ST1MzQxEAvyNWjoO9iSyee05U0fnzFl4rSl7Ycs6ULw31VjhLrcW'
        },
        { 
          first_name: 'Rendi',
          last_name: 'Simamora',
          email: 'rendisimamora@gmail.com',
          bod: '1999-06-06',
          avatar_url: 'https://avatars2.githubusercontent.com/u/20070808?s=460&v=4',
          password: '$2b$10$5ST1MzQxEAvyNWjoO9iSyee05U0fnzFl4rSl7Ycs6ULw31VjhLrcW'
        },
        {
          first_name: 'Dicky',
          last_name: 'Perdian',
          email: 'dickyperdian@gmail.com',
          bod: '1999-06-06',
          avatar_url: 'https://avatars2.githubusercontent.com/u/20070808?s=460&v=4',
          password: '$2b$10$5ST1MzQxEAvyNWjoO9iSyee05U0fnzFl4rSl7Ycs6ULw31VjhLrcW'
        },
        { 
          first_name: 'Alfan',
          last_name: 'Hiban',
          email: 'alfanhiban@gmail.com',
          bod: '1999-06-06',
          avatar_url: 'https://avatars2.githubusercontent.com/u/20070808?s=460&v=4',
          password: '$2b$10$5ST1MzQxEAvyNWjoO9iSyee05U0fnzFl4rSl7Ycs6ULw31VjhLrcW'
        },
        { 
          first_name: 'Isa',
          last_name: 'WK',
          email: 'isawk@gmail.com',
          bod: '1999-06-06',
          avatar_url: 'https://avatars2.githubusercontent.com/u/20070808?s=460&v=4',
          password: '$2b$10$5ST1MzQxEAvyNWjoO9iSyee05U0fnzFl4rSl7Ycs6ULw31VjhLrcW'
        }
      ])
    })
}
