# Use official Python image
FROM python:3.12-slim

# Create and switch to app directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Cloud Run injects the PORT environment variable (usually 8080)
# Gunicorn binds to that port.
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 "app:create_app()"