pm2 start lunadorii-admin/bin/www --name admin
pm2 start lunadorii-auth/bin/www --name auth
pm2 start lunadorii-auth-admin/bin/www --name auth-admin
pm2 start lunadorii-banners/bin/www --name banners
pm2 start lunadorii-general/bin/www --name general
pm2 start lunadorii-orders/bin/www --name orders
pm2 start lunadorii-products/bin/www --name products
pm2 start lunadorii-promo/bin/www --name promo
pm2 start lunadorii-reports/bin/www --name reports
pm2 start lunadorii-search/bin/www --name search
pm2 start lunadorii-users/bin/www --name users
pm2 start lunadorii-gateway/server.js --name gateway