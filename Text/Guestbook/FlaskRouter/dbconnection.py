import psycopg2, hashlib, datetime, json
from flask import make_response

# This will act as the driver for the sendMessage and retrieveMessages functionality
# for the Guestbook. It will connect to the database and process the messages

# The message response will have structured JSON as follows:
# {
#   success: 'true',
#   error: 'Error Description',
# }

# The function retrieveDBInfo() returns the database information
# As a Python dictionary which can be used to connect to the database
def retrieveDBInfo():
    dbF = open("dbinfo.pass", encoding=None)
    print(dbF)
    return json.load(dbF)

def handleMessage(jsonData):
    # Ensure that the strings sent to the database are of appropriate length
    if len(jsonData["name"]) > 20 or len(jsonData["message"]) > 160:
        return make_response(json.dumps({"success": False, "error": 'Name or Message length is greater than 20 or 160, respectively'}))
    
    # Database information is stored in a file called dbinfo.pass
    # Database is a PostgreSQL relational database

    dbinfo = retrieveDBInfo()

    try:
        conn = psycopg2.connect(
            dbname=dbinfo['dbname'],
            user=dbinfo['user'],
            host=dbinfo['host'],
            password=dbinfo['password'],
            port=dbinfo['port'])
        print("Connected to Database!")
    except Exception as E:
        return make_response(json.dumps({"success": False, "error": str(E)}))
    else:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO messages (name, message, timeposted) values ('" +
            jsonData["name"] + "', '" + jsonData["message"] + "', '" + str(datetime.datetime.now()) + "');")

        conn.commit()
        conn.close()

        return make_response(json.dumps({"success": True, "error": "None"}))

# This function will SELECT all messages from the database is a descending order by date
# TODO - Change this function so that it will only retrieve n messages at a time
# So that if there are many entries, the user isn't flooded with messages that makes
# the website long. There would be an option to load the next 10.
def retrieveMessages():
    # Database information is stored in a file called dbinfo.pass in a JSON format
    # Keys include dbname, user, host, password, port
    # Database is a PostgreSQL relational database

    dbinfo = retrieveDBInfo()

    try:
        conn = psycopg2.connect(
            dbname=dbinfo['dbname'],
            user=dbinfo['user'],
            host=dbinfo['host'],
            password=dbinfo['password'],
            port=dbinfo['port'])
        #print("Connected to Database!")
    except Exception as E:
        return make_response(json.dumps({"success": False, "error": str(E)}))
    else:
        cursor = conn.cursor()
        cursor.execute("SELECT name, message FROM messages ORDER BY timeposted desc;")

        # Current database implementation has row[0] = name and row[1] = message
        messages = cursor.fetchall()
        toJSONify = {"success": True, "messages": []}

        for row in messages:
            toJSONify["messages"].append({"name": row[0], "message": row[1]})

        conn.commit()
        conn.close()

        return make_response(json.dumps(toJSONify))
