
# Products

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Resource Types

| No  | HTTP Method | HTTP Request                                       | HTTP Code     | Token Required     |
|-----|-------------|----------------------------------------------------|---------------|--------------------|
| 1   | GET         | /api/v1/products                                   | 200, 500      | :x:                |
| 2   | GET         | /api/v1/product/:product_id                        | 200, 500      | :x:                |
| 3   | PUT         | /api/v1/product/:product_id                        | 200, 400, 500 | :white_check_mark: |
| 4   | DELETE      | /api/v1/product/:product_id                        | 200, 500      | :white_check_mark: |
| 5   | GET         | /api/v1/product-brands                             | 200, 500      | :x:                |
| 6   | GET         | /api/v1/product-brands?with_product=true           | 200, 500      | :x:                |
| 7   | GET         | /api/v1/product-categories                         | 200, 500      | :x:                |
| 8   | GET         | /api/v1/product-categories?with_subcategories=true | 200, 500      | :x:                |
| 9   | GET         | /api/v1/product-subcategories                      | 200, 500      | :x:                |
| 10  | POST        | /api/v1/cart                                       | 201, 400, 500 | :white_check_mark: |
| 11  | GET         | /api/v1/cart/:id                                   | 200, 500      | :x:                |

## Description
#### 1. GET all products information

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Get Products",
    "status": 200,
    "data": [
        {
            "product_id": 1,
            "product": "Product Name",
            "description": "Product Description",
            "detail": "Product Detail",
            "to_use": "How to use",
            "price": 200000,
            "discount": true,
            "discount_percentage": 100,
            "created_at": "2018-06-04T06:35:42.443Z",
            "updated_at": "2018-06-04T06:35:42.443Z",
            "subcategories": [
                {
                    "product_subcategory_id": 3,
                    "subcategory": "Eyes"
                },
                {
                    "product_subcategory_id": 2,
                    "subcategory": "Lips"
                },
                {
                    "product_subcategory_id": 1,
                    "subcategory": "Face"
                }
            ],
            "brands": [
                {
                    "product_brand_id": 1,
                    "brand": "Zara",
                    "logo_url": "logo url"
                }
            ],
            "thumbnails": [
                {
                    "product_thumbnail_id": 1,
                    "thumbnail_url": "thumbnail url"
                },
                {
                    "product_thumbnail_id": 2,
                    "thumbnail_url": "thumbnail url"
                },
                {
                    "product_thumbnail_id": 3,
                    "thumbnail_url": "thumbnail url"
                }
            ],
            "reviews": [
                {
                    "product_review_id": 1,
                    "review_rate": 1,
                    "comment": "Recommend product!"
                },
                {
                    "product_review_id": 2,
                    "review_rate": 2,
                    "comment": "Recommend product!"
                },
                {
                    "product_review_id": 3,
                    "review_rate": 3,
                    "comment": "Recommend product!"
                },
                {
                    "product_review_id": 4,
                    "review_rate": 4,
                    "comment": "Recommend product!"
                },
                {
                    "product_review_id": 5,
                    "review_rate": 5,
                    "comment": "Recommend product!"
                }
            ],
            "product_rate": 3
        },
        ...
    ]
}
```

#### 2. GET single product information

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Get Products",
    "status": 200,
    "data": [
        {
            "product_id": 1,
            "product": "Product Name",
            "description": "Product Description",
            "detail": "Product Detail",
            "to_use": "How to use",
            "price": 200000,
            "discount": true,
            "discount_percentage": 100,
            "created_at": "2018-06-04T06:35:42.443Z",
            "updated_at": "2018-06-04T06:35:42.443Z",
            "subcategories": [
                {
                    "product_subcategory_id": 3,
                    "subcategory": "Eyes"
                },
                {
                    "product_subcategory_id": 2,
                    "subcategory": "Lips"
                },
                {
                    "product_subcategory_id": 1,
                    "subcategory": "Face"
                }
            ],
            "brands": [
                {
                    "product_brand_id": 1,
                    "brand": "Zara",
                    "logo_url": "logo url"
                }
            ],
            "thumbnails": [
                {
                    "product_thumbnail_id": 1,
                    "thumbnail_url": "thumbnail url"
                },
                {
                    "product_thumbnail_id": 2,
                    "thumbnail_url": "thumbnail url"
                },
                {
                    "product_thumbnail_id": 3,
                    "thumbnail_url": "thumbnail url"
                }
            ],
            "reviews": [
                {
                    "product_review_id": 1,
                    "review_rate": 1,
                    "comment": "Recommend product!"
                },
                {
                    "product_review_id": 2,
                    "review_rate": 2,
                    "comment": "Recommend product!"
                },
                {
                    "product_review_id": 3,
                    "review_rate": 3,
                    "comment": "Recommend product!"
                },
                {
                    "product_review_id": 4,
                    "review_rate": 4,
                    "comment": "Recommend product!"
                },
                {
                    "product_review_id": 5,
                    "review_rate": 5,
                    "comment": "Recommend product!"
                }
            ],
            "product_rate": 3
        }
    ]
}
```

