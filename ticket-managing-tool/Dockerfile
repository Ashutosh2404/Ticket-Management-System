# Stage 1: Build the React application
# Uses a Node.js 18 Alpine image for a lightweight base
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# This allows Docker to cache the npm install step. If only source code changes,
# npm install won't need to be re-run, speeding up subsequent builds.
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your React application code
COPY . .

# Build the React application for production
# This command typically creates a 'build' folder with optimized static assets.
RUN npm run build

# Stage 2: Serve the React application with Nginx
# Uses a lightweight Nginx Alpine image
FROM nginx:alpine

# Copy the built React app from the 'builder' stage into the Nginx serving directory
COPY --from=builder /app/build /usr/share/nginx/html

# Remove the default Nginx configuration file to avoid conflicts.
# You can optionally add your own custom Nginx configuration if needed (e.g., for routing, CORS).
RUN rm /etc/nginx/conf.d/default.conf

# Expose port 80, which is the default HTTP port Nginx listens on
EXPOSE 80

# Command to start Nginx in the foreground.
# 'daemon off;' ensures Nginx runs as the main process in the container,
# which is crucial for Docker to manage its lifecycle.
CMD ["nginx", "-g", "daemon off;"]
