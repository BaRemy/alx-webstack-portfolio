from . import api
from flask import request, jsonify,redirect
from models.users import User
from bcrypt import hashpw, gensalt, checkpw
url_main='http://localhost:5001'
@api.route('/register', methods=['POST'])
def register():
    name = request.form.get('username')
    password = request.form.get('password')
    confrim_password = request.form.get('confirm_password')
    email = request.form.get('email')
    if password != confrim_password:
        return jsonify({'error': 'password not match'}), 400
    password = hashpw(password.encode('utf-8'), gensalt())
    data = {
        'name': name,
        'password': password,
        'email': email
    }
    print(data)
    user=User(**data)
    user.save()
    return redirect(url_main+'/login')
