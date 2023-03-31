# Project Title

Cat Picture API

## Description

![Cat Picture API](https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/tacocat-spelled-backwards-is-taco-cat-cute-and-funny-animal-art-designs.jpg)

### Dependencies

* JavaScript (Tiny bit of TypeScript)
* Express
* Postgres
* Mocha & Should
* JsonWebToken
* bCrypt
* Env
### Installing & Setup

* npm install
* npm install -g mocha (If necessary)
* You will need to create .env file in the root folder and add TOKEN_SECRET in the .env file (ex. TOKEN_SECRET=nyan_cat)

### Executing program

* npm start
* Copy Script from migrations/dbinit.sql and paste & run in your Postgres
  - Please change the database name and password to match your database in src/db/dbconnector.ts
* For testing,
  - Run the entire script dbinit.sql in Postgres each other before running the test.
  - Please run 'npm run test'. (Make sure that the server is running in the background)
* POSTMAN collection (v2.1) is located in CAT-PICTURE-API/collections/Cat Pictuer API.postman_collection.json (If you run each API call manually, it will run without an issue (you might need to replace with your own image when you upload the image). I wrote API tests in Postman, however, there has been an issue with not being able to locate the image. But the manual test has no issue).
  - You should be able to execute 'Run Collection' in Postman as I placed API endpoints in order (<-- Not currently working properly)

## User Story

General
* - [x] As a user, I should be able to create an account to upload / access the image.
* - [x] As a user, I should be able to obtain a token
* - [x] As a user, I should be able to upload the cat image
* - [x] As a user, I should be able to update the cat image
* - [x] As a user, I should be able to delete the cat image
* - [x] As a user, I should be able to get all the cat images
* - [x] As a user, I should be able to get one specific cat image

## Authors

Contributors names and contact info

Moe Yang
Email: yhmgood47@gmail.com

## License

This project is licensed under the [MOE YANG] License - see the LICENSE.md file for details
