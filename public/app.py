from flask import Flask, request, jsonify,flash,render_template,redirect,session
from pymongo import MongoClient
from models.users import User
from bcrypt import hashpw, gensalt, checkpw
app = Flask(__name__)
app.config['SECRET_KEY']='af7ec8f879c166d13f0250acb63b0ab305fd0c45fc28da422e3cf6bf93be412a'
@app.route('/hello')
def hello():
    return jsonify('Hello, World!')
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        client = MongoClient('localhost', 27017)
        db=client['MP']
        collection=db['user']
        collected_data=collection.find_one({'name': username})
        print(collected_data)
        if not collected_data:
            flash('invalid username or Password',error='error')
            return render_template('login.html')
        if username and checkpw(password.encode('utf-8'), collected_data['password'].encode('utf-8')):
            session['username'] =username
            return redirect('/home')
    else:
        return render_template('login.html')
@app.route('/register', methods=['GET'])
def register():
    return render_template('register.html')
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/')
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/home', methods=['GET'])
def home():
    if 'username' not in session:
        return redirect('/login')
    return render_template('home.html')
if __name__ == "__main__":
    app.run(host='localhost', port=5001, debug=True)
