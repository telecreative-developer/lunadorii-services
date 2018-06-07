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
            "created_at": "created at",
            "updated_at": "updated at"
        },
        {
            "id": 2,
            "first_name": "User first name",
            "last_name": "User last name",
            "email": "User email",
            "password": "User password",
            "created_at": "created at",
            "updated_at": "updated at"
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
            "created_at": "created at",
            "updated_at": "updated at"
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

### Products
#### For products services
| No  | HTTP Method | HTTP Request                                       | HTTP Code     | Token Required     |
|-----|-------------|----------------------------------------------------|---------------|--------------------|
| 1   | GET         | /api/v1/products                                   | 200, 500      | :x:                |
| 2   | GET         | /api/v1/product/:product_id                        | 200, 500      | :x:                |
| 3   | PUT         | /api/v1/product/:product_id                        | 201, 400, 500 | :white_check_mark: |
| 4   | DELETE      | /api/v1/product/:product_id                        | 200, 500      | :white_check_mark: |
| 5   | GET         | /api/v1/product-brands                             | 200, 500      | :x:                |
| 6   | GET         | /api/v1/product-brands?with_product=true           | 200, 500      | :x:                |
| 7   | GET         | /api/v1/product-categories                         | 200, 500      | :x:                |
| 8   | GET         | /api/v1/product-categories?with_subcategories=true | 200, 500      | :x:                |
| 9   | GET         | /api/v1/product-subcategories                      | 200, 500      | :x:                |
| 10  | POST        | /api/v1/cart                                       | 201, 400, 500 | :white_check_mark: |
| 11  | GET         | /api/v1/cart/:id                                   | 200, 500      | :x:                |
