<div align="center">
        <img src="title.svg"  width="400"> 
</div>



</div>          
                         
![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<div align="center">

![Issues](https://img.shields.io/github/issues/Arixka/Project-Api-Test-CRM?color=blueviolet)
![Forks](https://img.shields.io/github/forks/Arixka/Project-Api-Test-CRM?color=blueviolet)
![Starts](https://img.shields.io/github/stars/Arixka/Project-Api-Test-CRM?color=blueviolet)
![License](https://img.shields.io/github/license/Arixka/Project-Api-Test-CRM?color=blueviolet)

</div>   

<h2 id="table-of-contents"> Contents</h2>

<details open="open">
  <summary></summary>
<ol><a href="#about-the-project"> ➤ About The Project </a></ol>
<ol><a href="#build"> ➤ Build with </a></ol>
<ol><a href="#dependencies"> ➤ Some Dependencies </a></ol>
<ol><a href="#compile"> ➤ Compile and run </a></ol>
<ol><a href="#datamodel"> ➤ Data Model </a></ol>
<ol><a href="#routes"> ➤ API Routes </a></ol>
<ol><a href="#contact"> ➤ Contact </a></ol>

</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="about-the-project"> About The Project</h2>

The main objective of this project is to create a fully functional RESTful API
to manage a small store.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="build"> Build with</h2>

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=Javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=flat&logo=Node.js&logoColor=white&)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=Express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=Mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=Docker&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=flat&logo=Heroku&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448c5?style=flat&logo=google-cloud&logoColor=white)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="datamodel"> Data Model</h2>

<h3> User Schema</h3>

| KEY      | TYPE   | REQUIRED | VALIDATION |
| -------- | ------ | -------- | ---------- |
| name     | string | YES      |            |
| lastname | string | YES      |            |
| email    | string | YES      | Unique     |
| password | string | YES      | minLength  |
| role     | string | NO       | Enum       |

<h3> Customer Schema</h3>

| KEY      | TYPE       | REFERENCE | REQUIRED | VALIDATION |
| -------- | ---------- | --------- | -------- | ---------- |
| id       | number     |           | YES      | Admin/User |
| name     | string     |           | YES      | Admin/User |
| lastname | string     |           | YES      | Admin/User |
| image    | string     |           | YES      | Admin/User |
| phobe    | string     |           | YES      | Admin/User |
| created  | [ObjectId] | Users     | NO       | Admin/User |
| modified | [ObjectId] | Users     | NO       | Admin/User |

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="routes"> API Routes</h2>

<h3>Index</h3>

| ROUTER     | URL        | Auth |
| ---------- | ---------- | ---- |
| AuthRouter | /auth      | True |
| User       | /user      | True |
| Customer   | /customers | True |

<h3>Authentication</h3>

| METHOD | URL            | AUTH | FUNCTION            |
| ------ | -------------- | ---- | ------------------- |
| POST   | '/auth/login'  | NO   | Authenticate a user |
| POST   | '/auth/google' | NO   | Authenticate a user |

<h3>Users Endppoint</h3>

| METHOD | URL              | AUTH | ROLE  | FUNCTION                 |
| ------ | ---------------- | ---- | ----- | ------------------------ |
| POST   | '/user/'         | YES  | Admin | Create a new customer    |
| GET    | '/user/'         | YES  | Admin | Get users list           |
| GET    | '/user/:usersId' | YES  | Admin | Get users profile        |
| PUT    | '/user/:usersId' | YES  | Admin | Update users information |
| DELETE | '/user/:usersId' | YES  | Admin | Delete a users           |

<h3>Customers Endppoint</h3>

| METHOD | URL                      | AUTH | Role       | FUNCTION                    |
| ------ | ------------------------ | ---- | ---------- | --------------------------- |
| POST   | '/customer/'             | YES  | Admin/User | Create a new customer       |
| GET    | '/customer/'             | YES  | Admin/User | Get customers list          |
| GET    | '/customer/:customersId' | YES  | Admin/User | Get customers profile       |
| PUT    | '/customer/:customersId' | YES  | Admin/User | Update customer information |
| DELETE | '/customer/:customersId' | YES  | Admin/User | Delete a customer           |

<h2 id="dependencies"> Some Dependencies</h2>

|                                 Package                                  |                                Description                                 |
| :----------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|           [ Bcryptjs ](https://www.npmjs.com/package/bcryptjs)           | [ Google-auth-library ](https://www.npmjs.com/package/google-auth-library) |
|         [ Cloudinary ](https://www.npmjs.com/package/cloudinary)         |              [ Helmet ](https://www.npmjs.com/package/helmet)              |
|               [ Cors ](https://www.npmjs.com/package/cors)               |        [ Jsonwebtoken ](https://www.npmjs.com/package/jsonwebtoken)        |
|             [ Dotenv ](https://www.npmjs.com/package/dotenv)             |            [ Mongoose ](https://www.npmjs.com/package/mongoose)            |
|            [ Datauri ](https://www.npmjs.com/package/datauri)            |              [ Morgan ](https://www.npmjs.com/package/morgan)              |
|            [ Express ](https://www.npmjs.com/package/express)            |                [ Uuid ](https://www.npmjs.com/package/uuid)                |
| [ Express-fileupload ](https://www.npmjs.com/package/express-fileupload) |     [ Express-session ](https://www.npmjs.com/package/express-session)     |
|  [ Express-validator ](https://www.npmjs.com/package/express-validator)  |          [ @Babel/cli ](https://www.npmjs.com/package/@babel/cli)          |

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="compile"> Compile and run</h2>

A example `.env` file is in the `docker` subdirectory. You can use this as a
start point copying it from the docker directory to the project root directory
and modifying the desired variables.

```bash
$ git clone https://github.com/Arixka/Project-Api-Test-CRM
```


<h3>Docker compose</h3>

-   Building an image

    ```bash
    $ docker-compose build
    ```

-   Running a container

    ```bash
    $ docker-compose up
    ```

-   Stopping a container

    ```bash
    $ docker-compose down
    ```

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="contact"> Contact</h2>

<h1 align="center">

[![Twitter](https://img.shields.io/badge/-Twitter-1DA1F2?style=flat&logo=Twitter&logoColor=white)](https://twitter.com/_Arixka_)
[![Gmail](https://img.shields.io/badge/-Gmail-c14438?style=flat&logo=Gmail&logoColor=white)](mailto:marisiver25@gmail.com)
[![Linkedin](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/maria-siverio/)

</h1>
