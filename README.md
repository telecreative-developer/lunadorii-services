# Lunadorii API Services v1.0 (Codename Arcanist)

With Lunadorii API Services 1.0, you can get users and products information, manage users and products, authentication all services, view and control automation workflows, and test different calls and endpoints before pushing to production.

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## HTTP Code
| HTTP Code | Description           |
| --------- |-----------------------|
| 200       | Success GET           |
| 201       | Success POST          |
| 400       | Bad Request           |
| 401       | Token is not provided |
| 403       | Forbidden             |
| 409       | Conflicts             |
| 500       | Internal Server Error |

## Resource types

### Authentication
#### For authentication services
| No | HTTP Method | HTTP Request      | HTTP Code     |
|----|-------------|-------------------|---------------|
| 1  | POST        | /api/v1/auth/user | 201, 400, 500 |

### Description
#### 1. POST email and password for authenticate all services

### Request

```javascript
{
    "email": "kevinhermawanx@gmail.com",
    "password": "kevinhermawan"
}
```

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Login Success",
    "status": 201,
    "accessToken": "tokenxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "refreshToken": "refreshtokenxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

#### Failed
##### Incorrect email or password

```javascript
{
    "name": "error",
    "message": "Incorrect email or password",
    "status": 400
}
```
##### Error object name 
```javascript
{
    "name": "error",
    "message": "Missing credentials",
    "status": 400
}
```

### Users
#### For users services

| No | HTTP Method | HTTP Request                     | HTTP Code          | Token Required     |
|----|-------------|----------------------------------|--------------------|--------------------|
| 1  | GET         | /api/v1/users                    | 200, 500           | :white_check_mark: |
| 2  | GET         | /api/v1/user/:id                 | 200, 201, 400, 500 | :white_check_mark: |
| 3  | PUT         | /api/v1/user/:id                 | 201, 400, 500      | :white_check_mark: |
| 4  | POST        | /api/v1/user/register            | 201, 400, 409, 500 | :x:                |
| 5  | PUT         | /api/v1/user/change-email/:id    | 201, 400, 409, 500 | :white_check_mark: |
| 6  | PUT         | /api/v1/user/change-password/:id | 201, 400, 500      | :white_check_mark: |

### Description
#### 1. GET all users information

### Response

#### Success

```javascript
{
    "name": "success",
    "message": "Success Retrieving Users",
    "status": 200,
    "data": [
        {
            "id": 1,
            "first_name": "User first name",
            "last_name": "User last name",
            "email": "User email",
            "password": "User password",
            "created_at": "2018-06-04T06:35:42.443Z",
            "updated_at": "2018-06-04T06:35:42.443Z"
        },
        {
            "id": 2,
            "first_name": "User first name",
            "last_name": "User last name",
            "email": "User email",
            "password": "User password",
            "created_at": "2018-06-04T06:35:42.443Z",
            "updated_at": "2018-06-04T06:35:42.443Z"
        },
        ...
    ]
}
```

#### 2. GET single user information

### Response

#### Success

```javascript
{
    "name": "success",
    "message": "Success Retrieving User",
    "status": 200,
    "data": [
        {
            "id": 1,
            "first_name": "User first name",
            "last_name": "User last name",
            "email": "User email",
            "password": "User password",
            "created_at": "2018-06-04T06:35:42.443Z",
            "updated_at": "2018-06-04T06:35:42.443Z"
        }
    ]
}
```

#### 3. UPDATE single user information
### Request

```javascript
{
    "first_name": "Kevin",
    "last_name": "Hermawan"
}
```

### Response

#### Success

```javascript
{
    "name": "success",
    "message": "Success Update User",
    "status": 200,
    "data": 1
}
```

#### 4. Register user
### Request

```javascript
{
    "first_name": "Kevin",
    "last_name": "Hermawan",
    "email": "kevinhermawanx@gmail.com",
    "password": "kevinhermawan"
}
```

### Response

#### Success

```javascript
{
    "name": "success",
    "message": "Success Update User",
    "status": 200,
    "data": 1
}
```

#### 5. UPDATE user email
### Request

```javascript
{
    "email": "kevinhermawanx@gmail.com"
}
```

### Response

#### Success

```javascript
{
    "name": "success",
    "message": "Success Update Email",
    "status": 200,
    "data": 1
}
```

#### 6. UPDATE user password
### Request

```javascript
{
    "old_password": "kevinhermawan",
    "new_password": "kevin"
}
```

### Response

#### Success

```javascript
{
    "name": "success",
    "message": "Success Update Password",
    "status": 200,
    "data": 1
}
```

#### Failed
##### Token not provided
```javascript
{
    "name": "error",
    "message": "Token not provided",
    "status": 401
}
```
##### Token does not match
```javascript
{
    "name": "error",
    "message": {
        "name": "JsonWebTokenError",
        "message": "invalid signature"
    },
    "status": 401
}
```
##### Token expired
```javascript
{
    "name": "error",
    "message": {
        "name": "TokenExpiredError",
        "message": "jwt expired",
        "expiredAt": "2018-06-05T16:22:09.000Z"
    },
    "status": 401
}
```
##### Email is already in use
```javascript
{
    "name": "error",
    "message": "Email is already in use",
    "status": 409
}
```
##### Field can not be empty
```javascript
{
    "name": "error",
    "message": {},
    "status": 500
}
```
##### Old password is incorrect
```javascript
{
    "name": "error",
    "message": "Old password is incorrect",
    "status": 500
}
```

### Products
#### For products services
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

#### Failed
##### Field can not be empty
```javascript
{
    "name": "error",
    "message": {},
    "status": 500
}
```
