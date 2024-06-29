
from flask_migrate import flask_migrate
from app import app,db
migrate = Migrate(app, db)