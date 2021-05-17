<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">Readme</h3>

  <p align="center">
    Software Specification for attainU task.
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Backend server using Express Framework to :

  * User authentication using jwt
  * User can add address and address data in database
  * User can JSON patching
  * Generate Image Thumbnail

A list of commonly used resources that I find helpful are listed in the acknowledgements.

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [Lodash](https://lodash.com/)
* [pg](https://www.npmjs.com/package/pg)
* [json-patch](https://www.npmjs.com/package/json-patch)
* [node-fetch](https://www.npmjs.com/package/node-fetch)
* [sharp](https://www.npmjs.com/package/sharp)



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites(Linux)

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  sudo apt install npm
  ```
* nodejs
  ```sh
  sudo apt-get install nodejs
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Setup .env
   ```
   create a .env file in project directory
   copy environment variables from example-env to .env
   ```
4. Start the server
   ```sh
   npm start
   ```



<!-- USAGE EXAMPLES -->
## Usage
`Here is the postman api collention in order to access the api directly from postman`  [postman-api-collection](https://www.getpostman.com/collections/18f03f6cf2006654fe55)
#### Public APIs
1. Authentication
   ```
   The api is used for authenticating user with jwt token, the user has to enter his username and password and in response to that a jwt token is generated for the user. The jwt token will be used to access proctected apis.
   ```
   ```js
   @POST http://localhost:3000/api/v1/login
    Content-Type: application/json
    {
      "username": "username",
      "password": "pass"
    }
   ```
   ```js
      {
          "success": true,
          "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imt1bWFyIiwiaWF0IjoxNjIxMjU0MzQxLCJleHAiOjE2MjEzNDA3NDF9.   aKpdW6mZYRq7rc3xYXzkO98eDccYfiomH6uMEUZ5_r8"
      }
   ```
#### Protected APIs
`NOTE: All protected apis can only be accessed using token which can be generated from above authentication api. The token needs to be passed inside the headers`
1. JSON Patching
   ```
   The api is used for creating a patched json. The user need to pass a original json and a path json.
   ```
   ```js
   @POST http://localhost:3000/api/v1/pro/add-json-path 
    Co ntent-Type: application/json
    Headers: token: <jwt token>

    {
        "original_doc": {
            "baz": "qux",
            "foo": "bar"
        },
        "patch_doc": [
            {
                "op": "replace",
                "path": "/baz",
                "value": "boo"
            },
            {
                "op": "add",
                "path": "/hello",
                "value": [
                    "world"
                ]
            },
            {
                "op": "remove",
                "path": "/foo"
            }]
    }
   ```
   ```js
        {
          "success": true,
          "data": {
                    "patchedDoc": {
                    "baz": "boo",
                    "hello": ["world"]
                    }
                  }
        }
   ```
2. Add user address
 ```
   The api is used for storing the address of the user in the database.
   ```
   ```js
    @POST http://localhost:3000/api/v1/pro/add-user-address
    Content-Type: application/json
    Headers: token: <jwt token>
    {
      "address": "address"
    }
   ```
   ```js
    {
      "success": true,
      "data": "Data added successfully"
    }
   ```
3. Generate Image Thumbnail
 ```
   The api is used for generating 25x25 thumbnail image from a image url.
   ```
   ```js
    @POST http://localhost:3000/api/v1/pro/create-image-thumbnail
    Content-Type: application/json
    Headers: token: <jwt token>
    {
       "image_url": "https://images.unsplash.com/photo-1585399000684-d2f72660f092?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
    }
   ```
   ```js
    thumbnail.jpg
   ```


