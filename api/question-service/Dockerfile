# Use an official Node.js runtime as a parent image
FROM node:18-alpine as base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application source code to the working directory
COPY . .

# Expose the port that your Express app will listen on
EXPOSE 8100

# Define the command to start your Express server
CMD ["npm", "run", "dev"]