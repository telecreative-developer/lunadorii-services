# User Authentication Services

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Resource types

| No | HTTP Method | HTTP Request               | HTTP Code     |
|----|-------------|----------------------------|---------------|
| 1  | POST        | /api/v1/auth/user          | 201, 400, 500 |
| 2  | POST        | /api/v1/auth/user/facebook | 201, 400, 500 |
| 3  | POST        | /api/v1/auth/user/google   | 201, 400, 500 |

### Description
#### 1. Authentication user

### Request
```javascript
{
    "email": "kevinhermawanx@gmail.com",
    "password": "kevinhermawan"
}
```

#### 2. Authentication user with Facebook

### Request
```javascript
{
    "id": 9138424284, // Facebook ID
    "email": "kevinhermawanx@gmail.com", // Facebook Email
    "accessToken": "tokenxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" // Facebook Token
}
```

### Response
```javascript
{
    "name": "success",
    "message": "Login Success",
    "status": 201,
    "id": 1,
    "accessToken": "tokenxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "refreshToken": "refreshtokenxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

## Failed
##### Incorrect username or password
```javascript
{
    "name": "error",
    "message": "Incorrect username or password",
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

##### Field can not be empty
```javascript
{
    "name": "error",
    "message": {},
    "status": 500
}
```
