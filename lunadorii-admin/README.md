# Admin Services

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Resource types

| No | HTTP Method | HTTP Request                            | HTTP Code          | Token Required     |
|----|-------------|-----------------------------------------|--------------------|--------------------|
| 1  | GET         | /api/v1/admin/:admin_id                 | 200, 201, 400, 500 | :white_check_mark: |
| 2  | PUT         | /api/v1/admin/:admin_id                 | 201, 400, 500      | :white_check_mark: |
| 3  | POST        | /api/v1/admin/register                  | 201, 400, 409, 500 | :x:                |
| 4  | PUT         | /api/v1/admin/change-username/:admin_id | 201, 400, 409, 500 | :white_check_mark: |
| 5  | PUT         | /api/v1/admin/change-email/:admin_id    | 201, 400, 409, 500 | :white_check_mark: |
| 6  | PUT         | /api/v1/admin/change-password/:admin_id | 201, 400, 500      | :white_check_mark: |

### Description
#### 1. GET admin with id

### Response
```javascript
{
    "name": "success",
    "message": "Success Get Admin (admin_id: 1)",
    "status": 200,
    "data": [
        {
            "admin_id": 1,
            "first_name": "Alpha",
            "last_name": "Hero",
            "email": "alphahero@gmail.com",
            "joined_at": "2018-06-21T06:35:24.881Z"
        }
    ]
}
```

#### 2. UPDATE admin
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
    "message": "Success Update Admin (admin_id: 1)",
    "status": 200,
    "data": 1
}
```

#### 3. Register admin
### Request
```javascript
{
    "first_name": "Kevin",
    "last_name": "Hermawan",
    "username": "kevinhermawan",
    "email": "kevinhermawanx@gmail.com",
    "password": "kevinhermawan",
    ...
}
```

### Response
```javascript
{
    "name": "success",
    "message": "Success Register Admin",
    "status": 201,
    "data": [
        {
            "admin_id": 1
        }
    ]
}
```

#### 4. Change username admin
### Request
```javascript
{
    "username": "kevinhermawan"
}
```

### Response
```javascript
{
    "name": "success",
    "message": "Success Update Admin Username (admin_id: 1)",
    "status": 200,
    "data": 1
}
```

#### 5. Change email admin
### Request
```javascript
{
    "email": "kevin@gmail.com"
}
```

### Response
```javascript
{
    "name": "success",
    "message": "Success Update Admin Email (admin_id: 1)",
    "status": 200,
    "data": 1
}
```

#### 6. Change password admin
### Request
```javascript
{
  "old_password": "K3v1N",
  "new_password": "K3v1NHermawan"
}
```

### Response
```javascript
{
    "name": "success",
    "message": "Success Update Admin Password (admin_id: 1)",
    "status": 200,
    "data": 1
}
```

## Failed
##### Email is already exists
```javascript
{
    "name": "error",
    "message": "Email is already exists",
    "status": 409
}
```

##### Username is already exists
```javascript
{
    "name": "error",
    "message": "Username is already exists",
    "status": 409
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

##### Internal server error
```javascript
{
    "name": "error",
    "message": {},
    "status": 500
}
```
