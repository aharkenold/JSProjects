from flask import Flask, request, make_response
from dbconnection import handleMessage, retrieveMessages

app = Flask(__name__)

# This route will be used to send messages to the server and store in the database
@app.route('/postMessage', methods=['POST'])
def postMessage():
    jsonData = request.get_json(force=True)
    res = handleMessage(jsonData)
    res.headers.add("Access-Control-Allow-Origin", '*')
    return res

@app.route('/getMessages', methods=['GET'])
def getMessages():
    res = retrieveMessages()
    res.headers.add("Access-Control-Allow-Origin", '*')
    return res