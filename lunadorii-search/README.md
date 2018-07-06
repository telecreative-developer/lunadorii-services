# Search Services

This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Resource types

| No | HTTP Method | HTTP Request    | HTTP Code | Token Required |
|----|-------------|-----------------|-----------|----------------|
| 1  | GET         | /api/v1/search  | 200, 500  | :x:            |

## Queries
| No | Query                        | HTTP Query     | Query Type| Required                                               | Example                       |
|----|------------------------------|----------------|-----------|--------------------------------------------------------|-------------------------------|
| 1  | Search Keyword               | payload        | String    | :white_check_mark:                                     | /search?payload=Product Keren |
| 1  | Filter with ID Subcategories | subcategories  | Array     | :x:                                                    | /search?subcategories=[1,2,3] |
| 1  | Filter with ID Product Brand | productBrand   | Integer   | :x:                                                    | /search?productBrand=1        |
| 1  | Filter with maxPrice         | maxPrice       | Integer   | :white_check_mark: if minPrice Inserted (default: :x:) | /search?maxPrice=100000       |
| 1  | Filter with minPrice         | minPrice       | Integer   | :white_check_mark: if maxPrice Inserted (default: :x:) | /search?minPrice=10000        |

### Description

#### 1. Search
### Response
```javascript
{
    "name": "success",
    "message": "Success Search (keyword: Lorem)",
    "status": 200,
    "data": [
        {
            "product_id": 3,
            "product": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "product_slug": "lorem-ipsum-is-simply-dummy-text-of-the-printing-and-typesetting-industry-3c1db6a0-7dab-11e8-9436-412dd6dcf8f1",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "detail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "to_use": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "price": 300000,
            "discount": true,
            "discount_percentage": 30,
            "subcategories": [
                {
                    "product_subcategory_id": 1,
                    "subcategory": "Face"
                }
            ],
            "brands": [
                {
                    "product_brand_id": 2,
                    "brand": "SK-II",
                    "logo_url": "https://example.com/example.png"
                }
            ],
            "thumbnails": [
                {
                    "product_thumbnail_id": 7,
                    "thumbnail_url": "https://example.com/example.png"
                },
                ...
            ],
            "reviews": [
                {
                    "product_review_id": 3,
                    "review_rate": 2,
                    "comment": "Kereen!",
                    "created_at": "2018-07-03T03:30:09.514Z",
                    "updated_at": "2018-07-03T03:30:09.514Z",
                    "user": {
                        "id": 1,
                        "avatar_url": "https://s3.us-east-2.amazonaws.com/lunadorii/1530503176675.jpg",
                        "first_name": "Kevin",
                        "last_name": "Hermawan"
                    }
                },
                ...
            ],
            "product_rate": 2
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
