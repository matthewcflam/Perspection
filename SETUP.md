## Backend Setup

1. Create a python3 virtual environment

2. Navigate into the backend directory

3. Install the required pip packages in requirements.txt "pip install -r requirements.txt"

4. Make a .flaskenv file with the FLASK_APP, FLASK_ENV, DATABASE_URL, and JWT_SECRET_KEY environment variables

5. Have Docker-Desktop running on your device

6. Run docker compose up --build: This sets up the PostgreSQL database and the flask app instance

7. Test in Insomnia API client, setting up environment variables as {
	"url": "http://localhost:5001",
	"access_token": "{% response 'body', 'req_c85a268a8c3648d6bc0ab62f222f8c8b', 'b64::JC5hY2Nlc3NfdG9rZW4=::46b', 'when-expired', 300 %}"
}