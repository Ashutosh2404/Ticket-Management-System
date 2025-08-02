# Use a Node.js base image
FROM node:18-alpine

# Install Python and pip
# Alpine Linux uses `apk` for package management
RUN apk add --no-cache python3 py3-pip python3-dev build-base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's caching
COPY package.json package-lock.json ./
RUN npm install

# Set up Python virtual environment
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Copy Python requirements from the ml-model directory
COPY ml-model/requirements.txt .
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt

# Copy the rest of your application code
COPY . .

# Expose the port your Express app listens on (e.g., 5000)
EXPOSE 5000

# Command to run your backend application
# This assumes `main.js` is the entry point. If you have a `start` script in package.json,
# you could use CMD ["npm", "start"]
CMD ["node", "main.js", "excel"]