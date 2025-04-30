# Todo Application

A simple todo application with CRUD functionality designed to be deployed on AWS App Runner.

## Features

- Create, Read, Update, and Delete todo items
- Filter todos by status (all, active, completed)
- Search todos by title or description
- Sort todos by creation date or alphabetically
- Light/Dark theme support
- Responsive design for mobile, tablet, and desktop

## Technology Stack

- **Frontend**: React, TailwindCSS, ShadcnUI, React Query
- **Backend**: Express.js
- **Storage**: In-memory storage (can be extended to use a database)
- **Containerization**: Docker

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

### Docker

Build the Docker image:

```bash
docker build -t todo-app .
```

Run the Docker container:

```bash
docker run -p 5000:5000 todo-app
```

## Deployment on AWS App Runner

This application is designed to be deployed on AWS App Runner. You can deploy it by:

1. Build and push the Docker image to a container registry (e.g., Amazon ECR)
2. Create a new AWS App Runner service using the container image
3. Configure the service with the appropriate settings
4. Deploy the application

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo