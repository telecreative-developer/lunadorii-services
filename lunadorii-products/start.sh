npm install
knex migration:latest
mv knex/seeds/dev/cart.js knex/seeds/dev/cart
mv knex/seeds/dev/product-reviews.js knex/seeds/dev/product-reviews
mv knex/seeds/dev/product-subcategories.js knex/seeds/dev/product-subcategories
mv knex/seeds/dev/product-thumbnails.js knex/seeds/dev/product-thumbnails
mv knex/seeds/dev/products.js knex/seeds/dev/products
mv knex/seeds/dev/wishlist.js knex/seeds/dev/wishlist
knex seed:run
mv knex/seeds/dev/product-brands.js knex/seeds/dev/product-brands
mv knex/seeds/dev/product-categories.js knex/seeds/dev/product-categories
mv knex/seeds/dev/product-subcategories knex/seeds/dev/product-subcategories.js
knex seed:run
mv knex/seeds/dev/product-subcategories.js knex/seeds/dev/product-subcategories
mv knex/seeds/dev/products knex/seeds/dev/products.js
knex seed:run
mv knex/seeds/dev/products.js knex/seeds/dev/products
mv knex/seeds/dev/product-reviews knex/seeds/dev/product-reviews.js
mv knex/seeds/dev/product-thumbnails knex/seeds/dev/product-thumbnails.js
mv knex/seeds/dev/wishlist knex/seeds/dev/wishlist.js
mv knex/seeds/dev/cart knex/seeds/dev/cart.js
knex seed:run
mv knex/seeds/dev/cart knex/seeds/dev/cart.js
mv knex/seeds/dev/product-brands knex/seeds/dev/product-brands.js
mv knex/seeds/dev/product-reviews knex/seeds/dev/product-reviews.js
mv knex/seeds/dev/product-categories knex/seeds/dev/product-categories.js
mv knex/seeds/dev/product-subcategories knex/seeds/dev/product-subcategories.js
mv knex/seeds/dev/product-thumbnails knex/seeds/dev/product-thumbnails.js
mv knex/seeds/dev/products knex/seeds/dev/products.js
mv knex/seeds/dev/wishlist knex/seeds/dev/wishlist.js