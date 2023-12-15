# Polling System API

An API where anyone can create questions with options and also add votes to it.

## Features

## Questions:
- Add Question
- Delete Question
- Get Question by its ID


## Options:
- Add Options
- Delete Options
- Add vote to option

# Swagger UI for API Documentation

- Please refer below URL to understand API documentation
- **URL:** http://localhost:8000/api-docs


# API User Interaction



## Create a Question:

- **Request Type:** POST
- **URL:** http://localhost:8000/api/questions/create

## Get a Question By ID

- **Request Type:** GET
- **URL:** http://localhost:8000/api/questions/:questionID

## Delete a Question By ID

- **Request Type:** DELETE
- **URL:** URL:http://localhost:8000/api/questions/:questionID/delete

## Create a Option:

- **Request Type:** POST
- **URL:** http://localhost:8000/api/options/:questionID/create

## Delete Option

- **Request Type:** DELETE
- **URL:** http://localhost:8000/api/options/:optionID/delete

## Add Vote

- **Request Type:** GET
- **URL:** http://localhost:8000/api/options/:optionID/add_vote

## Project Setup

### 1. Clone the Repository
- https://github.com/Snehal-Salvi/PollingSystemAPI
### 2. Install Dependencies
-  npm install

### 3. Set environment variables
- DB_URL = mongoDbURL

### 4. Run Project
- node index.js

### 5.  Server running at
- http://localhost:8000

## Deployment Link

- https://pollingsystemapi-wur1.onrender.com

## Technlogies Used

- NodeJs RestAPI
- Mongoose
- Swagger

## Authors

- [@Snehal]https://github.com/Snehal-Salvi
