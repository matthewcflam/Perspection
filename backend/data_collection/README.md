## BACKEND PARSING

The data parsing from Meta (Instagram) and Google is completely different. This will describe how to run/test each independantly.

Meta(Instagram):

All the data on the instagram parser goes through the parser_insta.py, the main.py is where all the testing is occuring and where to determine which fields we want. To take a specific field (like # of posts liked), the child class the method is under must be imported, then stored, for example, connections = InstagramConnectionsParser(export_root) followed by initializing mutuals = connections.get_mutuals(). This gives the variable connections all the methods in the class given the folder, and now we can get more variables to take this data.

1. Download your Instagram data and go to the folder, if it is zipped, extract the contents.

2. In the terminal, give the file its path, ensure to include quotations ("file").

3. Paste in the folder, you should see in the terminal all the data print.

Google:

To utilize this parsing, many dependencies must be installed first. 

1. Create the Python virtual environment and download the packages from requirements.txt like the SETUP.

2. Once in the virtual environment, run the script, parser_google.py, this is done on MacOS/Linux by using this command in terminal: "./.venv/bin/python3 data_collection/parser_google.py". The command will be different on Windows.

3. Once the script is running, you will be directed to a new webpage, ensure to allow google to access all your data.

4. After this is done, rerun the script using the same command: "./.venv/bin/python3 data_collection/parser_google.py". This will give you the live data for Gmail, Google Drive and YouTube.