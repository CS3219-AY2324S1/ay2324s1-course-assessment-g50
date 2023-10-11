# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /usr/src/app

# Copy package*.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Create a minimal production-ready image
FROM node:18-slim

# Set the working directory in the second stage
WORKDIR /usr/src/app

# Copy the build directory from the previous stage
COPY --from=build  /usr/src/app/build ./

# Install 'serve' globally (if not already installed)
# We are using serve because we are using react's optimized "build" production app
# so npm start will not work -> need to use a HTTP server
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the application using 'serve'
CMD ["serve", "-s", ".", "-p", "3000"]