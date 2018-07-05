# Report Services

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Resource types

| No | HTTP Method | HTTP Request              | HTTP Code     | Token Required     |
|----|-------------|---------------------------|---------------|--------------------|
| 1  | POST        | /api/v1/report            | 201, 400, 500 | :x:                |
| 2  | GET         | /api/v1/reports           | 200, 500      | :x:                |
| 3  | GET         | /api/v1/report/:report_id | 200, 500      | :x:                |

### Description
#### 1. Send Report

### Request
```javascript
{
    "name": "Kevin Hermawan",
    "email": "kevinhermawanx@gmail.com",
    "subject": "I have no idea about my password",
    "content": "Please help me..."
}
```

### Response
```javascript
{
    "name": "success",
    "message": "Success Send Report",
    "status": 201,
    "data": 1
}
```

#### 2. Get Reports
### Response
```javascript
{
    "name": "success",
    "message": "Success Get Reports",
    "status": 200,
    "data": [
        {
            "report_id": 1,
            "name": "Kevin Hermawan",
            "email": "kevinhermawanx@gmail.com",
            "subject": "I have no idea about my password",
            "content": "Please help me...",
            "read": false,
            "created_at": "2018-07-05T09:06:02.344Z",
            "updated_at": "2018-07-05T09:06:02.344Z"
        },
        ...
    ]
}
```

#### 3. Get Report by Id
### Response
```javascript
{
    "name": "success",
    "message": "Success Get Reports",
    "status": 200,
    "data": [
        {
            "report_id": 1,
            "name": "Kevin Hermawan",
            "email": "kevinhermawanx@gmail.com",
            "subject": "I have no idea about my password",
            "content": "Please help me...",
            "read": false,
            "created_at": "2018-07-05T09:06:02.344Z",
            "updated_at": "2018-07-05T09:06:02.344Z"
        }
    ]
}
```

## Failed
##### Internal server error
```javascript
{
    "name": "error",
    "message": {},
    "status": 500
}
```
