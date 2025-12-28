## Backend Setup

1. Create a python3 virtual environment

2. Navigate into the backend directory

3. Install the required pip packages in requirements.txt "pip install -r requirements.txt"

4. Make a .flaskenv file with the FLASK_APP, DATABASE_URL, JWT_SECRET_KEY, and FLASK_DEBUG environment variables

5. Have Docker-Desktop running on your device

6. Run docker compose up --build: This sets up the PostgreSQL database and the flask app instance

7. Test in Insomnia API client, setting up environment variables as {
	"url": "http://localhost:5001",
	REMOVED SECRETS
}


# Import note: I have set FLASK_DEBUG=1 so any changes to the Python code will automatically update the container to reflect the changes (say if you add / remove / change an endpoint)