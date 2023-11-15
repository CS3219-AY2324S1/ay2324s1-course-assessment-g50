# PeerPrep - CS3219 Group 50

## Introduction
Tech interviews can be a daunting task, especially for students either seeking for internships
or looking for their first full time job. These questions can be daunting, especially when having to solve it on the spot during interviews. 

Introducing PeerPrep! Your one stop solution to tech interview preparations. With our collaborative features, simulate real-life interviews and take turns role playing as interviewers. Match with
partners based on similar question interests and tackle questions together!

deployment, history, code editor, submissions, chat, 
## Features
- Try out questions our team specially picked for you
- Match with individuals of a similar standard and topic interest
- Collaborate in real-time with your matched partner through our inbuilt Chat and Code Editor 
- Save question attempt and user information in your user accounts
- Test out your code against our sample testcases

## Tech Stack
Frontend: ReactJS, Redux, Yjs

Server: Express, Nodejs, SocketIO

Containerization: Docker

Databases: MongoDB, Mysql

Message Broker: RabbitMQ

## 1. Instructions to run services locally

### Pre-requisites

- Ensure you have Docker Desktop (>= v4.22.2) installed (https://docs.docker.com/get-docker/)
- Ensure you have .env files for system variables, can refer to .env.example to check. If there are missing variables, please contact team members. (.env file needed at **root-level** and **all services excluding client**)
- Ensure at least 1 question present before trying the matching and collaborative features (see [below](#user-data) on further instructions)

### Option 1: Using Docker Compose (run all services easily)

1. In the root of the project
   - run `docker-compose build`
   - run `docker-compose up`

### Option 2: Using npm (starts each service individually)

There are 11 services that needs to be started individually should you choose to use npm to start the application.

Warning: .env.example provided is meant for running using **docker-compose**.
To run using npm, please change all urls in the .env file to localhost. .env for certain services also requires additional fields only found in root-level .env

eg. http://api-gateway:5000 => http://localhost:5000

#### For this reason, using npm is **Not recommended**.

#### For all services
1. Run `npm i` to install required packages
#### To run client alone
1. In the `/client` directory, run `npm start`

#### To run backend alone (test out endpoints using postman)
1. In each of the `api/*` directory, run `npm run dev`
2. In each of the `socket/*` directory, run `npm run dev`

## 2. Populating Question data and Admin account
### Pre-requisites
   - Services was started using **docker-compose**
   - Mysql and MongoDB containers are currently running

### Admin Account
1. Open the terminal of the **mysql container** and run the following commands
2. Run `mysql -u root -p peerprep`
3. Enter the password `example` when prompted
4. Run `source /dump/CreateUsers.sql` 

This creates an admin user account with privileges to manage the questions database
   - Email: `admin@gmail.com`
   - Password: `password`

### Question data
This loads in our team's curated question list for easy setup
1. In local machine's terminal, run `docker-compose exec mongodb mongorestore /data/dump`