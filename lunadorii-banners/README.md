# Banner Services

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Resource types

| No | HTTP Method | HTTP Request    | HTTP Code      | Token Required     |
|----|-------------|-----------------|----------------|--------------------|
| 1  | GET         | /api/v1/banners | 200, 500  | :x:                |

### Description
#### 1. GET banner

### Response
```javascript
{
    "name": "success",
    "message": "Success Retrieving Banners",
    "status": 200,
    "data": [
        {
            "banner_id": 1,
            "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            "thumbnail_url": "https://example.com/example.jpg",
            "created_at": "2018-06-21T10:36:19.496Z",
            "updated_at": "2018-06-21T10:36:19.496Z"
        },
        ...
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
