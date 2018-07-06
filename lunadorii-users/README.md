# User Services

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Resource types

| No | HTTP Method | HTTP Request                     | HTTP Code          | Token Required     |
|----|-------------|----------------------------------|--------------------|--------------------|
| 1  | GET         | /api/v1/users                    | 200, 500           | :white_check_mark: |
| 2  | GET         | /api/v1/user/:id                 | 200, 201, 400, 500 | :white_check_mark: |
| 3  | PUT         | /api/v1/user/:id                 | 201, 400, 500      | :white_check_mark: |
| 4  | POST        | /api/v1/user/register            | 201, 400, 409, 500 | :x:                |
| 5  | POST        | /api/v1/user/check-email         | 201, 400, 409, 500 | :x:                |
| 6  | PUT         | /api/v1/user/change-email/:id    | 201, 400, 409, 500 | :white_check_mark: |
| 7  | PUT         | /api/v1/user/change-password/:id | 201, 400, 500      | :white_check_mark: |

### Description
#### 1. GET Users

### Response
```javascript
{
    "name": "success",
    "message": "Success Get Users",
    "status": 200,
    "data": [
        {
            "id": 1,
            "first_name": "Kevin",
            "last_name": "Hermawan",
            "avatar_url": "https://s3.us-east-2.amazonaws.com/lunadorii/avatar.png",
            "email": "kevinhermawanx@gmail.com",
            "provider": "local",
            "bod": "1999-06-05T17:00:00.000Z",
            "joined_at": "2018-06-29T07:18:04.635Z"
        },
        ...
    ]
}
```

#### 2. GET user by ID

### Response
```javascript
{
    "name": "success",
    "message": "Success Get User (id: 1)",
    "status": 200,
    "data": [
        {
            "id": 1,
            "first_name": "Kevin",
            "last_name": "Hermawan",
            "avatar_url": "https://s3.us-east-2.amazonaws.com/lunadorii/1530503176675.jpg",
            "email": "kevin@gmail.com",
            "provider": "facebook",
            "bod": "1999-06-05T17:00:00.000Z",
            "joined_at": "2018-05-31T14:13:50.270Z"
        }
    ]
}
```

#### 3. UPDATE single user information
### Request

```javascript
{
    "first_name": "Kevin",
    "last_name": "Hermawan",
    ...
}
```

### Response
```javascript
{
    "name": "success",
    "message": "Success Update User (id: 1)",
    "status": 200,
    "data": 1
}
```

#### 4. Check user email
### Request
```javascript
{
    "email": "kevinhermawanx@gmail.com"
}
```

### Response if available
```javascript
{
    "name": "success",
    "message": "Email available",
    "status": 200,
    "data": null
}
```

### Response if already exists
```javascript
{
    "name": "error",
    "message": "Email is already exists",
    "status": 409
}
```


#### 5. Register user
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
```javascript
{
    "name": "success",
    "message": "Success Register User",
    "status": 201,
    "data": [
        {
            "id": 89
        }
    ]
}
```

#### 6. UPDATE user email
### Request
```javascript
{
    "email": "kevinhermawanx@gmail.com"
}
```

### Response
```javascript
{
    "name": "success",
    "message": "Success Update User Email (id: 1)",
    "status": 200,
    "data": 1
}
```

#### 7. UPDATE user password
### Request

```javascript
{
    "old_password": "kevinhermawan",
    "new_password": "kevin"
}
```

### Response
```javascript
{
    "name": "success",
    "message": "Success Update User Password (id: 1)",
    "status": 200,
    "data": 1
}
```
