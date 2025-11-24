# Use official Python image
# Might switch to slim bookworm later
FROM python:3.12

# Create and switch to app directory
WORKDIR /app

# Install Python dependencies first (better build caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Make sure Flask listens on all interfaces inside the container
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

# Default command: use Flask CLI (flaskenv vars come from docker-compose env_file)
CMD ["flask", "run"]
