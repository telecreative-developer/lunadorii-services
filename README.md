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
Lunadorii API Services 1.0 uses JSON Web Token to authenticate all services

| HTTP Method         | HTTP Request           | HTTP Code     |
| ------------------- |------------------------|---------------|
| POST                | /api/v1/auth/user      | 201, 400, 500 |
