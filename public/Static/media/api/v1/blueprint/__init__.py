from flask import Blueprint
api = Blueprint('api', __name__,url_prefix='/api/v1')
from api.v1.blueprint.user import *
