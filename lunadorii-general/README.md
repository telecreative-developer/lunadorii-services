# General Services

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Resource types

| No | HTTP Method | HTTP Request           | HTTP Code | Token Required     |
|----|-------------|------------------------|-----------|--------------------|
| 1  | GET         | /api/v1/general/banks  | 200, 500  | :x:                |
| 2  | GET         | /api/v1/general/places | 200, 500  | :x:                |

### Description

#### 1. GET banks
### Response
```javascript
{
    "name": "success",
    "message": "Success Get Banks",
    "status": 200,
    "data": [
        {
            "bank_id": 1,
            "bank": "Anglomas International Bank",
            "created_at": "2018-06-26T06:46:42.561Z",
            "updated_at": "2018-06-26T06:46:42.561Z"
        },
        {
            "bank_id": 2,
            "bank": "BCA Syariah",
            "created_at": "2018-06-26T06:46:42.561Z",
            "updated_at": "2018-06-26T06:46:42.561Z"
        },
        ...
    ]
}
```

#### 2. GET places
### Response
```javascript
{
    "name": "success",
    "message": "Success Get Places",
    "status": 200,
    "data": [
        {
            "province_id": 21,
            "province": "Nanggroe Aceh Darussalam (NAD)",
            "cities": [
                {
                    "city_id": 1,
                    "city": "Aceh Barat",
                    "postal_code": 23681
                },
                {
                    "city_id": 2,
                    "city": "Aceh Barat Daya",
                    "postal_code": 23764
                },
                {
                    "city_id": 3,
                    "city": "Aceh Besar",
                    "postal_code": 23951
                },
                ...
            ]
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
