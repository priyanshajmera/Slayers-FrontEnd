# Use Node.js as the base image for building the app
FROM node:20.10.0 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the project files
COPY . .

# Build the Angular app in production mode
RUN npm run build 

# Use a lightweight Node.js image to serve the app
FROM node:20.10.0-slim

# Set working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/dist /app/dist

# Install the http-server package globally
RUN npm install -g http-server

# Expose the port for the app
EXPOSE 8080

# Start the app with http-server
CMD ["http-server", "/app/dist", "-p", "8080"]
