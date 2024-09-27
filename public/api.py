from flask import Flask, request, jsonify
from  api.v1.blueprint import api
from flask_cors import CORS
app=Flask(__name__)
app.register_blueprint((api),url_prefix='/api/v1')
CORS(app)
@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"error": "404 Not Found"}), 404
@app.route('/api/v1/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'comming soon!'})
if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
