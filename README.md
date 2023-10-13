[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# PeerPrep - CS3219 Group 50

## 1. Instructions to run services locally

### Pre-requisites

- Ensure you have Docker Desktop (>= v4.22.2) installed (https://docs.docker.com/get-docker/)
- Ensure you have .env files for system variables, can refer to .env.example to check. If there are missing variables, please contact team members.

### 1.1 To run all the services at the same time

1. In the root of the project, run `docker-compose up`
2. Use the following endpoints for respective services
   - Frontend: http://localhost:3000
   - API gateway service: http://localhost:5000
   - Users service: http://localhost:8000
   - Questions service: http://localhost:8100

### 1.2 To run the frontend alone

1. In the `/client` directory, run `npm start`

### 1.3 To run the backend alone

1. In the `/api/api-gateway` directory, run `npm run dev`
2. In the `/api/user-service` directory, run `npm run dev`
3. In the `/api/question-service` directory, run `npm run dev`