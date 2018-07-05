# Admin Authentication Services

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Resource types
### Admin authentication services

| No | HTTP Method | HTTP Request       | HTTP Code      |
|----|-------------|--------------------|----------------|
| 1  | POST        | /api/v1/auth/admin | 201, 400, 500  |

### Description
#### 1. POST username and password for authenticate all services

### Request

```javascript
{
    "username": "kevinhermawan",
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
    "admin_id": 1,
    "accessToken": "tokenxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "refreshToken": "refreshtokenxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

## Failed
##### Incorrect username or password

```javascript
{
    "name": "error",
    "message": "Username or password incorrect",
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
