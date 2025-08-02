# Resource Management Tool

A full-stack application for IT service project management with ML-powered estimation capabilities.

## Prerequisites

Before running this application, make sure you have installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - For Windows users: Enable WSL 2 backend during installation
  - For Mac users: Both Intel and Apple Silicon (M1/M2) are supported

## Getting Started

1. Clone this repository
2. Open Docker Desktop and wait for it to fully start
3. Navigate to the project directory:
   ```bash
   cd Cookies_app
   ```
4. Build the Docker containers:
   ```bash
   docker-compose build
   ```
5. Start the application:
   ```bash
   docker-compose up
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

To stop the application, press `Ctrl+C` in the terminal where docker-compose is running, or run:
```bash
docker-compose down
```

## Project Structure

- `ticket-managing-tool/`: Frontend React application
- `project-backend/`: Backend Node.js application with Python ML integration
  - `ml-model/`: Machine learning model and related files
  - `routes/`: API routes
  - `models/`: Database models
  - `services/`: Business logic services

## Development

The project uses Docker volumes for development, which means:
- Changes to frontend code will automatically reload in the browser
- Changes to backend code will automatically restart the server
- Node modules are maintained in a Docker volume to prevent cross-platform issues

## Troubleshooting

1. If the containers fail to start, ensure:
   - Docker Desktop is running
   - Ports 3000 and 5000 are not in use by other applications
   - You have sufficient disk space for Docker images

2. To rebuild containers after major changes:
   ```bash
   docker-compose build --no-cache
   ```

3. To clean up Docker resources:
   ```bash
   docker-compose down -v
   ```

## Notes for macOS Users

The application is fully compatible with macOS. If you encounter permission issues:

1. Ensure Docker Desktop has necessary permissions in System Preferences
2. If using an M1/M2 Mac, Docker Desktop will automatically use the appropriate architecture