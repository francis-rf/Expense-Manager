# Backend Dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Expose backend port
EXPOSE 8000

# Run FastAPI server
CMD ["fastapi", "run", "backend/server.py", "--host", "0.0.0.0", "--port", "8000"]
