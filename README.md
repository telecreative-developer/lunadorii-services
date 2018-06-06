# Lunadorii Services

## Authentication Access

### Purpose: Get Token Access API

###### Method: HTTP POST
###### Transport message format: JSON
###### Response Code:  
###### 200 Success, 400 Bad Request, 404 Not Found, 500 Internal Server Error

Request Parameter data Structure

| Property      | Data Type     | Description                                             |
| ------------- |:-------------:| --------------------------------------------------------|
| email         | String        | Input email ‘kevinhermawan@gmail.com’ has been provided |
| password      | String        | Input password ‘kevinhermawan‘ has been provided        |


## Users

### Purpose: Register Users

###### Method: HTTP POST
###### Transport message format: JSON
###### Response Code:  
###### 200 Success, 400 Bad Request, 404 Not Found, 500 Internal Server Error

Request Parameter data Structure

| Property           |Data Type      | Description    |
| ------------------ |:-------------:| ---------------|
| first_name         | String        | Firstname user |
| last_name          | String        | Lastname user  |
| email              | String        | Email user     |
| password           | String        | Password user  |


### Purpose: GET Information Users

###### Method: HTTP GET
Transport message format: JSON
###### Response Code:  
###### 200 Success, 400 Bad Request, 404 Not Found, 500 Internal Server Error

Request Parameter data Structure

| Property           |Data Type      | Description    |
| ------------------ |:-------------:| ---------------|
| id                 | Integer       | Id user        |
| first_name         | String        | Firstname user |
| last_name          | String        | Lastname user  |
| email              | String        | Email user     |
| password           | String        | Password user  |