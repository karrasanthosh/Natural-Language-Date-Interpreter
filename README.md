# Natural Language Date Interpreter

A full-stack web application that interprets natural language date expressions and product requests using Copilot API. Built with React (frontend), Java Spring Boot (backend), MySQL (database), and containerized using Podman/docker-compose.

## Project Structure
- `frontend/` — React application
- `backend/` — Spring Boot backend
- `db/` — MySQL schema and scripts

## Features
- Enter natural language date or product requests
- Copilot API integration for structured JSON responses
- History of all requests and responses
- Clean, responsive UI
- Error handling and validation

## Quick Start (with Podman)

### Prerequisites
- [Podman](https://podman.io/) installed (as a Docker alternative)
- [Podman Compose](https://github.com/containers/podman-compose) installed
- Java 17+ and Node.js 18+ (for local development)

### Setup & Run (All Services)

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd <project-root>
   ```
2. Build and start all services:
   ```sh
   podman-compose up --build
   ```
3. Access the app at [http://localhost:3000](http://localhost:3000)

### Stopping Services
```sh
podman-compose down
```

## Development
- Frontend: see `frontend/README.md`
- Backend: see `backend/README.md`
- Database: see `db/README.md`

## Configuration
- Environment variables and secrets are managed via `.env` files in each service directory.

## Troubleshooting
- Ensure Podman and Podman Compose are installed and in your PATH.
- For port conflicts, adjust ports in `docker-compose.yml`.

## License
MIT

---
**Note:** This project uses Podman as a drop-in replacement for Docker. All `docker` commands can be replaced with `podman` if preferred.
