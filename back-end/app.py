from flask import Flask
from src.routes.upload import upload_bp
from src.routes.scan import scan_bp
from src.routes.extract import extract_bp
from src.routes.entropy import entropy_bp
from src.config import Config
from flask_cors import CORS
from src.database import db
from flask_migrate import Migrate


# Create an instance of the app
app = Flask(__name__)

# Handle Cross Origin Resource Sharing
CORS(app, origins=['http://localhost:8080'])

# Load configuration from Config class
app.config.from_object(Config)

# Migrate database / migrate = Migrate(app, db)
migrate = Migrate()

# Initialize
db.init_app(app)
migrate.init_app(app, db)

# Register blueprints
app.register_blueprint(upload_bp)
app.register_blueprint(scan_bp)
app.register_blueprint(extract_bp)
app.register_blueprint(entropy_bp)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
