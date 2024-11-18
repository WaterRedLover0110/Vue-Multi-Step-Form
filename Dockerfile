# # Use an official Node.js runtime as the base image
# FROM node:18 AS build-stage

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the entire project to the container
# COPY . .

# # Build the Vue app for production
# RUN npm run build

# # Use Node.js runtime to serve the built files
# FROM node:18 AS production-stage

# # Set the working directory for production stage
# WORKDIR /app

# # Install http-server
# RUN npm install -g http-server

# # Copy the built files from the previous stage
# COPY --from=build-stage /app/dist /app/dist

# # Expose port 8080 for the app
# EXPOSE 5173

# # Command to start http-server with fallback to index.html
# CMD ["http-server", "dist", "-p", "5173", "--proxy", "http://localhost:5173?"]

# Use an official Node.js runtime as the base image
FROM node:18 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Vue app for production
RUN npm run build

# Use Node.js runtime to serve the built files
FROM node:18 AS production-stage

# Set the working directory for production stage
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy the built files from the previous stage
COPY --from=build-stage /app/dist /app/dist

# Expose port 8080 for the app
EXPOSE 5173

# Use serve to start the app with fallback routing
CMD ["serve", "-s", "dist", "-l", "5173"]
