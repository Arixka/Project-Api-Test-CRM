# Project-Api-Test-CRM
The CRM Service


<h3> Technologies used</h3>

- [NodeJS]
- [Express]
- [Mongoose]
- [MongoDB]
- [Javascript]

<h2> Data Model</h2>

<h3> User Schema</h3>

| KEY      | TYPE   | REFERENCE | REQUIRED | VALIDATION     |
| -------- | ------ | --------- | -------- | -------------- |
| name     | string |           | YES      |                |
| lastname | string |           | YES      |                |
| email    | string |           | YES      | Unique         |
| password | string |           | YES      | minLength      |
| role     | string |           | NO       | Enum           |

<h3> Customer Schema</h3>

| KEY       | TYPE       | REFERENCE | REQUIRED | VALIDATION |
| --------- | ---------- | --------- | -------- | ---------- |
| id        | number     |           | YES      |            |
| name      | string     |           | YES      |            |
| lastname  | string     |           | YES      |            |
| photo     | string     |           | NO       |            |
| created   | [ObjectId] | Users     | NO       |            |
| modified  | [ObjectId] | Users     | NO       |            |

<br>

<h2>API Routes</h2>

<h3>Index</h3>

| ROUTER             | URL           | Auth |
| ------------------ | ------------- | ---- |
| AuthRouter         | /auth         | True |
| Users              | /users        | True |
| AuthRouter         | /customers    | True |

<h3>Authentication</h3>

| METHOD | URL           | AUTH | FUNCTION            |
| ------ | ------------- | ---- | ------------------- |
| POST   | '/auth/login' | NO   | Authenticate a user |

<h3>Users Endppoint</h3>

| METHOD | URL              | AUTH | ROLE  | FUNCTION                    |
| ------ | ---------------- | ---- | ----  | --------------------------- |
| POST   | '/users/'        | YES  | Admin  | Create a new customer       |
| GET    | '/users/'         | YES  | Admin  | Get users list          |
| GET    | '/users/:usersId' | YES  | Admin  | Get users profile       |
| PUT    | '/users/:usersId' | YES  | Admin  | Update users information |
| DELETE | '/users/:usersId' | YES  | Admin  | Delete a users           |


<h3>Customers Endppoint</h3>

| METHOD | URL              | AUTH | FUNCTION                    |
| ------ | ---------------- | ---- | --------------------------- |
| POST   | '/customers/'    | YES  | Create a new customer       |
| GET    | '/customers/'    | YES  | Get customers list          |
| GET    | '/customers/:customersId' | YES  | Get customers profile       |
| PUT    | '/customers/:customersId' | YES  | Update customer information |
| DELETE | '/customers/:customersId' | YES  | Delete a customer           |


<h3>Package list</h3>

| Package                    | Description    |
| -------------------------- | -------------- |
| -------------------------- | -------------- |
| -------------------------- | -------------- |
| -------------------------- | -------------- |
| -------------------------- | -------------- |
| -------------------------- | -------------- |
| -------------------------- | -------------- |

<h3>Compile and run</h3>


A example `.env` file is in the `docker` subdirectory. You can use this as a start point 
copying it from the docker directory to the project root directory and modifying the 
desired variables.


```bash
$ git clone https://github.com/Arixka/Project-Api-Test-CRM
```

<h3>Installing dependencies</h3>

```bash
$ npm install
```


<h3>Docker compose</h3>


* Building an image

```bash
$ docker-compose build
```

* Running a container

```bash
$ docker-compose up
```

* Stopping a container

```bash
$ docker-compose down
```
