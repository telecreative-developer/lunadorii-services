
# Promo

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Resource Types

| No  | HTTP Method | HTTP Request                | HTTP Code     | Token Required     |
|-----|-------------|-----------------------------|---------------|--------------------|
| 1   | POST        | /api/v1/promo               | 201, 400, 500 | :white_check_mark: |
| 2   | GET         | /api/v1/promo               | 200, 500      | :x:                |
| 3   | GET         | /api/v1/promo/:promo_id     | 200, 500      | :x:                |
| 4   | GET         | /api/v1/promo/slug/:slug    | 200, 500      | :x:                |
| 5   | PUT         | /api/v1/promo/:promo_id     | 200, 400, 500 | :white_check_mark: |
| 6   | DELETE      | /api/v1/promo/:promo_id     | 200, 500      | :white_check_mark: |

## Description
#### 1. POST promo

### Request
```javascript
{
    "title": "title promo",
    "thumbnail_url": "thumbnail url",
    "content": "content promo",
    "admin_id": "id admin"
}
```
### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Send Promo",
    "status": 201
}
```

#### 2. GET promo

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Get Promo",
    "status": 200,
    "data": [{
        ...
    }]
}
```

#### 3. GET Single Promo

### Response
#### Success
```javascript
{
    "name": "success",
    "message": "Success Get Promo",
    "status": 200,
    "data": {
        ...
    }
}
```
#### 4. Get Single Promo by Slug

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Get Promo",
    "status": 200,
    "data": {
        ...
    }
}
```
#### 5. Update Promo
### Request
```javascript
{
    "title": "title promo",
    "thumbnail_url": "thumbnail url",
    "content": "content promo"
}
```
### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Update Promo",
    "status": 201,
    "data": null
}
```
#### 6. Delete Promo

### Response
#### Success

```javascript
{
    "name": "success",
    "message": "Success Delete Promo",
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
