from flask import Flask
from src.routes import main_bp
from src.config import Config

# Create an instance of the app
app = Flask(__name__)

# Load configuration from Config class
app.config.from_object(Config)

# Register blueprints
app.register_blueprint(main_bp)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
