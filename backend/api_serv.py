import flask, json
from flask import request

server = flask.Flask(__name__)

@server.route('/get_outline', methods=['get', 'post'])
def get_outline():
    req_data = request.get_json()

    raw_text = req_data['text']

    return raw_text

if __name__ == '__main__':
    server.run(debug=True, port=8888, host='0.0.0.0')