#### 3. UPDATE product
### Request
```javascript
{
    "product": "Product Name",
    "description": "Product Description",
    "detail": "Product Detail",
    "to_use": "How to use",
    "price": 200000,
    "discount": true,
    "discount_percentage": 100,
    "product_subcategory_id": 1,
    "product_brand_id": 1
}
```

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Update Product",
    "status": 200,
    "data": 1
}
```
#### 4. DELETE product

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Delete Product",
    "status": 200,
    "data": 1
}
```
#### 5. GET product brands

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Get Product Brands",
    "status": 200,
    "data": [
        {
            "product_brand_id": 1,
            "brand": "Brand name",
            "logo_url": "logo url",
            "created_at": "2018-06-04T06:34:04.196Z",
            "updated_at": "2018-06-04T06:34:04.196Z"
        },
        {
            "product_brand_id": 2,
            "brand": "Brand name",
            "logo_url": "logo url",
            "created_at": "2018-06-04T06:34:04.196Z",
            "updated_at": "2018-06-04T06:34:04.196Z"
        },
        ...
    ]
}
```
#### 6. GET product brands with product

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Get Product Brands with Products",
    "status": 200,
    "data": [
        {
            "product_brand_id": 1,
            "brand": "Brand name",
            "logo_url": "logo url",
            "products": [
                {
                    "product_id": 1,
                    "product": "Product Name",
                    "description": "Product Description",
                    "detail": "Product Detail",
                    "to_use": "How to use",
                    "price": 200000,
                    "discount": true,
                    "discount_percentage": 100
                }
            ]
        },
        {
            "product_brand_id": 2,
            "brand": "Brand name",
            "logo_url": "logo url",
            "products": [
                {
                    "product_id": 1,
                    "product": "Product Name",
                    "description": "Product Description",
                    "detail": "Product Detail",
                    "to_use": "How to use",
                    "price": 200000,
                    "discount": true,
                    "discount_percentage": 100
                },
                {
                    "product_id": 2,
                    "product": "Product Name",
                    "description": "Product Description",
                    "detail": "Product Detail",
                    "to_use": "How to use",
                    "price": 200000,
                    "discount": true,
                    "discount_percentage": 100
                }
            ]
        },
        ...
    ]
}
```
#### 7. GET product categories

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Get Product Categories",
    "status": 200,
    "data": [
        {
            "product_category_id": 1,
            "category": "Category name",
            "created_at": "2018-06-04T06:34:04.201Z",
            "updated_at": "2018-06-04T06:34:04.201Z"
        },
        {
            "product_category_id": 2,
            "category": "Category name",
            "created_at": "2018-06-04T06:34:04.201Z",
            "updated_at": "2018-06-04T06:34:04.201Z"
        },
        {
            "product_category_id": 3,
            "category": "Category name",
            "created_at": "2018-06-04T06:34:04.201Z",
            "updated_at": "2018-06-04T06:34:04.201Z"
        }
    ]
}
```
#### 8. GET product categories with subcategories

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Get Product Categories with Subcategories",
    "status": 200,
    "data": [
        {
            "product_category_id": 1,
            "category": "Category name",
            "subcategories": [
                {
                    "product_subcategory_id": 1,
                    "subcategory": "Subcategory name"
                },
                {
                    "product_subcategory_id": 2,
                    "subcategory": "Subcategory name"
                },
                {
                    "product_subcategory_id": 3,
                    "subcategory": "Subcategory name"
                },
                ...
            ]
        },
        {
            "product_category_id": 2,
            "category": "Category name",
            "subcategories": [
                {
                    "product_subcategory_id": 4,
                    "subcategory": "Subcategory name"
                },
                {
                    "product_subcategory_id": 5,
                    "subcategory": "Subcategory name"
                },
                {
                    "product_subcategory_id": 6,
                    "subcategory": "Subcategory name"
                },
                ...
            ]
        },
        {
            "product_category_id": 3,
            "category": "Category name",
            "subcategories": [
                {
                    "product_subcategory_id": 11,
                    "subcategory": "Subcategory name"
                },
                {
                    "product_subcategory_id": 12,
                    "subcategory": "Subcategory name"
                },
                ...
            ]
        },
        ...
    ]
}
```
#### 8. GET subcategories

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Get Product Subcategories",
    "status": 200,
    "data": [
        {
            "product_subcategory_id": 1,
            "subcategory": "Subcategory name",
            "product_category_id": 1,
            "created_at": "2018-06-04T06:34:55.003Z",
            "updated_at": "2018-06-04T06:34:55.003Z"
        },
        {
            "product_subcategory_id": 2,
            "subcategory": "Subcategory name",
            "product_category_id": 1,
            "created_at": "2018-06-04T06:34:55.003Z",
            "updated_at": "2018-06-04T06:34:55.003Z"
        },
        {
            "product_subcategory_id": 3,
            "subcategory": "Subcategory name",
            "product_category_id": 1,
            "created_at": "2018-06-04T06:34:55.003Z",
            "updated_at": "2018-06-04T06:34:55.003Z"
        },
        ...
    ]
}
```
#### 9. ADD Cart

### Request

```javascript
{
    "product_id": 1,
    "id": 1
}
```

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Add Cart",
    "status": 201,
    "data": null
}
```

#### Failed
##### Field can not be empty
```javascript
{
    "name": "error",
    "message": {},
    "status": 500
}
```
